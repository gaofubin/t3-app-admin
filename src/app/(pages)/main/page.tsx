"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
const HomePage = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      HomePage
      <Button onClick={() => signOut()}>Logout</Button>
      <div className="mt-4 rounded border bg-gray-50 p-2">
        <div>Session 状态: {status}</div>
        <pre className="whitespace-pre-wrap break-all text-left text-xs">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default HomePage;
