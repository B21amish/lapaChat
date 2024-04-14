import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/inter";

import config from "@/config/config";
import { CssVarsProvider } from "@mui/joy/styles";

export const metadata: Metadata = {
  title: config.appName,
  description: "End-To-End encrypted chat application.",
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
