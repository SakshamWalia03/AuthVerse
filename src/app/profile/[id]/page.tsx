/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const UserProfile = ({ params }: any) => {
  const [user, setUser] = useState({
    _id: null,
    username: null,
    email: null,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUser(res.data.data);
      } catch (error: any) {
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">User Profile</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Detailed info about the user
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {user ? (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">User ID:</span>
                  <Badge>{user._id}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Username:</span>
                  <Badge>{user.username}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Email:</span>
                  <Badge>{user.email}</Badge>
                </div>
              </div>

              <Separator />

              <Button
                variant="secondary"
                className="w-full"
                onClick={() => router.push("/profile")}
              >
                Back to Profile Page
              </Button>
            </>
          ) : (
            <p className="text-center text-muted-foreground">
              Loading user data...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
