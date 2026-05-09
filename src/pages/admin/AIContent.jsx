import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Copy, FileText, Linkedin, Mail, Hash, PenTool } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ReactMarkdown from 'react-markdown';

const contentTypes = [
  { value: 'linkedin_post', label: 'LinkedIn Post', icon: Linkedin },
  { value: 'blog_article', label: 'Blog Article', icon: FileText },
  { value: 'google_ad', label: 'Google Ad Copy', icon: PenTool },
  { value: 'email_template', label: 'Marketing Email', icon: Mail },
  { value: 'project_summary', label: 'Project Summary', icon: FileText },
  { value: 'caption', label: 'Social Media Caption', icon: Hash },
];

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

    const prompts = {
      linkedin_post: `Write a professional, engaging LinkedIn post for T.M Engineering (industrial automation company, Johannesburg, South Africa). Topic: "${topic}". ${additionalContext}. Include emojis sparingly, professional tone, call to action, relevant hashtags. Max 300 words.`,
      blog_article: `Write a comprehensive, SEO-optimized blog article for T.M Engineering (industrial automation company, Johannesburg, South Africa). Topic: "${topic}". ${additionalContext}. Use markdown formatting, include headers, ~600 words. Keywords: industrial automation, PLC programming, South Africa.`,
      google_ad: `Write Google Ads copy for T.M Engineering (industrial automation company, Johannesburg, South Africa). Topic: "${topic}". ${additionalContext}. Include: 3 headlines (max 30 chars each), 2 descriptions (max 90 chars each), display URL suggestion, and 5 keyword suggestions.`,
      email_template: `Write a professional marketing email for T.M Engineering (industrial automation company, Johannesburg, South Africa). Topic: "${topic}". ${additionalContext}. Include subject line, preview text, email body with clear CTA.`,
      project_summary: `Write a professional project summary/case study for T.M Engineering (industrial automation company, Johannesburg, South Africa). Project: "${topic}". ${additionalContext}. Include: overview, challenge, solution, results, technologies used.`,
      caption: `Write 3 different social media captions for T.M Engineering (industrial automation company, Johannesburg, South Africa). Topic: "${topic}". ${additionalContext}. Include hashtags. Keep each under 150 words.`,
    };

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: prompts[contentType],
    });
    setResult(response);
    setGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({ title: 'Copied to clipboard!' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Content Generator</h1>
        <p className="text-sm text-muted-foreground">Generate professional marketing content with AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> Generate Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Content Type</Label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger className="mt-1.5 bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {contentTypes.map(ct => (
                    <SelectItem key={ct.value} value={ct.value}>{ct.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Topic / Subject *</Label>
              <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., New PLC retrofit project completed" className="mt-1.5 bg-secondary border-border" />
            </div>
            <div>
              <Label>Additional Context</Label>
              <Textarea value={additionalContext} onChange={e => setAdditionalContext(e.target.value)} placeholder="Any additional details, keywords, or preferences..." rows={4} className="mt-1.5 bg-secondary border-border" />
            </div>
            <Button onClick={generate} disabled={generating} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11">
              <Sparkles className="w-4 h-4 mr-2" />
              {generating ? 'Generating...' : 'Generate Content'}
            </Button>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Generated Content</CardTitle>
            {result && (
              <Button size="sm" variant="outline" onClick={copyToClipboard} className="text-xs">
                <Copy className="w-3 h-3 mr-1" /> Copy
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="prose prose-sm prose-invert max-w-none p-4 rounded-lg bg-secondary/50 max-h-[500px] overflow-y-auto">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Generated content will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Templates */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Quick Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { type: 'linkedin_post', topic: 'Recent PLC retrofit project completion' },
              { type: 'blog_article', topic: 'Benefits of SCADA systems for South African manufacturers' },
              { type: 'google_ad', topic: 'Industrial automation services Johannesburg' },
              { type: 'email_template', topic: 'Introducing our 24/7 breakdown support service' },
              { type: 'caption', topic: 'New MCC panel installation at a food processing plant' },
              { type: 'project_summary', topic: 'Conveyor system automation for a mining client' },
            ].map((t, i) => (
              <button key={i} onClick={() => { setContentType(t.type); setTopic(t.topic); }}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary text-left transition-colors border border-transparent hover:border-border">
                <div className="text-xs text-primary font-semibold mb-1">{contentTypes.find(c => c.value === t.type)?.label}</div>
                <div className="text-xs text-muted-foreground">{t.topic}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}