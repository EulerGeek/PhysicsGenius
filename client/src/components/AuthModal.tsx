import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (user: { username: string; email: string; }) => void;
}

export default function AuthModal({ isOpen, onClose, onSignIn }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Simulate successful authentication
    onSignIn({
      username: formData.username || formData.email.split('@')[0],
      email: formData.email
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white dark:bg-gray-900">
        <CardContent className="p-0">
          <div className="gradient-primary p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {isSignUp ? "Join QUOMA" : "Welcome Back"}
                </h2>
                <p className="text-blue-100">
                  {isSignUp ? "Start your physics journey" : "Continue learning physics"}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <i className="fas fa-times"></i>
              </Button>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <i className="fas fa-gift text-xs mr-1"></i>
              100% FREE Forever
            </Badge>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    placeholder="Choose a username"
                    className="mt-1"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1"
                  required
                />
              </div>
              
              {isSignUp && (
                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Confirm your password"
                    className="mt-1"
                    required
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {isSignUp ? "Create Account" : "Sign In"}
                <i className="fas fa-arrow-right text-xs ml-2"></i>
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
              </p>
              <Button
                variant="ghost"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-700 p-0 h-auto"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </Button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">15+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Lessons per Topic</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">∞</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Practice Questions</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}