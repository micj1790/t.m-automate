import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Copy, FileText, Mail, Hash, PenTool, Linkedin, Search, BarChart3, Globe, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ReactMarkdown from 'react-markdown';

const contentTypes = [
  { value: 'linkedin_post', label: 'LinkedIn Post', icon: Linkedin, desc: 'Professional LinkedIn post with hashtags' },
  { value: 'blog_article', label: 'Blog Article', icon: FileText, desc: 'SEO-optimised blog article ~600 words' },
  { value: 'google_ad', label: 'Google Ad Copy', icon: PenTool, desc: 'Headlines, descriptions & keywords' },
  { value: 'email_template', label: 'Marketing Email', icon: Mail, desc: 'Subject line, preview text & body' },
  { value: 'project_summary', label: 'Project Case Study', icon: BarChart3, desc: 'Detailed case study with results' },
  { value: 'caption', label: 'Social Captions x3', icon: Hash, desc: '3 varied social media captions' },
  { value: 'seo_page', label: 'SEO Landing Page', icon: Globe, desc: 'Full landing page copy with meta tags' },
  { value: 'quote_email', label: 'Quote Follow-Up Email', icon: Mail, desc: 'Professional follow-up email after quote' },
];

const quickTemplates = [
  { type: 'linkedin_post', topic: 'Recent PLC retrofit project completion at an FMCG plant', ctx: 'Allen-Bradley CompactLogix, 60% downtime reduction' },
  { type: 'blog_article', topic: 'Benefits of SCADA systems for South African manufacturers', ctx: 'Target audience: plant managers, operations directors' },
  { type: 'google_ad', topic: 'Industrial automation services Johannesburg', ctx: 'Target: factory owners looking for PLC programming' },
  { type: 'email_template', topic: 'Introducing our 24/7 emergency breakdown support', ctx: 'For existing clients in mining and manufacturing' },
  { type: 'caption', topic: 'New MCC panel installation at food processing plant in Cape Town', ctx: '' },
  { type: 'project_summary', topic: 'Conveyor system automation for a mining client in Gauteng', ctx: '12 conveyors, SCADA monitoring, 99.9% uptime' },
  { type: 'seo_page', topic: 'PLC Programming services Johannesburg', ctx: 'Keywords: PLC programmer Johannesburg, PLC integrators South Africa' },
  { type: 'blog_article', topic: 'How to choose the right MCC panel for your factory', ctx: 'Technical audience, SANS standards, South Africa' },
];

const prompts = {
  linkedin_post: (topic, ctx) => `Write a professional, engaging LinkedIn post for T.M Engineering (industrial automation company, 39 years experience, Johannesburg, South Africa). Topic: "${topic}". ${ctx ? 'Additional context: ' + ctx : ''}. Requirements: Professional but engaging tone, 2-3 relevant emojis (sparingly), strong call-to-action, 5-8 relevant hashtags. Max 300 words. Make it sound authentic, not corporate.`,
  blog_article: (topic, ctx) => `Write a comprehensive, SEO-optimized blog article for T.M Engineering (industrial automation specialists, Johannesburg, South Africa, 39 years experience). Topic: "${topic}". ${ctx ? 'Additional context: ' + ctx : ''}. Requirements: Markdown format with H2/H3 headers, ~600-800 words, SEO keywords: industrial automation South Africa, PLC programming Johannesburg. Include practical insights, statistics where relevant. Professional and authoritative tone.`,
  google_ad: (topic, ctx) => `Write Google Ads copy for T.M Engineering (industrial automation, Johannesburg, South Africa). Topic/Service: "${topic}". ${ctx ? 'Context: ' + ctx : ''}. Provide: 5 headlines (max 30 chars each), 3 descriptions (max 90 chars each), display URL suggestion, 10 keyword suggestions with match types, and 2 sitelink extension suggestions.`,
  email_template: (topic, ctx) => `Write a professional B2B marketing email for T.M Engineering (industrial automation specialists, 39 years, Johannesburg). Topic: "${topic}". ${ctx ? 'Audience: ' + ctx : ''}. Format: Subject line, preview text, HTML-friendly body with sections, clear CTA. Professional, not salesy. Focus on value and expertise.`,
  project_summary: (topic, ctx) => `Write a compelling project case study for T.M Engineering (industrial automation specialists, South Africa). Project: "${topic}". ${ctx ? 'Details: ' + ctx : ''}. Include: Project Overview, The Challenge, Our Solution, Technologies Used, Results & Outcomes, Client Testimonial (fabricated but realistic). Use Markdown formatting. Make it impressive but credible.`,
  caption: (topic, ctx) => `Write 3 different social media captions for T.M Engineering (industrial automation, South Africa). Topic: "${topic}". ${ctx ? 'Context: ' + ctx : ''}. Provide: 1x LinkedIn (professional, 150 words), 1x Facebook (casual, 100 words), 1x Instagram (energetic, 80 words + hashtags). Each should have a different angle and tone.`,
  seo_page: (topic, ctx) => `Write full landing page copy for T.M Engineering (industrial automation specialists, Johannesburg, South Africa, 39 years). Page topic: "${topic}". ${ctx ? 'SEO focus: ' + ctx : ''}. Include: H1 title, meta description (160 chars), hero copy, 3 benefit sections, social proof section, FAQ (5 questions), CTA section. Optimised for Google. Use Markdown.`,
  quote_email: (topic, ctx) => `Write a professional quote follow-up email for T.M Engineering (industrial automation, South Africa). Context: "${topic}". ${ctx ? 'Additional: ' + ctx : ''}. Include: Subject line, professional greeting, recap of discussion, quote reference, key benefits, next steps, contact details. Professional B2B tone. Not pushy.`,
};

export default function AIContent() {
  const { toast } = useToast();
  const [contentType, setContentType] = useState('linkedin_post');
  const [topic, setTopic] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [result, setResult] = useState('');
  const [generating, setGenerating] = useState(false);

  const generate = async () => {
    if (!topic) { toast({ title: 'Enter a topic first', variant: 'destructive' }); return; }
    setGenerating(true);
    setResult('');
    const prompt = prompts[contentType](topic, additionalContext);
    const response = await base44.integrations.Core.InvokeLLM({ prompt });
    setResult(response);
    setGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({ title: '✓ Copied to clipboard!' });
  };

  const selectedType = contentTypes.find(c => c.value === contentType);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Content Generator</h1>
        <p className="text-sm text-muted-foreground">Generate professional marketing content for T.M Engineering with AI.</p>
      </div>

      {/* Content type selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {contentTypes.map(ct => (
          <button key={ct.value} onClick={() => setContentType(ct.value)}
            className={`p-3 rounded-xl border text-left transition-all ${contentType === ct.value ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-card border-border text-muted-foreground hover:border-border/80 hover:text-foreground'}`}>
            <ct.icon className="w-4 h-4 mb-1.5" />
            <div className="text-xs font-semibold">{ct.label}</div>
            <div className="text-[10px] opacity-70 mt-0.5">{ct.desc}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Generate: {selectedType?.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs">Topic / Subject *</Label>
              <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder={`e.g. New PLC retrofit at packaging plant`} className="mt-1.5 bg-secondary border-border" />
            </div>
            <div>
              <Label className="text-xs">Additional Context</Label>
              <Textarea value={additionalContext} onChange={e => setAdditionalContext(e.target.value)} placeholder="Target audience, specific details, keywords to include..." rows={3} className="mt-1.5 bg-secondary border-border text-sm" />
            </div>
            <Button onClick={generate} disabled={generating} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-10">
              <Sparkles className="w-4 h-4 mr-2" />
              {generating ? 'Generating...' : `Generate ${selectedType?.label}`}
            </Button>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold">Generated Content</CardTitle>
            {result && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={generate} disabled={generating} className="text-xs h-7">
                  <RefreshCw className="w-3 h-3 mr-1" /> Regenerate
                </Button>
                <Button size="sm" variant="outline" onClick={copyToClipboard} className="text-xs h-7">
                  <Copy className="w-3 h-3 mr-1" /> Copy
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="prose prose-sm prose-invert max-w-none p-4 rounded-xl bg-secondary/50 max-h-[500px] overflow-y-auto text-xs leading-relaxed">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Generated content will appear here.</p>
                <p className="text-xs mt-1 opacity-60">Choose a type, enter a topic, and click Generate.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Templates */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-sm font-bold">Quick Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {quickTemplates.map((t, i) => (
              <button key={i} onClick={() => { setContentType(t.type); setTopic(t.topic); setAdditionalContext(t.ctx); }}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border text-left transition-all">
                <div className="text-[10px] text-primary font-bold mb-1">{contentTypes.find(c => c.value === t.type)?.label}</div>
                <div className="text-[10px] text-muted-foreground leading-snug">{t.topic}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}