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
    label: "About",
    selectedIcon: "/navbar-about-selected.svg",
    unselectedIcon: "/navbar-about-unselected.svg",
    width: 107,
  },
  {
    borderScaleX: -5.7722,
    id: "works",
    label: "Works",
    selectedIcon: "/navbar-works-selected.svg",
    unselectedIcon: "/navbar-works-unselected.svg",
    width: 109,
  },
  {
    borderScaleX: -7.096,
    id: "concepts",
    label: "Concepts",
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
  const icon = selected ? item.selectedIcon : item.unselectedIcon;

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
        <Image alt="" aria-hidden="true" height={20} src={icon} width={20} />
        <span>{item.label}</span>
      </span>
    </button>
  );
}
