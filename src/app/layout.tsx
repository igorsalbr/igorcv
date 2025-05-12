import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import "./globals.css"
import { Suspense } from "react"

// Font configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Full Stack Developer | GO | JavaScript | Next.js | Python | C++",
  description:
    "Virtual resume for tech recruiters and those interested in learning about my skills in GO, JavaScript, Next.js, Python, and C++.",
  keywords: "Full Stack Developer, GO, JavaScript, Next.js, Python, C++, Tech Recruiters",
  robots: "index, follow",
  openGraph: {
    title: "Full Stack Developer | GO | JavaScript | Next.js | Python | C++",
    description:
      "Virtual resume for tech recruiters and those interested in learning about my skills in GO, JavaScript, Next.js, Python, and C++.",
    url: "https://igorsal.pages.dev",
    type: "website",
    images: [
      {
        url: "https://igorsal.com/igor.jpg",
        width: 800,
        height: 600,
        alt: "Full Stack Developer Profile Picture",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollProgress />
          <Suspense>
            {children}
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
