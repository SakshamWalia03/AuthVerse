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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const SignUpPage = () => {
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();

  // Email validation
  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onSignUp = async () => {
    if (!isEmailValid(user.email)) {
      toast.error("Invalid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/users/signup", user);
      toast.success("Sign up successful!");
      router.push("/login");
    } catch (err: any) {
      const message = err?.response?.data?.error || "Sign up failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isComplete =
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0;

    setButtonDisabled(!isComplete);
  }, [user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="username">Name</Label>
              <Input
                id="username"
                placeholder="Your Name"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button
            className="w-full"
            onClick={onSignUp}
            disabled={buttonDisabled || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <Link href="/login" className="w-full">
            <Button className="w-full" type="button" variant="outline">
              Visit Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;