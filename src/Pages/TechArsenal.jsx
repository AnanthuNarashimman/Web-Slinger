import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TechIcon from '../Components/TechIcon';
import { detailedTechStack } from '../data/techStack';
import { scrollTo } from '../lib/smoothScroll';
import '../PageStyles/TechArsenal.css';

const TechArsenal = () => {
  const navigate = useNavigate();

  // Land at the top of the page, and let Esc walk back to the portfolio
  useEffect(() => {
    scrollTo(0, { immediate: true });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate('/', { state: { scrollTo: 'tech-stack' } });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="arsenal-page">
      <div className="arsenal-halftone" aria-hidden="true"></div>

      <div className="arsenal-inner">
        {/* Back navigation */}
        <Link
          to="/"
          state={{ scrollTo: 'tech-stack' }}
          className="arsenal-back-btn"
        >
          <ArrowLeft size={20} strokeWidth={3} />
          <span>BACK TO STORY</span>
        </Link>

        {/* Cover header */}
        <header className="arsenal-header">
          <span className="arsenal-issue">ISSUE #01</span>
          <h1 className="arsenal-title">TECH ARSENAL</h1>
          <p className="arsenal-caption">
            Meanwhile, in the lab... every tool our hero swings with.
          </p>
        </header>

        {/* Category panels */}
        <div className="arsenal-grid">
          {Object.entries(detailedTechStack).map(([key, category]) => (
            <section key={key} className="arsenal-panel">
              <div
                className="arsenal-panel-header"
                style={{ backgroundColor: category.color }}
              >
                <h2 className="arsenal-panel-title">{category.title}</h2>
                <span className="arsenal-panel-sfx">{category.sfx}</span>
              </div>

              <p className="arsenal-panel-blurb">{category.blurb}</p>

              <ul className="arsenal-items">
                {category.items.map((item) => (
                  <li key={item.name} className="arsenal-item">
                    <span className="arsenal-item-icon">
                      <TechIcon type={item.icon} color={item.color} size={26} />
                    </span>
                    <span className="arsenal-item-name">{item.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Closing strip */}
        <footer className="arsenal-footer">
          <p className="arsenal-footer-text">
            TO BE CONTINUED... (the stack keeps growing!)
          </p>
          <Link
            to="/"
            state={{ scrollTo: 'tech-stack' }}
            className="arsenal-footer-btn"
          >
            <ArrowLeft size={18} strokeWidth={3} />
            <span>BACK TO STORY</span>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default TechArsenal;
