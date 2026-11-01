'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Profile } from "@/lib/db/schema";
import { UserContextType, LoginCredentials, RegisterData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext<UserContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUser(data);
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.fullName}!`,
      });

      if (data.role === "admin" || data.role === "subadmin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err.message || "Invalid credentials. Please try again.",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const userData = await res.json();

      if (!res.ok) {
        throw new Error(userData.message || "Registration failed");
      }

      setUser(userData);
      toast({
        title: "Registration successful",
        description: `Welcome to LearnAI, ${userData.fullName}!`,
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed");
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: err.message || "Could not register. Please try again.",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      router.push("/login");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: err.message,
      });
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message || "Failed to update profile");
      toast({
        title: "Profile updated",
        description: "Your academic profile has been saved.",
      });
      return updated;
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: err.message,
      });
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
