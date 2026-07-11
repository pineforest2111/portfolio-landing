"use client";

import Image from "next/image";
import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type NavigationBarItemId = "about" | "works" | "concepts";

export type NavigationBarItem = {
  borderScaleX: number;
  href?: string;
  id: NavigationBarItemId;
  label: string;
  selectedIcon: string;
  unselectedIcon: string;
  width: number;
};

export type NavigationBarProps = HTMLAttributes<HTMLElement> & {
  activeItem?: NavigationBarItemId;
  items?: NavigationBarItem[];
  onItemSelect?: (item: NavigationBarItemId) => void;
};

export const navigationBarItems: NavigationBarItem[] = [
  {
    borderScaleX: -5.6662,
    id: "about",
    label: "Обо мне",
    selectedIcon: "/navbar-about-selected.svg",
    unselectedIcon: "/navbar-about-unselected.svg",
    width: 107,
  },
  {
    borderScaleX: -5.7722,
    id: "works",
    label: "Кейсы",
    selectedIcon: "/navbar-works-selected.svg",
    unselectedIcon: "/navbar-works-unselected.svg",
    width: 109,
  },
  {
    borderScaleX: -7.096,
    id: "concepts",
    label: "Концепты",
    selectedIcon: "/navbar-concepts-selected.svg",
    unselectedIcon: "/navbar-concepts-unselected.svg",
    width: 134,
  },
];

export function NavigationBar({
  activeItem = "about",
  className,
  items = navigationBarItems,
  onItemSelect,
  ...props
}: NavigationBarProps) {
  return (
    <nav
      aria-label="Portfolio sections"
      className={cn("portfolio-navigation-bar", className)}
      {...props}
    >
      {items.map((item) => (
        <NavigationBarSegment
          item={item}
          key={item.id}
          onSelect={onItemSelect}
          selected={item.id === activeItem}
        />
      ))}
    </nav>
  );
}

function NavigationBarSegment({
  item,
  onSelect,
  selected,
}: {
  item: NavigationBarItem;
  onSelect?: (item: NavigationBarItemId) => void;
  selected: boolean;
}) {
  return (
    <button
      aria-current={selected ? "page" : undefined}
      className="portfolio-navigation-bar__segment"
      data-selected={selected}
      onClick={() => onSelect?.(item.id)}
      style={
        {
          "--navigation-segment-border-scale-x": item.borderScaleX,
          "--navigation-segment-width": `${item.width}px`,
        } as CSSProperties
      }
      type="button"
    >
      <span className="portfolio-navigation-bar__segment-bg">
        <span className="portfolio-navigation-bar__icons" aria-hidden="true">
          <Image
            alt=""
            className="portfolio-navigation-bar__icon portfolio-navigation-bar__icon--unselected"
            height={20}
            priority
            src={item.unselectedIcon}
            width={20}
          />
          <Image
            alt=""
            className="portfolio-navigation-bar__icon portfolio-navigation-bar__icon--selected"
            height={20}
            priority
            src={item.selectedIcon}
            width={20}
          />
        </span>
        <span>{item.label}</span>
      </span>
    </button>
  );
}
