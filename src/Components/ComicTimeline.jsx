import "../ComponentStyles/ComicTimeline.css";

const ComicTimeline = () => {
  const experiences = [
    {
      number: '03',
      date: 'JUL 2025 – DEC 2025',
      title: 'SDE INTERN',
      description: "Worked across multiple production projects, shipping features, migrating an Electron application's routing architecture, and rebuilding the company's public website with React and Tailwind as part of a six-person engineering team.",
      align: 'left'
    },
    {
      number: '02',
      date: '2024 – PRESENT',
      title: 'INDEPENDENT PRODUCT DEVELOPER',
      description: "Building AI products and developer tools focused on real-world problems. Shipped browser agents, autonomous website auditors, and developer extensions like VibeAudit, AlgoFlow, and damn.js—all public, actively used, and built from idea to deployment.",
      align: 'right'
    },
    {
      number: '01',
      date: '2023 – PRESENT',
      title: 'FULL-STACK ENGINEER',
      description: 'Started from scratch and learned by building. Shipped CRMs, coding platforms, and full-stack web applications with React, Node.js, and Flask instead of spending months following tutorials.',
      align: 'left'
    }
  ];

  return (
    <div className="comic-container">

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