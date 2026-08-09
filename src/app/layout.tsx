import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProviderWrapper } from "@/components/providers/clerk-provider";
import { SEO_CONFIG } from "@/config/seo.config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },
  description: SEO_CONFIG.description,
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  openGraph: SEO_CONFIG.openGraph,
  twitter: SEO_CONFIG.twitter,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1B3D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProviderWrapper>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${inter.variable} ${outfit.variable} ${jakarta.variable}`}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(SEO_CONFIG.organizationSchema),
            }}
          />
        </head>
        <body className="min-h-screen bg-background font-body text-foreground antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
