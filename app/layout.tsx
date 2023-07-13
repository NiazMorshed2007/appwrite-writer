import "@/styles/globals.css";
import "@/styles/prosemirror.css";

import { Metadata } from "next";
import { ReactNode } from "react";
import Providers from "./providers";
import Header from "./components/Header";
import Footer from "./components/Footer";

const title =
  "Appwrite Writer – A Notion like WYSIWYG editor with AI-powered autocompletions powered with Appwrite";
const description =
  "Appwrite Writer is a Notion-style WYSIWYG editor with AI-powered autocompletions. Built with  Novel, Appwrite OpenAI, & Vercel AI SDK.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@niazmorshed_",
  },
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
