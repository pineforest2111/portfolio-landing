import Image from "next/image";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContactButtonSize = "sm" | "md" | "lg";
type ContactButtonVisualState = "default" | "hover";

export type ContactButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  hoverLabel?: ReactNode;
  isActive?: boolean;
  isLoading?: boolean;
  size?: ContactButtonSize;
  visualState?: ContactButtonVisualState;
};

const baseClasses =
  "portfolio-contact-button group relative inline-flex shrink-0 overflow-hidden p-[2px] text-center text-white outline-none transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[#26beff] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45";

const sizeClasses: Record<ContactButtonSize, string> = {
  sm: "h-[54px] w-[130px] rounded-[19px] hover:h-[63px] hover:w-[159px] hover:rounded-[21px]",
  md: "h-[68px] w-[163px] rounded-[24px] hover:h-[79px] hover:w-[199px] hover:rounded-[26px]",
  lg: "h-[82px] w-[196px] rounded-[29px] hover:h-[95px] hover:w-[239px] hover:rounded-[31px]",
};

const lockedSizeClasses: Record<
  ContactButtonSize,
  Record<ContactButtonVisualState, string>
> = {
  sm: {
    default: "h-[54px] w-[130px] rounded-[19px]",
    hover: "h-[63px] w-[159px] rounded-[21px]",
  },
  md: {
    default: "h-[68px] w-[163px] rounded-[24px]",
    hover: "h-[79px] w-[199px] rounded-[26px]",
  },
  lg: {
    default: "h-[82px] w-[196px] rounded-[29px]",
    hover: "h-[95px] w-[239px] rounded-[31px]",
  },
};

const innerSizeClasses: Record<ContactButtonSize, string> = {
  sm: "rounded-[18px] p-[17px] hover:rounded-[20px] hover:p-[20px]",
  md: "rounded-[23px] p-[22px] hover:rounded-[25px] hover:p-[25px]",
  lg: "rounded-[28px] p-[27px] hover:rounded-[30px] hover:p-[30px]",
};

const lockedInnerSizeClasses: Record<
  ContactButtonSize,
  Record<ContactButtonVisualState, string>
> = {
  sm: {
    default: "rounded-[18px] p-[17px]",
    hover: "rounded-[20px] p-[20px]",
  },
  md: {
    default: "rounded-[23px] p-[22px]",
    hover: "rounded-[25px] p-[25px]",
  },
  lg: {
    default: "rounded-[28px] p-[27px]",
    hover: "rounded-[30px] p-[30px]",
  },
};

const defaultTextClasses: Record<ContactButtonSize, string> = {
  sm: "gap-[5px] text-[13px] leading-[1.1]",
  md: "gap-[6px] text-[16px] leading-[1.1]",
  lg: "gap-[7px] text-[19px] leading-[1.1]",
};

const hoverTextClasses: Record<ContactButtonSize, string> = {
  sm: "gap-[5px] text-[13px] leading-[1.1]",
  md: "gap-[6px] text-[16px] leading-[1.1]",
  lg: "gap-[7px] text-[19px] leading-[1.1]",
};

const defaultIconSize: Record<ContactButtonSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

const hoverIconSize: Record<ContactButtonSize, number> = {
  sm: 20,
  md: 25,
  lg: 30,
};

export function ContactButton({
  children = "Contact me",
  className,
  disabled,
  hoverLabel = "Go to telegram",
  isActive = false,
  isLoading = false,
  size = "md",
  type = "button",
  visualState,
  ...props
}: ContactButtonProps) {
  const isLockedDefault = visualState === "default";
  const isLockedHover = visualState === "hover";
  const showHover = isLockedHover || isActive;
  const dimensionClasses =
    showHover || isLockedDefault
      ? lockedSizeClasses[size][showHover ? "hover" : "default"]
      : sizeClasses[size];
  const innerDimensionClasses =
    showHover || isLockedDefault
      ? lockedInnerSizeClasses[size][showHover ? "hover" : "default"]
      : innerSizeClasses[size];

  return (
    <button
      aria-busy={isLoading || undefined}
      className={cn(
        baseClasses,
        dimensionClasses,
        isActive && "scale-[0.98]",
        className,
      )}
      data-active={isActive || undefined}
      data-visual-state={visualState}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? (
        <span
          className={cn(
            "portfolio-contact-button__bg flex size-full items-center justify-center gap-2 font-medium transition-all duration-200",
            innerDimensionClasses,
          )}
        >
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-white border-r-transparent"
          />
          Loading
        </span>
      ) : (
        <span
          className={cn(
            "portfolio-contact-button__bg relative flex size-full items-center justify-center overflow-hidden transition-all duration-200",
            innerDimensionClasses,
          )}
        >
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center font-normal transition-opacity duration-150",
              defaultTextClasses[size],
              showHover
                ? "opacity-0"
                : isLockedDefault
                  ? "opacity-100"
                  : "opacity-100 group-hover:opacity-0",
            )}
          >
            <Image
              alt=""
              aria-hidden="true"
              height={defaultIconSize[size]}
              src="/contact-message.svg"
              width={defaultIconSize[size]}
            />
            <span>{children}</span>
          </span>

          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center font-medium transition-opacity duration-150",
              hoverTextClasses[size],
              showHover
                ? "opacity-100"
                : isLockedDefault
                  ? "opacity-0"
                  : "opacity-0 group-hover:opacity-100",
            )}
          >
            <TelegramIcon size={hoverIconSize[size]} />
            <span>{hoverLabel}</span>
          </span>
        </span>
      )}
    </button>
  );
}

function TelegramIcon({ size }: { size: number }) {
  return (
    <span
      aria-hidden="true"
      className="portfolio-telegram-icon"
      style={{ height: size, width: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="portfolio-telegram-icon__plane"
        draggable={false}
        src="/telegram-frame-1.svg"
      />
    </span>
  );
}
