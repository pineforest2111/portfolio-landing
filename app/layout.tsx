import type { Metadata } from "next";
import "./globals.css";
import "@/components/ui/ContactButton/ContactButton.css";
import "@/components/ui/InfoWidget/InfoWidget.css";
import "@/components/ui/NavigationBar/NavigationBar.css";
import "@/components/ui/NavigationHub/NavigationHub.css";
import "@/components/ui/CaseItem/CaseItem.css";
import "@/components/ui/ProjectWidget/ProjectWidget.css";
import "@/components/landing/MySkazkaCase.css";

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
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
