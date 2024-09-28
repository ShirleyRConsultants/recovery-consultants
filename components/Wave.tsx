import React from 'react';

interface WaveProps {
    className?: string; // className is optional
  }
  
  const Wave: React.FC<WaveProps> = ({ className = "" }) => {
    return (
      <div className={`relative w-full leading-none ${className}`}>
  
        <svg
          className="blocc w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: 'rotate(180deg)', marginTop: '-2px' }} // Rotate the wave 180 degrees and adjust margin
        >
          <path
            fill="#ACDCD3"
            fillOpacity="1"
            d="M0,224L48,218.7C96,213,192,203,288,202.7C384,203,480,213,576,218.7C672,224,768,224,864,208C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    );
};

export default Wave;