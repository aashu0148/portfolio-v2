import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CustomCursor } from "@/components/ui/CustomCursor"
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://anshul-sharma.in"),
  title: "Anshul sharma",
  description:
    "Portfolio of Anshul, a software engineer building high-performance, thoughtfully designed systems.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Anshul Sharma",
    description:
      "Portfolio of Anshul, a software engineer building high-performance, thoughtfully designed systems.",
    url: "https://anshul-sharma.in",
    siteName: "Anshul Sharma",
    images: [
      {
        url: "/profile.jpeg",
        width: 460,
        height: 575,
        alt: "Anshul Sharma",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anshul Sharma",
    description:
      "Portfolio of Anshul, a software engineer building high-performance, thoughtfully designed systems.",
    images: ["/profile.jpeg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased",
          inter.variable,
          spaceGrotesk.variable,
          "font-sans"
        )}
      >
        <ThemeProvider defaultTheme="dark" enableSystem={false}>
          <AnalyticsProvider />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
