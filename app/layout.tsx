import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Golos_Text } from "next/font/google";
import "./globals.css";
import "@/components/ui/ContactButton/ContactButton.css";
import "@/components/ui/InfoWidget/InfoWidget.css";
import "@/components/ui/NavigationBar/NavigationBar.css";
import "@/components/ui/NavigationHub/NavigationHub.css";

const golosText = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-golos",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Roma Osipov — Product Designer",
  description: "Portfolio landing page for Roma Osipov.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${golosText.variable} ${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
