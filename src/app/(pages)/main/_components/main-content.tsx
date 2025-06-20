"use client";
import React, { useEffect } from "react";
import { userAtom } from "@/app/store/user";
import { useAtom } from "jotai";
import { getSession } from "next-auth/react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    async function getUser() {
      const session = await getSession();
      const { user } = session ?? {};
      setUser({
        id: user?.id ?? "",
        username: user?.name ?? "",
        email: user?.email ?? "",
        image: user?.image ?? "",
      });
    }
    void getUser();
  }, [setUser]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <>{children}</>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainContent;
