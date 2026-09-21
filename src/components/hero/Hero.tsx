import { profile } from "../../data/portfolio";
import { DeveloperTerminal } from "./DeveloperTerminal";
import { ProfilePhoto } from "./ProfilePhoto";
import { usePortfolioMotion } from "../motion/usePortfolioMotion";

export function Hero() {
  const ref = usePortfolioMotion("hero");
  return (
    <section ref={ref} className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow">{profile.eyebrow}</div>
        <h1 id="hero-title">
          ALEX
          <br />
          <span>PAGLIASSO</span>
        </h1>
        <p className="lead">{profile.lead}</p>
        <DeveloperTerminal />
        <div className="chips">
          {profile.chips.map((chip) => (
            <span className="chip" key={chip}>
              {chip}
            </span>
          ))}
        </div>
      </div>
      <ProfilePhoto />
    </section>
  );
}
