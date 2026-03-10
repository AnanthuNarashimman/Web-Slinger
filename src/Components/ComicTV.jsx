import { useState, useEffect, useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import "../ComponentStyles/ComicTV.css";

import AlgoFlowLP from "../assets/Images/AlgoFlowLP.png";
import SyntaxLP from "../assets/Images/SyntaxLP.png";
import DamnJsLP from "../assets/Images/DamnJsLp.png";
import VibeAuditLP from "../assets/Images/VibeAuditLP.png";


function ComicTV() {
    const [isOn, setIsOn] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [volume, setVolume] = useState(30);
    const [isWarmingUp, setIsWarmingUp] = useState(false);
    const [knobRotation, setKnobRotation] = useState(0);
    
    const canvasRef = useRef(null);
    const staticAnimationIdRef = useRef(null);

    const projects = [
        {
            id: 0,
            title: "VibeAudit",
            subtitle: "(AI Design Auditor)",
            description: "VibeAudit is an AI-powered website design auditor that replaces manual design QA with automated analysis. Using Gemini 3 Pro, it crawls your website viewport-by-viewport, evaluating CTA effectiveness, theme consistency, and intent alignment. The browser agent captures screenshots and generates scored reports (0-100) with actionable feedback, making design validation as automated as performance testing.",
            techStack: ["React", "Python Flask", "Gemini API", "Browser-use", "Playwright", "Socket.io"],
            status: "Live",
            gitLink: "https://github.com/AnanthuNarashimman/QAI",
            liveLink: "https://vibeaudit-delta.vercel.app",
            image: VibeAuditLP
        },
        {
            id: 1,
            title: "AlgoFlow",
            subtitle: "(Algo Visualizer)",
            description: "AlgoFlow transforms your Python or JavaScript code into interactive flowcharts in real-time using Google Gemini AI. It analyzes code structure, identifies conditionals, loops, and recursion, then renders an explorable visual representation. An AI tutor powered by Mem0 remembers your learning journey across sessions, providing context-aware explanations and complexity insights for every algorithm you write.",
            techStack: ["React", "Node.js", "Gemini API", "Mem0", "React Flow"],
            status: "Live",
            gitLink: "https://github.com/AnanthuNarashimman/AlgoFlow",
            liveLink: "https://algo-flow-roan.vercel.app",
            image: AlgoFlowLP
        },
        {
            id: 2,
            title: "Syntax",
            subtitle: "(Contest Platform)",
            description: "Syntax is a comprehensive contest platform for educational institutions and competitive programming communities. It supports timed quizzes, coding challenges, and multi-round competitions with a multi-level admin system. Judge0 integration provides secure code execution and automatic evaluation, while Firebase ensures real-time leaderboard updates and reliable data persistence.",
            techStack: ["React", "Node.js", "Firebase", "Judge0"],
            status: "Live",
            gitLink: "https://github.com/AnanthuNarashimman/Syntax",
            liveLink: "https://syntax-nu.vercel.app/",
            image: SyntaxLP 
        },
        {
            id: 3,
            title: "damn.js",
            subtitle: "(DevTools Extension)",
            description: "damn.js is a Chrome DevTools extension that mirrors console errors in real time and provides AI-powered explanations plus structured debugging prompts. It hooks into console.error, window.onerror, and unhandled promise rejections, forwarding them to a custom DevTools panel. Click Explain for contextual AI analysis and documentation references, or Spell to generate a ready-to-paste prompt for Claude, Cursor, or ChatGPT.",
            techStack: ["Manifest V3", "Vanilla JS", "Node.js", "Gemini API", "Vercel"],
            status: "Live",
            gitLink: "https://github.com/AnanthuNarashimman/damn.js",
            liveLink: "https://damn-js-lp.vercel.app/",
            image: DamnJsLP
        }
    ];

    useEffect(() => {
        return () => {
            if (staticAnimationIdRef.current) {
                cancelAnimationFrame(staticAnimationIdRef.current);
            }
        };
    }, []);

    const blinkLed = () => {
        const led = document.getElementById('receiver-led');
        if (led) {
            led.classList.add('blink');
            setTimeout(() => {
                led.classList.remove('blink');
            }, 150);
        }
    };

    const renderHalftoneStatic = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const container = canvas.parentElement;
        const w = container.offsetWidth;
        const h = container.offsetHeight;
        
        canvas.width = w;
        canvas.height = h;
        
        const ctx = canvas.getContext('2d');
        const dotSize = Math.max(2, Math.floor(w / 150));
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        
        ctx.fillStyle = '#000000';
        for (let x = 0; x < w; x += dotSize * 2) {
            for (let y = 0; y < h; y += dotSize * 2) {
                if (Math.random() > 0.5) {
                    ctx.beginPath();
                    ctx.arc(x + dotSize/2, y + dotSize/2, dotSize/2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        
        staticAnimationIdRef.current = requestAnimationFrame(renderHalftoneStatic);
    };

    useEffect(() => {
        if (isOn && selectedProject === null) {
            renderHalftoneStatic();
        } else {
            if (staticAnimationIdRef.current) {
                cancelAnimationFrame(staticAnimationIdRef.current);
                staticAnimationIdRef.current = null;
            }
        }
    }, [isOn, selectedProject]);

    const togglePower = () => {
        if (!isOn) {
            setIsWarmingUp(true);
            setTimeout(() => {
                setIsOn(true);
                setIsWarmingUp(false);
                blinkLed();
            }, 600);
        } else {
            setIsOn(false);
            setSelectedProject(null);
            blinkLed();
        }
    };

    const selectProject = (project) => {
        if (!isOn) {
            togglePower();
            setTimeout(() => {
                setSelectedProject(project);
                setKnobRotation(prev => prev + 90);
                blinkLed();
            }, 700);
        } else {
            setSelectedProject(project);
            setKnobRotation(prev => prev + 90);
            blinkLed();
        }
    };

    const increaseVolume = () => {
        setVolume(prev => Math.min(100, prev + 10));
        blinkLed();
    };

    const decreaseVolume = () => {
        setVolume(prev => Math.max(0, prev - 10));
        blinkLed();
    };

    const renderScreenContent = () => {
        if (!isOn) {
            return <div style={{ width: '100%', height: '100%', background: '#000' }}></div>;
        }

        if (selectedProject === null) {
            return (
                <div className="channel-static">
                    <div className="halftone-bg"></div>
                    <canvas ref={canvasRef} className="static-canvas"></canvas>
                    <div className="speech-bubble">PROJECT SHOWCASE</div>
                    <div className="channel-number">TUNE A CHANNEL</div>
                </div>
            );
        }

        const project = projects[selectedProject];
        return (
            <div className="project-tv-display">
                <div className="vintage-flicker"></div>
                <div className="vintage-overlay"></div>
                <div className="crt-scanlines"></div>
                <div className="noise-grain"></div>
                <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-tv-image"
                />
                <div className="tv-vignette"></div>
                <div className="tv-scan-beam"></div>
                <div className="screen-glow"></div>
            </div>
        );
    };

    return (
        <div className="project-showcase-container">
            <div className="section-header-tv">
                <h2 className="header-title-tv">Featured Projects</h2>
                <p className="header-subtitle-tv">Explore my work through this vintage TV experience</p>
            </div>
            
            <div className={`ambient-glow ${isOn ? 'on' : ''}`}></div>
            
            <div className="showcase-layout">
                {/* TV Section - Left */}
                <div className="tv-section">
                    <div className="tv-container">
                        <div className="tv-chassis">
                            <div className="screen-wrapper">
                                <div className="screen-bezel">
                                    <div className="screen-container">
                                        <div className="screen-glass"></div>
                                        <div className="scanlines"></div>
                                        
                                        <div className="screen-content">
                                            {renderScreenContent()}
                                        </div>

                                        <div className={`power-off-overlay ${isOn ? 'on' : 'off'}`}>
                                            {isWarmingUp && <div className="warm-up-flash"></div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="control-panel">
                                    <div className="speaker-grille">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className="speaker-hole"></div>
                                        ))}
                                    </div>

                                    <div className="center-controls">
                                        <div className="knob-container">
                                            <button 
                                                className="knob" 
                                                onClick={() => selectProject(selectedProject === null ? 0 : (selectedProject + 1) % 4)}
                                                style={{ transform: `rotate(${knobRotation}deg)` }}
                                            >
                                                <div className="knob-indicator"></div>
                                            </button>
                                            <span className="knob-label">PROGRAM</span>
                                        </div>

                                        <div className="knob-container">
                                            <div className="volume-buttons">
                                                <button className="vol-btn" onClick={increaseVolume}>+</button>
                                                <button className="vol-btn" onClick={decreaseVolume}>-</button>
                                            </div>
                                            <span className="knob-label">VOL</span>
                                        </div>

                                        <button 
                                            className={`power-button ${isOn ? 'on' : ''}`}
                                            onClick={togglePower}
                                        >
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                                                <line x1="12" y1="2" x2="12" y2="12"></line>
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="speaker-grille">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className="speaker-hole"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tv-leg left"></div>
                        <div className="tv-leg right"></div>
                    </div>
                </div>

                {/* Project Details Section - Right */}
                <div className="details-section">
                    <div className="comic-paper">
                        {selectedProject !== null && projects[selectedProject] ? (
                            <div className="project-details">
                                <span className="paper-pin top-left" aria-hidden="true" />
                                <span className="paper-pin top-right" aria-hidden="true" />
                                
                                <div className="project-header">
                                    <h2 className="project-title-comic">
                                        {projects[selectedProject].title}
                                        {projects[selectedProject].subtitle && (
                                            <span className="project-subtitle">{projects[selectedProject].subtitle}</span>
                                        )}
                                    </h2>
                                    <span className={`status-badge-comic ${projects[selectedProject].status === 'Live' ? 'status-live' : 'status-progress'}`}>
                                        {projects[selectedProject].status}
                                    </span>
                                </div>

                                <div className="project-description-comic">
                                    <p>{projects[selectedProject].description}</p>
                                </div>

                                <div className="tech-stack-comic">
                                    <h3 className="section-title-comic">Tech Stack</h3>
                                    <div className="tech-badges-comic">
                                        {projects[selectedProject].techStack.map((tech, i) => (
                                            <span key={i} className="tech-badge-comic">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="project-links-comic">
                                    <a
                                        href={projects[selectedProject].gitLink}
                                        className="comic-button github-btn"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github size={18} />
                                        View Code
                                    </a>
                                    {projects[selectedProject].liveLink ? (
                                        <a
                                            href={projects[selectedProject].liveLink}
                                            className="comic-button live-btn"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink size={18} />
                                            Live Demo
                                        </a>
                                    ) : (
                                        <button className="comic-button live-btn" disabled>
                                            <ExternalLink size={18} />
                                            Coming Up
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="project-details placeholder">
                                <span className="paper-pin top-left" aria-hidden="true" />
                                <span className="paper-pin top-right" aria-hidden="true" />
                                
                                <div className="placeholder-content">
                                    <h2 className="placeholder-title">PROJECT SHOWCASE</h2>
                                    <p className="placeholder-text">
                                        Choose a channel below to explore amazing projects!
                                    </p>
                                    <div className="arrow-down-comic">↓ Select Channel ↓</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Project Selector Cards - Bottom Right */}
                    <div className="project-selector">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={`project-card-mini ${selectedProject === project.id ? 'active' : ''}`}
                                onClick={() => selectProject(project.id)}
                            >
                                <span className="card-pin" aria-hidden="true" />
                                <div className="card-content-mini">
                                    <span className="project-number">CH {project.id + 1}</span>
                                    <h4 className="project-name-mini">{project.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComicTV;
