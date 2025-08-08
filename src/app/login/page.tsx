/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!isEmailValid(user.email)) {
      toast.error("Invalid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successful!");
      router.push(`/profile`);
    } catch (err: any) {
      const message = err?.response?.data?.error || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isComplete = user.email.length > 0 && user.password.length > 0;
    setButtonDisabled(!isComplete);
  }, [user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-10">
      <form
        onSubmit={onLogin}
        className="w-full max-w-md sm:max-w-sm md:max-w-sm"
      >
        <Card className="shadow-xl border border-border bg-background">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Login to Your Account
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="••••••••"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
              {/* Forgot Password Link */}
              <div className="text-right text-sm">
                <Link
                  href="/forgotpassword"
                  className="text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3">
            <Button
              className="w-full"
              type="submit"
              disabled={buttonDisabled || loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Link href="/signup" className="w-full">
              <Button className="w-full" type="button" variant="outline">
                Visit Sign Up
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default LoginPage;
