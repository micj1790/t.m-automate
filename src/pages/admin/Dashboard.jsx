import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Users, FileText, Briefcase, TrendingUp, ArrowUpRight, Clock, Target, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

function StatCard({ icon: Icon, label, value, change, color }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-black text-foreground mt-1">{value}</p>
            {change && <p className="text-xs text-green-400 flex items-center gap-0.5 mt-1"><ArrowUpRight className="w-3 h-3" />{change}</p>}
          </div>
          <div className={`w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const statusColors = {
  new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  contacted: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  qualified: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  quoted: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  won: 'bg-green-500/10 text-green-400 border-green-500/20',
  lost: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function Dashboard() {
  const { data: leads = [] } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: () => base44.entities.Lead.list('-created_date', 50),
  });

  const { data: projects = [] } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => base44.entities.Project.list('-created_date', 50),
  });

  const { data: posts = [] } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: () => base44.entities.BlogPost.list('-created_date', 50),
  });

  const newLeads = leads.filter(l => l.status === 'new').length;
  const quotedLeads = leads.filter(l => l.status === 'quoted').length;
  const wonLeads = leads.filter(l => l.status === 'won').length;
  const totalQuoteValue = leads.filter(l => l.quote_value).reduce((sum, l) => sum + (l.quote_value || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back. Here's an overview of your business.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="New Leads" value={newLeads} change="+12% this month" />
        <StatCard icon={Target} label="Open Quotes" value={quotedLeads} />
        <StatCard icon={TrendingUp} label="Jobs Won" value={wonLeads} />
        <StatCard icon={DollarSign} label="Pipeline Value" value={`R${(totalQuoteValue / 1000).toFixed(0)}k`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            {leads.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">No leads yet. They will appear here when visitors submit forms.</p>
            ) : (
              <div className="space-y-3">
                {leads.slice(0, 5).map(lead => (
                  <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{lead.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{lead.company || lead.email}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-[10px] ${statusColors[lead.status] || ''}`}>
                        {lead.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Quick Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Total Projects</span>
              </div>
              <span className="text-sm font-bold text-foreground">{projects.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Blog Posts</span>
              </div>
              <span className="text-sm font-bold text-foreground">{posts.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Total Leads</span>
              </div>
              <span className="text-sm font-bold text-foreground">{leads.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm text-foreground">Follow-ups Due</span>
              </div>
              <span className="text-sm font-bold text-accent">{leads.filter(l => l.follow_up_date && new Date(l.follow_up_date) <= new Date()).length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}