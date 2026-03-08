import Hero from "../Components/Hero";
import ComicTV from "../Components/ComicTV";
import ComicTechStack from "../Components/ComicTechChaos";
import ComicSeparator from "../Components/ComicSeparator";
import ComicTimeline from "../Components/ComicTimeline";
import ComicWantedContact from "../Components/ComicWantedContact";
import ComicSidebar from "../Components/ComicSidebar";
import ComicFooter from "../Components/ComicFooter";

import "../PageStyles/Portfolio.css";
import { useEffect } from "react";

function Portfolio() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80;
      const targetPosition = section.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };
  

  return (
    <>
      <ComicSidebar 
        menuItems={['Home', 'Projects', 'Tech Stack', 'Journey', 'Contact']}
        onNavigate={(item) => {
          const sectionMap = {
            'Home': 'hero',
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
      <section id="projects">
        <ComicTV />
      </section>
      <ComicSeparator />
      <section id="tech-stack">
        <ComicTechStack />
      </section>
      <ComicSeparator />
      <section id="timeline">
        <ComicTimeline />
      </section>
      <ComicSeparator />
      <section id="contact">
        <ComicWantedContact />
      </section>
      <ComicFooter />
    </>
  )
}

export default Portfolio