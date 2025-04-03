import type { Metadata } from "next";
import "@styles/globals.scss";
import { SITE } from "@/config";
import { Header } from "@/components/global/header";
import { Footer } from "@/components/global/footer";
import { LayoutProvider } from "./layout-context";

export const metadata: Metadata = {
    title: SITE.title || "Robert So's Bento",
    description: SITE.desc || "Robert So's Bento is a collection of my projects and experiences as a software engineer who loves to build products and learn new AI tools.",
    keywords: SITE.keywords || "Robert So, React, Next.js, Langgraph, software engineer, AI, projects, experiences",
    icons: {
        icon: [
            { url: "/favicon-16x-16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x-32.png", sizes: "32x32", type: "image/png" }
        ],
        shortcut: "/android-chrome-192x192.png",
        apple: "/apple-touch-icon.png",
        other: {
            rel: "apple-touch-icon",
            url: "/apple-touch-icon.png"
        }
    },
    openGraph: {
        title: SITE.title || "Robert So's Bento",
        description: SITE.desc || "Robert So's Bento is a collection of my projects and experiences as a software engineer who loves to build products and learn new AI tools.",
        authors: SITE.author || "Robert So",
        images: [
            {
                url: SITE.ogImage || "https://nextjs.org/og.png", // Must be an absolute URL
                width: 1200,
                height: 630
            }
        ]
    },
    alternates: {
        canonical: SITE.siteUrl || "Canonical URL"
    },
    manifest: "site.webmanifest",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-neutral-100">
                <LayoutProvider>
                    <Header />
                    <main className="main grid gap-8">{children}</main>
                    <Footer />
                </LayoutProvider>
            </body>
        </html>
    );
}
