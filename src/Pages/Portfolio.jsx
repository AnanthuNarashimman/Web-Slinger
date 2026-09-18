import Hero from "../Components/Hero";
import ComicTV from "../Components/ComicTV";
import ComicGithubHackathons from "../Components/ComicGithubHackathons";
import ComicTechStack from "../Components/ComicTechChaos";
import ComicTimeline from "../Components/ComicTimeline";
import ComicWantedContact from "../Components/ComicWantedContact";
import ComicSidebar from "../Components/ComicSidebar";
import ComicFooter from "../Components/ComicFooter";
import ComicSeparator from "../Components/ComicSeparator";

import "../PageStyles/Portfolio.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollTo } from "../lib/smoothScroll";

function Portfolio() {
  const location = useLocation();
  const navigate = useNavigate();

  // Routed through Lenis so it eases instead of fighting the momentum engine
  const scrollToSection = (sectionId, immediate = false) => {
    const section = document.getElementById(sectionId);
    if (section) {
      scrollTo(section, { offset: -80, immediate });
    }
  };

  // Coming back from another page (e.g. /arsenal) lands on the section we left
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;

    // Wait a frame so sections have their final heights before measuring
    const frame = requestAnimationFrame(() => scrollToSection(target, true));

    // Clear the state so a refresh doesn't re-trigger the jump
    navigate(location.pathname, { replace: true, state: null });

    return () => cancelAnimationFrame(frame);
  }, [location.state, location.pathname, navigate]);


  return (
    <>
      <ComicSidebar 
        menuItems={['Home', 'Build Log', 'Projects', 'Tech Stack', 'Journey', 'Contact']}
        onNavigate={(item) => {
          const sectionMap = {
            'Home': 'hero',
            'Build Log': 'github',
            'Projects': 'projects',
            'Tech Stack': 'tech-stack',
            'Journey': 'timeline',
            'Contact': 'contact'
          };
          scrollToSection(sectionMap[item]);
        }}
      />
      <section id="hero">
        <Hero />
      </section>
      <section id="github">
        <ComicGithubHackathons />
      </section>
      <section id="projects">
        <ComicTV />
      </section>
      <ComicSeparator topColor="#fcc303" bottomColor="#fcc303" />
      <section id="tech-stack">
        <ComicTechStack />
      </section>
      <ComicSeparator topColor="#fcc303" bottomColor="#fcc303" />
      <section id="timeline">
        <ComicTimeline />
      </section>
      <ComicSeparator topColor="#fcc303" bottomColor="#fcc303" />
      <section id="contact">
        <ComicWantedContact />
      </section>
      <ComicFooter />
    </>
  )
}

export default Portfolio