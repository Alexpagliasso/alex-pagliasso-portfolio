import { useEffect, useRef, type ReactNode } from "react";
import { animate } from "framer-motion";

interface CardProps {
  className?: string;
  children: ReactNode;
}
export function Card({ className = "", children }: CardProps) {
  const ref = useRef<HTMLElement>(null);
  const animation = useRef<ReturnType<typeof animate> | null>(null);
  const frame = useRef(0);
  const allowed = () =>
    matchMedia("(prefers-reduced-motion: no-preference)").matches;
  const reset = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    animation.current?.cancel();
    if (ref.current) {
      ref.current.style.removeProperty("--glow-x");
      ref.current.style.removeProperty("--glow-y");
    }
  };
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", reset);
    return () => {
      reset();
      preference.removeEventListener("change", reset);
    };
  }, []);
  return (
    <article
      ref={ref}
      className={`card ${className}`}
      onPointerEnter={(event) => {
        if (
          event.pointerType !== "mouse" ||
          !allowed() ||
          !matchMedia(
            "(min-width: 781px) and (hover: hover) and (pointer: fine)",
          ).matches
        )
          return;
        animation.current = animate(
          event.currentTarget,
          { y: -4, scale: className === "project" ? 1.008 : 1 },
          { duration: 0.18 },
        );
      }}
      onPointerMove={(event) => {
        if (
          className !== "project" ||
          event.pointerType !== "mouse" ||
          !allowed() ||
          !matchMedia(
            "(min-width: 781px) and (hover: hover) and (pointer: fine)",
          ).matches
        )
          return;
        const element = event.currentTarget;
        const x = event.clientX,
          y = event.clientY;
        if (!frame.current)
          frame.current = requestAnimationFrame(() => {
            frame.current = 0;
            const rect = element.getBoundingClientRect();
            element.style.setProperty("--glow-x", `${x - rect.left}px`);
            element.style.setProperty("--glow-y", `${y - rect.top}px`);
          });
      }}
      onPointerDown={(event) => {
        if (
          !["project", "activity-card"].includes(className) ||
          event.pointerType !== "touch" ||
          !allowed()
        )
          return;
        animation.current?.cancel();
        animation.current = animate(
          event.currentTarget,
          { scale: [1, 0.99, 1] },
          { duration: 0.18 },
        );
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </article>
  );
}
