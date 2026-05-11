import Image from "next/image";
import { ContactAction } from "@/components/landing/ContactAction";
import { NavigationHub } from "@/components/ui/NavigationHub";

function BackgroundVisual() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-5.56%] right-[-5.56%] top-0 hidden aspect-[1600/1058] md:block">
        <Image
          src="/images/erbghj%201.png"
          alt=""
          fill
          priority
          sizes="112vw"
          className="object-cover"
        />
      </div>
      <Image
        src="/images/bg-mobile.png"
        alt=""
        width={393}
        height={504}
        priority
        className="absolute left-0 top-[72px] block h-[504px] w-full object-cover md:hidden"
      />
    </div>
  );
}

function Heading() {
  return (
    <header className="figma-sans absolute left-1/2 top-[17px] w-full -translate-x-1/2 text-center md:top-3 md:w-[692px]">
      <p className="figma-golos text-sm leading-[1.1] text-white/25 md:text-xl md:text-white/[0.12]">
        upd: 01.2026
      </p>
      <div className="mt-[58px] md:mt-8">
        <h1 className="figma-serif mx-auto text-[40px] font-normal leading-[0.85] text-white min-[390px]:text-[42px] md:text-[80px] md:leading-[0.8]">
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
    <main className="relative isolate min-h-[max(852px,100vh)] overflow-hidden bg-[#747474] text-white md:min-h-[max(900px,100vh)] md:bg-[#818181]">
      <BackgroundVisual />
      <Heading />
      <NavigationHub className="absolute bottom-[79px] left-1/2 -translate-x-1/2 max-[430px]:scale-[0.88] md:bottom-6 md:scale-100" />
      <div className="absolute bottom-[18px] left-1/2 -translate-x-1/2 md:hidden">
        <ContactAction aria-label="Contact me" />
      </div>
    </main>
  );
}
