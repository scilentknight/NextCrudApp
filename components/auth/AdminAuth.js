"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function AdminAuth({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkAdminAuth() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          router.replace("/login");
          return;
        }

        const data = await response.json();

        // User is not admin
        if (data?.user?.role !== "admin") {
          router.replace("/");
          return;
        }

        // Only allow children after successful authorization
        if (mounted) {
          setAuthorized(true);
        }
      } catch (error) {
        console.error("AUTH ERROR:", error);
        router.replace("/login");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    checkAdminAuth();

    return () => {
      mounted = false;
    };
  }, [router]);

  // Always show loader while checking
  if (loading) {
    return <LoadingScreen />;
  }

  // IMPORTANT:
  // Never render protected content unless authorization succeeded
  if (!authorized) {
    return <LoadingScreen title="Redirecting..." message="Please wait..." />;
  }

  return <>{children}</>;
}
