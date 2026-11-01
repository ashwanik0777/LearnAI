'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@learnai.example");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-gradient-to-tr from-amber-500 to-amber-400 rounded-2xl shadow-xl shadow-amber-500/10 text-slate-950 mb-3 font-bold">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">LearnAI Admin Portal</h1>
          <p className="text-xs text-slate-400 mt-1">Authorized personnel and faculty only</p>
        </div>

        <Card className="bg-slate-900/80 border-slate-800 text-slate-100 shadow-2xl backdrop-blur-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-lg font-bold text-white text-center">Administrator Sign In</CardTitle>
            <CardDescription className="text-xs text-slate-400 text-center">
              Enter your elevated credentials to access the control panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300">Staff Email or ID</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-slate-950/70 border-slate-800 text-white placeholder:text-slate-600 focus:border-amber-400"
                    placeholder="admin@learnai.example"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs text-slate-300">Password</Label>
                  <span className="text-[11px] text-amber-400/80 hover:underline cursor-pointer">Security Key?</span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 bg-slate-950/70 border-slate-800 text-white placeholder:text-slate-600 focus:border-amber-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/10 mt-2"
              >
                {loading ? "Authenticating..." : "Access Control Center"}
                {!loading && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
              <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
                ← Return to Student Website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
