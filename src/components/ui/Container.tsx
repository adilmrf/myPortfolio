import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** `wide` for the header bar, `default` for page content, `prose` for long text. */
  width?: "default" | "wide" | "prose";
  className?: string;
};

const WIDTHS = {
  default: "max-w-4xl",
  wide: "max-w-5xl",
  prose: "max-w-2xl",
} as const;

/**
 * The single source of truth for horizontal page width and gutters.
 * Nothing else should set `max-w-*` + `px-*` for page-level layout.
 */
export default function Container({ children, width = "default", className = "" }: Props) {
  return (
    <div className={`mx-auto w-full ${WIDTHS[width]} px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
