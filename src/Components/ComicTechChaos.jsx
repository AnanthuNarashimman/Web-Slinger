import React, { useState, useEffect } from 'react';
import { Cloud, Database, Code, Server, Terminal, Cpu, Globe, Layers, Zap, Box, Hash, Layout, Share2, MessageSquare, Mic, PenTool } from 'lucide-react';
import '../ComponentStyles/ComicTechChaos.css';
import Techie from '../assets/Images/techie.png';

const ComicTechStack = () => {
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
// Using Lucide for generic concepts and custom simple SVGs for brand specifics
const TechIcon = ({ type, color }) => {
  const iconProps = { size: 24, strokeWidth: 2.5, className: "comic-tech-icon-default" };

  switch (type) {
    case 'react': return <div className="comic-tech-icon-react"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2" /><path d="M12 2C7 2 3 7 3 12S7 22 12 22 21 17 21 12 17 2 12 2" opacity="0.2" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" /></svg></div>;
    case 'js': return <div className="comic-tech-icon-js">JS</div>;
    case 'node': return <Server {...iconProps} color="#339933" />;
    case 'python': return <div className="comic-tech-icon-python">Py</div>;
    case 'flask': return <Zap {...iconProps} fill="black" />;
    case 'numpy': return <Hash {...iconProps} color="#013243" />;
    case 'flutter': return <svg width="24" height="24" viewBox="0 0 24 24" fill="#02569B"><path d="M14 2L6 10L14 18L22 10L14 2Z" /></svg>;
    case 'html': return <Code {...iconProps} color="#E34F26" />;
    case 'css': return <Layout {...iconProps} color="#1572B6" />;
    case 'firebase': return <Database {...iconProps} color="#FFCA28" fill="#FFCA28" />;
    case 'gcp': return <Cloud {...iconProps} color="#4285F4" />;
    case 'gemini': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8E75B2" strokeWidth="2.5"><path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" /></svg>;
    case 'vertex': return <Cpu {...iconProps} color="#4285F4" />;
    case 'tts': return <Mic {...iconProps} color="#EA4335" />;
    case 'git': return <Share2 {...iconProps} color="#F05032" />;
    case 'postman': return <MessageSquare {...iconProps} color="#FF6C37" />;
    case 'figma': return <PenTool {...iconProps} color="#F24E1E" />;
    default: return <Terminal {...iconProps} />;
  }
};

export default ComicTechStack;