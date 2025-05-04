import React, { useEffect, useRef, useState } from 'react'
import { setupLottie } from '../../utils/lottieHelper';

const PersonaCard = ({ persona, onClick, onShowDetails}) => {
    const [isHovered, setIsHovered] = useState(false);
    const animationContainer = useRef(null);
    const animation = useRef(null);

    useEffect(() => {
        if (animationContainer.current && persona.animPath) {
            animation.current = setupLottie(
                animationContainer.current,
                persona.animPath,
                { loop: true, autoplay: false }
            );

            return () => {
                if (animation.current) {
                    animation.current.destroy();
                }
            };
        }
    }, [persona.animPath]);

    useEffect(() => {
        if (animation.current) {
            if (isHovered) {
                animation.current.play();
            } else {
                animation.current.stop();
            }
        }
    }, [isHovered]);

    const handleCardClick = (e) => {
        e.stopPropagation();
        onShowDetails(persona);
    }

    return (
        <div
            className="relative cursor-pointer bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-lg border border-gray-700"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            <div className="relative w-full h-36">
                {/** Static Image */}
                {!isHovered && (
                    <img 
                        src={persona.imgPath}
                        alt={persona.name}
                        className="w-full h-full object-cover"
                    />
                )}
                {/** Animation */}
                <div
                    ref={animationContainer}
                    className={`absolute inset-0 ${isHovered ? 'block' : 'hidden'}`}
                />
            </div>
            <div className="p-2 text-center bg-gray-900">
                <h3 className="font-medium text-sm text-white truncate">{persona.name}</h3>
                <p className="text-xs text-gray-400 truncate">{persona.archetype}</p>
            </div>
        </div>
    );
};

export default PersonaCard;