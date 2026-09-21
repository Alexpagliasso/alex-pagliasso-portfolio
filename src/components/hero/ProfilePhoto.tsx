import { useEffect, useRef } from "react";
import { animate } from "framer-motion";
import photo from "../../assets/profile-pixel.png";

export function ProfilePhoto() {
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
      x = (event.clientX / innerWidth - 0.5) * 5;
      y = (event.clientY / innerHeight - 0.5) * 5;
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          animation?.stop();
          if (ref.current)
            animation = animate(ref.current, { x, y }, { duration: 0.5 });
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
    <div className="hero-card">
      <div ref={ref} className="photo-tracking">
        <div className="photo-wrap">
          <img
            src={photo}
            alt="Foto profilo di Alex Pagliasso"
            width={330}
            height={330}
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="status">
        <i aria-hidden="true" />
        currently building
      </div>
    </div>
  );
}
