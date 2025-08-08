"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUserId(response.data.data._id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Welcome to Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="text-center">
            <Link
              href={userId ? `/profile/${userId}` : "#"}
              className="text-blue-700 font-semibold hover:underline"
            >
              View Profile
            </Link>
          </div>

          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}