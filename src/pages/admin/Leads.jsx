import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Filter, Mail, Phone, Building2, Calendar, StickyNote, X } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

const statusColors = {
  new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  contacted: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  qualified: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  quoted: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  won: 'bg-green-500/10 text-green-400 border-green-500/20',
  lost: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function Leads() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: () => base44.entities.Lead.list('-created_date'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Lead.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
      toast({ title: 'Lead updated!' });
    },
  });

  const filtered = leads.filter(l => {
    const matchSearch = !search || l.name?.toLowerCase().includes(search.toLowerCase()) || l.email?.toLowerCase().includes(search.toLowerCase()) || l.company?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads & CRM</h1>
          <p className="text-sm text-muted-foreground">Manage your enquiries and track conversions.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-secondary border-border" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-secondary border-border"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="quoted">Quoted</SelectItem>
            <SelectItem value="won">Won</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">Loading leads...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            {leads.length === 0 ? 'No leads yet. They will appear here when visitors submit enquiry forms on the website.' : 'No leads match your filters.'}
          </div>
        ) : (
          filtered.map(lead => (
            <motion.div key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="bg-card border-border hover:border-primary/20 transition-all cursor-pointer" onClick={() => setSelectedLead(lead)}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">{lead.name}</span>
                        <Badge variant="outline" className={`text-[10px] ${statusColors[lead.status] || ''}`}>{lead.status}</Badge>
                        {lead.type && <Badge variant="outline" className="text-[10px]">{lead.type?.replace('_', ' ')}</Badge>}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        {lead.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</span>}
                        {lead.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>}
                        {lead.company && <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{lead.company}</span>}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lead.created_date && format(new Date(lead.created_date), 'MMM d, yyyy')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={open => !open && setSelectedLead(null)}>
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-lg">{selectedLead?.name}</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{selectedLead.email}</span></div>
                <div><span className="text-muted-foreground">Phone:</span> <span className="text-foreground">{selectedLead.phone || '-'}</span></div>
                <div><span className="text-muted-foreground">Company:</span> <span className="text-foreground">{selectedLead.company || '-'}</span></div>
                <div><span className="text-muted-foreground">Industry:</span> <span className="text-foreground">{selectedLead.industry || '-'}</span></div>
                <div><span className="text-muted-foreground">Service:</span> <span className="text-foreground">{selectedLead.service_interest || '-'}</span></div>
                <div><span className="text-muted-foreground">Source:</span> <span className="text-foreground">{selectedLead.source}</span></div>
              </div>
              {selectedLead.message && (
                <div>
                  <span className="text-xs text-muted-foreground">Message:</span>
                  <p className="text-sm text-foreground mt-1 p-3 rounded-lg bg-secondary">{selectedLead.message}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Status</Label>
                  <Select value={selectedLead.status} onValueChange={v => { setSelectedLead({ ...selectedLead, status: v }); updateMutation.mutate({ id: selectedLead.id, data: { status: v } }); }}>
                    <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['new', 'contacted', 'qualified', 'quoted', 'won', 'lost'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Quote Value (ZAR)</Label>
                  <Input type="number" value={selectedLead.quote_value || ''} onChange={e => setSelectedLead({ ...selectedLead, quote_value: parseFloat(e.target.value) })}
                    onBlur={() => updateMutation.mutate({ id: selectedLead.id, data: { quote_value: selectedLead.quote_value } })}
                    className="mt-1 bg-secondary border-border" placeholder="0" />
                </div>
              </div>
              <div>
                <Label className="text-xs">Notes</Label>
                <Textarea value={selectedLead.notes || ''} onChange={e => setSelectedLead({ ...selectedLead, notes: e.target.value })}
                  onBlur={() => updateMutation.mutate({ id: selectedLead.id, data: { notes: selectedLead.notes } })}
                  className="mt-1 bg-secondary border-border" rows={3} placeholder="Add internal notes..." />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}