import "../ComponentStyles/Hero.css";
import Marquee from "./Marquee";

import Profile from "../assets/Images/comic_sprofile.png";

import { Send } from 'lucide-react';


function Hero() {
    return (
        <div className="portfolio-wrapper">
            <div className="social-bar">
                <a href="#" className="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </a>
                <a href="#" className="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                </a>
                <a href="#" className="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="white" strokeWidth="2" />
                        <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
                    </svg>
                </a>
                <a href="#" className="social-link">
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
                            Building Solutions That Matter
                        </h1>
                        <p className="hero-subtitle">
                            Hi, I'm a Full-stack developer turning ideas into production-ready applications with AI and modern web tech
                        </p>
                        <button className="cta-btn">
                            Let's Connect
                            <div className="send-icon">
                                <Send className="send"/>
                            </div>
                        </button>
                        <div className="clients">
                            <div className="client-avatars">
                                <div className="avatar" data-tooltip="GenTeach">
                                    G
                                    <span className="tooltip">GenTeach</span>
                                </div>
                                <div className="avatar" data-tooltip="Syntax">
                                    S
                                    <span className="tooltip">Syntax</span>
                                </div>
                                <div className="avatar" data-tooltip="PingMyPhone">
                                    P
                                    <span className="tooltip">PingMyPhone</span>
                                </div>
                                <div className="avatar" data-tooltip="Glimpse">
                                    G
                                    <span className="tooltip">Glimpse</span>
                                </div>
                            </div>
                            <span className="client-text">5+ Projects Shipped</span>
                        </div>
                    </div>

                    <div className="hero-image">

                        <div className="image-placeholder">
                            <div className="person-silhouette">
                                <img src={Profile} alt="" />
                            </div>
                        </div>

                        <div className="badge badge-1">React Developer</div>
                        <div className="badge badge-2">Backend Architect</div>
                        <div className="badge badge-3">API Integrator</div>
                        <div className="badge badge-4">Product Builder</div>

                        <div className="name-banner">
                            <div className="name-text">Ananthu Narashimman</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Ticker */}
            <Marquee />
        </div>
    )
}

export default Hero
