import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import "../globals.css";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: "COSCI RAWBLOCK",
  description: "RawBlock brutalism e-commerce",
};

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<div className="h-16 border-b-[3px] border-black bg-background" />}>
        <Navbar />
      </Suspense>
      {children}
    </>
  );
}