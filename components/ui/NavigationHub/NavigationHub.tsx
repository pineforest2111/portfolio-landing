"use client";

import Image from "next/image";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { InfoWidget } from "@/components/ui/InfoWidget";
import {
  NavigationBar,
  type NavigationBarItemId,
} from "@/components/ui/NavigationBar";
import { cn } from "@/lib/utils";

export type NavigationHubState =
  | "default"
  | "showreel-hover"
  | "cv-hover"
  | "widget-hover"
  | "collapsed";

export type NavigationHubProps = HTMLAttributes<HTMLDivElement> & {
  activeItem?: NavigationBarItemId;
  mode?: "full" | "navigation";
  onItemSelect?: (item: NavigationBarItemId) => void;
  state?: NavigationHubState;
};

export function NavigationHub({
  activeItem = "about",
  className,
  mode = "full",
  onItemSelect,
  state,
  ...props
}: NavigationHubProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [internalState, setInternalState] =
    useState<NavigationHubState>("default");
  const currentState = state ?? internalState;
  const isControlled = state !== undefined;
  const isCollapsed = currentState === "collapsed";

  const setExpanded = (expanded: boolean) => {
    if (!isControlled) {
      setInternalState(expanded ? "collapsed" : "default");
    }
  };

  useEffect(() => {
    if (isControlled || currentState !== "collapsed") {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [currentState, isControlled]);

  if (mode === "navigation") {
    return (
      <div
        className={cn(
          "portfolio-navigation-hub portfolio-navigation-hub--navigation",
          className,
        )}
        {...props}
      >
        <NavigationBar
          activeItem={activeItem}
          onItemSelect={onItemSelect}
        />
      </div>
    );
  }

  return (
    <div
      className={cn("portfolio-navigation-hub", className)}
      data-state={currentState}
      ref={rootRef}
      {...props}
    >
      {isCollapsed ? (
        <>
          <InfoWidget variant="expanded" />
          <CloseSegment onClick={() => setExpanded(false)} />
        </>
      ) : (
        <>
          <MicroWidget
            className="portfolio-navigation-hub__micro--showreel"
            expanded={currentState === "showreel-hover"}
            type="showreel"
          />
          <MicroWidget
            className="portfolio-navigation-hub__micro--cv"
            expanded={currentState === "cv-hover"}
            type="cv"
          />
          <div className="portfolio-navigation-hub__widget">
            <InfoWidget
              aria-label="Open Roma Osipov details"
              onClick={() => setExpanded(true)}
              variant="compact"
            />
          </div>
          <NavigationBar
            activeItem={activeItem}
            onItemSelect={onItemSelect}
          />
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

  return (
    <a
      aria-label={isShowreel ? "Open showreel" : "Open CV PDF"}
      className={cn("portfolio-navigation-hub__micro", className)}
      data-expanded={expanded}
      href={
        isShowreel
          ? "https://drive.google.com/file/d/10rtY42NRzh94PVRuXOQ0QvJpB_C1x1m7/view?usp=sharing"
          : "https://drive.google.com/file/d/1cibmwtwtp0VnAqhU7wOAD7hCkTdmhxmB/view?usp=sharing"
      }
      rel="noreferrer"
      target="_blank"
    >
      {content}
    </a>
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
