import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Zap, LayoutDashboard, Users, Briefcase, FileText, Share2, BarChart3, Sparkles, Menu, X, LogOut, Globe, ChevronRight, Cpu } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Leads & CRM', path: '/admin/leads' },
  { icon: Briefcase, label: 'Projects', path: '/admin/projects' },
  { icon: FileText, label: 'Blog', path: '/admin/blog' },
  { icon: Share2, label: 'Social Media', path: '/admin/social' },
  { icon: Sparkles, label: 'AI Content', path: '/admin/ai-content' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-60 bg-card border-r border-border flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-xs font-black text-foreground tracking-wide">T.M Engineering</div>
              <div className="text-[9px] text-muted-foreground uppercase tracking-widest">Admin Panel</div>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive(item.path)
                  ? 'bg-primary/10 text-primary border border-primary/15'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
              }`}>
              <item.icon className="w-4 h-4" />
              {item.label}
              {isActive(item.path) && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border space-y-0.5">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all">
            <Globe className="w-4 h-4" /> View Website
          </Link>
          <button onClick={() => base44.auth.logout('/')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-all w-full">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border h-12 flex items-center px-4 gap-3">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <Menu className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span>T.M Engineering Admin</span>
            <span className="mx-1">/</span>
            <span className="text-foreground font-medium capitalize">{location.pathname.split('/').pop() || 'Dashboard'}</span>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}