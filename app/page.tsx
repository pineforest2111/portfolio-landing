import Image from "next/image";
import { ContactAction } from "@/components/landing/ContactAction";
import { NavigationBar } from "@/components/ui/NavigationBar";

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

function FloatingCard({
  type,
  className,
}: {
  type: "showreel" | "cv";
  className: string;
}) {
  const isShowreel = type === "showreel";

  return (
    <aside
      className={`ticket-gradient absolute h-[65px] w-[166px] overflow-hidden rounded-[23px] border-2 border-[#dfdfdf] ${className}`}
      aria-label={isShowreel ? "Showreel 0:41" : "CV PDF"}
    >
      <div className="absolute left-1/2 top-1/2 flex -translate-x-[calc(50%+4px)] -translate-y-1/2 items-center gap-2">
        <div className="tile-gradient relative flex h-[55px] w-[69px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] border-2 border-[#dfdfdf]">
          {isShowreel ? (
            <Image
              src="/images/showreel-thumb.png"
              alt=""
              width={69}
              height={55}
              className="h-full w-full object-cover"
            />
          ) : (
            <Image src="/icons/cv.svg" alt="" width={20} height={20} />
          )}
        </div>
        <div className="figma-sans flex w-[71px] shrink-0 flex-col gap-2.5 text-base font-medium leading-none">
          <p className="text-[#373737]">{isShowreel ? "Showreel" : "СV"}</p>
          <p className="text-[#373737]/40">{isShowreel ? "0:41" : "PDF"}</p>
        </div>
      </div>
    </aside>
  );
}

function ProductWidget() {
  return (
    <article className="widget-gradient absolute bottom-[144px] left-1/2 flex h-[136px] w-[calc(100%-18px)] max-w-[375px] -translate-x-1/2 items-center gap-3 rounded-[44px] border-[2.116px] border-white p-3 text-left backdrop-blur-[6px] md:bottom-[77px] md:w-[438px] md:max-w-none">
      <div className="relative h-28 w-[82px] shrink-0 overflow-hidden rounded-[26px]">
        <Image
          src="/images/profile.png"
          alt="Roma Osipov"
          width={82}
          height={112}
          className="h-full w-full object-cover object-[48%_20%]"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="figma-serif text-2xl font-medium leading-[1.2] text-black md:text-[30px]">
          I’m Roma Osipov
        </h2>
        <p className="figma-golos mt-1 text-sm leading-[1.2] text-black/40 md:text-base">
          <span className="md:hidden">
            Create powerful, interactive interfaces based on reseach and deep
            dive with strong visual and 3d stuff
          </span>
          <span className="hidden md:inline">
            Create powerful, interactive interfaces
            <br />
            based on reseach and deep dive
            <br />
            with strong visual and 3d stuff
          </span>
        </p>
      </div>
    </article>
  );
}

function SegmentNav() {
  return (
    <NavigationBar
      activeItem="about"
      className="figma-golos absolute bottom-[79px] left-1/2 -translate-x-1/2 md:bottom-6"
    />
  );
}

export default function Home() {
  return (
    <main className="relative isolate min-h-[max(852px,100vh)] overflow-hidden bg-[#747474] text-white md:min-h-[max(900px,100vh)] md:bg-[#818181]">
      <BackgroundVisual />
      <Heading />
      <FloatingCard
        type="showreel"
        className="bottom-[292px] left-[53px] rotate-[-22.97deg] md:bottom-[214px] md:left-[calc(50%-144px)]"
      />
      <FloatingCard
        type="cv"
        className="bottom-[273px] left-[167px] rotate-[-7.24deg] md:bottom-[206px] md:left-[calc(50%-29px)]"
      />
      <ProductWidget />
      <SegmentNav />
      <div className="absolute bottom-[18px] left-1/2 -translate-x-1/2 md:hidden">
        <ContactAction aria-label="Contact me" />
      </div>
    </main>
  );
}
