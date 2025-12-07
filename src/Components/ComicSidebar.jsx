import React, { useState } from 'react';

const ComicSidebar = ({ 
  menuItems = ['Home', 'About', 'Projects', 'Contact', 'Blog'],
  onNavigate = (item) => console.log(`Navigating to ${item}`)
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');

        /* --- COMIC SIDEBAR COMPONENT STYLES --- */
        
        /* Menu Toggle Button (Floating) */
        .cs-menu-btn {
          position: fixed;
          top: 1.5rem;
          left: 1.5rem;
          z-index: 1000;
          background-color: #FFD700;
          color: #000;
          font-family: 'Bangers', cursive;
          font-size: 1.5rem;
          letter-spacing: 2px;
          padding: 0.75rem 1.5rem;
          border: 5px solid #000;
          box-shadow: 8px 8px 0px #000;
          cursor: pointer;
          transform: rotate(-2deg);
          transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          animation: menuPulse 2s ease-in-out infinite;
          opacity: 1;
          pointer-events: auto;
        }
        
        .cs-menu-btn.hidden {
          opacity: 0;
          pointer-events: none;
        }
        
        @keyframes menuPulse {
          0%, 100% { transform: rotate(-2deg) scale(1); }
          50% { transform: rotate(-2deg) scale(1.05); }
        }
        
        .cs-menu-btn:hover {
          transform: rotate(0deg) scale(1.1);
          box-shadow: 12px 12px 0px #000;
          animation: none;
        }
        
        .cs-menu-btn:active {
          transform: translate(4px, 4px) rotate(0deg);
          box-shadow: 4px 4px 0px #000;
        }

        /* Sidebar Backdrop */
        .cs-backdrop {
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.8) 10px,
            rgba(0, 0, 0, 0.85) 10px,
            rgba(0, 0, 0, 0.85) 20px
          );
          z-index: 998;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .cs-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }

        /* Sidebar Panel */
        .cs-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 340px;
          max-width: 85vw;
          background-color: #FFD700;
          z-index: 999;
          border-right: 8px solid #000;
          box-shadow: 
            inset -8px 0 0 #FF1744,
            inset 0 8px 0 #00E5FF,
            inset 0 -8px 0 #00E5FF,
            16px 0 0 #000,
            20px 0 40px rgba(0,0,0,0.5);
          transform: translateX(-105%);
          transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          display: flex;
          flex-direction: column;
          padding: 2rem 1.5rem;
          box-sizing: border-box;
          overflow-y: auto;
        }
        .cs-sidebar.open {
          transform: translateX(0);
        }

        /* Comic Dots Pattern Background */
        .cs-sidebar::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle, #000 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.08;
          pointer-events: none;
        }

        .cs-header {
          position: relative;
          z-index: 1;
          font-family: 'Bangers', cursive;
          font-size: 3rem;
          margin-top: 3rem;
          margin-bottom: 2.5rem;
          text-align: center;
          color: #000;
          text-shadow: 
            4px 4px 0 #FF1744,
            -2px -2px 0 #00E5FF;
          border: 5px solid #000;
          border-radius: 0;
          padding: 1rem;
          background: #fff;
          box-shadow: 
            8px 8px 0 #000,
            inset 0 0 0 3px #FFD700;
          transform: rotate(-1deg);
          letter-spacing: 3px;
        }

        .cs-nav {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .cs-nav-item {
          font-family: 'Bangers', cursive;
          font-size: 1.75rem;
          letter-spacing: 2px;
          color: #fff;
          text-decoration: none;
          background: #000;
          padding: 0.75rem 1.25rem;
          border: 5px solid #000;
          box-shadow: 6px 6px 0px #00E5FF;
          text-align: center;
          transform: skewX(-5deg);
          transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .cs-nav-item::before {
          content: '★';
          position: absolute;
          left: 0.75rem;
          font-size: 1.5rem;
          color: #FFD700;
          text-shadow: 2px 2px 0 #FF1744;
          opacity: 0;
          transform: translateX(-20px);
          transition: all 0.3s;
        }

        .cs-nav-item:hover {
          transform: skewX(-5deg) translate(-4px, -4px);
          box-shadow: 10px 10px 0px #FF1744;
          background: #FF1744;
          border-color: #000;
        }
        
        .cs-nav-item:hover::before {
          opacity: 1;
          transform: translateX(0);
        }
        
        .cs-nav-item:active {
          transform: skewX(-5deg) translate(3px, 3px);
          box-shadow: 3px 3px 0px #00E5FF;
        }

        /* Close Button inside Sidebar */
        .cs-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #FF1744;
          border: 4px solid #000;
          box-shadow: 4px 4px 0 #000;
          font-family: 'Bangers', cursive;
          font-size: 1.75rem;
          line-height: 1;
          cursor: pointer;
          color: #fff;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(0deg);
          transition: all 0.3s ease;
          z-index: 2;
        }
        .cs-close-btn:hover {
          transform: rotateY(180deg) scale(1.1);
          background: #000;
          color: #FFD700;
          box-shadow: 6px 6px 0 #FF1744;
        }
        .cs-close-btn:active {
          transform: rotateY(180deg) translate(2px, 2px);
          box-shadow: 2px 2px 0 #FF1744;
        }
        
        /* Footer area of sidebar */
        .cs-footer {
          position: relative;
          z-index: 1;
          margin-top: auto;
          padding-top: 2rem;
          text-align: center;
          font-family: 'Bangers', cursive;
          font-size: 1rem;
          letter-spacing: 1px;
          color: #000;
          text-shadow: 2px 2px 0 #fff;
          border-top: 4px dashed #000;
          padding-top: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .cs-menu-btn {
            font-size: 1.25rem;
            padding: 0.5rem 1rem;
          }
          
          .cs-sidebar {
            width: 300px;
          }
          
          .cs-header {
            font-size: 2.5rem;
            margin-top: 2rem;
          }
          
          .cs-nav-item {
            font-size: 1.5rem;
          }
        }
      `}</style>

      {/* Trigger Button */}
      <button 
        className={`cs-menu-btn ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open Menu"
      >
        MENU
      </button>

      {/* Backdrop */}
      <div 
        className={`cs-backdrop ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Slide-out Sidebar */}
      <aside className={`cs-sidebar ${isOpen ? 'open' : ''}`}>
        <button 
          className="cs-close-btn" 
          onClick={() => setIsOpen(false)}
          aria-label="Close Menu"
        >
          X
        </button>
        
        <h2 className="cs-header">NAVIGATION</h2>
        
        <nav className="cs-nav">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className="cs-nav-item"
              onClick={() => {
                onNavigate(item);
                setIsOpen(false);
              }}
            >
              {item}
            </div>
          ))}
        </nav>

        <div className="cs-footer">
            © 2025 HERO INC.
        </div>
      </aside>
    </>
  );
};

export default ComicSidebar