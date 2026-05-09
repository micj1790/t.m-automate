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
import { Plus, Pencil, Trash2, Image } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const industries = [
  { value: 'food_beverage', label: 'Food & Beverage' },
  { value: 'mining', label: 'Mining' },
  { value: 'pharmaceutical', label: 'Pharmaceutical' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'data_centres', label: 'Data Centres' },
  { value: 'industrial_processing', label: 'Industrial Processing' },
];

const emptyProject = { title: '', description: '', client: '', industry: '', service_type: '', location: '', year: new Date().getFullYear(), featured: false, case_study: '', results: '', status: 'completed' };

export default function ProjectsAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);

  const { data: projects = [] } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => base44.entities.Project.list('-created_date'),
  });

  const createMutation = useMutation({
    mutationFn: data => base44.entities.Project.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-projects'] }); setDialogOpen(false); setForm(emptyProject); toast({ title: 'Project created!' }); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Project.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-projects'] }); setDialogOpen(false); setForm(emptyProject); setEditingId(null); toast({ title: 'Project updated!' }); },
  });

  const deleteMutation = useMutation({
    mutationFn: id => base44.entities.Project.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-projects'] }); toast({ title: 'Project deleted.' }); },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) updateMutation.mutate({ id: editingId, data: form });
    else createMutation.mutate(form);
  };

  const handleEdit = (project) => {
    setForm({ title: project.title || '', description: project.description || '', client: project.client || '', industry: project.industry || '', service_type: project.service_type || '', location: project.location || '', year: project.year || new Date().getFullYear(), featured: project.featured || false, case_study: project.case_study || '', results: project.results || '', status: project.status || 'completed' });
    setEditingId(project.id);
    setDialogOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(prev => ({ ...prev, image_urls: [...(prev.image_urls || []), file_url] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage your project portfolio.</p>
        </div>
        <Button onClick={() => { setForm(emptyProject); setEditingId(null); setDialogOpen(true); }} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No projects yet. Add your first project to showcase on the website.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <Card key={p.id} className="bg-card border-border">
              <CardContent className="p-4">
                {p.image_urls?.[0] && <img src={p.image_urls[0]} alt={p.title} className="w-full h-36 object-cover rounded-lg mb-3" />}
                <h3 className="text-sm font-bold text-foreground mb-1">{p.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => handleEdit(p)}>
                    <Pencil className="w-3 h-3 mr-1" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => deleteMutation.mutate(p.id)}>
                    <Trash2 className="w-3 h-3 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg bg-card border-border max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Project' : 'Add Project'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="mt-1 bg-secondary border-border" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1 bg-secondary border-border" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Client</Label>
                <Input value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label>Industry</Label>
                <Select value={form.industry} onValueChange={v => setForm({ ...form, industry: v })}>
                  <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {industries.map(i => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Service Type</Label>
                <Input value={form.service_type} onChange={e => setForm({ ...form, service_type: e.target.value })} className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label>Year</Label>
                <Input type="number" value={form.year} onChange={e => setForm({ ...form, year: parseInt(e.target.value) })} className="mt-1 bg-secondary border-border" />
              </div>
            </div>
            <div>
              <Label>Upload Image</Label>
              <Input type="file" accept="image/*" onChange={handleFileUpload} className="mt-1 bg-secondary border-border" />
            </div>
            <div>
              <Label>Case Study</Label>
              <Textarea value={form.case_study} onChange={e => setForm({ ...form, case_study: e.target.value })} className="mt-1 bg-secondary border-border" rows={3} placeholder="Detailed case study..." />
            </div>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {editingId ? 'Update Project' : 'Create Project'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}