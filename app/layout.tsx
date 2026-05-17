import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { Geist } from "next/font/google";
import { Golos_Text } from "next/font/google";
import "./globals.css";
import "@/components/ui/ContactButton/ContactButton.css";
import "@/components/ui/InfoWidget/InfoWidget.css";
import "@/components/ui/NavigationBar/NavigationBar.css";
import "@/components/ui/NavigationHub/NavigationHub.css";
import "@/components/ui/CaseItem/CaseItem.css";
import "@/components/ui/ProjectWidget/ProjectWidget.css";

const golosText = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-golos",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-eb-garamond",
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
      className={`${golosText.variable} ${geistSans.variable} ${ebGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
