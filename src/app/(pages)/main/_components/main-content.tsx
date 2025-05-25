"use client";
import React, { useEffect } from "react";
import { userAtom } from "@/app/store/user";
import { useAtom } from "jotai";
import { getSession } from "next-auth/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const [_, setUser] = useAtom(userAtom);

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
  useEffect(() => {
    void getUser();
  }, []);

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
