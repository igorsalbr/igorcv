import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Full Stack Developer | GO | JavaScript | Next.js | Python | C++",
  description:
    "Virtual resume for tech recruiters and those interested in learning about my skills in GO, JavaScript, Next.js, Python, and C++.",
  keywords:
    "Full Stack Developer, GO, JavaScript, Next.js, Python, C++, Tech Recruiters",
  robots: "index, follow",
  openGraph: {
    title: "Full Stack Developer | GO | JavaScript | Next.js | Python | C++",
    description:
      "Virtual resume for tech recruiters and those interested in learning about my skills in GO, JavaScript, Next.js, Python, and C++.",
    url: "https://igorsal.com",
    type: "website",
    images: [
      {
        url: "https://igorsal.com/igor.jpg",
        width: 800,
        height: 600,
        alt: "Full Stack Developer Profile Picture"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#F9F6EE]">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
