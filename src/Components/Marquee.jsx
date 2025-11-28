import "../ComponentStyles/Marquee.css";

const Marquee = ({ items = ['React', 'Javascript', 'Python', 'NumPy', 'Node.js', 'AI', 'Google APIs'], speed = 30 }) => {
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