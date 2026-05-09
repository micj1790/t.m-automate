import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Eye, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const categories = [
  { value: 'automation', label: 'Automation' },
  { value: 'plc', label: 'PLC' },
  { value: 'industry_news', label: 'Industry News' },
  { value: 'case_study', label: 'Case Study' },
  { value: 'tips', label: 'Tips & Guides' },
  { value: 'company_news', label: 'Company News' },
];

const emptyPost = { title: '', excerpt: '', content: '', category: 'automation', status: 'draft', author: 'T.M Engineering', seo_title: '', seo_description: '' };

export default function BlogAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyPost);
  const [editingId, setEditingId] = useState(null);
  const [generating, setGenerating] = useState(false);

  const { data: posts = [] } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: () => base44.entities.BlogPost.list('-created_date'),
  });

  const createMutation = useMutation({
    mutationFn: data => base44.entities.BlogPost.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-posts'] }); setDialogOpen(false); setForm(emptyPost); toast({ title: 'Post created!' }); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.BlogPost.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-posts'] }); setDialogOpen(false); setForm(emptyPost); setEditingId(null); toast({ title: 'Post updated!' }); },
  });

  const deleteMutation = useMutation({
    mutationFn: id => base44.entities.BlogPost.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-posts'] }); toast({ title: 'Post deleted.' }); },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) updateMutation.mutate({ id: editingId, data: form });
    else createMutation.mutate(form);
  };

  const handleEdit = (post) => {
    setForm({ title: post.title || '', excerpt: post.excerpt || '', content: post.content || '', category: post.category || 'automation', status: post.status || 'draft', author: post.author || 'T.M Engineering', seo_title: post.seo_title || '', seo_description: post.seo_description || '' });
    setEditingId(post.id);
    setDialogOpen(true);
  };

  const generateWithAI = async () => {
    if (!form.title) { toast({ title: 'Enter a title first', variant: 'destructive' }); return; }
    setGenerating(true);
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Write a professional blog post for T.M Engineering, an industrial automation company based in Johannesburg, South Africa. Topic: "${form.title}". Include SEO keywords: industrial automation, PLC programming, South Africa. Write in markdown format. Return a JSON object with: excerpt (1-2 sentences), content (full article ~500 words in markdown), seo_title, seo_description.`,
      response_json_schema: {
        type: 'object',
        properties: {
          excerpt: { type: 'string' },
          content: { type: 'string' },
          seo_title: { type: 'string' },
          seo_description: { type: 'string' },
        }
      }
    });
    setForm(prev => ({ ...prev, ...result }));
    setGenerating(false);
    toast({ title: 'Blog content generated!' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blog</h1>
          <p className="text-sm text-muted-foreground">Create and manage blog posts.</p>
        </div>
        <Button onClick={() => { setForm(emptyPost); setEditingId(null); setDialogOpen(true); }} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No blog posts yet. Create your first post with AI assistance.</div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <Card key={post.id} className="bg-card border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">{post.title}</span>
                    <Badge variant="outline" className={post.status === 'published' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}>
                      {post.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => handleEdit(post)}>
                    <Pencil className="w-3 h-3 mr-1" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs text-destructive" onClick={() => deleteMutation.mutate(post.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl bg-card border-border max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Post' : 'New Post'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="mt-1 bg-secondary border-border" />
            </div>
            <Button type="button" variant="outline" onClick={generateWithAI} disabled={generating} className="w-full border-primary/30 text-primary hover:bg-primary/10">
              <Sparkles className="w-4 h-4 mr-2" /> {generating ? 'Generating...' : 'Generate Content with AI'}
            </Button>
            <div>
              <Label>Excerpt</Label>
              <Textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="mt-1 bg-secondary border-border" rows={2} />
            </div>
            <div>
              <Label>Content (Markdown)</Label>
              <Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="mt-1 bg-secondary border-border font-mono text-sm" rows={12} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                  <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                  <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>SEO Title</Label>
              <Input value={form.seo_title} onChange={e => setForm({ ...form, seo_title: e.target.value })} className="mt-1 bg-secondary border-border" />
            </div>
            <div>
              <Label>SEO Description</Label>
              <Textarea value={form.seo_description} onChange={e => setForm({ ...form, seo_description: e.target.value })} className="mt-1 bg-secondary border-border" rows={2} />
            </div>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {editingId ? 'Update Post' : 'Create Post'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}