import Image from "next/image";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { CaseItem, type CaseItemVisualState } from "@/components/ui/CaseItem";

export type ProjectWidgetVisualState = "default" | "hover";

export type ProjectWidgetItemId =
  | "worldclass"
  | "myskazka"
  | "vk-team"
  | "hr-portal";

export type ProjectWidgetCaseItem = {
  caseType: string;
  href?: string;
  id: ProjectWidgetItemId;
  title: string;
  year: string;
};

export type ProjectWidgetProps = HTMLAttributes<HTMLDivElement> & {
  highlightedItem?: ProjectWidgetItemId;
  items?: ProjectWidgetCaseItem[];
  visualState?: ProjectWidgetVisualState;
};

export const projectWidgetItems: ProjectWidgetCaseItem[] = [
  {
    caseType: "web interface",
    href: "#worldclass",
    id: "worldclass",
    title: "Worldclass",
    year: "2026",
  },
  {
    caseType: "mobile app",
    href: "#myskazka",
    id: "myskazka",
    title: "MySkazka",
    year: "2025",
  },
  {
    caseType: "web interface",
    href: "#vk-team",
    id: "vk-team",
    title: "VK team",
    year: "2024",
  },
  {
    caseType: "web interface",
    href: "#hr-portal",
    id: "hr-portal",
    title: "HR portal",
    year: "2023",
  },
];

export const projectWidgetStates: {
  id: ProjectWidgetVisualState;
  highlightedItem?: ProjectWidgetItemId;
  label: string;
}[] = [
  { id: "default", label: "Default" },
  { highlightedItem: "myskazka", id: "hover", label: "Hover" },
];

const cardData = [
  {
    className: "portfolio-project-widget__card-wrap--hr",
    height: 328,
    image: "/project-widget-folder-img-1.png",
    title: "HR Portal card",
    width: 432,
  },
  {
    className: "portfolio-project-widget__card-wrap--worldclass",
    height: 328,
    image: "/project-widget-folder-img-3.png",
    title: "Worldclass card",
    width: 432,
  },
  {
    className: "portfolio-project-widget__card-wrap--myskazka",
    height: 324,
    image: "/project-widget-folder-img-2.png",
    title: "MySkazka card",
    width: 427,
  },
];

export function ProjectWidget({
  className,
  highlightedItem,
  items = projectWidgetItems,
  visualState = "default",
  ...props
}: ProjectWidgetProps) {
  return (
    <div
      className={cn("portfolio-project-widget", className)}
      data-visual-state={visualState}
      {...props}
    >
      <div className="portfolio-project-widget__cards" aria-hidden="true">
        {cardData.map((card) => (
          <div
            className={cn(
              "portfolio-project-widget__card-wrap",
              card.className,
            )}
            key={card.title}
          >
            <Image
              alt=""
              className="portfolio-project-widget__card-image"
              height={card.height}
              src={card.image}
              width={card.width}
            />
          </div>
        ))}
      </div>

      <div className="portfolio-project-widget__folder" aria-hidden="true">
        <Image
          alt=""
          className="portfolio-project-widget__folder-shadow portfolio-project-widget__folder-layer--default"
          height={402}
          src="/project-widget-folder-shadow-default.png"
          width={414}
        />
        <Image
          alt=""
          className="portfolio-project-widget__folder-shadow portfolio-project-widget__folder-layer--hover"
          height={406}
          src="/project-widget-folder-shadow-hover.png"
          width={418}
        />
        <Image
          alt=""
          className="portfolio-project-widget__folder-body portfolio-project-widget__folder-layer--default"
          height={358}
          src="/project-widget-folder-default.svg"
          width={370}
        />
        <Image
          alt=""
          className="portfolio-project-widget__folder-body portfolio-project-widget__folder-layer--hover"
          height={362}
          src="/project-widget-folder-hover.svg"
          width={374}
        />
      </div>

      <div className="portfolio-project-widget__list">
        {items.map((item) => {
          const itemState: CaseItemVisualState =
            visualState === "hover" && highlightedItem === item.id
              ? "hover"
              : "default";

          return (
            <CaseItem
              caseType={item.caseType}
              className="portfolio-project-widget__case"
              href={item.href}
              key={item.id}
              title={item.title}
              visualState={itemState}
              year={item.year}
            />
          );
        })}
      </div>
    </div>
  );
}
