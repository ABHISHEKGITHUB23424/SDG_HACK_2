import type { Metadata } from "next";
import { Sora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import QueryProvider from "@/components/QueryProvider";

const sora = Sora({ subsets: ["latin"], variable: '--font-sora' });
const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ["latin"], 
  weight: ['400', '600'], 
  variable: '--font-ibm' 
});

export const metadata: Metadata = {
  title: "Deep Scanner — Eligibility Intelligence",
  description: "Advanced Student Auditing & Decision Support System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${sora.variable} ${ibmPlexMono.variable}`}>
      <body className={`${sora.className} font-sans`}>
        <AuthProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
