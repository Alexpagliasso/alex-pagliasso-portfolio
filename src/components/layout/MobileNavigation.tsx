import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { Braces, Command, Diamond, House } from "lucide-react";
import { sectionOrder } from "../../data/sections";

const items = [
  { id: "home", label: "home", Icon: House },
  { id: "experience", label: "experience", Icon: Command },
  { id: "projects", label: "projects", Icon: Diamond },
  { id: "stack", label: "stack", Icon: Braces },
];

export function MobileNavigation() {
  const [active, setActive] = useState("home");
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const icon = ref.current?.querySelector(".active svg");
    const indicator = ref.current?.querySelector(".active .nav-indicator");
    if (!icon || !indicator) return;
    const animations = [
      animate(icon, { scale: [1, 1.08, 1] }, { duration: 0.24 }),
      animate(indicator, { scaleX: [0.6, 1] }, { duration: 0.2 }),
    ];
    const cancel = () => animations.forEach((animation) => animation.cancel());
    preference.addEventListener("change", cancel);
    return () => {
      cancel();
      preference.removeEventListener("change", cancel);
    };
  }, [active]);
  useEffect(() => {
    let frame = 0;
    const sections = ["home", ...sectionOrder.filter(id => items.some(item => item.id === id))]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const update = () => {
      frame = 0;
      const marker = Math.max(100, window.innerHeight * 0.3);
      let current = "home";
      for (const section of sections)
        if (section.getBoundingClientRect().top <= marker) current = section.id;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <nav
      ref={ref}
      className="mobile-bottom-nav"
      aria-label="Navigazione mobile"
    >
      {items.map(({ id, label, Icon }) => (
        <a
          key={id}
          href={`#${id}`}
          className={active === id ? "active" : undefined}
          aria-current={active === id ? "location" : undefined}
        >
          <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
          <small>{label}</small>
          {active === id && (
            <span className="nav-indicator" aria-hidden="true" />
          )}
        </a>
      ))}
    </nav>
  );
}
