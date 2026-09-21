import { useEffect, useRef } from "react";
import { animate, stagger } from "framer-motion";

// Animate only after mount/intersection. No hidden initial React or CSS state.
export function usePortfolioMotion(kind: "hero" | "section") {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const controls: ReturnType<typeof animate>[] = [];
    let observer: IntersectionObserver | undefined;
    const clear = () => {
      observer?.disconnect();
      controls.forEach((control) => control.cancel());
      controls.length = 0;
    };
    const reveal = (targets: Element | Element[], delay = 0, distance = 20) => {
      controls.push(
        animate(
          targets,
          { opacity: [0, 1], y: [distance, 0] },
          {
            duration: 0.46,
            delay: Array.isArray(targets)
              ? stagger(0.065, { startDelay: delay })
              : delay,
            ease: "easeOut",
          },
        ),
      );
    };
    if (!preference.matches) {
      if (kind === "hero") {
        const photo = root.querySelector(".hero-card")!;
        controls.push(
          animate(
            photo,
            { opacity: [0, 1], scale: [0.94, 1], y: [6, 0] },
            { duration: 0.38 },
          ),
        );
        reveal(
          Array.from(root.querySelectorAll(".eyebrow, h1, .lead")),
          0.15,
          7,
        );
        controls.push(
          animate(
            root.querySelector(".terminal")!,
            { opacity: [0, 1], y: [7, 0], filter: ["blur(2px)", "blur(0px)"] },
            { duration: 0.4, delay: 0.36 },
          ),
        );
        // Brief RGB separation, keeping the real name readable throughout.
        for (const name of root.querySelectorAll("h1, h1 span")) {
          const shadow = getComputedStyle(name).textShadow;
          controls.push(
            animate(
              name,
              { textShadow: [shadow, "1px 0 #38e8ff, -1px 0 #9d7cff", shadow] },
              { duration: 0.24, delay: 0.28 },
            ),
          );
        }
      } else if (typeof IntersectionObserver === "function") {
        observer = new IntersectionObserver(
          (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            observer?.disconnect();
            reveal(root);
            const cards = Array.from(
              root.querySelectorAll(
                ".timeline > .card, .project, .activity-card",
              ),
            );
            if (cards.length) reveal(cards, 0.06, 12);
            const illustration = root.querySelector(".pixel-workspace");
            if (illustration)
              controls.push(
                animate(
                  illustration,
                  { opacity: [0, 1], scale: [0.985, 1] },
                  { duration: 0.48, delay: 0.04, ease: "easeOut" },
                ),
              );
            const chips = Array.from(root.querySelectorAll(".stack span"));
            if (chips.length)
              controls.push(
                animate(
                  chips,
                  { opacity: [0, 1], y: [5, 0] },
                  { duration: 0.26, delay: stagger(0.018) },
                ),
              );
            const line = root.querySelector(".timeline-line");
            if (line && matchMedia("(min-width: 781px)").matches)
              controls.push(
                animate(
                  line,
                  { scaleY: [0, 1] },
                  { duration: 0.6, ease: "easeOut" },
                ),
              );
          },
          { threshold: 0, rootMargin: "0px 0px -30px 0px" },
        );
        observer.observe(root);
      }
    }
    preference.addEventListener("change", clear);
    return () => {
      clear();
      preference.removeEventListener("change", clear);
    };
  }, [kind]);
  return ref;
}
