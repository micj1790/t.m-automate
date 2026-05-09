import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await base44.auth.resetPasswordRequest(email); } catch {}
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-bold text-foreground">T.M Engineering</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
          <p className="text-sm text-muted-foreground mt-1">We'll send you a link to reset your password</p>
        </div>
        <div className="p-6 rounded-xl bg-card border border-border">
          {sent ? (
            <div className="text-center py-4">
              <Mail className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="text-sm text-foreground font-medium mb-1">Check your email</p>
              <p className="text-xs text-muted-foreground">If an account exists, we've sent a reset link.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.co.za" className="mt-1.5 bg-secondary border-border" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          )}
          <p className="text-center text-xs text-muted-foreground mt-4">
            <Link to="/login" className="text-primary hover:underline flex items-center justify-center gap-1"><ArrowLeft className="w-3 h-3" /> Back to Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}