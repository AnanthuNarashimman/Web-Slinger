import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import TechIcon from './TechIcon';
import { featuredTech } from '../data/techStack';
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

  /*
   * The bubbles used to carry their own hardcoded list, which had drifted
   * from src/data/techStack.js and led with Git, Postman and Figma — table
   * stakes taking the most visible slots, while none of the agent or LLM work
   * the rest of the site is built around appeared at all.
   *
   * They now read the `featured` shortlist from that file, so the section and
   * the /arsenal page can no longer disagree, and the order is set once in
   * the data rather than here.
   */
  const chaosTechStack = featuredTech;

  // Pseudo-random generator for consistent chaos across renders
  // Positions bubbles around a center image placeholder
  const generateChaos = (index) => {
    // Use prime numbers and index math to create deterministic "randomness"
    const rotate = ((index * 11) % 24) - 12; // -12deg to 12deg (subtle rotation for readability)
    const scale = 0.88 + ((index * 5) % 3) / 10; // 0.88 to 1.18 (consistent sizes with slight variation)
    const bubbleType = index % 3; // 0: Speech, 1: Thought, 2: Jagged

    // Circular/radial positioning around center
    const totalBubbles = chaosTechStack.length;
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
      <div className="comic-tech-header" data-reveal>
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

        {/* Comic bubbles around the center */}
        {isClient && chaosTechStack.map((tech, index) => {
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

      {/* Link through to the full arsenal page */}
      <div className="comic-tech-cta" data-reveal>
        <Link to="/arsenal" className="comic-tech-know-more-btn">
          <BookOpen className="btn-icon" size={20} strokeWidth={2.5} />
          <span className="comic-tech-know-more-text-main">SEE FULL ARSENAL</span>
          <ArrowRight className="btn-icon btn-icon-arrow" size={20} strokeWidth={3} />
        </Link>
        <span className="comic-tech-cta-tag">READ THE FULL ISSUE!</span>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const ComicBubble = ({ type, children, index }) => {
  const bgColors = ['#FFFFFF', '#FEF3C7', '#E0F2FE', '#F3E8FF'];
  const bgColor = bgColors[index % bgColors.length];

  return (
    <div className="comic-tech-bubble">
      <div className="comic-tech-bubble-svg-container">
        {type === 0 && (
          <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="comic-tech-bubble-svg">
            <path
              d="M10,10 Q50,-5 100,10 Q150,-5 190,10 Q205,50 190,90 Q150,105 100,90 Q50,105 10,90 Q-5,50 10,10 Z"
              fill={bgColor}
              stroke="black"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path d="M40,90 L20,120 L70,90" fill={bgColor} stroke="black" strokeWidth="4" />
            <path d="M42,88 L68,88" stroke={bgColor} strokeWidth="6" />
          </svg>
        )}

        {type === 1 && (
          <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="comic-tech-bubble-svg">
            <path
              d="M5,5 L195,10 L190,95 L10,90 Z"
              fill={bgColor}
              stroke="black"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path d="M150,92 L180,120 L170,93" fill={bgColor} stroke="black" strokeWidth="5" />
            <path d="M152,90 L168,96" stroke={bgColor} strokeWidth="8" />
          </svg>
        )}

        {type === 2 && (
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
      <div className="comic-tech-bubble-inner">
        {children}
      </div>
    </div>
  );
};

export default ComicTechStack;
