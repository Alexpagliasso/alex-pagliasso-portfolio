import type { ReactNode } from "react";
import { usePortfolioMotion } from "../motion/usePortfolioMotion";
import { sectionOrder, type SectionId } from "../../data/sections";

interface SectionProps {
  id: SectionId;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}

export function Section({
  id,
  eyebrow,
  title,
  children,
}: SectionProps) {
  const ref = usePortfolioMotion("section");
  return (
    <section
      ref={ref}
      className="section"
      id={id}
      aria-labelledby={`${id}-title`}
    >
      {eyebrow && <div className="eyebrow section-eyebrow">{eyebrow}</div>}
      <div className="section-title">
        <code>{String(sectionOrder.indexOf(id)).padStart(2, "0")}</code>
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
      {children}
    </section>
  );
}
