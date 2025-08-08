/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setStatus("error");
      setMessage("Token is missing in URL");
      return;
    }

    try {
      setStatus("loading");
      const res = await axios.post(`/api/users/resetpassword?token=${token}`, {
        newPassword,
      });

      setStatus("success");
      setMessage(res.data.message || "Password changed successfully");
    } catch (error: any) {
      setStatus("error");
      setMessage(
        error.response?.data?.error || "Something went wrong while resetting password"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">Reset Your Password</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4"
      >
        <Input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} />
              <span>Resetting...</span>
            </div>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>

      {status !== "idle" && (
        <Badge
          className="mt-4"
          variant={status === "success" ? "default" : "destructive"}
        >
          {message}
        </Badge>
      )}

      {status === "success" && (
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => router.push("/login")}
        >
          Go to Login
        </Button>
      )}
    </div>
  );
}