import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export function BackgroundGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const allowed = matchMedia(
      "(min-width: 781px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let animation: ReturnType<typeof animate> | undefined;
    let frame = 0;
    let x = 0,
      y = 0;
    const move = (event: PointerEvent) => {
      if (!allowed.matches || event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          animation?.stop();
          if (ref.current)
            animation = animate(
              ref.current,
              { x, y },
              { duration: 0.8, ease: "easeOut" },
            );
        });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      animation?.cancel();
    };
    window.addEventListener("pointermove", move, { passive: true });
    allowed.addEventListener("change", reset);
    return () => {
      reset();
      window.removeEventListener("pointermove", move);
      allowed.removeEventListener("change", reset);
    };
  }, []);
  return (
    <div className="background-glow" aria-hidden="true">
      <div ref={ref} />
    </div>
  );
}
