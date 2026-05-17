import Image from "next/image";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type CaseItemVisualState = "default" | "hover";

export type CaseItemProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  caseType?: string;
  title?: string;
  visualState?: CaseItemVisualState;
  year?: string;
};

export function CaseItem({
  caseType = "web interface",
  className,
  href = "#",
  title = "Worldclass",
  visualState = "default",
  year = "2026",
  ...props
}: CaseItemProps) {
  return (
    <a
      className={cn("portfolio-case-item", className)}
      data-visual-state={visualState}
      href={href}
      {...props}
    >
      <span className="portfolio-case-item__content">
        <span className="portfolio-case-item__title">{title}</span>
        <span className="portfolio-case-item__meta">
          <span>{caseType}</span>
          <span aria-hidden="true" className="portfolio-case-item__dot" />
          <span>{year}</span>
        </span>
      </span>
      <span className="portfolio-case-item__icon" aria-hidden="true">
        <Image
          alt=""
          className="portfolio-case-item__icon-image portfolio-case-item__icon-image--default"
          height={20}
          src="/case-item-export-default.svg"
          width={20}
        />
        <Image
          alt=""
          className="portfolio-case-item__icon-image portfolio-case-item__icon-image--hover"
          height={20}
          src="/case-item-export-hover.svg"
          width={20}
        />
      </span>
    </a>
  );
}

export const caseItemStates: {
  id: CaseItemVisualState;
  label: string;
}[] = [
  { id: "default", label: "Default" },
  { id: "hover", label: "Hover" },
];
