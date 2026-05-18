"use client";

import Image from "next/image";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { ContactAction } from "@/components/landing/ContactAction";
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

const conceptTiles: ConceptTile[] = [
  {
    alt: "Mobile particles concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/mobile%20particles.webm",
    style: {
      height: 128.453,
      left: "calc(50% - 438.93px)",
      top: "calc(50% - 89.63px)",
      width: 194.792,
    },
  },
  {
    alt: "Red knitting concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/red%20knitting.webm",
    style: {
      height: 91.371,
      left: "calc(50% - 227.48px)",
      top: "calc(50% + 178.32px)",
      width: 138.558,
    },
  },
  {
    alt: "Toothbrush concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/toothbrush.webm",
    style: {
      height: 122.9,
      left: "calc(50% + 173.16px)",
      top: "calc(50% + 194.08px)",
      width: 186.371,
    },
  },
  {
    alt: "Zephyr workshop concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/zephyr%20workshop.webm",
    style: {
      height: 96.333,
      left: "calc(50% - 39.96px)",
      top: "calc(50% - 195.57px)",
      width: 146.083,
    },
  },
  {
    alt: "Red cubes concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/red%20cubes.webm",
    style: {
      height: 128.453,
      left: "calc(50% + 301.39px)",
      top: "calc(50% - 163.92px)",
      width: 194.792,
    },
  },
  {
    alt: "Sky Cut concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/Sky%20Cut.webm",
    style: {
      height: 91.371,
      left: "calc(50% - 338.04px)",
      top: "calc(50% + 9.31px)",
      width: 138.558,
    },
  },
  {
    alt: "Yellow pillows concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/yellow%20pillows.webm",
    style: {
      height: 128.453,
      left: "calc(50% - 170.04px)",
      top: "calc(50% - 267.23px)",
      width: 194.792,
    },
  },
  {
    alt: "Tale shot concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/Tale%20shot%20(1).webm",
    style: {
      height: 128.453,
      left: "calc(50% + 318.67px)",
      top: "calc(50% + 123.65px)",
      width: 194.792,
    },
  },
  {
    alt: "VR house concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/vr%20house.webm",
    style: {
      height: 128.453,
      left: "calc(50% - 87.6px)",
      top: "calc(50% + 227.53px)",
      width: 194.792,
    },
  },
  {
    alt: "Cash cross concept animation",
    mediaType: "video",
    radius: 28,
    src: "/videos/cash%20cross.webm",
    style: {
      height: 128.453,
      left: "calc(50% + 416.06px)",
      top: "calc(50% - 64.23px)",
      width: 194.792,
    },
  },
];

export function PortfolioPage() {
  const [activeSection, setActiveSection] = useState<PortfolioSection>("about");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "works" || hash === "concepts" || hash === "myskazka") {
      setActiveSection(hash);
    }
  }, []);

  const handleSectionSelect = (item: NavigationBarItemId) => {
    const section: PortfolioSection = item;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    setActiveSection(section);
    window.history.replaceState(null, "", `#${section}`);

    if (isMobile) {
      window.scrollTo({ behavior: "auto", top: 0 });
    }
  };

  const openMySkazka = () => {
    setActiveSection("myskazka");
    window.history.replaceState(null, "", "#myskazka");

    if (window.matchMedia("(max-width: 767px)").matches) {
      window.scrollTo({ behavior: "auto", top: 0 });
    }
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
      <AboutSection
        activeItem={activeNavigationItem}
        onSectionSelect={handleSectionSelect}
      />
      <WorksSection
        activeItem={activeNavigationItem}
        onMySkazkaOpen={openMySkazka}
        onSectionSelect={handleSectionSelect}
      />
      <ConceptsSection
        activeItem={activeNavigationItem}
        isActive={activeSection === "concepts"}
        onSectionSelect={handleSectionSelect}
      />
      <MySkazkaCaseSection onBack={closeMySkazka} />
    </main>
  );
}

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

function AboutSection({
  activeItem,
  onSectionSelect,
}: {
  activeItem: NavigationBarItemId;
  onSectionSelect: (item: NavigationBarItemId) => void;
}) {
  return (
    <section
      aria-label="About"
      className="portfolio-hero portfolio-section"
      data-section="about"
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
          aria-label="Contact me"
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
  onMySkazkaOpen,
  onSectionSelect,
}: {
  activeItem: NavigationBarItemId;
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
  isActive,
  onSectionSelect,
}: {
  activeItem: NavigationBarItemId;
  isActive: boolean;
  onSectionSelect: (item: NavigationBarItemId) => void;
}) {
  return (
    <section
      aria-labelledby="concepts-title"
      className="portfolio-concepts portfolio-section"
      data-section="concepts"
      id="concepts"
    >
      <div className="portfolio-concepts__wall" aria-hidden="true">
        {conceptTiles.map((tile, index) => (
          <ConceptTile
            key={`${tile.src ?? "empty"}-${index}`}
            shouldLoadMedia={isActive}
            tile={tile}
          />
        ))}
      </div>
      <p className="portfolio-concepts__hint">
        UI/3d/motion/ai experiments
      </p>
      <h2 className="portfolio-concepts__title" id="concepts-title">
        There&rsquo;s my wall of concepts
      </h2>
      <NavigationHub
        activeItem={activeItem}
        className="portfolio-concepts__navigation"
        mode="navigation"
        onItemSelect={onSectionSelect}
      />
    </section>
  );
}

function ConceptTile({
  shouldLoadMedia,
  tile,
}: {
  shouldLoadMedia: boolean;
  tile: ConceptTile;
}) {
  const style = {
    ...tile.style,
    "--concept-radius": `${tile.radius}px`,
  } as CSSProperties;

  return (
    <span
      className={`portfolio-concepts__tile ${
        tile.className ?? ""
      }`.trim()}
      style={style}
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
    </span>
  );
}

function MySkazkaCaseSection({ onBack }: { onBack: () => void }) {
  return (
    <section
      aria-labelledby="myskazka-title"
      className="portfolio-case portfolio-section"
      data-section="myskazka"
      id="myskazka"
    >
      <article className="portfolio-case__content">
        <header className="portfolio-case__header">
          <div className="portfolio-case__intro">
            <h1 id="myskazka-title">MySkazka</h1>
            <p>
              Mobile app for kids trasform listening and reading
              <br />
              tales and playing games into personal journey!
            </p>
          </div>
          <ul className="portfolio-case__meta" aria-label="Project tags">
            <li>Mobile app</li>
            <li>Global update</li>
            <li>Startup</li>
            <li>2024- 2025</li>
          </ul>
        </header>

        <Image
          alt="MySkazka mobile app screens"
          className="portfolio-case__hero-image"
          height={1056}
          priority={false}
          src="/images/myskazka-case-hero.png"
          width={1684}
        />

        <CaseTextBlock title="About the project">
          <p>
            Myskazka is a mobile app that turns listening to and reading fairy
            tales, as well as educational mini-games, into a personalized
            adventure for a child.
          </p>
          <p>
            The app helps parents gently correct behavior, calm their child
            before bedtime, and provide them with developmental activities.
          </p>
        </CaseTextBlock>

        <CaseTextBlock title="Task">
          <p>
            There was previously a working MVP version of the app. It needed a
            complete redesign because its interface was extremely unclear for
            children. Another task was to expand the app’s functionality by
            introducing a new section with educational games
          </p>
        </CaseTextBlock>

        <CaseTextBlock title="My role">
          <p>
            I was responsible for the entire product update: from auditing the
            initial version to the final design review and preparing promotional
            materials for publication in the app stores
          </p>
        </CaseTextBlock>

        <CaseTextBlock title="Work Approach">
          <ul>
            <li>
              Studied a large pool of feedback from parents about the old
              version of the app.
            </li>
            <li>
              Conducted a UX audit of the old app version, identified a set of
              issues, and prioritized which problems needed to be solved first.
            </li>
            <li>
              Conducted around 20 interviews to validate the need for a music
              feature in the app, including lullabies and entertainment music.
            </li>
            <li>
              Spoke with respondents who had previously used the app and
              defined the key job stories.
            </li>
            <li>
              Designed a recommendation system based on a short questionnaire
              about the child’s current state.
            </li>
            <li>
              Designed a fairy tale personalization system by mapping
              parameters and identifying the most frequently used ones.
            </li>
            <li>
              Analyzed apps with similar mechanics, including Little Stories,
              Storiezzz, Story Machine, Dream Stories, Epic!, Bedtime, and
              Duolingo Math.
            </li>
            <li>
              Based on parents’ responses, designed a CJM to identify where
              users faced friction when personalizing fairy tales.
            </li>
          </ul>
        </CaseTextBlock>

        <CaseTextBlock title="Research">
          <p>
            Previously, there was a working MVP version.
            <br />
            It needed a complete update, as its interface was extremely
            confusing for children. Another task was to expand the app&apos;s
            functionality by implementing a new block of features with
            educational games
          </p>
        </CaseTextBlock>

        <CaseTextBlock title="Architecture">
          <p>
            Previously, there was a working MVP version.
            <br />
            It needed a complete update, as its interface was extremely
            confusing for children. Another task was to expand the app&apos;s
            functionality by implementing a new block of features with
            educational games
          </p>
        </CaseTextBlock>
      </article>

      <button className="portfolio-case-back" onClick={onBack} type="button">
        <span className="portfolio-case-back__inner">
          <Image
            alt=""
            aria-hidden="true"
            height={20}
            src="/case-back-arrow-square-left.svg"
            width={20}
          />
          <span>Back</span>
        </span>
      </button>
    </section>
  );
}

function CaseTextBlock({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="portfolio-case__text-block">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
