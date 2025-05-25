import React from "react";
import MainContent from "./_components/main-content";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainContent>{children}</MainContent>;
}
