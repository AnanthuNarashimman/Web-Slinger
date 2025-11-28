import Hero from "../Components/Hero";
import ProjectCards from "../Components/ProjectCards";
import ComicTechStack from "../Components/ComicTechChaos";
import ComicSeparator from "../Components/ComicSeparator";
import ComicTimeline from "../Components/ComicTimeLine";
import ComicWantedContact from "../Components/ComicWantedContact";
import ComicNavbar from "../Components/ComicNavbar";

import "../PageStyles/Portfolio.css";

function Portfolio() {
  return (
    <>
      <ComicNavbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="projects">
        <ProjectCards />
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
    </>
  )
}

export default Portfolio