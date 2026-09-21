// Hackathon diaries — shown as a scrolling strip in the Build Log section and
// in full on the /hackathons page. Ordered oldest to newest so the list reads
// as a progression rather than a leaderboard.
//
// Fields:
//   slug       unique id (also used as React key)
//   name       event name
//   tagline    one-line descriptor of the event's format
//   date       month + year
//   location   city, or "Online" — rendered as the handwritten note on the card
//   result     short badge text
//   accent     panel colour — from the site palette
//   variant    optional: "ethglobal" | "monad" — renders the card in that
//              event's own colours and flags it as a standout
//   summary    what the event was
//   built      what got shipped
//   learnt     the takeaway — the part worth reading
//   links      { project, repo } — both optional

export const hackathons = [
  {
    slug: "hack-with-gdg-2024",
    name: "Hack With GDG",
    tagline: "My first ever hackathon",
    date: "November 2024",
    location: "Namakkal",
    result: "First Ever",
    accent: "#689f38",
    summary:
      "The first one. Walked in with an idea, no plan, and no real idea how any of this worked.",
    built:
      "A chatbot-driven ticket booking system for zoos and museums, wrapped in a discovery flow meant to push people toward local spots they'd never think to visit.",
    learnt:
      "Don't build a project at a hackathon, build a product. \"Can I build this\" and \"should this exist\" are completely different questions, and only the second one survives the judging round. Easily the most useful thing I've taken away from any event.",
  },
  {
    slug: "hackverse-2025",
    name: "HackVerse",
    tagline: "Web3 hackathon",
    date: "March 2025",
    location: "Chennai",
    result: "Top 10",
    accent: "#0097a7",
    summary:
      "A web3 hackathon where the brief was to put something genuinely worth decentralising on-chain.",
    built:
      "A blockchain-based certification system: upload any certificate and mint it on-chain as an NFT, so a credential can be verified by anyone without trusting the issuer's server to still be online years later.",
    learnt:
      "Time management, and never push Firebase credentials to a public repo. Google's secret scanner spotted ours and revoked the keys almost instantly. We found out live, on stage, when the demo went blank in front of the judges. The Q&A was spent frantically rotating keys instead of answering questions. Ten minutes of pure chaos, one lesson that stuck permanently.",
  },
  {
    slug: "futurex-2025",
    name: "FutureX Hackathon",
    tagline: "6-hour MVP sprint",
    date: "April 2025",
    location: "Namakkal",
    result: "Intern Offer",
    accent: "#d500f9",
    summary:
      "Six hours, one idea, one working build. No time for a second draft.",
    built:
      "A mobile app connecting local vendors with people nearby, taken from blank screen to a demonstrable MVP inside the time cap.",
    learnt:
      "A hard six-hour limit is a feature. There's no room to gold-plate, so you ship the one flow that proves the idea works. That MVP turned into my first internship offer, which taught me a demo is a job interview wearing a disguise.",
  },
  {
    slug: "ethglobal-delhi-2025",
    name: "ETHGlobal",
    tagline: "Invite-only global hackathon",
    date: "September 2025",
    location: "New Delhi",
    result: "Invite Only",
    accent: "#627eea",
    variant: "ethglobal",
    summary:
      "Two thousand hand-picked builders from around the world, invite only. My first time travelling alone outside my state — 2,600 km for one weekend.",
    built:
      "The application layer of a cross-chain liquidity app, with a team of developers I met on the day and had never worked with before.",
    learnt:
      "Hackathons aren't about winning. We didn't place and it's still one of the best weekends I've had. Teaming up with strangers turned into a network that outlasted the event. The prize money depreciates, the people don't.",
  },
  {
    slug: "monad-blitz-2025",
    name: "Monad Blitz",
    tagline: "Invite-only 6-hour blitz",
    date: "November 2025",
    location: "Bengaluru",
    result: "Curated 84",
    accent: "#836ef9",
    variant: "monad",
    summary:
      "Under a hundred hand-picked builders, six hours on the clock. I got in as a web2 developer in a room full of web3 natives.",
    built:
      "The application side of a reputation-based gas fee discounter: wallets with a real on-chain track record pay less, with the discount priced from reputation instead of a flat rate.",
    learnt:
      "Planning for a six-hour sprint is its own skill. You budget backwards from the demo, not forwards from the idea. And being the web2 person in a curated web3 room is the fastest possible way to learn web3.",
  },
  {
    slug: "gemini-3-2025",
    name: "Gemini 3 Hackathon",
    tagline: "Remote build challenge on Gemini 3",
    date: "December 2025",
    location: "Online",
    result: "Participant",
    accent: "#7c4dff",
    summary:
      "A remote hackathon built entirely around what the newest Gemini models could be pushed to do.",
    built:
      "VibeAudit, an AI-powered website auditor that analyses design quality — CTA effectiveness, theme consistency and intent alignment — and replaces manual design QA with real-time, screenshot-backed reports.",
    learnt:
      "Agentic systems fail in boring ways. Cookie banners, pop-ups and lazy-loaded sections break a browser agent long before the model ever does, and handling that unglamorous layer turned out to be most of the actual work.",
    links: {
      repo: "https://github.com/AnanthuNarashimman/QAI",
      project: "https://vibeaudit-delta.vercel.app",
    },
  },
  {
    slug: "google-techsprint-2026",
    name: "Google TechSprint",
    tagline: "Campus innovation sprint",
    date: "January 2026",
    location: "Namakkal",
    result: "Winner",
    accent: "#3b82f6",
    summary:
      "An open-brief sprint where the only rule was to build something people would actually use.",
    built:
      "An AI-assisted web space for Python: write it, run it, and watch it turn into a live flowchart, entirely in the browser with zero local setup. The AI layer explains what each branch and loop is doing as you go.",
    learnt:
      "Pick a problem that affects you and build around it. I built the tool I wanted while learning to code, and that made every product decision obvious — no guessing what a user might want, because I was the user.",
    links: {
      repo: "https://github.com/AnanthuNarashimman/AlgoFlow",
      project: "https://algo-flow-roan.vercel.app",
    },
  },
  {
    slug: "evm-capital-2026",
    name: "EVM Capital Hackathon",
    tagline: "Web3 × AI builder hackathon",
    date: "July 2026",
    location: "Bengaluru",
    result: "Shipped",
    accent: "#ff1744",
    summary:
      'Our pitch had a tagline before it had a demo: "Never send a human to do a machine\'s job."',
    built:
      "Agent Smith, a goal-fidelity watchdog for AI coding agents. You tell Smith once what the project is actually supposed to do. From then on he watches every risky action your agent takes, flags the ones that contradict the brief, and keeps score of how closely you stuck to it. Built end to end over the weekend and shipped to npm afterwards.",
    learnt:
      "How you present changes everything, regardless of what you're presenting. Two teams with the same idea walk out with completely different outcomes based on the ten minutes on stage. Also finally understood why Bengaluru is the house of startups — the sheer density of people building is a different thing entirely.",
    links: {
      project: "https://www.npmjs.com/package/@flash_dev/agent-smith",
    },
  },
];

export default hackathons;
