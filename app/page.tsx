import Image from "next/image";
import { ContactAction } from "@/components/landing/ContactAction";
import { NavigationHub } from "@/components/ui/NavigationHub";

function BackgroundVisual() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute bottom-[-158px] left-[-5.56%] right-[-5.56%] top-0 hidden md:block">
        <Image
          src="/images/erbghj%201.png"
          alt=""
          fill
          priority
          sizes="112vw"
          className="object-cover"
        />
      </div>
      <div className="portfolio-mobile-background md:hidden">
        <Image
          src="/images/Mobile%20BG.png"
          alt=""
          fill
          priority
          sizes="165vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <header className="figma-sans portfolio-heading">
      <p className="figma-golos text-xs font-medium leading-none text-white/25 md:text-xl md:font-normal md:leading-[1.1] md:text-white/[0.12]">
        upd: 01.2026
      </p>
      <div className="mt-6 md:mt-8">
        <h1 className="figma-serif mx-auto text-[40px] font-normal leading-[0.85] text-white md:text-[80px] md:leading-[0.8]">
          <span className="whitespace-nowrap">Product designer with</span>
          <br />
          <span className="whitespace-nowrap">a strong visual focus</span>
        </h1>
      </div>
      <div className="mt-5 hidden justify-center md:flex">
        <ContactAction aria-label="Contact me" />
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <main className="portfolio-hero">
      <BackgroundVisual />
      <Heading />
      <div className="portfolio-navigation-hub-shell">
        <NavigationHub />
      </div>
      <div className="portfolio-mobile-contact-shell md:hidden">
        <ContactAction
          aria-label="Contact me"
          className="portfolio-mobile-contact-button"
          size="sm"
          visualState="hover"
        />
      </div>
    </main>
  );
}
