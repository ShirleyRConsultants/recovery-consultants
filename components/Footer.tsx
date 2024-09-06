import React from 'react';

interface FooterProps {
    
}

const Footer: React.FC<FooterProps> = () => {
    return (
        <div className=" inset-0 -z-10 h-full ">

        <svg
          width="100%"
          height="200"
          viewBox="0 0 1440 200"
          className="absolute bottom-0 left-0 "
          fill="#E0BBE4" // Very light purple
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillOpacity="1"
            d="M0,80 Q360,0 720,80 T1440,80 V200 H0 Z"
          />
        </svg>
      </div>
    );
};

export default Footer;