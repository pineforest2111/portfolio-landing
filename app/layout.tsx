import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";
import "@/components/ui/ContactButton/ContactButton.css";
import "@/components/ui/NavigationBar/NavigationBar.css";

const golosText = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-golos",
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
    <html lang="en" className={`${golosText.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
