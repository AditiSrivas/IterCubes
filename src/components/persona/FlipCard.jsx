import { useState } from 'react';

const FlipCard = ({ frontContent, backContent, title, icon }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    
    return (
        <div className="perspective-1000 h-full">
            <div 
                className={`relative w-full h-96 transform-style-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
                style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.8s',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* Front Card */}
                <div 
                    className="absolute w-full h-full backface-hidden rounded-lg shadow-lg cursor-pointer"
                    onClick={handleFlip}
                    style={{
                        backfaceVisibility: 'hidden'
                    }}
                >
                    <div className="relative h-full flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg">
                        {/* Card background image */}
                        <img 
                            src="/images/cardBack.png" 
                            alt="Card background"
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                        
                        {/* Content overlay */}
                        <div className="relative z-10 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500 flex items-center justify-center">
                                {icon}
                            </div>
                            <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
                            <p className="text-blue-300 text-sm">(Click to view details)</p>
                        </div>
                    </div>
                </div>
                
                {/* Back Card */}
                <div 
                    className="absolute w-full h-full backface-hidden bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-5 cursor-pointer rotate-y-180"
                    onClick={handleFlip}
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <h3 className="font-bold text-lg mb-3 text-white flex justify-between items-center">
                        {title}
                        <span className="text-sm text-blue-400">(Click to go back)</span>
                    </h3>
                    <div className="overflow-y-auto max-h-80 pr-2">
                        {backContent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;