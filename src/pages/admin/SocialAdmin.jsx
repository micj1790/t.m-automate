import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Sparkles, Trash2, Pencil, Linkedin, Hash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const emptyPost = { content: '', platform: 'linkedin', hashtags: '', status: 'draft', post_type: 'company_update' };

export default function SocialAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyPost);
  const [editingId, setEditingId] = useState(null);
  const [generating, setGenerating] = useState(false);

  const { data: posts = [] } = useQuery({
    queryKey: ['admin-social'],
    queryFn: () => base44.entities.SocialPost.list('-created_date'),
  });

  const createMutation = useMutation({
    mutationFn: data => base44.entities.SocialPost.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-social'] }); setDialogOpen(false); setForm(emptyPost); toast({ title: 'Post created!' }); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.SocialPost.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-social'] }); setDialogOpen(false); setForm(emptyPost); setEditingId(null); toast({ title: 'Post updated!' }); },
  });

  const deleteMutation = useMutation({
    mutationFn: id => base44.entities.SocialPost.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-social'] }); toast({ title: 'Post deleted.' }); },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) updateMutation.mutate({ id: editingId, data: form });
    else createMutation.mutate(form);
  };

  const handleEdit = (post) => {
    setForm({ content: post.content || '', platform: post.platform || 'linkedin', hashtags: post.hashtags || '', status: post.status || 'draft', post_type: post.post_type || 'company_update' });
    setEditingId(post.id);
    setDialogOpen(true);
  };

  const generateWithAI = async () => {
    setGenerating(true);
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Generate a professional LinkedIn post for T.M Engineering, an industrial automation company in Johannesburg, South Africa. Post type: ${form.post_type}. The post should be engaging, professional, and include a call to action. Also generate relevant hashtags. Return JSON with: content (the post text), hashtags (string of hashtags).`,
      response_json_schema: {
        type: 'object',
        properties: {
          content: { type: 'string' },
          hashtags: { type: 'string' },
        }
      }
    });
    setForm(prev => ({ ...prev, content: result.content, hashtags: result.hashtags }));
    setGenerating(false);
    toast({ title: 'Post generated!' });
  };

  const platformIcons = { linkedin: Linkedin };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Social Media</h1>
          <p className="text-sm text-muted-foreground">Create and manage social media posts with AI.</p>
        </div>
        <Button onClick={() => { setForm(emptyPost); setEditingId(null); setDialogOpen(true); }} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No social posts yet. Create your first post with AI assistance.</div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <Card key={post.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-[10px]">{post.platform}</Badge>
                      <Badge variant="outline" className={post.status === 'published' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}>{post.status}</Badge>
                    </div>
                    <p className="text-sm text-foreground line-clamp-3">{post.content}</p>
                    {post.hashtags && <p className="text-xs text-primary mt-2">{post.hashtags}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => handleEdit(post)}><Pencil className="w-3 h-3" /></Button>
                    <Button size="sm" variant="outline" className="text-xs text-destructive" onClick={() => deleteMutation.mutate(post.id)}><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Post' : 'New Social Post'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Platform</Label>
                <Select value={form.platform} onValueChange={v => setForm({ ...form, platform: v })}>
                  <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Post Type</Label>
                <Select value={form.post_type} onValueChange={v => setForm({ ...form, post_type: v })}>
                  <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project_showcase">Project Showcase</SelectItem>
                    <SelectItem value="industry_insight">Industry Insight</SelectItem>
                    <SelectItem value="company_update">Company Update</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="button" variant="outline" onClick={generateWithAI} disabled={generating} className="w-full border-primary/30 text-primary hover:bg-primary/10">
              <Sparkles className="w-4 h-4 mr-2" /> {generating ? 'Generating...' : 'Generate with AI'}
            </Button>
            <div>
              <Label>Content *</Label>
              <Textarea required value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="mt-1 bg-secondary border-border" rows={6} />
            </div>
            <div>
              <Label>Hashtags</Label>
              <Input value={form.hashtags} onChange={e => setForm({ ...form, hashtags: e.target.value })} className="mt-1 bg-secondary border-border" placeholder="#IndustrialAutomation #SouthAfrica" />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
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