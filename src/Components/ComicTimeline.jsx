import "../ComponentStyles/ComicTimeline.css";

const ComicTimeline = () => {
  const experiences = [
    {
      number: '01',
      date: 'JUL 2025 – PRESENT',
      title: 'SOFTWARE ENGINEER INTERN',
      description: (
        <>
          Building internal tools and full-stack features as a software engineer intern at{" "}
          <a
            href="https://www.prasklatechnology.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Praskla Technologies
          </a>
          .
        </>
      ),
      align: 'left'
    },
    {
      number: '02',
      date: '2024 – PRESENT',
      title: 'INDEPENDENT PRODUCT DEV',
      description: 'Shipped web applications (GenTeach, Glimpse RAG, contest platforms) used by students.',
      align: 'right'
    },
    {
      number: '03',
      date: '2023 – 2024',
      title: 'FULL-STACK ENGINEER',
      description: 'Self-taught. Built and deployed personal projects while learning React, Node.js, Flask, and modern AI stack.',
      align: 'left'
    }
  ];

  return (
    <div className="comic-container">

      {/* Halftone Pattern */}
      <div className="halftone-bg"></div>
      
      {/* Corners */}
      <div className="corner-tri corner-tl"></div>
      <div className="corner-tri corner-br"></div>

      <div className="wrapper">
        
        {/* Header */}
        <div className="header-container">
          <div className="header-wrapper">
            <div className="header-bg"></div>
            <h1 className="header-title">Experience</h1>
          </div>
        </div>

        {/* Central Vertical Line */}
        <div className="central-line"></div>

        {/* Timeline Items */}
        <div className="timeline-items">
          {experiences.map((exp, index) => (
            <div key={index} className={`timeline-item ${exp.align}`}>
              
              {/* Content Side */}
              <div className="content-side">
                <div className="connector"></div>
                <h3 className="item-title">{exp.title}</h3>
                <div className="item-date">{exp.date}</div>
                <p className="item-desc">{exp.description}</p>
              </div>

              {/* Center Marker (Explosion Bubble) */}
              <div className="bubble-container">
                <svg viewBox="0 0 100 100" className="explosion-svg">
                  <path d="M50 0 L63 25 L90 20 L75 45 L95 60 L70 75 L60 95 L45 70 L20 85 L30 60 L5 50 L35 35 L20 10 Z" 
                        stroke="black" strokeWidth="3" />
                </svg>
                <span className={`bubble-number ${exp.number === '02' ? 'num-blue' : 'num-red'}`}>
                  {exp.number}
                </span>
              </div>

              {/* Empty Side (Spacer) */}
              <div className="spacer"></div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="tbc-badge">
            THE BEGINNING!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicTimeline;