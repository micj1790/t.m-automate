import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, FileText, Share2 } from 'lucide-react';

const COLORS = ['#0ea5e9', '#f97316', '#8b5cf6', '#22c55e', '#ef4444', '#eab308'];

export default function Analytics() {
  const { data: leads = [] } = useQuery({ queryKey: ['admin-leads'], queryFn: () => base44.entities.Lead.list('-created_date') });
  const { data: posts = [] } = useQuery({ queryKey: ['admin-posts'], queryFn: () => base44.entities.BlogPost.list('-created_date') });
  const { data: socialPosts = [] } = useQuery({ queryKey: ['admin-social'], queryFn: () => base44.entities.SocialPost.list('-created_date') });

  // Lead status distribution
  const statusCounts = leads.reduce((acc, l) => { acc[l.status] = (acc[l.status] || 0) + 1; return acc; }, {});
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  // Lead source distribution
  const sourceCounts = leads.reduce((acc, l) => { acc[l.source || 'website'] = (acc[l.source || 'website'] || 0) + 1; return acc; }, {});
  const sourceData = Object.entries(sourceCounts).map(([name, value]) => ({ name, value }));

  // Leads over time (by month)
  const monthlyLeads = leads.reduce((acc, l) => {
    if (!l.created_date) return acc;
    const month = l.created_date.substring(0, 7);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  const monthlyData = Object.entries(monthlyLeads).sort().slice(-6).map(([month, count]) => ({ month, leads: count }));

  const conversionRate = leads.length > 0 ? ((leads.filter(l => l.status === 'won').length / leads.length) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Track your marketing and lead performance.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Leads', value: leads.length, color: 'text-primary' },
          { icon: TrendingUp, label: 'Conversion Rate', value: `${conversionRate}%`, color: 'text-green-400' },
          { icon: FileText, label: 'Blog Posts', value: posts.length, color: 'text-accent' },
          { icon: Share2, label: 'Social Posts', value: socialPosts.length, color: 'text-purple-400' },
        ].map((s, i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads Over Time */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base">Leads Over Time</CardTitle></CardHeader>
          <CardContent>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 16%)" />
                  <XAxis dataKey="month" stroke="hsl(215 15% 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
                  <Tooltip contentStyle={{ background: 'hsl(220 18% 7%)', border: '1px solid hsl(220 14% 16%)', borderRadius: '8px', color: 'hsl(210 20% 95%)' }} />
                  <Line type="monotone" dataKey="leads" stroke="hsl(199 89% 48%)" strokeWidth={2} dot={{ fill: 'hsl(199 89% 48%)' }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center py-16 text-muted-foreground text-sm">No lead data yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Lead Status */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base">Lead Status Distribution</CardTitle></CardHeader>
          <CardContent>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'hsl(220 18% 7%)', border: '1px solid hsl(220 14% 16%)', borderRadius: '8px', color: 'hsl(210 20% 95%)' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center py-16 text-muted-foreground text-sm">No lead data yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base">Lead Sources</CardTitle></CardHeader>
          <CardContent>
            {sourceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sourceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 16%)" />
                  <XAxis dataKey="name" stroke="hsl(215 15% 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
                  <Tooltip contentStyle={{ background: 'hsl(220 18% 7%)', border: '1px solid hsl(220 14% 16%)', borderRadius: '8px', color: 'hsl(210 20% 95%)' }} />
                  <Bar dataKey="value" fill="hsl(24 95% 53%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center py-16 text-muted-foreground text-sm">No lead data yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Content Stats */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base">Content Overview</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-sm text-foreground">Published Blog Posts</span>
              <span className="text-sm font-bold text-foreground">{posts.filter(p => p.status === 'published').length}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-sm text-foreground">Draft Blog Posts</span>
              <span className="text-sm font-bold text-foreground">{posts.filter(p => p.status === 'draft').length}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-sm text-foreground">Published Social Posts</span>
              <span className="text-sm font-bold text-foreground">{socialPosts.filter(p => p.status === 'published').length}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-sm text-foreground">Scheduled Social Posts</span>
              <span className="text-sm font-bold text-foreground">{socialPosts.filter(p => p.status === 'scheduled').length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}