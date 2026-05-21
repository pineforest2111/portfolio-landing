"use client";

import Image from "next/image";
import type {
  CSSProperties,
  MouseEvent,
  ReactNode,
  UIEvent,
  WheelEvent,
} from "react";
import { useEffect, useRef, useState } from "react";
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

export function PortfolioPage() {
  const [activeSection, setActiveSection] = useState<PortfolioSection>("about");

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeConceptIndex, setActiveConceptIndex] = useState(
    defaultActiveConceptIndex,
  );

  useEffect(() => {
    if (!isActive) {
      setIsGalleryOpen(false);
      setActiveConceptIndex(defaultActiveConceptIndex);
    }
  }, [isActive]);

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
    }
  };

  const handleScroll = (event: UIEvent<HTMLElement>) => {
    if (!isGalleryOpen) {
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
            shouldLoadMedia={isActive}
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
          </div>
          <ul className="portfolio-case__meta" aria-label="Project tags">
            <li>Mobile app</li>
            <li>Global update</li>
            <li>iOS &amp; Android</li>
            <li>EdTech</li>
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

        <CaseTextBlock title="Context">
          <p>
            Myskazka is a mobile app for children aged 2-8, featuring
            personalized audio stories with AI-powered plot adaptation,
            educational mini-games, and a virtual assistant called “Whybot.”
          </p>
          <p>
            The product helps parents calm their child before bedtime and keep
            them engaged with developmental content.
          </p>
        </CaseTextBlock>

        <CaseTextBlock title="Problem">
          <p>
            The MVP interface had been designed without fully considering the
            target audience: children under 8.
          </p>
          <p>
            Parents mentioned in reviews that children did not understand where
            to tap; fairy tale personalization required entering parameters
            again before every story; and the AI assistant, Whybot, was useless
            for children who could not type yet.
          </p>
        </CaseTextBlock>

        <CaseTextBlock title="My Role">
          <p>
            I was the only designer on the project and covered the full cycle:
            from UX audit and research to final design review and promotional
            assets for the app stores.
          </p>
        </CaseTextBlock>

        <section className="portfolio-case__callout">
          <h2>Скиллсет:</h2>
          <p>
            Product design · UX Research · Prototyping · Motion / C4D+MJ · App
            Store Assets
          </p>
        </section>

        <CaseTextBlock title="Research">
          <ul>
            <li>
              Изучил большой массив отзывов родителей из сторов и внутренней
              базы. Провёл 12 глубинных интервью — проверял гипотезу о
              необходимости музыкального блока (колыбельные, развлекательная
              музыка). Пообщался с пользователями старой версии, зафиксировал
              Job Stories. Построил CJM, чтобы найти точки отвала при
              персонализации сказок.
            </li>
            <li>
              Конкурентный анализ Изучил механики: Little Stories, Storiezzz,
              Story Machine, Dream Stories, Epic!, Bedtime, Duolingo Math —
              зафиксировал лучшие паттерны вовлечения и монетизации.
            </li>
            <li>
              UX-аудит Провёл аудит старой версии, классифицировал проблемы по
              критичности и определил приоритет задач для первого релиза.
            </li>
          </ul>
        </CaseTextBlock>

        <section className="portfolio-case__callout portfolio-case__callout--title">
          <h2>Решения</h2>
        </section>

        <CaseSolutionBlock title="Main Screen — Feed Instead of Catalog">
          <p>
            <strong>Problem:</strong>
            <br />
            The main screen was dominated by a large accent banner featuring the
            AI assistant, even though it was a secondary feature. Bright filter
            buttons distracted users, while story cards had no covers, so
            children ignored them.
          </p>
          <p>
            <strong>Solution:</strong>
            <br />I redesigned the main screen into a dynamic content feed:
            recommended stories, folk tales, the Whybot banner, and game cards
            — all combined into one scrollable experience.
          </p>
          <p>
            Bright animated covers were used to attract the child’s attention.
          </p>
          <p>
            <strong>Testing insight:</strong>
            <br />
            Children ignored almost all UI elements and simply scrolled down,
            tapping the cover they liked. This confirmed the decision to remove
            filters from the main screen and focus on visual content.
          </p>
          <CaseFigure
            alt="MySkazka main screen feed video"
            mediaType="video"
            src="/videos/tale%20shot.mp4"
          />
        </CaseSolutionBlock>

        <CaseSolutionBlock title="Fairy Tale as an Interactive Audio Story">
          <p>
            <strong>Problem:</strong>
            <br />
            Stories were played in a horizontal text-based format, which was
            inconvenient for both reading and listening.
          </p>
          <p>
            <strong>Solution:</strong>
            <br />I transformed the fairy tale experience into an audio story
            with animated scenes and changing characters.
          </p>
          <p>
            The audio version starts by default, while the text mode remains
            optional.
          </p>
          <p>
            <strong>Testing insight:</strong>
            <br />
            After a story ended, children did not want to move on to the next
            one — they wanted to listen to the same story again.
          </p>
          <p>
            I adjusted the final screen accordingly: instead of making “next
            story” the primary action, I added “listen again” as the main CTA,
            with the next story as a secondary option.
          </p>
          <CaseFigure
            alt="Fairy Tale as an Interactive Audio Story"
            src="/images/Fairy%20Tale%20as%20an%20Interactive%20Audio%20Story.png"
          />
        </CaseSolutionBlock>

        <CaseSolutionBlock
          subtitle="One-Time Questionnaire Instead of Repeated Input"
          title="Personalization"
        >
          <p>
            <strong>Problem:</strong>
            <br />
            The app’s killer feature — adapting the plot to the child’s
            parameters — was barely used.
          </p>
          <p>
            Users had to enter parameters again before every story. There were
            too many of them, and each story had its own individual set.
          </p>
          <p>
            <strong>Solution:</strong>
            <br />I mapped all parameters across all stories and identified the
            most frequently used ones.
          </p>
          <p>
            Then I designed a single questionnaire that is filled in once and
            works across the entire app.
          </p>
          <p>
            The completion time was limited to 1.5-2 minutes. Text input was
            replaced with chip selection based on popular answers.
          </p>
          <CaseFigure
            alt="MySkazka personalization questionnaire video"
            mediaType="video"
            src="/videos/question%202.mp4"
          />
        </CaseSolutionBlock>

        <CaseSolutionBlock
          subtitle="Specific Value Instead of Abstract Benefits"
          title="Subscription Screen"
        >
          <p>
            <strong>Problem:</strong>
            <br />
            The CTA button and the close button had the same level of visual
            emphasis.
          </p>
          <p>
            The subscription points did not explain what exactly the user would
            get, and the screen looked visually dull.
          </p>
          <p>
            <strong>Solution:</strong>
            <br />I rewrote the subscription points to be more concrete: what
            features would be unlocked, how many stories would become available,
            and what additional functionality users would get.
          </p>
          <p>
            I also rebuilt the visual hierarchy between the CTA and the close
            button.
          </p>
          <p>
            <strong>Hypothesis, not yet validated in release:</strong>
            <br />A haptic micro-vibration combined with a color pulse along the
            screen edges creates a feeling of “magical immersion” and should
            have a positive impact on conversion.
          </p>
          <p>This will be tested after launch.</p>
          <CaseFigure variant="gray" />
        </CaseSolutionBlock>

        <CaseSolutionBlock
          subtitle="Interface for Both Child and Parent"
          title="Dual Audience"
        >
          <p>
            <strong>Problem:</strong>
            <br />
            The interface was the same for both the child and the parent, with
            no clear system of visual priorities.
          </p>
          <p>
            Personalization settings and service features competed with playful
            content.
          </p>
          <p>
            <strong>Solution:</strong>
            <br />I introduced large, soft, “plump” CTAs for child-oriented
            scenarios: playing a game, listening to a story, or interacting with
            Whybot.
          </p>
          <p>
            Settings and personalization were visually muted and moved into the
            parent-oriented area.
          </p>
          <p>
            As a result, the child sees a simple linear scenario, while the
            parent manages configuration separately.
          </p>
          <p>
            <strong>Insight:</strong>
            <br />
            Since animated covers attracted children more than buttons, I added
            the ability to start a story by tapping the cover, not only the CTA.
          </p>
          <CaseFigure
            alt="Dual Audience interface"
            src="/images/Dual%20Audience.png"
          />
        </CaseSolutionBlock>

        <CaseSolutionBlock
          subtitle="From Chatbot to Full-Fledged Character"
          title="Whybot"
        >
          <p>
            <strong>Problem:</strong>
            <br />
            The AI assistant felt impersonal and only provided text-based
            answers.
          </p>
          <p>
            It also ignored a key use case: children who cannot type yet could
            not use it properly.
          </p>
          <p>
            <strong>Solution:</strong>
            <br />I created a mascot with personality: a 3D character made with
            C4D + Midjourney, supported by a set of animations.
          </p>
          <p>Answers are available in both text and audio formats.</p>
          <p>
            I also added an “Interesting Facts” mode. When Whybot opens, it
            shows cards with facts about the world by default, allowing the
            child to interact with the character without needing to type.
          </p>
          <CaseFigure variant="gray" />
        </CaseSolutionBlock>

        <CaseTextBlock title="Status and Result">
          <p>The product is currently in a test version on iOS and Android.</p>
          <p>
            I completed 5 bug review iterations, prepared promotional materials,
            and updated the app icon for the stores. The new version is planned
            to launch in late 2024.
          </p>
        </CaseTextBlock>

        <CaseTextBlock title="Metrics to track after release">
          <p>
            subscription conversion on the paywall screen, D1/D7 retention,
            session duration before and after the redesign, and usage of the
            personalization feature.
          </p>
        </CaseTextBlock>

        <CaseSolutionBlock
          subtitle="Some UI, mockups, generative graphics and funy live shots from project"
          title="One more thing..."
        >
          <CaseFigure alt="MySkazka icon set" src="/images/icons.png" />
          <CaseFigure alt="MySkazka live shot in grass" src="/images/grass.png" />
          <CaseFigure alt="MySkazka tag graphics" src="/images/tags.png" />
        </CaseSolutionBlock>
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

function CaseSolutionBlock({
  children,
  subtitle,
  title,
}: {
  children: ReactNode;
  subtitle?: string;
  title: string;
}) {
  return (
    <section className="portfolio-case__solution-block">
      <h2>{title}</h2>
      {subtitle ? <p className="portfolio-case__subtitle">{subtitle}</p> : null}
      <div className="portfolio-case__solution-copy">{children}</div>
    </section>
  );
}

function CaseFigure({
  alt = "",
  compact = false,
  mediaType = "image",
  src,
  variant = "image",
}: {
  alt?: string;
  compact?: boolean;
  mediaType?: "image" | "video";
  src?: string;
  variant?: "gray" | "image" | "placeholder";
}) {
  if (!src) {
    return (
      <div
        aria-hidden="true"
        className={`portfolio-case__figure portfolio-case__figure--${variant}`}
      />
    );
  }

  return (
    <div
      className={`portfolio-case__figure ${
        compact ? "portfolio-case__figure--compact" : ""
      }`.trim()}
    >
      {mediaType === "video" ? (
        <video
          aria-label={alt}
          autoPlay
          className="portfolio-case__figure-video"
          loop
          muted
          playsInline
          preload="metadata"
          src={src}
        />
      ) : (
        <Image
          alt={alt}
          className="portfolio-case__figure-image"
          fill
          sizes={compact ? "(max-width: 767px) 50vw, 288px" : "588px"}
          src={src}
        />
      )}
    </div>
  );
}
