import React from 'react';
import { Shield, Mail, Lock, LogIn, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAppContext } from '@/context/AppContext';

const AdminLogin: React.FC = () => {
  const { adminLogin } = useAppContext();
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = adminLogin(formData.email, formData.password);
    
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative">
              <Mountain className="h-10 w-10 text-monastery-gold drop-shadow" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-monastery-gold rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-widest drop-shadow">MONASTERY360</h1>
              <p className="text-xs text-monastery-gold/80">Government of Sikkim</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow">Admin Access</h2>
          <p className="text-lg text-gray-300">
            Secure portal for monastery management
          </p>
        </div>

        {/* Login Card */}
        <Card className="monastery-card bg-black/60 backdrop-blur-lg border-none shadow-2xl rounded-2xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-monastery-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="h-8 w-8 text-black" />
            </div>
            <CardTitle className="text-2xl text-white drop-shadow">
              Administrator Login
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription className="text-white">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-white">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder="admin@sikkim.gov.in"
                  className="focus-meditation bg-black/40 text-white border-monastery-gold"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-white">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  placeholder="••••••••••"
                  className="focus-meditation bg-black/40 text-white border-monastery-gold"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-monastery-gold text-black font-semibold rounded-full shadow-lg hover:bg-yellow-400 border-2 border-monastery-gold"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-black/80 rounded-xl border border-monastery-gold/30">
              <p className="text-xs text-gray-300 text-center mb-2">
                Demo Credentials:
              </p>
              <div className="text-xs text-center space-y-1 text-white">
                <div>
                  <strong>Email:</strong> admin@sikkim.gov.in
                </div>
                <div>
                  <strong>Password:</strong> monastery360
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            This is a secure government portal. All access is logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;