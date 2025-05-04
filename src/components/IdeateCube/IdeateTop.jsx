import React, { useState, useEffect } from 'react';
import { ideateTopInfo } from '../../constants/cube_info';

const IdeateTop = ({ onSelectPrompt }) => {
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const getRandomPromptIndex = () => {
        return Math.floor(Math.random() * ideateTopInfo.length);
    };

    useEffect(() => {
        setCurrentPromptIndex(getRandomPromptIndex());
    }, []);

    const handleRandomClick = () => {
        setFadeIn(false);

        setTimeout(() => {
            let newIndex = getRandomPromptIndex();
            // Make sure we don't get the same prompt twice in a row
            while (newIndex === currentPromptIndex) {
                newIndex = getRandomPromptIndex();
            }
            setCurrentPromptIndex(newIndex);
            setFadeIn(true);
        }, 300);
    };

    const handleSelect = () => {
        if (onSelectPrompt && typeof onSelectPrompt === 'function') {
            onSelectPrompt(ideateTopInfo[currentPromptIndex]);
            setShowConfirmation(true);
            
            setTimeout(() => {
                setShowConfirmation(false);
            }, 2000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Ideation Prompts</h2>
            
            {/* Confirmation Message */}
            {showConfirmation && (
                <div className="bg-green-600 text-white py-2 px-4 rounded-md mb-4 transition-opacity duration-300 absolute top-4 left-1/2 transform -translate-x-1/2 z-10 shadow-lg">
                    Prompt selected!
                </div>
            )}
            
            <div className="relative w-full">
                {/* Prompt Display Card */}
                <div 
                    className={`bg-gray-800 rounded-lg p-6 shadow-lg mb-6 transition-opacity duration-300 min-h-[200px] flex items-center justify-center ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
                >
                    <p className="text-lg text-center">
                        {ideateTopInfo[currentPromptIndex]}
                    </p>
                </div>
                
                {/* Control Buttons */}
                <div className="flex justify-between items-center mt-4 px-4">
                    <button 
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md flex items-center"
                        onClick={() => {
                            let prevIndex = currentPromptIndex - 1;
                            if (prevIndex < 0) prevIndex = ideateTopInfo.length - 1;
                            setFadeIn(false);
                            setTimeout(() => {
                                setCurrentPromptIndex(prevIndex);
                                setFadeIn(true);
                            }, 300);
                        }}
                    >
                        <span className="mr-2">←</span> Prev
                    </button>
                    
                    <button 
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold"
                        onClick={handleSelect}
                    >
                        Select
                    </button>
                
                    <button 
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md flex items-center"
                        onClick={() => {
                            let nextIndex = (currentPromptIndex + 1) % ideateTopInfo.length;
                            setFadeIn(false);
                            setTimeout(() => {
                                setCurrentPromptIndex(nextIndex);
                                setFadeIn(true);
                            }, 300);
                        }}
                    >
                        Next <span className="ml-2">→</span>
                    </button>
                </div>
                
                {/* Random Button */}
                <div className="flex justify-center mt-6">
                    <button 
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-md font-semibold flex items-center"
                        onClick={handleRandomClick}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Random Prompt
                    </button>
                </div>
            </div>
            
            <div className="text-sm text-gray-400 mt-6 text-center">
                <p>Browse through ideation prompts or click Random to explore different creative angles</p>
            </div>
        </div>
    );
};

export default IdeateTop;