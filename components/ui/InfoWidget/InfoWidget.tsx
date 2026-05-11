import Image from "next/image";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InfoWidgetVariant = "compact" | "expanded";

export type InfoWidgetProps = HTMLAttributes<HTMLDivElement> & {
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
            alt="Roma Osipov"
            className="portfolio-info-widget-expanded__avatar-image"
            height={133}
            src="/info-widget-avatar.jpg"
            width={109}
          />
        </div>
        <div className="portfolio-info-widget-expanded__badge">
          <Image
            alt=""
            aria-hidden="true"
            height={19}
            src="/info-widget-badge-mark.svg"
            width={19}
          />
        </div>

        <div className="portfolio-info-widget-expanded__content">
          <h2 id="info-widget-expanded-title">About me</h2>
          <div className="portfolio-info-widget-expanded__copy">
            <p>Multidisciplinary product designer</p>
            <p>
              Lead UX/UI &amp; 3D Designer at{" "}
              <a
                href="https://www.zephyrlab.ru/"
                rel="noreferrer"
                target="_blank"
              >
                Zephyrlab
              </a>
            </p>
            <p>
              Ex art-director and mentor <br />
              at design school{" "}
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

        <div className="portfolio-info-widget-expanded__stats">
          {stats.map((item, index) => (
            <div className="portfolio-info-widget-expanded__stat" key={index}>
              <Image
                alt=""
                aria-hidden="true"
                height={24}
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
    <button className={cn("portfolio-info-widget-compact", className)} type="button">
      <span className="portfolio-info-widget-compact__inner">
        <span className="portfolio-info-widget-compact__avatar">
          <Image
            alt="Roma Osipov"
            className="portfolio-info-widget-compact__avatar-image"
            height={154}
            src="/info-widget-avatar.jpg"
            width={123}
          />
        </span>
        <span className="portfolio-info-widget-compact__copy">
          <span className="portfolio-info-widget-compact__title">
            I&apos;m Roma Osipov
          </span>
          <span className="portfolio-info-widget-compact__description">
            Create powerful, interactive interfaces <br />
            based on reseach and deep dive <br />
            with strong visual and 3d stuff
          </span>
        </span>
      </span>
    </button>
  );
}
