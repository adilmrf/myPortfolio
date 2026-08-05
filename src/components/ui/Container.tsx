import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** `wide` for the header bar, `default` for page content, `prose` for long text. */
  width?: "default" | "wide" | "prose";
  className?: string;
};

/**
 * 1120px — wider than a typical text-led site, because this design is column-
 * and table-led and needs the room. Running prose never uses the full width:
 * it is capped separately at 62ch.
 */
const WIDTHS = {
  default: "max-w-[1120px]",
  wide: "max-w-[1120px]",
  prose: "max-w-[62ch]",
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
