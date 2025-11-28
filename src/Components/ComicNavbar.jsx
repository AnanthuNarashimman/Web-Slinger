import { useState, useEffect } from 'react';
import { Home, Briefcase, Code, Clock, Mail, Menu, X } from 'lucide-react';
import '../ComponentStyles/ComicNavbar.css';

function ComicNavbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'tech-stack', label: 'Tech Stack', icon: Code },
    { id: 'timeline', label: 'Journey', icon: Clock },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Navbar height offset
      const targetPosition = section.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`comic-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="comic-navbar-container">
        {/* Logo */}
        <div className="comic-navbar-logo">
          <span className="logo-text">ANANTHU</span>
          <div className="logo-star">★</div>
        </div>

        {/* Desktop Navigation */}
        <div className="comic-navbar-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`comic-nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button className="comic-menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`comic-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`comic-mobile-link ${activeSection === item.id ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default ComicNavbar;
