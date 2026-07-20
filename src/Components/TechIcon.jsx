import React from 'react';
import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiFlask,
  SiFlutter,
  SiTypescript,
  SiNextdotjs,
  SiFirebase,
  SiGooglecloud,
  SiGit,
  SiPostman,
  SiFigma,
  SiMysql,
  SiElectron,
  SiScikitlearn,
  SiLangchain,
  SiHuggingface,
  SiN8N,
  SiOpenai,
} from 'react-icons/si';
import { Database, Cpu, Globe, Code2, Layers, Coffee } from 'lucide-react';

// Shared icon renderer used by the tech section and the arsenal page
const TechIcon = ({ type, color, size = 28 }) => {
  const iconStyle = {
    color: color,
    filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))'
  };

  switch (type) {
    case 'react': return <SiReact size={size} style={iconStyle} />;
    case 'js': return <SiJavascript size={size} style={iconStyle} />;
    case 'node': return <SiNodedotjs size={size} style={iconStyle} />;
    case 'python': return <SiPython size={size} style={iconStyle} />;
    case 'flask': return <SiFlask size={size} style={iconStyle} />;
    case 'flutter': return <SiFlutter size={size} style={iconStyle} />;
    case 'typescript': return <SiTypescript size={size} style={iconStyle} />;
    case 'next': return <SiNextdotjs size={size} style={iconStyle} />;
    case 'firebase': return <SiFirebase size={size} style={iconStyle} />;
    case 'gcp': return <SiGooglecloud size={size} style={iconStyle} />;
    case 'git': return <SiGit size={size} style={iconStyle} />;
    case 'postman': return <SiPostman size={size} style={iconStyle} />;
    case 'figma': return <SiFigma size={size} style={iconStyle} />;
    case 'java': return <Coffee size={size} style={iconStyle} />;
    case 'mysql': return <SiMysql size={size} style={iconStyle} />;
    case 'sklearn': return <SiScikitlearn size={size} style={iconStyle} />;
    case 'electron': return <SiElectron size={size} style={iconStyle} />;
    case 'gemini': return <Cpu size={size} style={iconStyle} />;
    case 'transformers': return <SiHuggingface size={size} style={iconStyle} />;
    case 'llm': return <SiOpenai size={size} style={iconStyle} />;
    case 'automation': return <Globe size={size} style={iconStyle} />;
    case 'sql': return <Database size={size} style={iconStyle} />;
    case 'langchain': return <SiLangchain size={size} style={iconStyle} />;
    case 'pinecone': return <Database size={size} style={iconStyle} />;
    case 'langgraph': return <SiLangchain size={size} style={iconStyle} />;
    case 'chromadb': return <Database size={size} style={iconStyle} />;
    case 'judge0': return <Code2 size={size} style={iconStyle} />;
    case 'fullstack': return <Layers size={size} style={iconStyle} />;
    case 'api': return <Globe size={size} style={iconStyle} />;
    case 'websocket': return <Globe size={size} style={iconStyle} />;
    case 'mastra': return <Layers size={size} style={iconStyle} />;
    case 'crewai': return <Cpu size={size} style={iconStyle} />;
    case 'agnos': return <SiOpenai size={size} style={iconStyle} />;
    case 'n8n': return <SiN8N size={size} style={iconStyle} />;
    default: return <SiReact size={size} style={iconStyle} />;
  }
};

export default TechIcon;
