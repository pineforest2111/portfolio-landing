"use client";

import Image from "next/image";
import type {
  CSSProperties,
  MouseEvent,
  TouchEvent,
  UIEvent,
  WheelEvent,
} from "react";
import { useEffect, useRef, useState } from "react";
import { ContactAction } from "@/components/landing/ContactAction";
import { MySkazkaCaseSection as UpdatedMySkazkaCaseSection } from "@/components/landing/MySkazkaCase";
import type { NavigationBarItemId } from "@/components/ui/NavigationBar";
import { NavigationHub } from "@/components/ui/NavigationHub";
import { ProjectWidget } from "@/components/ui/ProjectWidget";

type PortfolioSection = "about" | "works" | "concepts" | "myskazka";

type ConceptTile = {
  alt: string;
  className?: string;
  mediaType?: "image" | "video";
  radius: number;
  src?: string;
  style: CSSProperties;
};

const defaultActiveConceptIndex = 3;
const conceptGalleryOrder = [6, 3, 0, 7, 2, 5, 1, 8, 4, 9];
const conceptGalleryStep = 620;
const conceptMobileGalleryStep = 249;
const conceptGalleryOffsets = conceptGalleryOrder.map(
  (_, index) => index * conceptGalleryStep,
);

const conceptTiles: ConceptTile[] = [
  {
    alt: "Mobile particles concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/mobile%20particles.webm",
    style: {
      height: "20.611%",
      left: "9.05%",
      top: "36.745%",
      width: "18.556%",
    },
  },
  {
    alt: "Red knitting concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/red%20knitting.webm",
    style: {
      height: "14.661%",
      left: "30.006%",
      top: "78.624%",
      width: "13.199%",
    },
  },
  {
    alt: "Toothbrush concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/toothbrush.webm",
    style: {
      height: "19.72%",
      left: "59.536%",
      top: "85.844%",
      width: "17.753%",
    },
  },
  {
    alt: "Zephyr workshop concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/zephyr%20workshop.webm",
    style: {
      height: "15.457%",
      left: "36.674%",
      top: "89.054%",
      width: "13.916%",
    },
  },
  {
    alt: "Red cubes concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/red%20cubes.webm",
    style: {
      height: "20.611%",
      left: "73.349%",
      top: "20.859%",
      width: "18.556%",
    },
  },
  {
    alt: "Sky Cut concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/Sky%20Cut.webm",
    style: {
      height: "14.661%",
      left: "45.248%",
      top: "21.18%",
      width: "13.199%",
    },
  },
  {
    alt: "Yellow pillows concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/yellow%20pillows.webm",
    style: {
      height: "20.611%",
      left: "34.769%",
      top: "9.627%",
      width: "18.556%",
    },
  },
  {
    alt: "Tale shot concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/Tale%20shot%20(1).webm",
    style: {
      height: "20.611%",
      left: "76.683%",
      top: "75.415%",
      width: "18.556%",
    },
  },
  {
    alt: "VR house concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/vr%20house.webm",
    style: {
      height: "20.611%",
      left: "84.78%",
      top: "39.312%",
      width: "18.556%",
    },
  },
  {
    alt: "Cash cross concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/cash%20cross.webm",
    style: {
      height: "14.661%",
      left: "54.297%",
      top: "14.12%",
      width: "13.199%",
    },
  },
];

const initialAssetUrls = [
  "/telegram-frame-1.svg",
  "/contact-message.svg",
  "/navigation-hub-showreel.webp",
  "/navigation-hub-cv-icon.svg",
  "/navigation-hub-close.svg",
  "/info-widget-avatar-optimized.jpg",
  "/logo.png",
  "/info-widget-global.svg",
  "/info-widget-pen-tool.svg",
  "/info-widget-ranking.svg",
  "/navbar-about-selected.svg",
  "/navbar-about-unselected.svg",
  "/navbar-works-selected.svg",
  "/navbar-works-unselected.svg",
  "/navbar-concepts-selected.svg",
  "/navbar-concepts-unselected.svg",
  "/project-widget-folder-img-1.webp",
  "/project-widget-folder-img-2.webp",
  "/project-widget-folder-img-3.webp",
  "/project-widget-folder-shadow-default.webp",
  "/project-widget-folder-shadow-hover.webp",
  "/project-widget-folder-default.svg",
  "/project-widget-folder-hover.svg",
  "/case-item-export-default.svg",
  "/case-item-export-hover.svg",
];

const mySkazkaAssetNames = [
  "hero",
  "home-before",
  "home-after",
  "jtbd",
  "recommendations",
  "onboarding-before",
  "onboarding-1",
  "onboarding-2",
  "onboarding-3",
  "filter-before",
  "filter-after",
  "audio-before",
  "personalization-before",
  "personalization-story",
  "personalization-form",
  "whybot-before",
  "whybot-after",
  "parent-before",
  "parent-after",
  "graphics-before-1",
  "graphics-before-2",
  "graphics-before-3",
  "graphics-before-4",
  "graphics-after-1",
  "graphics-after-2",
  "graphics-after-3",
  "graphics-after-4",
  "icon-character",
  "icon-animal",
  "icon-pillow",
  "icon-whybot",
  "icon-book",
  "icon-plant",
  "icon-toothbrush",
  "icon-gift",
  "result-1",
  "result-2",
] as const;

const mySkazkaAssetUrls = mySkazkaAssetNames.map(
  (name) => `/images/myskazka-ru/${name}.png`,
);

const mySkazkaCriticalAssetUrls = mySkazkaAssetUrls.slice(0, 3);

export function PortfolioPage() {
  const [activeSection, setActiveSection] = useState<PortfolioSection>("about");
  const [caseLoaderProgress, setCaseLoaderProgress] = useState(0);
  const [isCaseLoading, setIsCaseLoading] = useState(false);
  const [isSiteLoading, setIsSiteLoading] = useState(true);
  const [loaderProgress, setLoaderProgress] = useState(0);

  useEffect(() => {
    const syncSectionFromHash = () => {
      const hash = window.location.hash.replace("#", "");

      if (hash === "works" || hash === "concepts" || hash === "myskazka") {
        setActiveSection(hash);
        return;
      }

      setActiveSection("about");
    };

    syncSectionFromHash();
    window.addEventListener("hashchange", syncSectionFromHash);

    return () => {
      window.removeEventListener("hashchange", syncSectionFromHash);
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;
    let hideTimer = 0;
    let loadedItems = 0;
    const backgroundAsset = window.matchMedia("(max-width: 767px)").matches
      ? "/images/portfolio-bg-mobile.webp"
      : "/images/portfolio-bg-desktop.webp";
    const assetUrls = Array.from(
      new Set([...initialAssetUrls, backgroundAsset]),
    );
    const totalItems = assetUrls.length + 1;

    const markItemLoaded = () => {
      if (isCancelled) {
        return;
      }

      loadedItems += 1;
      setLoaderProgress(Math.min(99, Math.round((loadedItems / totalItems) * 100)));
    };

    const fontPromise =
      "fonts" in document
        ? document.fonts.ready.then(() => undefined).catch(() => undefined)
        : Promise.resolve();

    const loadPromises = [
      fontPromise.then(markItemLoaded),
      ...assetUrls.map((src) => preloadAsset(src).then(markItemLoaded)),
    ];

    Promise.all(loadPromises).then(() => {
      if (isCancelled) {
        return;
      }

      setLoaderProgress(100);
      hideTimer = window.setTimeout(() => {
        setIsSiteLoading(false);
      }, 240);
    });

    return () => {
      isCancelled = true;
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (isSiteLoading) {
      return;
    }

    scheduleIdleTask(() => {
      void preloadAssets(mySkazkaAssetUrls);
    });
  }, [isSiteLoading]);

  const handleSectionSelect = (item: NavigationBarItemId) => {
    const section: PortfolioSection = item;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    setActiveSection(section);
    window.history.replaceState(null, "", `#${section}`);

    if (isMobile) {
      window.scrollTo({ behavior: "auto", top: 0 });
    }
  };

  const openMySkazka = async () => {
    setIsCaseLoading(true);
    setCaseLoaderProgress(0);

    await preloadAssets(mySkazkaCriticalAssetUrls, setCaseLoaderProgress);

    setActiveSection("myskazka");
    window.history.replaceState(null, "", "#myskazka");

    if (window.matchMedia("(max-width: 767px)").matches) {
      window.scrollTo({ behavior: "auto", top: 0 });
    }

    window.setTimeout(() => {
      setCaseLoaderProgress(100);
      setIsCaseLoading(false);
    }, 180);
  };

  const closeMySkazka = () => {
    setActiveSection("works");
    window.history.replaceState(null, "", "#works");

    if (window.matchMedia("(max-width: 767px)").matches) {
      window.scrollTo({ behavior: "auto", top: 0 });
    }
  };

  const activeNavigationItem: NavigationBarItemId =
    activeSection === "about"
      ? "about"
      : activeSection === "concepts"
        ? "concepts"
        : "works";

  return (
    <main className="portfolio-page" data-active-section={activeSection}>
      {isSiteLoading || isCaseLoading ? (
        <SiteLoader
          progress={isSiteLoading ? loaderProgress : caseLoaderProgress}
        />
      ) : null}
      <AboutSection
        activeItem={activeNavigationItem}
        isActive={activeSection === "about"}
        onSectionSelect={handleSectionSelect}
      />
      <WorksSection
        activeItem={activeNavigationItem}
        isActive={activeSection === "works"}
        onMySkazkaOpen={openMySkazka}
        onSectionSelect={handleSectionSelect}
      />
      {activeSection === "concepts" ? (
        <ConceptsSection
          activeItem={activeNavigationItem}
          onSectionSelect={handleSectionSelect}
        />
      ) : null}
      {activeSection === "myskazka" ? (
        <UpdatedMySkazkaCaseSection onBack={closeMySkazka} />
      ) : null}
    </main>
  );
}

const assetPreloadCache = new Map<string, Promise<void>>();

function preloadAsset(src: string) {
  const cached = assetPreloadCache.get(src);

  if (cached) {
    return cached;
  }

  const promise = preloadImage(src);
  assetPreloadCache.set(src, promise);

  return promise;
}

function preloadAssets(
  urls: readonly string[],
  onProgress?: (progress: number) => void,
) {
  let loadedItems = 0;
  const totalItems = urls.length || 1;

  return Promise.all(
    urls.map((src) =>
      preloadAsset(src).then(() => {
        loadedItems += 1;
        onProgress?.(Math.round((loadedItems / totalItems) * 100));
      }),
    ),
  ).then(() => undefined);
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    let isSettled = false;

    const finish = () => {
      if (isSettled) {
        return;
      }

      isSettled = true;
      resolve();
    };

    const decode = () => {
      image.decode().then(finish).catch(finish);
    };

    image.decoding = "async";
    image.onload = decode;
    image.onerror = finish;
    image.src = src;

    if (image.complete) {
      if (image.naturalWidth > 0) {
        decode();
      } else {
        finish();
      }
    }
  });
}

function scheduleIdleTask(callback: () => void) {
  const idleWindow = window as Window & {
    requestIdleCallback?: (
      callback: () => void,
      options?: { timeout: number },
    ) => number;
  };

  if (typeof idleWindow.requestIdleCallback === "function") {
    idleWindow.requestIdleCallback(callback, { timeout: 3000 });
    return;
  }

  window.setTimeout(callback, 800);
}

function SiteLoader({ progress }: { progress: number }) {
  return (
    <div
      aria-label="Loading portfolio"
      aria-live="polite"
      className="portfolio-site-loader"
      role="status"
    >
      <div className="portfolio-site-loader__content">
        <p className="portfolio-site-loader__title">
          hello! Roma Osipov&apos;s portfolio is being uploaded
        </p>
        <div
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress}
          className="portfolio-site-loader__track"
          role="progressbar"
        >
          <span
            className="portfolio-site-loader__progress"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function BackgroundVisual() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute bottom-[-158px] left-[-5.56%] right-[-5.56%] top-0 hidden md:block">
        <Image
          src="/images/portfolio-bg-desktop.webp"
          alt=""
          fill
          sizes="112vw"
          className="object-cover"
        />
      </div>
      <div className="portfolio-mobile-background md:hidden">
        <Image
          src="/images/portfolio-bg-mobile.webp"
          alt=""
          fill
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
        обновлено 06.26
      </p>
      <div className="mt-6 md:mt-8">
        <h1 className="figma-serif mx-auto text-[40px] font-normal leading-[0.85] text-white md:text-[80px] md:leading-[0.8]">
          <span className="whitespace-nowrap">Продуктовый дизайнер</span>
          <br />
          <span className="whitespace-nowrap">с фокусом на визуал</span>
        </h1>
      </div>
      <div className="mt-5 hidden justify-center md:flex">
        <ContactAction aria-label="Написать мне" />
      </div>
    </header>
  );
}

function AboutSection({
  activeItem,
  isActive,
  onSectionSelect,
}: {
  activeItem: NavigationBarItemId;
  isActive: boolean;
  onSectionSelect: (item: NavigationBarItemId) => void;
}) {
  return (
    <section
      aria-label="Обо мне"
      className="portfolio-hero portfolio-section"
      data-section="about"
      hidden={!isActive}
      id="about"
    >
      <BackgroundVisual />
      <Heading />
      <div className="portfolio-navigation-hub-shell">
        <NavigationHub
          activeItem={activeItem}
          onItemSelect={onSectionSelect}
        />
      </div>
      <div className="portfolio-mobile-contact-shell md:hidden">
        <ContactAction
          aria-label="Написать мне"
          className="portfolio-mobile-contact-button"
          size="sm"
          visualState="hover"
        />
      </div>
    </section>
  );
}

function WorksSection({
  activeItem,
  isActive,
  onMySkazkaOpen,
  onSectionSelect,
}: {
  activeItem: NavigationBarItemId;
  isActive: boolean;
  onMySkazkaOpen: () => void;
  onSectionSelect: (item: NavigationBarItemId) => void;
}) {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    const link = (event.target as Element).closest('a[href="#myskazka"]');

    if (link) {
      event.preventDefault();
      onMySkazkaOpen();
    }
  };

  return (
    <section
      aria-labelledby="works-title"
      className="portfolio-works portfolio-section"
      data-section="works"
      hidden={!isActive}
      id="works"
      onClick={handleClick}
    >
      <h2 className="portfolio-works__title" id="works-title">
        My projects
      </h2>
      <ProjectWidget className="portfolio-works__project-widget" />
      <NavigationHub
        activeItem={activeItem}
        className="portfolio-works__navigation"
        mode="navigation"
        onItemSelect={onSectionSelect}
      />
    </section>
  );
}

function ConceptsSection({
  activeItem,
  onSectionSelect,
}: {
  activeItem: NavigationBarItemId;
  onSectionSelect: (item: NavigationBarItemId) => void;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isLoopingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeConceptIndex, setActiveConceptIndex] = useState(
    defaultActiveConceptIndex,
  );

  const scrollToConcept = (
    index: number,
    behavior: ScrollBehavior = "smooth",
  ) => {
    const section = sectionRef.current;
    const orderIndex = conceptGalleryOrder.indexOf(index);

    if (!section || orderIndex === -1) {
      return;
    }

    section.scrollTo({
      behavior,
      top: getConceptScrollTop(orderIndex),
    });
  };

  const openGallery = (
    index = defaultActiveConceptIndex,
    behavior: ScrollBehavior = "smooth",
  ) => {
    setActiveConceptIndex(index);
    setIsGalleryOpen(true);

    window.setTimeout(() => {
      scrollToConcept(index, behavior);
    }, 0);
  };

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    if (!isGalleryOpen && Math.abs(event.deltaY) > 4) {
      openGallery();
      return;
    }

    if (
      isGalleryOpen &&
      event.deltaY > 0 &&
      isAtConceptGalleryEnd(event.currentTarget)
    ) {
      event.preventDefault();
      loopConceptGallery(event.currentTarget);
    }
  };

  const loopConceptGallery = (section: HTMLElement) => {
    if (isLoopingRef.current) {
      return;
    }

    isLoopingRef.current = true;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const startOrderIndex = isMobile ? 1 : 0;
    const startConceptIndex =
      conceptGalleryOrder[startOrderIndex] ?? defaultActiveConceptIndex;

    setActiveConceptIndex(startConceptIndex);
    section.scrollTo({
      behavior: "auto",
      top: getConceptScrollTop(startOrderIndex),
    });

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        isLoopingRef.current = false;
      });
    });
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchMove = (event: TouchEvent<HTMLElement>) => {
    const startY = touchStartYRef.current;
    const currentY = event.touches[0]?.clientY;

    if (
      !isGalleryOpen ||
      startY === null ||
      currentY === undefined ||
      startY - currentY < 16 ||
      !isAtConceptGalleryEnd(event.currentTarget)
    ) {
      return;
    }

    event.preventDefault();
    touchStartYRef.current = currentY;
    loopConceptGallery(event.currentTarget);
  };

  const handleScroll = (event: UIEvent<HTMLElement>) => {
    if (!isGalleryOpen || isLoopingRef.current) {
      return;
    }

    const scrollTop = event.currentTarget.scrollTop;
    const closestOrderIndex = getClosestConceptOrderIndex(scrollTop);
    const nextActiveIndex =
      conceptGalleryOrder[closestOrderIndex] ?? defaultActiveConceptIndex;

    if (nextActiveIndex !== activeConceptIndex) {
      setActiveConceptIndex(nextActiveIndex);
    }
  };

  return (
    <section
      aria-labelledby="concepts-title"
      className={`portfolio-concepts portfolio-section ${
        isGalleryOpen ? "portfolio-concepts--gallery" : ""
      }`}
      data-section="concepts"
      id="concepts"
      ref={sectionRef}
      onScroll={handleScroll}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onWheel={handleWheel}
    >
      <div className="portfolio-concepts__wall">
        {conceptTiles.map((tile, index) => (
          <ConceptTile
            activeIndex={activeConceptIndex}
            index={index}
            isGalleryOpen={isGalleryOpen}
            key={`${tile.src ?? "empty"}-${index}`}
            onActivate={openGallery}
            shouldLoadMedia
            tile={tile}
          />
        ))}
        <div className="portfolio-concepts__copy">
          <p className="portfolio-concepts__hint">
            UI/3d/motion/ai experiments
          </p>
          <h2 className="portfolio-concepts__title" id="concepts-title">
            There&rsquo;s my wall of concepts
          </h2>
        </div>
      </div>
      <NavigationHub
        activeItem={activeItem}
        className="portfolio-concepts__navigation"
        mode="navigation"
        onItemSelect={onSectionSelect}
      />
    </section>
  );
}

function isAtConceptGalleryEnd(section: HTMLElement) {
  const maxScrollTop = section.scrollHeight - section.clientHeight;

  return maxScrollTop > 0 && section.scrollTop >= maxScrollTop - 2;
}

function ConceptTile({
  activeIndex,
  index,
  isGalleryOpen,
  onActivate,
  shouldLoadMedia,
  tile,
}: {
  activeIndex: number;
  index: number;
  isGalleryOpen: boolean;
  onActivate: (index: number) => void;
  shouldLoadMedia: boolean;
  tile: ConceptTile;
}) {
  const galleryStyle = getConceptGalleryStyle(index, activeIndex);
  const style = {
    ...(isGalleryOpen ? galleryStyle : tile.style),
    "--concept-radius": isGalleryOpen ? "32px" : `${tile.radius}px`,
  } as CSSProperties & Record<"--concept-radius", string>;

  return (
    <button
      aria-label={tile.alt}
      className={`portfolio-concepts__tile ${
        isGalleryOpen ? "portfolio-concepts__tile--gallery" : ""
      } ${
        isGalleryOpen && index === activeIndex
          ? "portfolio-concepts__tile--active"
          : ""
      } ${
        tile.className ?? ""
      }`.trim()}
      onClick={() => onActivate(index)}
      style={style}
      type="button"
    >
      {tile.src ? (
        tile.mediaType === "video" ? (
          shouldLoadMedia ? (
            <video
              aria-label={tile.alt}
              autoPlay
              className="portfolio-concepts__tile-video"
              loop
              muted
              playsInline
              preload="none"
              src={tile.src}
            />
          ) : null
        ) : (
          <Image
            alt={tile.alt}
            className="portfolio-concepts__tile-image"
            fill
            sizes="220px"
            src={tile.src}
          />
        )
      ) : null}
    </button>
  );
}

function getConceptGalleryStyle(index: number, activeIndex: number) {
  const orderIndex = conceptGalleryOrder.indexOf(index);
  const isActive = index === activeIndex;

  return {
    "--concept-gallery-height": isActive
      ? "620px"
      : "min(500px, 54vw)",
    "--concept-gallery-top": `calc(50dvh + ${conceptGalleryOffsets[orderIndex] ?? 0}px)`,
    "--concept-gallery-width": isActive
      ? "min(850.889px, 86vw)"
      : "min(651.195px, 72vw)",
    height: "var(--concept-gallery-height)",
    left: "50%",
    order: orderIndex,
    top: "var(--concept-gallery-top)",
    width: "var(--concept-gallery-width)",
  } as CSSProperties &
    Record<
      | "--concept-gallery-height"
      | "--concept-gallery-top"
      | "--concept-gallery-width",
      string
    >;
}

function getConceptScrollTop(orderIndex: number) {
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
    return Math.max(0, (orderIndex - 1) * conceptMobileGalleryStep);
  }

  return conceptGalleryOffsets[orderIndex] ?? 0;
}

function getClosestConceptOrderIndex(scrollTop: number) {
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
    const orderIndex = Math.round(scrollTop / conceptMobileGalleryStep) + 1;

    return Math.min(
      conceptGalleryOrder.length - 1,
      Math.max(0, orderIndex),
    );
  }

  return conceptGalleryOffsets.reduce((closestIndex, offset, offsetIndex) => {
    const currentDistance = Math.abs(scrollTop - offset);
    const closestDistance = Math.abs(scrollTop - conceptGalleryOffsets[closestIndex]);

    return currentDistance < closestDistance ? offsetIndex : closestIndex;
  }, 0);
}
