"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
const HomePage = () => {
  return (
    <div>
      HomePage
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};

export default HomePage;
