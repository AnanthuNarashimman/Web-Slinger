// Full tech arsenal, shared by the Tech Stack section and the /arsenal page.
// `sfx` and `blurb` are the comic flavour text shown on the arsenal page.
//
// `featured` marks the items that surface as bubbles in the Tech Stack
// section and gives their order. There is room for about a dozen, so it is a
// shortlist rather than the whole arsenal, and it leads with the work that
// actually distinguishes this portfolio - the agent and LLM tooling - before
// the core engineering stack.
//
// That header line above used to be wishful: the Tech Stack section carried
// its own hardcoded list, which had drifted from this one. Tagging the items
// here is what makes the two agree.

export const detailedTechStack = {
  languages: {
    title: 'Languages',
    sfx: 'BAM!',
    blurb: 'The words our hero thinks in.',
    color: '#FF1744',
    items: [
      { name: 'Python', icon: 'python', color: '#3776AB', featured: 7 },
      { name: 'JavaScript', icon: 'js', color: '#F7DF1E' },
      { name: 'TypeScript', icon: 'typescript', color: '#3178C6', featured: 8 },
      { name: 'Java', icon: 'java', color: '#007396' },
      { name: 'SQL', icon: 'sql', color: '#4479A1' },
    ]
  },
  frameworks: {
    title: 'Frameworks & Libraries',
    sfx: 'ZAP!',
    blurb: 'The web-shooters. Standard issue, heavily modified.',
    color: '#FF6D00',
    items: [
      { name: 'React.js', icon: 'react', color: '#61DAFB', featured: 9 },
      { name: 'Next.js', icon: 'next', color: '#000000', featured: 10 },
      { name: 'Node.js', icon: 'node', color: '#339933', featured: 11 },
      { name: 'Flask', icon: 'flask', color: '#000000' },
    ]
  },
  aiml: {
    title: 'AI & Applied ML',
    sfx: 'POW!',
    blurb: 'Spider-sense, but statistical.',
    color: '#7C4DFF',
    items: [
      { name: 'LLM APIs', icon: 'gemini', color: '#8E75B2' },
      { name: 'Scikit-learn', icon: 'sklearn', color: '#F7931E' },
      { name: 'Transformers', icon: 'transformers', color: '#FFD21E' },
      { name: 'LLM Internals', icon: 'llm', color: '#10A37F', featured: 1 },
      { name: 'Browser-use', icon: 'automation', color: '#4285F4', featured: 5 },
    ]
  },
  exposure: {
    title: 'Project Exposure',
    sfx: 'WHAM!',
    blurb: 'Gadgets taken out on real missions.',
    color: '#00BFA5',
    items: [
      { name: 'Electron.js', icon: 'electron', color: '#47848F' },
      { name: 'LangChain', icon: 'langchain', color: '#1C3C3C', featured: 6 },
      { name: 'Pinecone', icon: 'pinecone', color: '#00BFA5', featured: 12 },
      { name: 'LangGraph', icon: 'langgraph', color: '#1C3C3C', featured: 2 },
      { name: 'ChromaDB', icon: 'chromadb', color: '#FF6B6B' },
    ]
  },
  databases: {
    title: 'Databases & Tools',
    sfx: 'KRAK!',
    blurb: 'The utility belt. Never leaves the waist.',
    color: '#2979FF',
    items: [
      { name: 'Firebase', icon: 'firebase', color: '#FFCA28' },
      { name: 'MySQL', icon: 'mysql', color: '#4479A1' },
      { name: 'Git', icon: 'git', color: '#F05032' },
      { name: 'Judge0', icon: 'judge0', color: '#323330' },
      { name: 'Figma', icon: 'figma', color: '#F24E1E' },
      { name: 'Postman', icon: 'postman', color: '#FF6C37' },
    ]
  },
  concepts: {
    title: 'Agents & Workflow',
    sfx: 'BOOM!',
    blurb: 'Sidekicks that work the night shift.',
    color: '#D500F9',
    items: [
      { name: 'Mastra', icon: 'mastra', color: '#FF1744', featured: 3 },
      { name: 'CrewAI', icon: 'crewai', color: '#00BCD4', featured: 4 },
      { name: 'Agnos', icon: 'agnos', color: '#FFC107' },
      { name: 'n8n', icon: 'n8n', color: '#EA4B71' },
    ]
  }
};

/**
 * The shortlist, flattened and ordered. Resolved from the data above rather
 * than repeated, so an entry can never drift between the bubbles and the
 * arsenal page the way the old hardcoded list did.
 */
export const featuredTech = Object.values(detailedTechStack)
  .flatMap((category) => category.items)
  .filter((item) => typeof item.featured === 'number')
  .sort((a, b) => a.featured - b.featured);

export default detailedTechStack;
