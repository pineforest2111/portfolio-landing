import Image from "next/image";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { InfoWidget } from "@/components/ui/InfoWidget";
import { NavigationBar } from "@/components/ui/NavigationBar";
import { cn } from "@/lib/utils";

export type NavigationHubState =
  | "default"
  | "showreel-hover"
  | "cv-hover"
  | "widget-hover"
  | "collapsed";

export type NavigationHubProps = HTMLAttributes<HTMLDivElement> & {
  state?: NavigationHubState;
};

export function NavigationHub({
  className,
  state = "default",
  ...props
}: NavigationHubProps) {
  const isCollapsed = state === "collapsed";

  return (
    <div
      className={cn("portfolio-navigation-hub", className)}
      data-state={state}
      {...props}
    >
      {isCollapsed ? (
        <>
          <InfoWidget variant="expanded" />
          <CloseSegment />
        </>
      ) : (
        <>
          <MicroWidget
            className="portfolio-navigation-hub__micro--showreel"
            expanded={state === "showreel-hover"}
            type="showreel"
          />
          <MicroWidget
            className="portfolio-navigation-hub__micro--cv"
            expanded={state === "cv-hover"}
            type="cv"
          />
          <div className="portfolio-navigation-hub__widget">
            <InfoWidget variant="compact" />
          </div>
          <NavigationBar />
        </>
      )}
    </div>
  );
}

function MicroWidget({
  className,
  expanded = false,
  type,
}: {
  className?: string;
  expanded?: boolean;
  type: "showreel" | "cv";
}) {
  const isShowreel = type === "showreel";
  const content = (
    <>
      <div className="portfolio-navigation-hub-micro">
        <div className="portfolio-navigation-hub-micro__inner">
          <span className="portfolio-navigation-hub-micro__icon">
            {isShowreel ? (
              <Image
                alt=""
                aria-hidden="true"
                className="portfolio-navigation-hub-micro__image"
                height={379}
                src="/navigation-hub-showreel.png"
                width={475}
              />
            ) : (
              <span className="portfolio-navigation-hub-micro__cv-icon">
                <Image
                  alt=""
                  aria-hidden="true"
                  height={18}
                  src="/navigation-hub-cv-icon.svg"
                  width={15}
                />
              </span>
            )}
          </span>
          <span className="portfolio-navigation-hub-micro__copy">
            <span>{isShowreel ? "Showreel" : "CV"}</span>
            <span>{isShowreel ? "0:41" : "PDF"}</span>
          </span>
        </div>
      </div>
    </>
  );

  if (!isShowreel) {
    return (
      <a
        aria-label="Open CV PDF"
        className={cn("portfolio-navigation-hub__micro", className)}
        data-expanded={expanded}
        href="https://drive.google.com/file/d/1cibmwtwtp0VnAqhU7wOAD7hCkTdmhxmB/view?usp=sharing"
        rel="noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={cn("portfolio-navigation-hub__micro", className)}
      data-expanded={expanded}
    >
      {content}
    </div>
  );
}

function CloseSegment(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="portfolio-navigation-hub-close" type="button" {...props}>
      <span className="portfolio-navigation-hub-close__inner">
        <Image
          alt=""
          aria-hidden="true"
          height={20}
          src="/navigation-hub-close.svg"
          width={20}
        />
        <span>Close</span>
      </span>
    </button>
  );
}

export const navigationHubStates: {
  id: NavigationHubState;
  label: ReactNode;
}[] = [
  { id: "default", label: "Default" },
  { id: "showreel-hover", label: "Showreel hover" },
  { id: "cv-hover", label: "CV hover" },
  { id: "widget-hover", label: "Widget hover" },
  { id: "collapsed", label: "Collapsed" },
];
