import "../ComponentStyles/ProjectModal.css";
import { X, Github, ExternalLink, Mail } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

function ProjectModal({ project, isOpen, onClose }) {
    
    const [activeTech, setActiveTech] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const techRefs = useRef([]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen || !project) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleTechClick = (index, event) => {
        if (activeTech === index) {
            setActiveTech(null);
            return;
        }
        
        const rect = event.currentTarget.getBoundingClientRect();
        setPopupPosition({
            top: rect.top,
            left: rect.left + rect.width / 2
        });
        setActiveTech(index);
    };

    const closeTechPopup = () => {
        setActiveTech(null);
    };

    const scrollToContact = () => {
        onClose();
        // Adjust the selector based on your contact section's ID or class
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="modal-overlay" onClick={handleBackdropClick}>
            <div className="modal-container">
                <button className="modal-close-button" onClick={onClose} aria-label="Close modal">
                    <X size={24} />
                </button>

                <div className="modal-content">
                    {/* Header Section */}
                    <div className="modal-header">
                        <div className="modal-logo">
                            <img src={project.image} alt={project.title} />
                        </div>
                        <div className="modal-title-section">
                            <h1 className="modal-title">{project.title}</h1>
                            <span className={`modal-status-badge ${project.status === 'Live' ? 'status-live' : 'status-progress'}`}>
                                {project.status}
                            </span>
                        </div>
                    </div>

                    {/* Main Description */}
                    <div className="modal-section">
                        <h2 className="modal-section-title">About This Project</h2>
                        <p className="modal-description">{project.detailedDescription}</p>
                    </div>

                    {/* How I Got The Idea */}
                    <div className="modal-section">
                        <h2 className="modal-section-title">How I Got The Idea</h2>
                        <p className="modal-description">{project.inspiration}</p>
                    </div>

                    {/* Key Tech Stack */}
                    <div className="modal-section">
                        <h2 className="modal-section-title">Key Technologies Used</h2>
                        <div className="modal-tech-stack">
                            {project.techDetails.map((tech, index) => (
                                <div 
                                    key={index} 
                                    className={`tech-item ${activeTech === index ? 'active' : ''}`}
                                    onClick={(e) => handleTechClick(index, e)}
                                >
                                    <span className="tech-name">{tech.name}</span>
                                    <div className="tech-tooltip">
                                        Click for details
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Details Popup - Portal */}
                    {activeTech !== null && project.techDetails[activeTech] && (
                        <div 
                            className="tech-details-popup show"
                            style={{
                                position: 'fixed',
                                top: `${popupPosition.top}px`,
                                left: `${popupPosition.left}px`,
                                transform: 'translate(-50%, calc(-100% - 15px))'
                            }}
                        >
                            <div className="tech-popup-header">
                                <h4 className="tech-popup-title">{project.techDetails[activeTech].name}</h4>
                                <button 
                                    className="tech-popup-close"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeTechPopup();
                                    }}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                            <p className="tech-popup-content">{project.techDetails[activeTech].reason}</p>
                        </div>
                    )}

                    {/* Challenges & Solutions */}
                    <div className="modal-section">
                        <h2 className="modal-section-title">Challenges Faced & Solutions</h2>
                        <div className="challenges-container">
                            {project.challenges.map((challenge, index) => (
                                <div key={index} className="challenge-item">
                                    <div className="challenge-problem">
                                        <h3 className="challenge-label">Challenge</h3>
                                        <p>{challenge.problem}</p>
                                    </div>
                                    <div className="challenge-solution">
                                        <h3 className="challenge-label">Solution</h3>
                                        <p>{challenge.solution}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Project Links */}
                    <div className="modal-section">
                        <div className="modal-links">
                            <a
                                href={project.gitLink}
                                className="modal-button github-button"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github size={20} />
                                View Code on GitHub
                            </a>
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    className="modal-button live-button"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink size={20} />
                                    View Live Demo
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="modal-cta">
                        <p className="cta-text">
                            Like what you see? I'm always eager to discuss new ideas or opportunities.
                        </p>
                        <button className="modal-button contact-button" onClick={scrollToContact}>
                            <Mail size={20} />
                            Get in Touch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectModal;
