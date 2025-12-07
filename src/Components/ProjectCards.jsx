import "../ComponentStyles/ProjectCards.css";
import { Github, ExternalLink, Eye, Projector } from "lucide-react";
import { useState } from "react";
import ProjectModal from "./ProjectModal";

// Project image imports
import Syntax from "../assets/Images/Syntax.png";
import Glimpse from "../assets/Images/Glimpse.png";
import GenTeach from "../assets/Images/GenTeach.png";
import PingMyPhone from "../assets/Images/PingMyPhone.png";

function ProjectCards() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const projects = [
        {
            title: "Glimpse (Offline RAG)",
            description: "A secure, privacy-first multimodal RAG system that transforms your local documents, images, and audio files into an intelligent, queryable knowledge base.",
            detailedDescription: "Glimpse is a groundbreaking offline Retrieval-Augmented Generation (RAG) system designed to provide users with complete control over their data while leveraging the power of AI. Built with privacy as a core principle, Glimpse processes documents, images, and audio files locally on your machine, transforming them into an intelligent, searchable knowledge base. The application combines the flexibility of Electron.js with the power of local AI models through Ollama, ensuring that sensitive information never leaves your device. Users can query their personal knowledge base using natural language, receiving accurate, context-aware responses drawn from their own documents and media files.",
            techStack: ["Electron.js", "React", "Python", "Ollama"],
            techDetails: [
                { name: "Electron.js", reason: "For building a cross-platform desktop application with native OS integration" },
                { name: "React", reason: "To create a dynamic, responsive user interface with component-based architecture" },
                { name: "Python", reason: "For robust backend processing, AI model integration, and document parsing" },
                { name: "Ollama", reason: "To run powerful language models locally without cloud dependencies" }
            ],
            inspiration: "The idea for Glimpse emerged from growing concerns about data privacy and the realization that many professionals handle sensitive documents that cannot be uploaded to cloud-based AI services. I noticed researchers, lawyers, healthcare professionals, and business executives all faced the same dilemma: they needed AI-powered document analysis but couldn't risk exposing confidential information. This inspired me to create a solution that brings enterprise-grade AI capabilities to local machines, ensuring complete data sovereignty while maintaining the convenience of modern AI tools.",
            challenges: [
                {
                    problem: "Implementing efficient multimodal document processing that could handle various file formats (PDFs, images, audio) while maintaining fast query response times on consumer hardware.",
                    solution: "Developed a sophisticated chunking and indexing system using Python's multiprocessing capabilities, combined with optimized vector embeddings. Implemented a smart caching mechanism that preloads frequently accessed documents and uses incremental indexing to minimize processing overhead."
                },
                {
                    problem: "Integrating Ollama's local AI models with the Electron application while managing memory usage and ensuring smooth UI interactions without freezing.",
                    solution: "Created a separate Python backend service that communicates with the Electron frontend through IPC (Inter-Process Communication). Implemented a job queue system that processes AI requests asynchronously, preventing UI blocking while providing real-time progress updates to users."
                },
                {
                    problem: "Designing an intuitive user experience that makes complex RAG technology accessible to non-technical users while offering advanced features for power users.",
                    solution: "Adopted a progressive disclosure approach in the UI design, with a simple chat-like interface for basic queries and collapsible panels for advanced features like custom model selection, context adjustment, and document filtering. Included contextual tooltips and an interactive onboarding tutorial."
                }
            ],
            status: "In Progress",
            gitLink: "https://github.com/AnanthuNarashimman/Glimpse-Edge",
            liveLink: null,
            image: Glimpse
        },
        {
            title: "GenTeach",
            description: "An AI-powered application that automatically generates concise, educational explainer videos (text, audio, and visuals) from any given topic.",
            detailedDescription: "GenTeach revolutionizes educational content creation by automating the entire video production pipeline. Simply input a topic, and the application generates a complete explainer video with script, voiceover, and synchronized visuals. Leveraging Google's Gemini API for intelligent content generation and Vertex AI for text-to-speech synthesis, GenTeach produces professional-quality educational videos in minutes. The platform uses Firebase for seamless user management and content storage, making it easy for educators, content creators, and students to produce engaging educational materials without technical expertise in video editing or production.",
            techStack: ["React", "Python Flask", "Gemini API", "Vertex API", "Firebase"],
            techDetails: [
                { name: "React", reason: "For building an interactive, real-time preview interface with component reusability" },
                { name: "Python Flask", reason: "To orchestrate AI services, handle video processing, and manage API integrations" },
                { name: "Gemini API", reason: "For generating structured, accurate educational content with context awareness" },
                { name: "Vertex API", reason: "To synthesize natural-sounding voiceovers with multiple voice options" },
                { name: "Firebase", reason: "For real-time database, authentication, and scalable cloud storage" }
            ],
            inspiration: "While helping students with online learning during the pandemic, I noticed that high-quality educational videos took hours to produce but were consumed in minutes. Teachers and tutors struggled with the technical aspects of video creation, often spending more time on editing than on pedagogy. I wanted to democratize educational video production, enabling anyone with knowledge to share to focus on content quality rather than production skills. GenTeach was born from the belief that technology should amplify human expertise, not replace it.",
            challenges: [
                {
                    problem: "Synchronizing generated text, audio narration, and relevant visuals to create a coherent educational narrative without manual intervention.",
                    solution: "Developed a timestamp-based coordination system that analyzes the generated script, identifies key concepts, and maps them to appropriate visual elements. Used natural language processing to detect scene transitions and created a timing algorithm that paces the video based on content complexity and audio duration."
                },
                {
                    problem: "Managing the high costs and rate limits of multiple AI APIs (Gemini and Vertex) while maintaining responsive user experience.",
                    solution: "Implemented an intelligent caching layer that stores frequently requested topics and reuses components when possible. Created a request batching system that processes multiple elements in parallel and uses Firebase Cloud Functions to distribute API calls across different time windows, optimizing for cost and speed."
                },
                {
                    problem: "Ensuring generated educational content was accurate, age-appropriate, and pedagogically sound across diverse topics.",
                    solution: "Built a content validation pipeline that uses Gemini's instruction-following capabilities with carefully crafted prompts that emphasize accuracy and educational best practices. Implemented a difficulty-level selector that adjusts vocabulary and explanation depth, and added a review mode where educators can edit generated content before final video synthesis."
                }
            ],
            status: "Live",
            gitLink: "https://github.com/AnanthuNarashimman/GenTeach---AI",
            liveLink: "https://gen-teach-ai-kd7v.vercel.app",
            image: GenTeach
        },
        {
            title: "Syntax (Contest Platform)",
            description: "A full-stack quiz and contest platform featuring a robust backend with multi-level admin and super-admin panels for complete management.",
            detailedDescription: "Syntax is a comprehensive contest and quiz platform designed for educational institutions, coding clubs, and competitive programming communities. The platform supports multiple contest formats including timed quizzes, coding challenges, and multi-round competitions. Built with scalability in mind, Syntax features a sophisticated multi-level administrative system where super-admins can manage organizations, admins can create and manage contests, and moderators can monitor submissions in real-time. Integration with Judge0 provides secure code execution and automatic evaluation for programming challenges, while Firebase ensures real-time leaderboard updates and reliable data persistence. The platform handles everything from user registration and team formation to automated scoring and certificate generation.",
            techStack: ["React", "Node.js", "Firebase", "Judge0"],
            techDetails: [
                { name: "React", reason: "For building a responsive, real-time interface with complex state management for contests" },
                { name: "Node.js", reason: "To handle concurrent user requests, real-time updates, and backend logic processing" },
                { name: "Firebase", reason: "For real-time database synchronization, authentication, and scalable cloud hosting" },
                { name: "Judge0", reason: "To securely execute and evaluate code submissions across multiple programming languages" }
            ],
            inspiration: "As a competitive programming enthusiast, I participated in numerous online contests but found existing platforms either too complex for beginners or lacking features for organizers. Many educational institutions struggled with expensive licensing fees for contest platforms or had to manually grade submissions. I envisioned a platform that would be accessible to students while providing professional-grade tools for contest organizers. The goal was to lower the barrier to entry for hosting programming competitions and make competitive coding more accessible to diverse communities.",
            challenges: [
                {
                    problem: "Implementing a fair and secure code execution environment that prevents cheating, handles resource limits, and supports multiple programming languages simultaneously.",
                    solution: "Integrated Judge0 API with custom middleware that adds security layers including code plagiarism detection algorithms, time and memory limit enforcement, and isolated execution environments. Built a submission queue system that handles concurrent executions efficiently and provides detailed feedback including test case results, execution time, and memory usage."
                },
                {
                    problem: "Creating a flexible role-based access control system that scales from small college contests to large inter-university competitions with hundreds of organizers.",
                    solution: "Designed a hierarchical permission system using Firebase Security Rules and custom claims. Implemented organization-level isolation where super-admins have god-mode capabilities, admins can manage their organization's contests, and moderators have read-only access with monitoring tools. Used React Context API to manage complex permission states across the frontend."
                },
                {
                    problem: "Maintaining real-time leaderboard consistency while handling thousands of simultaneous submissions during peak contest hours without server overload.",
                    solution: "Implemented a batched update system using Firebase Cloud Functions that aggregates score changes and updates leaderboards at fixed intervals during high-traffic periods. Created a client-side optimistic update mechanism that shows immediate feedback to users while background processes ensure data consistency. Used Firebase Realtime Database listeners to push updates only when necessary, reducing bandwidth and computational overhead."
                }
            ],
            status: "In Progress",
            gitLink: "https://github.com/AnanthuNarashimman/Syntax",
            liveLink: null,
            image: Syntax 
        },
        {
            title: "PingMyPhone",
            description: "A deployed full-stack application that allows users to register and schedule automated Telegram messages to be sent at any future date and time.",
            detailedDescription: "PingMyPhone is a smart scheduling application that bridges the gap between intention and action by enabling users to send future reminders or messages to themselves via Telegram. Whether it's a birthday reminder six months away, a motivational message for exam week, or a scheduled check-in for important tasks, PingMyPhone ensures you never forget. The application features an intuitive interface for creating, editing, and managing scheduled messages, with timezone support and recurring message options. Built on a reliable tech stack with Python Flask backend and Firebase database, the system uses GitHub Actions as a cron service to trigger messages at precisely scheduled times, ensuring delivery even if the user is offline.",
            techStack: ["React", "Python Flask", "Firebase", "Telegram Bot", "Github actions"],
            techDetails: [
                { name: "React", reason: "For creating an intuitive scheduling interface with calendar views and message management" },
                { name: "Python Flask", reason: "To handle API requests, manage Telegram bot integration, and process scheduled tasks" },
                { name: "Firebase", reason: "For secure user authentication, real-time data sync, and persistent message storage" },
                { name: "Telegram Bot", reason: "To deliver messages reliably through a platform users check daily" },
                { name: "GitHub Actions", reason: "As a free, reliable cron service for triggering scheduled message deliveries" }
            ],
            inspiration: "The inspiration struck when I kept forgetting to send important messages at the right time—birthday wishes, follow-ups on applications, and personal reminders. Existing reminder apps sent notifications that were easy to dismiss, but a Telegram message felt more tangible and harder to ignore. I realized many people face this challenge: we want to reach out to ourselves in the future but lack a reliable bridge. PingMyPhone was created to be that bridge, turning future intentions into present actions through the platform we already use daily—Telegram.",
            challenges: [
                {
                    problem: "Implementing a reliable scheduling system without expensive always-on servers or complex infrastructure, while ensuring messages are delivered at exactly the scheduled time across different timezones.",
                    solution: "Leveraged GitHub Actions as an innovative, cost-free cron service by creating scheduled workflows that run every few minutes, check Firebase for pending messages, and trigger the Flask API when needed. Implemented timezone-aware datetime handling in Python and added a queue system that processes messages in batches while respecting user timezone preferences. This creative solution eliminated hosting costs while maintaining reliability."
                },
                {
                    problem: "Securely integrating Telegram Bot API while protecting user privacy and preventing unauthorized access to scheduled messages.",
                    solution: "Implemented a two-layer authentication system where users first authenticate with Firebase, then link their Telegram account through a unique verification code. Encrypted sensitive message content in the database and used environment variables with GitHub Secrets to protect API keys. Created a rate-limiting middleware to prevent abuse and added message verification to ensure only authenticated users can create or view their scheduled messages."
                },
                {
                    problem: "Handling edge cases like edited messages, deleted schedules, rate limits from Telegram API, and failed deliveries without losing user data.",
                    solution: "Built a comprehensive error handling and retry mechanism that logs failed deliveries and attempts redelivery with exponential backoff. Implemented soft-delete functionality where messages are marked as completed rather than deleted, enabling delivery history and analytics. Created a status dashboard where users can see pending, delivered, and failed messages with detailed timestamps and error messages when applicable."
                }
            ],
            status: "Live",
            gitLink: "https://github.com/AnanthuNarashimman/PingMyPhone",
            liveLink: "https://ping-my-phone.vercel.app/",
            image: PingMyPhone
        }
    ];

    const openModal = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    return (
        <div className="carousel-container">
            <div className="section-header">
                <h1 className="section-title">Projects <Projector size={35} /></h1>
                <p className="section-subtitle">Showcasing my recent work and development projects</p>
            </div>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card-wrapper"
                    >
                        <span className="paper-pin" aria-hidden="true" />

                        <div
                            className={`project-card ${
                                index % 2 === 0 ? "tilt-right" : "tilt-left"
                            }`}
                        >
                            {/* Project Image */}
                            <div className="project-image-container">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="project-image"
                                    />
                                ) : (
                                    <div className="project-image-placeholder">
                                        <Eye size={48} strokeWidth={1.5} />
                                        <span>Project Preview</span>
                                    </div>
                                )}
                            </div>

                            <div className="card-inner">
                                <div className="card-header">
                                    <div className="title-section">
                                        <h2 className="project-title">{project.title}</h2>
                                        <p className="project-description">
                                            {project.description}
                                        </p>
                                    </div>
                                    <span
                                        className={`status-badge ${
                                            project.status === "Live"
                                                ? "status-live"
                                                : "status-progress"
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                </div>

                                <div className="tech-stack">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="tech-badge">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="project-links">
                                    <a
                                        href={project.gitLink}
                                        className="link-button git-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github size={18} />
                                        View Code
                                    </a>
                                    {project.liveLink ? (
                                        <a
                                            href={project.liveLink}
                                            className="link-button live-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink size={18} />
                                            Live Demo
                                        </a>
                                    ) : (
                                        <button className="link-button live-link" disabled>
                                            <ExternalLink size={18} />
                                            Coming Up
                                        </button>
                                    )}
                                    <button
                                        className="link-button details-button"
                                        onClick={() => openModal(project)}
                                    >
                                        <Eye size={18} />
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="more-projects-section">
                <div className="more-projects-content">
                    <h3 className="more-projects-title">Explore More Projects</h3>
                    <p className="more-projects-description">
                        Check out my complete collection of projects, experiments, and open-source contributions on GitHub.
                    </p>
                    <a 
                        href="https://github.com/yourusername" 
                        className="github-profile-button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github size={20} />
                        View All Projects on GitHub
                    </a>
                </div>
            </div>

            <ProjectModal 
                project={selectedProject} 
                isOpen={isModalOpen} 
                onClose={closeModal} 
            />
        </div>
    )
}

export default ProjectCards
