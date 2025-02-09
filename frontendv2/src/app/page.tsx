"use client"; // Ensure this is a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Redirect to the login page
  }, [router]);

  return null; // Prevents rendering anything before redirection
}
