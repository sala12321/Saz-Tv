
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from 'lucide-react';

// Note: This is a simple authentication setup for demo purposes
// In a real application, you would use a more secure authentication system
const ADMIN_PASSWORD = "admin123"; // This would be stored securely in a real app

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('adminAuth', 'true');
        onLogin();
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Incorrect password. Please try again.",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-sports-dark flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-sports-blue p-3 rounded-full mb-4">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">Enter your password to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-gray-700"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-sports-blue hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
