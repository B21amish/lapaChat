import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/inter";
import { CssVarsProvider } from "@mui/joy/styles";

export const metadata: Metadata = {
  title: "Lapa Chat",
  description: "End-To-End encrypted chat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CssVarsProvider defaultMode="system">
      <html lang="en">
        <body>{children}</body>
      </html>
    </CssVarsProvider>
  );
}
