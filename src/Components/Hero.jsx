import "../ComponentStyles/Hero.css";

import Profile from "../assets/Images/comic_sprofile.png";

import { Send, Rocket, Users, Bot, Globe, Terminal, Layout } from 'lucide-react';

import NpmStatCard from './NpmStatCard';


function Hero() {
    return (
        <div className="portfolio-wrapper">
            <div className="social-bar">
                <a href="https://x.com/AnanthuN7652" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </a>
                <a href="https://github.com/AnanthuNarashimman" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/ananthunarashimman" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                    </svg>
                </a>
            </div>

            {/* Main Content */}
            <div className="container">
                {/* Hero Section */}
                <div className="hero">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <span className="title-line title-line-1">Building Solutions</span>
                            <span className="title-line title-line-2">That Matter</span>
                        </h1>
                        <p className="hero-subtitle">
                            I build agentic AI systems, developer tools, and full-stack products &ndash; from idea to deployed in days. Always at a hackathon, <span className="highlight">always shipping.</span>
                        </p>
                        <a href="mailto:ananthu.narashimman@gmail.com" style={{textDecoration: 'none'}}>
                        <button className="cta-btn">
                            Let's Connect
                            <div className="send-icon">
                                <Send className="send"/>
                            </div>
                        </button>
                        </a>
                        <div className="clients">
                            {/* npm takes the lead slot the projects count used to hold */}
                            <NpmStatCard />
                            {/* Phones only. There the row has the width for a third
                                pill, and the count reads better than nothing beside
                                the npm card. CSS hides this above the phone breakpoint. */}
                            <div className="stat-card stat-card--phone">
                                <div className="stat-icon stat-icon-pink">
                                    <Rocket size={20} strokeWidth={2.5} />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-number">10+</span>
                                    <span className="stat-label">Projects<br />Shipped</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon stat-icon-green">
                                    <Users size={20} strokeWidth={2.5} />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-number">500+</span>
                                    <span className="stat-label">Users<br />Served</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-image">

                        <div className="image-placeholder">
                            <div className="person-silhouette">
                                <img src={Profile} alt="" />
                            </div>
                        </div>


                        <div className="badge badge-1">
                            <span className="badge-icon"><Bot size={16} strokeWidth={2.5} /></span>
                            <span className="badge-text">Agentic Systems</span>
                        </div>

                        <div className="badge badge-2">
                            <span className="badge-icon"><Globe size={16} strokeWidth={2.5} /></span>
                            <span className="badge-text">Browser Automation</span>
                        </div>

                        <div className="badge badge-3">
                            <span className="badge-icon"><Terminal size={16} strokeWidth={2.5} /></span>
                            <span className="badge-text">CLI &amp; DevTools</span>
                        </div>

                        <div className="badge badge-4">
                            <span className="badge-icon"><Layout size={16} strokeWidth={2.5} /></span>
                            <span className="badge-text">Web Development</span>
                        </div>

                        <div className="name-banner">
                            <div className="name-text">Ananthu Narashimman</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
