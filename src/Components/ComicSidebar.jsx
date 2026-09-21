import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const ComicSidebar = ({ 
  menuItems = ['Home', 'About', 'Projects', 'Contact', 'Blog'],
  onNavigate = (item) => console.log(`Navigating to ${item}`)
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Escape closes the panel. The listener is attached only while it is open,
  // so the page is not carrying a keydown handler the rest of the time, and
  // Escape keeps its usual meaning everywhere else.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <>
      <style>{`
        /* --- COMIC SIDEBAR COMPONENT STYLES ---
           Bangers is already loaded by the global @import in App.css, so the
           duplicate font import that used to sit here is gone. The --tb-*
           values below are the shared button material, defined on :root in
           TactileButtons.css. */
        
        /* Menu Toggle Button (Floating) */
        .cs-menu-btn {
          position: fixed;
          top: 1.5rem;
          left: 1.5rem;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background-color: #fff;
          color: #000;
          font-family: 'Bangers', cursive;
          font-size: 1.4rem;
          letter-spacing: 2px;
          padding: 0.65rem 1.3rem 0.65rem 1.5rem;
          border: 5px solid #000;
          border-radius: 50px;
          box-shadow: 4px 4px 0px #000;
          cursor: pointer;
          transform: rotate(-2deg);
          transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          animation: menuPulse 2s ease-in-out infinite;
          opacity: 1;
          pointer-events: auto;
        }

        .cs-menu-btn::before {
          content: '';
          position: absolute;
          bottom: -40%;
          left: 26px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 20px solid transparent;
          border-top: 18px solid #000;
        }

        .cs-menu-btn::after {
          content: '';
          position: absolute;
          bottom: -23%;
          left: 23%;
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 15px solid transparent;
          border-top: 13px solid #fff;
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
          box-shadow: 8px 8px 0px #000;
          animation: none;
        }

        .cs-menu-btn:active {
          transform: translate(4px, 4px) rotate(0deg);
          box-shadow: 4px 4px 0px #000;
        }

        /* Sidebar Backdrop
           The old one was two blacks at 0.8 and 0.85 in a 45deg stripe, a 5%
           difference nobody could see, so it read as flat black. It is a
           halftone screen now — the comic way of saying "this is behind" —
           over a dim, with a small blur so the page reads as out of focus
           rather than merely darkened. */
        .cs-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(10, 10, 12, 0.7);
          background-image:
            radial-gradient(circle, rgba(0, 0, 0, 0.55) 1.4px, transparent 1.5px);
          background-size: 6px 6px;
          -webkit-backdrop-filter: blur(3px);
          backdrop-filter: blur(3px);
          z-index: 998;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .cs-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }

        /* Sidebar Panel
           The halftone dots used to be an absolutely positioned ::after with
           inset: 0, which only covered one viewport's worth inside a
           scrolling panel — scroll far enough on a short screen and the
           pattern ran out. They are background layers now, so they tile the
           whole scroll length, and they sit on the same printed-paper grain
           and overhead light the buttons use.

           It also had box-shadow: none, so it slid over the page with nothing
           separating the two. It now carries the comic ink line on its open
           edge and casts a real shadow across the page. */
        .cs-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 340px;
          max-width: 85vw;
          background-color: #FFD700;
          background-image:
            radial-gradient(circle, rgba(0, 0, 0, 0.11) 1px, transparent 1.7px),
            var(--tb-tooth-light),
            var(--tb-tooth-dark),
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.34) 0%,
              rgba(255, 255, 255, 0.08) 38%,
              rgba(0, 0, 0, 0.04) 68%,
              rgba(0, 0, 0, 0.13) 100%
            );
          background-size: 20px 20px, 3px 3px, 3px 3px, auto;
          background-position: 0 0, 0 0, 1.5px 1.5px, 0 0;
          background-repeat: repeat, repeat, repeat, no-repeat;
          border-right: 6px solid #000;
          z-index: 999;
          box-shadow: 18px 0 30px rgba(0, 0, 0, 0.32);
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

        .cs-header {
          position: relative;
          z-index: 1;
          font-family: 'Bangers', cursive;
          /* 3rem overflowed the 340px panel once the webfont loaded */
          font-size: 2.4rem;
          margin-top: 3rem;
          margin-bottom: 2.25rem;
          text-align: center;
          color: #000;
          border: 5px solid #000;
          border-radius: 0;
          padding: 0.85rem 1rem 0.7rem;
          background-color: #fff;
          background-image: var(--tb-tooth-light), var(--tb-tooth-dark), var(--tb-face);
          background-size: 3px 3px, 3px 3px, auto;
          background-position: 0 0, 1.5px 1.5px, 0 0;
          background-repeat: repeat, repeat, no-repeat;
          box-shadow:
            inset 0 0 0 3px #FFD700,
            6px 6px 0 #FF1744,
            11px 11px 0 #000;
          transform: rotate(-1.5deg);
          letter-spacing: 3px;
        }

        .cs-nav {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          /* feeds the panel numbers below */
          counter-reset: cs-item;
        }

        .cs-nav-item {
          counter-increment: cs-item;
          font-family: 'Bangers', cursive;
          font-size: 1.6rem;
          letter-spacing: 2px;
          color: #fff;
          text-decoration: none;
          background-color: #000;
          background-image: var(--tb-tooth-light), var(--tb-tooth-dark), var(--tb-face);
          background-size: 3px 3px, 3px 3px, auto;
          background-position: 0 0, 1.5px 1.5px, 0 0;
          background-repeat: repeat, repeat, no-repeat;
          padding: 0.6rem 2.5rem 0.5rem;
          border: 4px solid #000;
          border-radius: 6px;
          text-align: center;
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.42);
          /* -5deg tipped the lettering far enough to notice; -3 keeps the
             comic lean without making the words look like they are falling */
          transform: skewX(-3deg);
          transition: all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .cs-nav-item::before {
          content: '★';
          position: absolute;
          left: 0.8rem;
          top: 50%;
          translate: 0 -50%;
          font-size: 1.35rem;
          line-height: 1;
          color: #FFD700;
          text-shadow: 2px 2px 0 #FF1744;
          opacity: 0;
          transform: translateX(-20px);
          transition: all 0.3s;
        }

        /* Panel numbers, the way a comic numbers its frames. Generated from a
           counter, so the markup stays a plain list of labels. */
        .cs-nav-item::after {
          content: counter(cs-item, decimal-leading-zero);
          position: absolute;
          right: 0.85rem;
          top: 50%;
          translate: 0 -50%;
          font-size: 0.8rem;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.2s ease;
        }

        .cs-nav-item:hover {
          transform: skewX(-3deg) translate(-4px, -4px);
          box-shadow: 9px 9px 0px #000;
          background-color: #FF1744;
        }

        .cs-nav-item:hover::before {
          opacity: 1;
          transform: translateX(0);
        }

        .cs-nav-item:hover::after {
          color: rgba(0, 0, 0, 0.45);
        }

        .cs-nav-item:active {
          transform: skewX(-3deg) translate(2px, 2px);
          box-shadow: 1px 1px 0 #000;
        }

        /* Close Button inside Sidebar
           Round and domed, like the other close buttons on the site, instead
           of the odd hard-cornered square it was. */
        .cs-close-btn {
          position: absolute;
          top: 1rem;
          right: 1.5rem;
          background-color: #FF1744;
          background-image: var(--tb-dome);
          background-repeat: no-repeat;
          border: 4px solid #000;
          border-radius: 50%;
          box-shadow: var(--tb-dome-bevel), 4px 4px 0 #000;
          font-family: 'Bangers', cursive;
          font-size: 1.6rem;
          line-height: 1;
          cursor: pointer;
          color: #fff;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          z-index: 2;
        }
        .cs-close-btn:hover {
          background-color: #000;
          color: #FFD700;
          box-shadow: var(--tb-dome-bevel), 6px 6px 0 #000;
          transform: translate(-1px, -1px);
        }
        .cs-close-btn:active {
          transform: translate(2px, 2px);
          box-shadow:
            inset 0 2px 3px rgba(0, 0, 0, 0.34),
            1px 1px 0 #000;
        }

        /* Footer area of sidebar */
        .cs-footer {
          position: relative;
          z-index: 1;
          margin-top: auto;
          text-align: center;
          font-family: 'Bangers', cursive;
          font-size: 1rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #000;
          text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.85);
          border-top: 4px dashed rgba(0, 0, 0, 0.55);
          margin-bottom: 0.25rem;
          /* was declared twice, 2rem then 1.5rem */
          padding-top: 1.5rem;
        }

        @media (max-width: 768px) {
          .cs-menu-btn {
            font-size: 1.25rem;
            padding: 0.5rem 1rem;
          }
          
          .cs-sidebar {
            width: 300px;
            border-right-width: 5px;
          }

          .cs-header {
            /* was 2.5rem, larger than the desktop size it steps down from */
            font-size: 2.1rem;
            margin-top: 2rem;
            box-shadow:
              inset 0 0 0 3px #FFD700,
              4px 4px 0 #FF1744,
              8px 8px 0 #000;
          }

          .cs-nav-item {
            font-size: 1.45rem;
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
        <Menu size={20} strokeWidth={3} />
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
            Ananthu Narashimman
        </div>
      </aside>
    </>
  );
};

export default ComicSidebar