/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
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

import axios from "axios";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/users/forgotpassword", { email });
      toast.success(res.data?.message || "Reset link sent to your email.");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md sm:max-w-sm">
        <Card className="shadow-xl border border-border bg-background">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">
              Forgot Password
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;