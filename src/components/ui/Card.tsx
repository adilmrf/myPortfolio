import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Render as a different element, e.g. `article` or `li`. */
  as?: ElementType;
  /** Adds a hover lift. Only use when the whole card is a link. */
  interactive?: boolean;
  className?: string;
};

/**
 * The standard bordered surface. Replaces the card class string that was
 * previously repeated across eight call sites.
 */
export default function Card({
  children,
  as: Tag = "div",
  interactive = false,
  className = "",
}: Props) {
  return (
    <Tag
      className={[
        "rounded-lg border border-line bg-surface-raised p-5",
        interactive
          ? "transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lg hover:shadow-black/5"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
