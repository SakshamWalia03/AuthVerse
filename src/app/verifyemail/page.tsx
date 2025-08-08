/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          `/api/users/verifyemail?token=${token}`
        );
        setStatus("success");
        setMessage(response.data.message || "Email verified successfully");
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error.response?.data?.error ||
            "Something went wrong during verification"
        );
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus("error");
      setMessage("Token not found in URL");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Email Verification</h1>

      {status === "loading" ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          <p>Verifying...</p>
        </div>
      ) : (
        <>
          <Badge variant={status === "success" ? "default" : "destructive"}>
            {message}
          </Badge>

          {status === "success" && (
            <Button
              className="mt-4 bg-green-700"
              onClick={() => router.push("/login")}
            >
              Go to Sign In
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}