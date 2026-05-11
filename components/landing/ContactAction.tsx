"use client";

import { Button, type ButtonProps } from "@/components/ui/Button";

type ContactActionProps = Omit<ButtonProps, "onClick" | "type">;

export function ContactAction(props: ContactActionProps) {
  return (
    <Button
      {...props}
      onClick={() => {
        window.location.href = "mailto:hello@romaosipov.com";
      }}
      type="button"
    />
  );
}
