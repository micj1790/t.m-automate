import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      setShowOtp(true);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await base44.auth.verifyOtp({ email, otpCode: otp });
      base44.auth.setToken(res.access_token);
      window.location.href = '/admin';
    } catch (err) {
      setError(err.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    base44.auth.loginWithProvider('google', '/admin');
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
          <h1 className="text-2xl font-bold text-foreground">{showOtp ? 'Verify Email' : 'Create Account'}</h1>
          <p className="text-sm text-muted-foreground mt-1">{showOtp ? 'Enter the code sent to your email' : 'Register for admin access'}</p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border">
          {error && <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">{error}</div>}

          {showOtp ? (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <Label>Verification Code</Label>
                <Input required value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter 6-digit code" className="mt-1.5 bg-secondary border-border text-center text-lg tracking-widest" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11">
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </Button>
              <button type="button" onClick={async () => { await base44.auth.resendOtp(email); }} className="w-full text-xs text-primary hover:underline">
                Resend Code
              </button>
            </form>
          ) : (
            <>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.co.za" className="pl-10 bg-secondary border-border" />
                  </div>
                </div>
                <div>
                  <Label>Password</Label>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 bg-secondary border-border" />
                  </div>
                </div>
                <div>
                  <Label>Confirm Password</Label>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type={showPassword ? 'text' : 'password'} required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="pl-10 pr-10 bg-secondary border-border" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11">
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center"><span className="px-3 bg-card text-xs text-muted-foreground">or</span></div>
              </div>
              <Button variant="outline" onClick={handleGoogleLogin} className="w-full border-border hover:bg-secondary font-medium h-11">
                Continue with Google
              </Button>
            </>
          )}

          <p className="text-center text-xs text-muted-foreground mt-4">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}