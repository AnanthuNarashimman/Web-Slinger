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
  SiFastapi,
  SiAmazonwebservices,
} from 'react-icons/si';
import { Database, Cpu, Globe, Code2, Layers, Coffee } from 'lucide-react';

/*
 * Marks the icon set does not carry.
 *
 * Mastra, CrewAI and LangGraph have no entry in Simple Icons, so they were
 * falling back to generic glyphs — and LangGraph was worse than generic, it
 * was rendering LangChain's logo, which is a different product. These are the
 * projects' own published marks, all drawn on the same 24x24 box and filled
 * with currentColor so they size and tint exactly like the rest.
 */
const BrandMark = ({ title, size, style, children }) => (
  <svg
    role="img"
    aria-label={title}
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    fillRule="evenodd"
    clipRule="evenodd"
    style={style}
  >
    {children}
  </svg>
);

const MastraMark = (props) => (
  <BrandMark title="Mastra" {...props}>
    <path d="M14.74 9.977l-1.584 1.583h3.563v.942h-3.563l1.583 1.583-.666.666-2.053-2.054-2.054 2.054-.666-.666 1.583-1.583H7.32v-.942h3.562L9.299 9.977l.666-.666 2.055 2.054 2.054-2.054.666.666z" />
    <path d="M11.99.083c6.575 0 11.905 5.332 11.905 11.907 0 3.198-1.263 6.099-3.315 8.237a5.727 5.727 0 01-.353.353 11.862 11.862 0 01-8.237 3.316C5.415 23.895.084 18.566.084 11.99c0-3.188 1.255-6.081 3.296-8.219a5.75 5.75 0 01.393-.394A11.864 11.864 0 0111.99.083zM1.93 16.354c1.687 3.884 5.556 6.6 10.06 6.6 1.42 0 2.776-.274 4.022-.765a9.709 9.709 0 01-2.23-.186c-1.665-.328-3.396-1.069-5.036-2.18-1.946-.374-3.695-1.074-5.104-2.02a9.703 9.703 0 01-1.712-1.448zm19.154.899a10.46 10.46 0 01-.746.55c-2.157 1.447-5.11 2.327-8.349 2.327-.296 0-.59-.011-.88-.025.96.463 1.922.791 2.854.975 2.345.462 4.427.015 5.78-1.338.669-.67 1.116-1.518 1.341-2.49zM11.989 4.79c-3.077 0-5.841.838-7.823 2.167a8.863 8.863 0 00-1.44 1.195 8.86 8.86 0 00.172 1.864c.462 2.34 1.826 4.888 4.001 7.064.705.705 1.45 1.323 2.213 1.855.916.164 1.88.254 2.877.254 3.077 0 5.843-.838 7.825-2.168a8.858 8.858 0 001.438-1.194 8.865 8.865 0 00-.172-1.864c-.461-2.341-1.824-4.888-4-7.064a16.323 16.323 0 00-2.213-1.855 16.32 16.32 0 00-2.878-.254zM1.836 9.278c-.528.846-.81 1.764-.81 2.711 0 1.913 1.155 3.701 3.14 5.032.788.53 1.701.978 2.708 1.33a17.78 17.78 0 01-.64-.606c-2.29-2.29-3.756-5-4.258-7.548a10.48 10.48 0 01-.14-.919zm15.27-3.65c.216.195.43.396.64.605 2.29 2.29 3.756 5 4.258 7.548.06.308.106.614.139.917.527-.845.811-1.762.811-2.709 0-1.913-1.156-3.7-3.14-5.032-.789-.529-1.701-.978-2.708-1.33zM11.99 1.025c-1.42 0-2.777.272-4.022.764a9.707 9.707 0 012.23.186c1.665.328 3.398 1.07 5.038 2.181 1.945.374 3.694 1.075 5.102 2.02a9.704 9.704 0 011.71 1.448A10.965 10.965 0 0011.99 1.025zm-1.974 1.873c-2.345-.462-4.427-.014-5.78 1.338-.67.67-1.117 1.519-1.342 2.49.237-.192.487-.375.748-.55C5.798 4.729 8.75 3.85 11.989 3.85c.296 0 .589.009.88.023a11.917 11.917 0 00-2.853-.975z" />
  </BrandMark>
);

const CrewAiMark = (props) => (
  <BrandMark title="CrewAI" {...props}>
    <path d="M18.213 14.057l.054-.071.132-.176c.158-.212.311-.427.462-.645a.748.748 0 011.256.031 1.438 1.438 0 01.158 1.103l-.136.522-.04.152a7.935 7.935 0 01-2.464 3.863c-.572.49-1.138.938-1.774 1.306-.427.247-.857.495-1.303.706a9.628 9.628 0 01-3.155.974c-.748.097-1.503.136-2.257.116a6.531 6.531 0 01-3.837-1.423 5.967 5.967 0 01-2.071-3.494 8.859 8.859 0 01-.085-3.08 13.56 13.56 0 011.54-4.568 19.7 19.7 0 012.212-3.348 13.382 13.382 0 013.088-2.759 7.9 7.9 0 012.832-1.141c1.307-.245 2.434.207 3.481.933a6.221 6.221 0 011.806 1.893c.423.766.536 1.667.314 2.514a12.39 12.39 0 01-.99 2.67l-.223.497c-.321.713-.642 1.426-.97 2.138a.762.762 0 01-.97.466 3.39 3.39 0 01-2.283-2.49c-.095-.83.04-1.669.39-2.426l.02-.054c.232-.594.485-1.18.741-1.764l.03-.065a326.498 326.498 0 01.37-.841l.02-.047a.533.533 0 00-.204-.742 2.348 2.348 0 00-1.2.702l-.036.036-.001.001-.028.028a26.065 26.065 0 00-1.55 1.702 21.56 21.56 0 00-2.618 4.184 7.59 7.59 0 00-.816 2.753 7.042 7.042 0 00.07 2.219 2.056 2.056 0 001.934 1.715c1.801.1 3.59-.363 5.116-1.328.582-.4 1.141-.831 1.675-1.293.481-.456.91-.951 1.31-1.47zm1.198-3.274a2.753 2.753 0 012.47 1.355c.483.806.622 1.772.385 2.68l-.136.522a9.994 9.994 0 01-3.156 5.058c-.605.517-1.283 1.062-2.083 1.524l-.028.017c-.402.232-.884.511-1.398.756-1.19.602-2.475.997-3.798 1.167-.854.111-1.716.155-2.577.132H9.072a8.588 8.588 0 01-5.046-1.87l-.012-.01-.012-.01A8.024 8.024 0 011.22 17.42a10.916 10.916 0 01-.102-3.779A15.622 15.622 0 012.88 8.4a21.758 21.758 0 012.432-3.678 15.44 15.44 0 013.56-3.182A9.958 9.958 0 0112.44.104h.004l.003-.002c2.057-.384 3.743.374 5.024 1.26a8.28 8.28 0 012.395 2.513l.024.04.023.042a5.474 5.474 0 01.508 4.012c-.239.97-.577 1.914-1.01 2.814z" />
  </BrandMark>
);

const LangGraphMark = (props) => (
  <BrandMark title="LangGraph" {...props}>
    <path d="M6.099 6H17.9C21.264 6 24 8.692 24 12s-2.736 6-6.099 6H6.1C2.736 18 0 15.308 0 12s2.736-6 6.099-6zm5.419 9.3c.148.154.367.146.561.106l.002.001c.09-.072-.038-.163-.16-.25-.074-.052-.145-.102-.166-.147.068-.08-.133-.265-.289-.408a1.52 1.52 0 01-.15-.148c-.11-.119-.155-.268-.2-.418-.03-.1-.06-.2-.11-.292-.304-.694-.653-1.383-1.143-1.97-.315-.39-.674-.74-1.033-1.09a19.384 19.384 0 01-.683-.688c-.226-.229-.362-.511-.499-.794-.114-.236-.228-.473-.396-.68-.507-.735-2.107-.936-2.342.104 0 .032-.01.052-.039.073-.13.094-.245.2-.342.327-.238.326-.274.877.022 1.17l.001-.019c.01-.147.02-.286.139-.391.228.193.576.262.841.117.32.45.422.995.525 1.54.085.456.17.912.382 1.316l.014.022c.124.203.25.41.41.587.059.089.178.184.297.279.157.125.314.25.329.359v.143c-.001.285-.002.58.184.813.103.205-.15.41-.352.385-.112.015-.233-.014-.354-.042-.165-.04-.329-.078-.462-.003-.038.04-.091.04-.145.042-.064.002-.129.004-.167.07-.008.019-.026.04-.045.063-.042.05-.087.105-.033.146l.015-.01c.082-.062.16-.12.27-.084-.014.08.039.102.092.123l.027.012a.344.344 0 01-.008.056c-.009.045-.017.088.018.127a.598.598 0 00.046-.054c.037-.046.073-.092.139-.11.144.19.289.111.471.013.206-.111.459-.248.81-.055-.135-.006-.255.01-.345.12-.023.024-.042.052-.002.084.207-.132.294-.085.375-.04.06.032.115.063.212.024l.07-.036c.155-.083.314-.166.499-.137-.139.039-.188.125-.242.218-.026.047-.054.095-.094.14-.021.021-.03.046-.007.08.29-.023.4-.095.548-.192.07-.046.15-.099.261-.154.124-.075.248-.027.368.02.13.05.255.098.371-.014.037-.033.083-.034.129-.034.016 0 .033 0 .05-.002-.037-.19-.24-.188-.448-.186-.24.003-.483.006-.475-.289.222-.149.224-.407.226-.651 0-.06 0-.117.005-.173.163.09.336.16.508.229.162.065.323.13.474.21.158.25.404.58.732.558.008-.026.016-.047.026-.073.019.004.039.008.059.014.086.02.178.044.223-.056zm6.429-2.829c.19.186.447.29.716.29.269 0 .526-.104.716-.29a.98.98 0 00.297-.7.98.98 0 00-.297-.7 1.024 1.024 0 00-1.08-.224l-.58-.831-.405.272.583.835a.978.978 0 00.05 1.348zm-1.817-2.69a1.03 1.03 0 001.056-.095.991.991 0 00.363-.507.97.97 0 00-.016-.62.994.994 0 00-.39-.488 1.028 1.028 0 00-1.298.14.987.987 0 00-.263.856.98.98 0 00.187.42c.095.125.218.225.36.294zm0 5.752a1.032 1.032 0 001.056-.095.991.991 0 00.363-.507.97.97 0 00-.016-.62.994.994 0 00-.39-.488 1.027 1.027 0 00-1.298.14.986.986 0 00-.263.856.98.98 0 00.187.42c.095.125.218.225.36.294zm.93-3.516v-.492h-1.55a.977.977 0 00-.217-.404l.584-.847-.425-.276-.583.847a1.023 1.023 0 00-1.047.23.973.973 0 00-.296.696c0 .261.107.512.296.696a1.023 1.023 0 001.047.23l.583.847.42-.276-.579-.847a.977.977 0 00.217-.404h1.55z" />
  </BrandMark>
);

/*
 * Namesake glyphs, NOT brand marks.
 *
 * Pinecone and ChromaDB have no icon in Simple Icons or in the 950-icon
 * lobe-icons set, and neither vendor publishes a usable standalone SVG, so
 * there is no authentic mark to use. Both were falling back to the same
 * generic database cylinder — the very same one SQL uses, so three entries on
 * the arsenal page were rendering identically.
 *
 * These are drawn from what each product is named after rather than guessed
 * at from memory: a cone of scales, and the overlapping discs of a colour
 * mixing diagram. They read at 26px and they are unmistakably different from
 * each other, which is the actual problem. If either vendor's real mark turns
 * up in an icon set later, swap it in here.
 */
const PineconeGlyph = (props) => (
  <BrandMark title="Pinecone" {...props}>
    {/* stem */}
    <path d="M11.2 1.4h1.6v2.6h-1.6z" />
    {/* four rows of scales, widest in the middle, tapering to a point */}
    <path d="M8.4 2.9l3 2.6-3 2.6-3-2.6zM15.6 2.9l3 2.6-3 2.6-3-2.6z" />
    <path d="M5.5 7.4l3 2.6-3 2.6-3-2.6zM12 7.4l3 2.6-3 2.6-3-2.6zM18.5 7.4l3 2.6-3 2.6-3-2.6z" />
    <path d="M8.4 11.9l3 2.6-3 2.6-3-2.6zM15.6 11.9l3 2.6-3 2.6-3-2.6z" />
    <path d="M12 16.4l3 2.6-3 2.6-3-2.6z" />
  </BrandMark>
);

const ChromaGlyph = (props) => (
  <BrandMark title="ChromaDB" {...props}>
    {/* three discs; the evenodd fill turns the overlaps into the classic
        colour-mixing figure without needing more than one ink */}
    <circle cx="12" cy="8.4" r="5.6" />
    <circle cx="8.1" cy="15.1" r="5.6" />
    <circle cx="15.9" cy="15.1" r="5.6" />
  </BrandMark>
);

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
    case 'fastapi': return <SiFastapi size={size} style={iconStyle} />;
    case 'aws': return <SiAmazonwebservices size={size} style={iconStyle} />;
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
    case 'pinecone': return <PineconeGlyph size={size} style={iconStyle} />;
    case 'langgraph': return <LangGraphMark size={size} style={iconStyle} />;
    case 'chromadb': return <ChromaGlyph size={size} style={iconStyle} />;
    case 'judge0': return <Code2 size={size} style={iconStyle} />;
    case 'fullstack': return <Layers size={size} style={iconStyle} />;
    case 'api': return <Globe size={size} style={iconStyle} />;
    case 'websocket': return <Globe size={size} style={iconStyle} />;
    case 'mastra': return <MastraMark size={size} style={iconStyle} />;
    case 'crewai': return <CrewAiMark size={size} style={iconStyle} />;
    case 'agnos': return <SiOpenai size={size} style={iconStyle} />;
    case 'n8n': return <SiN8N size={size} style={iconStyle} />;
    default: return <SiReact size={size} style={iconStyle} />;
  }
};

export default TechIcon;
