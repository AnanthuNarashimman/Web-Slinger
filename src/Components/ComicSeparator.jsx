import React from 'react';
import '../ComponentStyles/ComicSeparator.css';

const ComicSeparator = () => {
  return (
    <div className="comic-separator-wrapper">
      <svg 
        className="comic-separator-svg" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top filled area */}
        <path
          d="M0,0 L0,80 L30,70 L60,90 L90,60 L120,85 L150,65 L180,95 L210,70 L240,90 L270,65 L300,85 L330,70 L360,95 L390,75 L420,90 L450,70 L480,85 L510,65 L540,90 L570,70 L600,85 L630,65 L660,95 L690,75 L720,90 L750,70 L780,95 L810,65 L840,85 L870,70 L900,90 L930,65 L960,85 L990,70 L1020,95 L1050,75 L1080,90 L1110,70 L1140,85 L1170,65 L1200,80 L1200,0 Z"
          fill="transparent"
        />
        {/* Bottom filled area */}
        <path
          d="M0,80 L30,70 L60,90 L90,60 L120,85 L150,65 L180,95 L210,70 L240,90 L270,65 L300,85 L330,70 L360,95 L390,75 L420,90 L450,70 L480,85 L510,65 L540,90 L570,70 L600,85 L630,65 L660,95 L690,75 L720,90 L750,70 L780,95 L810,65 L840,85 L870,70 L900,90 L930,65 L960,85 L990,70 L1020,95 L1050,75 L1080,90 L1110,70 L1140,85 L1170,65 L1200,80 L1200,120 L0,120 Z"
          fill="transparent"
        />
        {/* Zigzag line only */}
        <path
          d="M0,80 L30,70 L60,90 L90,60 L120,85 L150,65 L180,95 L210,70 L240,90 L270,65 L300,85 L330,70 L360,95 L390,75 L420,90 L450,70 L480,85 L510,65 L540,90 L570,70 L600,85 L630,65 L660,95 L690,75 L720,90 L750,70 L780,95 L810,65 L840,85 L870,70 L900,90 L930,65 L960,85 L990,70 L1020,95 L1050,75 L1080,90 L1110,70 L1140,85 L1170,65 L1200,80"
          fill="none"
          stroke="#000"
          strokeWidth="4"
        />
      </svg>
      
      {/* Comic lined background */}
    </div>
  );
};

export default ComicSeparator;

