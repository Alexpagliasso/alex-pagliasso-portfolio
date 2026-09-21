import { Header, Footer } from "./components/layout/Header";
import { MobileNavigation } from "./components/layout/MobileNavigation";
import { Hero } from "./components/hero/Hero";
import { BackgroundGlow } from "./components/motion/BackgroundGlow";
import {
  About,
  Experience,
  TechStack,
  Projects,
  Education,
} from "./components/PortfolioSections";
import { BeyondCode } from "./components/beyond/BeyondCode";
import { sectionOrder } from "./data/sections";

const sections = { about: About, experience: Experience, projects: Projects, stack: TechStack, education: Education, beyond: BeyondCode };

export default function App() {
  return (
    <>
      <BackgroundGlow />
      <a className="skip-link" href="#main">
        Vai al contenuto
      </a>
      <div className="shell">
        <Header />
        <main id="main" tabIndex={-1}>
          <Hero />
          {sectionOrder.map(id => {
            const Component = sections[id];
            return <Component key={id} />;
          })}
        </main>
        <Footer />
      </div>
      <MobileNavigation />
    </>
  );
}
