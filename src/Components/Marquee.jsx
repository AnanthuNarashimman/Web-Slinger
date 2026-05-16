import "../ComponentStyles/Marquee.css";

const Marquee = ({ items = [
  'React', 
  'Node.js', 
  'Python', 
  'TypeScript',
  'AI Agents', 
  'LLM APIs',
  'Browser Automation',
  'Flask',
  'Firebase',
  'WebSockets',
  'Chrome Extensions',
  'Full-Stack'
], speed = 30 }) => {
  const duplicatedItems = [...items, ...items, ...items];
  
  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {duplicatedItems.map((item, index) => (
          <div key={index} className="marquee-item">
            <span className="star">✦</span>
            <span className="text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee