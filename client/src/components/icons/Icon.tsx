import React from 'react';

interface IconProps {
    size?: number;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ size = 24, className }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 200 200" 
            width={size} 
            height={size}
            className={className}
        >
            <defs>
                <style>
                    {`
                        .letter {
                            font-family: 'Arial', sans-serif;
                            font-weight: bold;
                            font-size: 80px;
                            text-anchor: middle;
                            dominant-baseline: central;
                        }
                        .c-letter {
                            fill: white;
                        }
                        .g-letter {
                            fill: white;
                        }
                        .smile {
                            fill: none;
                            stroke: white;
                            stroke-width: 8;
                            stroke-linecap: round;
                        }
                    `}
                </style>
            </defs>
            {/* Background shape */}
            <rect x="20" y="20" width="160" height="160" rx="30" fill="#FF6B6B"/>
            
            {/* Eyes */}
            {/* Left eye */}
            <ellipse cx="70" cy="95" rx="25" ry="25" fill="white"/>
            <ellipse cx="70" cy="95" rx="18" ry="18" fill="#333"/>
            <ellipse cx="72" cy="79" rx="5" ry="5" fill="white"/>
            <ellipse cx="73" cy="77" rx="1" ry="2" fill="white"/>
            
            {/* Right eye */}
            <ellipse cx="130" cy="95" rx="25" ry="25" fill="white"/>
            <ellipse cx="130" cy="95" rx="18" ry="18" fill="#333"/>
            <ellipse cx="132" cy="79" rx="5" ry="5" fill="white"/>
            <ellipse cx="133" cy="77" rx="1" ry="2" fill="white"/>
            
            {/* Smile */}
            <path d="M 70 140 Q 100 160 130 140" className="smile"/>
            
            {/* Decorative elements */}
            {/* Bow design */}
            {/* Left loop */}
            <path d="M 30 35
                     C 20 35, 15 45, 20 55
                     C 25 65, 35 65, 40 55
                     C 45 45, 40 35, 30 35" 
                  fill="white"/>
            
            {/* Right loop */}
            <path d="M 60 35
                     C 70 35, 75 45, 70 55
                     C 65 65, 55 65, 50 55
                     C 45 45, 50 35, 60 35" 
                  fill="white"/>
            
            {/* Center knot */}
            <circle cx="45" cy="45" r="8" fill="white"/>
        </svg>
    );
};

export default Icon; 