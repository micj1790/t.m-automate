import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Users, FileText, Briefcase, TrendingUp, ArrowUpRight, Clock, Target, DollarSign, Globe, Share2, Sparkles, ArrowRight, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';

function StatCard({ icon: Icon, label, value, change, accent }) {
  return (
    <Card className="bg-card border-border overflow-hidden relative">
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full ${accent || 'bg-primary/5'} blur-2xl`} />
      <CardContent className="p-5 relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">{label}</p>
            <p className="text-3xl font-display text-foreground">{value}</p>
            {change && <p className="text-xs text-green-400 flex items-center gap-0.5 mt-1"><ArrowUpRight className="w-3 h-3" />{change}</p>}
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
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

const quickActions = [
  { label: 'View Website', icon: Globe, path: '/', color: 'text-primary' },
  { label: 'New Blog Post', icon: FileText, path: '/admin/blog', color: 'text-accent' },
  { label: 'Generate Content', icon: Sparkles, path: '/admin/ai-content', color: 'text-purple-400' },
  { label: 'Social Media', icon: Share2, path: '/admin/social', color: 'text-blue-400' },
];

export default function Dashboard() {
  const { data: leads = [] } = useQuery({ queryKey: ['admin-leads'], queryFn: () => base44.entities.Lead.list('-created_date', 50) });
  const { data: projects = [] } = useQuery({ queryKey: ['admin-projects'], queryFn: () => base44.entities.Project.list('-created_date', 50) });
  const { data: posts = [] } = useQuery({ queryKey: ['admin-posts'], queryFn: () => base44.entities.BlogPost.list('-created_date', 50) });

  const newLeads = leads.filter(l => l.status === 'new').length;
  const wonLeads = leads.filter(l => l.status === 'won').length;
  const quotedLeads = leads.filter(l => l.status === 'quoted').length;
  const pipeline = leads.filter(l => l.quote_value).reduce((s, l) => s + (l.quote_value || 0), 0);
  const dueTodayLeads = leads.filter(l => l.follow_up_date && new Date(l.follow_up_date) <= new Date()).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back to the T.M Engineering command centre.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-400 font-medium">System Online</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="New Leads" value={newLeads} change="Awaiting action" accent="bg-blue-500/5" />
        <StatCard icon={Target} label="Open Quotes" value={quotedLeads} accent="bg-orange-500/5" />
        <StatCard icon={TrendingUp} label="Jobs Won" value={wonLeads} accent="bg-green-500/5" />
        <StatCard icon={DollarSign} label="Pipeline Value" value={`R${(pipeline / 1000).toFixed(0)}k`} accent="bg-purple-500/5" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((a, i) => (
          <Link key={i} to={a.path}>
            <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/25 transition-all flex items-center gap-3 group">
              <a.icon className={`w-4 h-4 ${a.color}`} />
              <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{a.label}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground/40 ml-auto group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Leads */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-bold">Recent Leads</CardTitle>
              <Link to="/admin/leads" className="text-xs text-primary hover:underline">View all →</Link>
            </CardHeader>
            <CardContent>
              {leads.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  <Users className="w-10 h-10 mx-auto mb-3 opacity-20" />
                  <p className="text-sm">No leads yet. They'll appear here when visitors submit forms on the website.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {leads.slice(0, 6).map(lead => (
                    <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 hover:bg-secondary transition-colors">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {lead.name?.charAt(0) || '?'}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-foreground truncate">{lead.name}</div>
                          <div className="text-[10px] text-muted-foreground truncate">{lead.company || lead.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <Badge variant="outline" className={`text-[9px] ${statusColors[lead.status] || ''}`}>{lead.status}</Badge>
                        {lead.created_date && <span className="text-[10px] text-muted-foreground hidden sm:block">{formatDistanceToNow(new Date(lead.created_date), { addSuffix: true })}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Overview */}
        <div>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Platform Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Total Projects', value: projects.length, icon: Briefcase, color: 'text-primary' },
                { label: 'Published Posts', value: posts.filter(p => p.status === 'published').length, icon: FileText, color: 'text-accent' },
                { label: 'Draft Posts', value: posts.filter(p => p.status === 'draft').length, icon: FileText, color: 'text-muted-foreground' },
                { label: 'Total Leads', value: leads.length, icon: Users, color: 'text-blue-400' },
                { label: 'Follow-ups Due', value: dueTodayLeads, icon: Clock, color: dueTodayLeads > 0 ? 'text-red-400' : 'text-green-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/40">
                  <div className="flex items-center gap-2.5">
                    <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Emergency contacts */}
          <Card className="bg-card border-border mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Quick Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a href="tel:+27117911562" className="flex items-center gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/15 hover:bg-primary/10 transition-colors">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-foreground">011 791 1562</span>
              </a>
              <a href="mailto:sales@tmeng.co.za" className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">sales@tmeng.co.za</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}