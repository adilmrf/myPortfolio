/**
 * The end-capped section divider: a 1px rule with 3px solid caps.
 *
 * One between major sections. Never two in a row, and never inside a panel.
 */
export default function Rule({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center ${className}`}>
      <span className="h-[3px] w-[3px] shrink-0 bg-line-strong" />
      <span className="h-px flex-1 bg-line-strong" />
      <span className="h-[3px] w-[3px] shrink-0 bg-line-strong" />
    </div>
  );
}
