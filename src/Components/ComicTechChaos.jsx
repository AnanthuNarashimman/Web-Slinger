import React, { useState, useEffect } from 'react';
import { 
  SiReact, 
  SiJavascript, 
  SiNodedotjs, 
  SiPython, 
  SiFlask, 
  SiFlutter, 
  SiHtml5, 
  SiCss3, 
  SiFirebase, 
  SiGooglecloud, 
  SiGit, 
  SiPostman, 
  SiFigma,
  SiMysql,
  SiElectron,
  SiOpenjdk,
  SiScikitlearn,
  SiLangchain,
} from 'react-icons/si';
import { Database, Cpu, Globe, Code2, Layers, Coffee, BookOpen } from 'lucide-react';
import '../ComponentStyles/ComicTechChaos.css';
import Techie from '../assets/Images/techie.png';

const ComicTechStack = () => {
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Complete Tech List with specific colors/icons
  const techStack = [
    { name: 'React', icon: 'react', color: '#61DAFB' },
    { name: 'JavaScript', icon: 'js', color: '#F7DF1E' },
    { name: 'Node.js', icon: 'node', color: '#339933' },
    { name: 'Python', icon: 'python', color: '#3776AB' },
    { name: 'Flask', icon: 'flask', color: '#000000' },
    { name: 'Flutter', icon: 'flutter', color: '#02569B' },
    { name: 'HTML5', icon: 'html', color: '#E34F26' },
    { name: 'CSS3', icon: 'css', color: '#1572B6' },
    { name: 'Firebase', icon: 'firebase', color: '#FFCA28' },
    { name: 'Google Cloud', icon: 'gcp', color: '#4285F4' },
    { name: 'Git', icon: 'git', color: '#F05032' },
    { name: 'Postman', icon: 'postman', color: '#FF6C37' },
    { name: 'Figma', icon: 'figma', color: '#F24E1E' },
  ];

  // Detailed tech categories for modal
  const detailedTechStack = {
    languages: {
      title: 'Languages',
      color: '#FF1744',
      items: [
        { name: 'Python', icon: 'python', color: '#3776AB' },
        { name: 'JavaScript', icon: 'js', color: '#F7DF1E' },
        { name: 'Java', icon: 'java', color: '#007396' },
      ]
    },
    frameworks: {
      title: 'Frameworks & Libraries',
      color: '#FF6D00',
      items: [
        { name: 'React.js', icon: 'react', color: '#61DAFB' },
        { name: 'Node.js', icon: 'node', color: '#339933' },
        { name: 'Flask', icon: 'flask', color: '#000000' },
      ]
    },
    aiml: {
      title: 'AI & Applied ML',
      color: '#7C4DFF',
      items: [
        { name: 'Gemini API', icon: 'gemini', color: '#8E75B2' },
        { name: 'Scikit-learn', icon: 'sklearn', color: '#F7931E' },
        { name: 'Browser-use', icon: 'automation', color: '#4285F4' },
      ]
    },
    exposure: {
      title: 'Project Exposure',
      color: '#00BFA5',
      items: [
        { name: 'SQL', icon: 'sql', color: '#4479A1' },
        { name: 'Electron.js', icon: 'electron', color: '#47848F' },
        { name: 'LangChain', icon: 'langchain', color: '#1C3C3C' },
        { name: 'ChromaDB', icon: 'chromadb', color: '#FF6B6B' },
      ]
    },
    databases: {
      title: 'Databases & Tools',
      color: '#2979FF',
      items: [
        { name: 'Firebase', icon: 'firebase', color: '#FFCA28' },
        { name: 'MySQL', icon: 'mysql', color: '#4479A1' },
        { name: 'Git', icon: 'git', color: '#F05032' },
        { name: 'Judge0', icon: 'judge0', color: '#323330' },
        { name: 'Figma', icon: 'figma', color: '#F24E1E' },
        { name: 'Postman', icon: 'postman', color: '#FF6C37' },
      ]
    },
    concepts: {
      title: 'Core Concepts',
      color: '#D500F9',
      items: [
        { name: 'Full-Stack Design', icon: 'fullstack', color: '#FF1744' },
        { name: 'REST APIs', icon: 'api', color: '#00BCD4' },
        { name: 'WebSocket', icon: 'websocket', color: '#FFC107' },
      ]
    }
  };

  // Pseudo-random generator for consistent chaos across renders
  // Positions bubbles around a center image placeholder
  const generateChaos = (index) => {
    // Use prime numbers and index math to create deterministic "randomness"
    const rotate = ((index * 11) % 24) - 12; // -12deg to 12deg (subtle rotation for readability)
    const scale = 0.88 + ((index * 5) % 3) / 10; // 0.88 to 1.18 (consistent sizes with slight variation)
    const bubbleType = index % 3; // 0: Speech, 1: Thought, 2: Jagged
    
    // Circular/radial positioning around center
    const totalBubbles = techStack.length;
    const angle = (index / totalBubbles) * 2 * Math.PI; // Distribute evenly around circle
    
    // Base radius
    let radius = 42 + ((index * 3) % 8); // 42% to 50% from center
    
    // Adjust distance based on position
    const verticalFactor = Math.abs(Math.sin(angle)); // 0 at sides, 1 at top/bottom
    const horizontalFactor = Math.abs(Math.cos(angle)); // 1 at sides, 0 at top/bottom
    
    // Add extra distance for top/bottom, reduce for left/right
    const extraVerticalDistance = verticalFactor * 6; // Up to 6% extra at top/bottom
    const reduceHorizontalDistance = horizontalFactor * 8; // Reduce up to 8% at left/right
    
    radius = radius + extraVerticalDistance - reduceHorizontalDistance;
    
    // Calculate position relative to center (50%, 50%)
    const centerX = 50;
    const centerY = 50;
    const leftOffset = Math.cos(angle) * radius;
    const topOffset = Math.sin(angle) * radius;
    
    // Minimal jitter to prevent overlap
    const leftJitter = ((index * 23) % 4) - 2; // -2% to 2%
    const topJitter = ((index * 19) % 4) - 2; // -2% to 2%
    
    const left = Math.max(8, Math.min(92, centerX + leftOffset + leftJitter));
    const top = Math.max(12, Math.min(88, centerY + topOffset + topJitter));

    return {
      rotate,
      scale,
      left: `${left}%`,
      top: `${top}%`,
      bubbleType,
      zIndex: 10, // Same z-index to prevent overlapping
    };
  };

  return (
    <div className="comic-tech-container">
      {/* Background Texture (Halftone Pattern) */}
      <div className="comic-tech-bg-texture"></div>

      {/* Header / Context */}
      <div className="comic-tech-header">
        <h1 className="comic-tech-title">
          TECH ARSENAL!
        </h1>
        <p className="comic-tech-subtitle">My Chaotic Web Slinger Toolkit</p>
      </div>

      {/* Comic Container */}
      <div className="comic-tech-wrapper">
        {/* Center Image */}
        <div className={`comic-tech-image-placeholder ${isClient ? 'client-ready' : ''}`}>
          <img src={Techie} alt="Techie" className="comic-tech-image" />
        </div>

        {/* Know More Button */}
        <button 
          className="comic-tech-know-more-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <BookOpen className="btn-icon" size={28} strokeWidth={2.5} />
        </button>

        {/* Chat Bubbles around the center */}
        {isClient && techStack.map((tech, index) => {
          const style = generateChaos(index);
          return (
            <div
              key={tech.name}
              className="comic-tech-bubble-wrapper"
              style={{
                left: isClient && windowWidth >= 768 ? style.left : '50%',
                top: isClient && windowWidth >= 768 ? style.top : `${index * 5.5 + 10}%`,
                transform: `
                  translate(-50%, 0) 
                  rotate(${style.rotate}deg) 
                  scale(${style.scale})
                `,
                zIndex: style.zIndex,
              }}
            >
              <ComicBubble 
                type={style.bubbleType} 
                color={tech.color}
                index={index}
              >
                <div className="comic-tech-bubble-content">
                  <TechIcon type={tech.icon} color={tech.color} />
                  <span className="comic-tech-bubble-text" style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.4)' }}>
                    {tech.name}
                  </span>
                </div>
              </ComicBubble>
            </div>
          );
        })}
      </div>

      {/* Full-Screen Tech Stack Modal */}
      {isModalOpen && (
        <TechStackModal 
          detailedTechStack={detailedTechStack}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

// --- Sub-Components ---

const ComicBubble = ({ type, children, index }) => {
  // Randomize bubble background color slightly (White, Light Yellow, Light Blue)
  // We keep backgrounds light so bold text pops, with thick black borders.
  const bgColors = ['#FFFFFF', '#FEF3C7', '#E0F2FE', '#F3E8FF'];
  const bgColor = bgColors[index % bgColors.length];

  return (
    <div className="comic-tech-bubble">
      {/* The SVG Bubble Background */}
      <div className="comic-tech-bubble-svg-container">
        {type === 0 && (
          // Classic Speech Bubble
          <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="comic-tech-bubble-svg">
            <path 
              d="M10,10 Q50,-5 100,10 Q150,-5 190,10 Q205,50 190,90 Q150,105 100,90 Q50,105 10,90 Q-5,50 10,10 Z" 
              fill={bgColor} 
              stroke="black" 
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Tail */}
            <path d="M40,90 L20,120 L70,90" fill={bgColor} stroke="black" strokeWidth="4" />
            {/* Mask to hide stroke overlap */}
            <path d="M42,88 L68,88" stroke={bgColor} strokeWidth="6" /> 
          </svg>
        )}

        {type === 1 && (
          // Boxy/Action Bubble
          <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="comic-tech-bubble-svg">
            <path 
              d="M5,5 L195,10 L190,95 L10,90 Z" 
              fill={bgColor} 
              stroke="black" 
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* Tail */}
            <path d="M150,92 L180,120 L170,93" fill={bgColor} stroke="black" strokeWidth="5" />
             <path d="M152,90 L168,96" stroke={bgColor} strokeWidth="8" /> 
          </svg>
        )}

        {type === 2 && (
          // Scream/Burst Bubble
          <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="comic-tech-bubble-svg">
            <path 
              d="M10,20 L30,5 L50,25 L80,0 L100,20 L130,5 L150,25 L180,10 L190,40 L170,60 L195,80 L160,90 L140,75 L110,95 L90,75 L60,95 L40,75 L10,90 L25,60 L5,40 Z" 
              fill={bgColor} 
              stroke="black" 
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      
      {/* Content Container */}
      <div className="comic-tech-bubble-inner">
        {children}
      </div>
    </div>
  );
};

// Helper for rendering Specific Icons
// Using react-icons Simple Icons for authentic brand logos
const TechIcon = ({ type, color }) => {
  const iconSize = 28;
  const iconStyle = { 
    color: color,
    filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))'
  };

  switch (type) {
    case 'react': return <SiReact size={iconSize} style={iconStyle} />;
    case 'js': return <SiJavascript size={iconSize} style={iconStyle} />;
    case 'node': return <SiNodedotjs size={iconSize} style={iconStyle} />;
    case 'python': return <SiPython size={iconSize} style={iconStyle} />;
    case 'flask': return <SiFlask size={iconSize} style={iconStyle} />;
    case 'flutter': return <SiFlutter size={iconSize} style={iconStyle} />;
    case 'html': return <SiHtml5 size={iconSize} style={iconStyle} />;
    case 'css': return <SiCss3 size={iconSize} style={iconStyle} />;
    case 'firebase': return <SiFirebase size={iconSize} style={iconStyle} />;
    case 'gcp': return <SiGooglecloud size={iconSize} style={iconStyle} />;
    case 'git': return <SiGit size={iconSize} style={iconStyle} />;
    case 'postman': return <SiPostman size={iconSize} style={iconStyle} />;
    case 'figma': return <SiFigma size={iconSize} style={iconStyle} />;
    case 'java': return <Coffee size={iconSize} style={iconStyle} />;
    case 'mysql': return <SiMysql size={iconSize} style={iconStyle} />;
    case 'sklearn': return <Cpu size={iconSize} style={iconStyle} />;
    case 'electron': return <SiElectron size={iconSize} style={iconStyle} />;
    case 'gemini': return <Cpu size={iconSize} style={iconStyle} />;
    case 'automation': return <Globe size={iconSize} style={iconStyle} />;
    case 'sql': return <Database size={iconSize} style={iconStyle} />;
    case 'langchain': return <SiLangchain size={iconSize} style={iconStyle} />;
    case 'chromadb': return <Database size={iconSize} style={iconStyle} />;
    case 'judge0': return <Code2 size={iconSize} style={iconStyle} />;
    case 'fullstack': return <Layers size={iconSize} style={iconStyle} />;
    case 'api': return <Globe size={iconSize} style={iconStyle} />;
    case 'websocket': return <Globe size={iconSize} style={iconStyle} />;
    default: return <SiReact size={iconSize} style={iconStyle} />;
  }
};

// Full-Screen Tech Stack Modal Component
const TechStackModal = ({ detailedTechStack, onClose }) => {
  return (
    <div className="tech-modal-overlay" onClick={onClose}>
      <div className="tech-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Comic Book Border */}
        <div className="tech-modal-border">
          {/* Corner Badges */}
          <div className="tech-modal-corner tl"></div>
          <div className="tech-modal-corner tr"></div>
          <div className="tech-modal-corner bl"></div>
          <div className="tech-modal-corner br"></div>

          {/* Header */}
          <div className="tech-modal-header">
            <h2 className="tech-modal-title">COMPLETE TECH ARSENAL!</h2>
            <button className="tech-modal-close" onClick={onClose}>
              <span className="close-x">✕</span>
            </button>
          </div>

          {/* Tech Categories Grid */}
          <div className="tech-modal-grid">
            {Object.entries(detailedTechStack).map(([key, category]) => (
              <div key={key} className="tech-category-panel">
                <div 
                  className="tech-category-header"
                  style={{ backgroundColor: category.color }}
                >
                  <h3 className="tech-category-title">{category.title}</h3>
                </div>
                <div className="tech-category-items">
                  {category.items.map((item, index) => (
                    <div key={index} className="tech-item">
                      <div className="tech-item-icon">
                        <TechIcon type={item.icon} color={item.color} />
                      </div>
                      <span className="tech-item-name">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicTechStack;