import Image from "next/image";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InfoWidgetVariant = "compact" | "expanded";

export type InfoWidgetProps = HTMLAttributes<HTMLElement> & {
  variant?: InfoWidgetVariant;
};

const stats = [
  {
    icon: "/info-widget-pen-tool.svg",
    label: (
      <>
        5 years <br />
        of experience
      </>
    ),
  },
  {
    icon: "/info-widget-ranking.svg",
    label: (
      <>
        Runet Award <br />
        2025 nomination
      </>
    ),
  },
  {
    icon: "/info-widget-global.svg",
    label: (
      <>
        Remote <br />
        work
      </>
    ),
  },
] as const;

const tags = [
  "UX research",
  "UI design",
  "3d graphic (c4d)",
  "Motion design",
  "AI-graphic",
  "No code development",
  "Vibe-coding",
] as const;

export function InfoWidget({
  className,
  variant = "compact",
  ...props
}: InfoWidgetProps) {
  if (variant === "expanded") {
    return (
      <section
        className={cn("portfolio-info-widget-expanded", className)}
        aria-labelledby="info-widget-expanded-title"
        {...props}
      >
        <div className="portfolio-info-widget-expanded__avatar">
          <Image
            alt="Рома Осипов"
            className="portfolio-info-widget-expanded__avatar-image"
            height={133}
            priority
            src="/info-widget-avatar-optimized.jpg"
            width={109}
          />
        </div>
        <div className="portfolio-info-widget-expanded__badge">
          <Image
            alt=""
            aria-hidden="true"
            height={36}
            priority
            src="/logo.png"
            width={36}
          />
        </div>

        <div className="portfolio-info-widget-expanded__content">
          <h2 id="info-widget-expanded-title">About me</h2>
          <div className="portfolio-info-widget-expanded__copy">
            <p>
              Now I&apos;m Lead UX/UI designer at studio{" "}
              <a
                href="https://www.zephyrlab.ru/"
                rel="noreferrer"
                target="_blank"
              >
                Zephyrlab
              </a>
              , <br />
              Ex art-director and mentor at design school{" "}
              <a
                href="https://wannabe.ru/"
                rel="noreferrer"
                target="_blank"
              >
                Wannabe
              </a>
            </p>
          </div>
        </div>

        <div
          aria-label="Skills"
          className="portfolio-info-widget-expanded__tags"
        >
          {tags.map((tag) => (
            <span className="portfolio-info-widget-expanded__tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="portfolio-info-widget-expanded__stats">
          {stats.map((item, index) => (
            <div className="portfolio-info-widget-expanded__stat" key={index}>
              <Image
                alt=""
                aria-hidden="true"
                height={24}
                priority
                src={item.icon}
                width={24}
              />
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <button
      className={cn("portfolio-info-widget-compact", className)}
      type="button"
      {...props}
    >
      <span className="portfolio-info-widget-compact__inner">
        <span className="portfolio-info-widget-compact__avatar">
          <Image
            alt="Roma Osipov"
            className="portfolio-info-widget-compact__avatar-image"
            height={154}
            priority
            src="/info-widget-avatar-optimized.jpg"
            width={123}
          />
        </span>
        <span className="portfolio-info-widget-compact__copy">
          <span className="portfolio-info-widget-compact__title">
            Я Рома Осипов
          </span>
          <span className="portfolio-info-widget-compact__description">
            Продуктовый дизайнер, 5 лет опыта <br />
            работал как с веб, так и мобильными <br />
            продуктами
          </span>
        </span>
      </span>
    </button>
  );
}
