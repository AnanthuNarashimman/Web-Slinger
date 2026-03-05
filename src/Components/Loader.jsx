import { useEffect, useRef, useState } from 'react';
import '../ComponentStyles/Loader.css';
import LoaderVideo from '../assets/LoaderVideo.mp4';

const Loader = ({ onLoadComplete, speed = 1 }) => {
  const videoRef = useRef(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      
      // Trigger fade-out 300ms before video ends
      if (duration - currentTime <= 2 && !isFading) {
        setIsFading(true);
        setTimeout(() => {
          onLoadComplete();
        }, 500);
      }
    }
  };

  return (
    <div className={`loader-container ${isFading ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <video 
          ref={videoRef}
          src={LoaderVideo}
          className="loader-video"
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
        />
      </div>
    </div>
  );
};

export default Loader;
