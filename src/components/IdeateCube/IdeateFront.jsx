import React, { useState, useEffect, useRef } from 'react';
import { ideateFrontInfo } from '../../constants/cube_info';

const IdeateFront = ({ selectedPrompt }) => {
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [ideas, setIdeas] = useState(['', '', '']);
    const [fadeIn, setFadeIn] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [savedIdeas, setSavedIdeas] = useState([]);
    const [viewingSaved, setViewingSaved] = useState(false);
    const [savedIndex, setSavedIndex] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
    const [isAnimating, setIsAnimating] = useState(false);
    const ideaRefs = [useRef(), useRef(), useRef()];
    
    const getRandomPromptIndex = () => {
        return Math.floor(Math.random() * ideateFrontInfo.length);
    };

    useEffect(() => {
        setCurrentPromptIndex(getRandomPromptIndex());
    }, []);

    useEffect(() => {
        let timer;
        if (timerActive && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            setTimerActive(false);
            handleSaveIdeas(); // Auto-save when timer runs out
        }
        return () => clearTimeout(timer);
    }, [timerActive, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleRandomClick = () => {
        setFadeIn(false);
        setIsAnimating(true);

        setTimeout(() => {
            let newIndex = getRandomPromptIndex();
            while (newIndex === currentPromptIndex) {
                newIndex = getRandomPromptIndex();
            }
            setCurrentPromptIndex(newIndex);
            setFadeIn(true);
            // Reset ideas when changing prompt
            setIdeas(['', '', '']);
            setIsAnimating(false);
        }, 300);
    };

    const handleInputChange = (index, value) => {
        const newIdeas = [...ideas];
        newIdeas[index] = value;
        setIdeas(newIdeas);
    };

    const handleSaveIdeas = () => {
        if (ideas.some(idea => idea.trim() !== '')) {
            const newSavedIdea = {
                prompt: ideateFrontInfo[currentPromptIndex],
                ideas: [...ideas],
                timestamp: new Date().toLocaleString()
            };
            setSavedIdeas([...savedIdeas, newSavedIdea]);
            setShowConfirmation(true);
            
            setTimeout(() => {
                setShowConfirmation(false);
            }, 2000);
        }
    };

    const startTimer = () => {
        setTimeLeft(180);
        setTimerActive(true);
        // Focus on the first input
        if (ideaRefs[0].current) {
            ideaRefs[0].current.focus();
        }
    };

    const stopTimer = () => {
        setTimerActive(false);
    };

    const resetTimer = () => {
        setTimeLeft(180);
        setTimerActive(false);
    };

    const handleClearIdeas = () => {
        setIdeas(['', '', '']);
        // Focus on the first input
        if (ideaRefs[0].current) {
            ideaRefs[0].current.focus();
        }
    };

    const handleKeyDown = (event, index) => {
        // On Tab or Enter, move to the next input field
        if ((event.key === 'Tab' || event.key === 'Enter') && !event.shiftKey) {
            event.preventDefault();
            const nextIndex = (index + 1) % 3;
            if (ideaRefs[nextIndex].current) {
                ideaRefs[nextIndex].current.focus();
            }
        }
        // On Shift+Tab, move to the previous input field
        else if (event.key === 'Tab' && event.shiftKey) {
            event.preventDefault();
            const prevIndex = (index - 1 + 3) % 3;
            if (ideaRefs[prevIndex].current) {
                ideaRefs[prevIndex].current.focus();
            }
        }
    };

    const renderBrainstormingInterface = () => (
        <>
            {/* Prompt Display Card */}
            <div 
                className={`bg-gray-800 rounded-lg p-6 shadow-lg mb-6 transition-all duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'} ${isAnimating ? 'transform rotate-1' : ''}`}
            >
                <p className="text-lg text-center font-medium mb-2">Brainstorming Prompt:</p>
                <p className="text-xl text-center text-blue-300 font-bold">
                    {ideateFrontInfo[currentPromptIndex]}
                </p>
                {selectedPrompt && (
                    <p className="text-sm text-center mt-3 text-gray-400">
                        Using creative constraint: <span className="text-purple-400 font-medium">{selectedPrompt}</span>
                    </p>
                )}
            </div>
            
            {/* Timer Display */}
            <div className="mb-6 flex items-center justify-center gap-2">
                <div className={`text-2xl font-bold ${timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-blue-300'}`}>
                    {formatTime(timeLeft)}
                </div>
                <div className="flex gap-2 ml-4">
                    {!timerActive ? (
                        <button 
                            className="px-4 py-1 bg-green-600 hover:bg-green-500 rounded-md text-sm font-medium"
                            onClick={startTimer}
                        >
                            Start Timer
                        </button>
                    ) : (
                        <button 
                            className="px-4 py-1 bg-red-600 hover:bg-red-500 rounded-md text-sm font-medium"
                            onClick={stopTimer}
                        >
                            Pause
                        </button>
                    )}
                    <button 
                        className="px-4 py-1 bg-gray-600 hover:bg-gray-500 rounded-md text-sm font-medium"
                        onClick={resetTimer}
                    >
                        Reset
                    </button>
                </div>
            </div>
            
            {/* Idea Input Fields */}
            <div className="space-y-4 mb-8">
                {[0, 1, 2].map((index) => (
                    <div 
                        key={index} 
                        className={`relative transition-all duration-300 ${
                            ideas[index].length > 0 ? 'scale-105' : 'scale-100'
                        }`}
                    >
                        <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-10 text-lg font-bold text-blue-400">
                            {index + 1}.
                        </div>
                        <textarea
                            ref={ideaRefs[index]}
                            className="w-full bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 pl-10 pr-4 py-3 text-white placeholder-gray-400 transition-all duration-200"
                            placeholder={`Idea ${index + 1}...`}
                            value={ideas[index]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            rows={2}
                        />
                        {ideas[index].length > 0 && (
                            <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                                {ideas[index].length} chars
                            </span>
                        )}
                    </div>
                ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
                <button 
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold flex items-center shadow-lg"
                    onClick={handleSaveIdeas}
                    disabled={!ideas.some(idea => idea.trim() !== '')}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save Ideas
                </button>
                
                <button 
                    className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-md font-semibold flex items-center shadow-lg"
                    onClick={handleClearIdeas}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear
                </button>
                
                <button 
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-500 rounded-md font-semibold flex items-center shadow-lg"
                    onClick={handleRandomClick}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    New Prompt
                </button>
                
                <button 
                    className={`px-5 py-2 rounded-md font-semibold flex items-center shadow-lg ${
                        savedIdeas.length > 0 
                        ? 'bg-green-600 hover:bg-green-500' 
                        : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    onClick={() => savedIdeas.length > 0 && setViewingSaved(true)}
                    disabled={savedIdeas.length === 0}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Saved ({savedIdeas.length})
                </button>
            </div>
        </>
    );
    
    const renderSavedIdeasView = () => {
        if (savedIdeas.length === 0) {
            return (
                <div className="text-center py-12">
                    <p className="text-gray-400">No ideas saved yet. Start brainstorming!</p>
                </div>
            );
        }
        
        const currentSaved = savedIdeas[savedIndex];
        
        return (
            <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold mb-6">Saved Ideas ({savedIndex + 1}/{savedIdeas.length})</h3>
                
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6 w-full">
                    <p className="text-lg text-center font-medium mb-2">Prompt:</p>
                    <p className="text-xl text-center text-blue-300 font-bold mb-4">
                        {currentSaved.prompt}
                    </p>
                    
                    <div className="space-y-4 mb-4">
                        {currentSaved.ideas.map((idea, index) => (
                            <div key={index} className="bg-gray-700 rounded-lg p-4">
                                <div className="flex items-center mb-1">
                                    <span className="text-blue-400 font-bold mr-2">{index + 1}.</span>
                                    <p className="text-white">{idea}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <p className="text-xs text-gray-400 text-right mt-2">
                        Saved: {currentSaved.timestamp}
                    </p>
                </div>
                
                <div className="flex justify-between items-center w-full px-4 mb-6">
                    <button 
                        className={`px-4 py-2 rounded-md flex items-center ${
                            savedIndex > 0 
                            ? 'bg-gray-700 hover:bg-gray-600' 
                            : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        }`}
                        onClick={() => savedIndex > 0 && setSavedIndex(savedIndex - 1)}
                        disabled={savedIndex === 0}
                    >
                        <span className="mr-2">←</span> Previous
                    </button>
                    
                    <span className="text-gray-400">
                        {savedIndex + 1} of {savedIdeas.length}
                    </span>
                    
                    <button 
                        className={`px-4 py-2 rounded-md flex items-center ${
                            savedIndex < savedIdeas.length - 1 
                            ? 'bg-gray-700 hover:bg-gray-600' 
                            : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        }`}
                        onClick={() => savedIndex < savedIdeas.length - 1 && setSavedIndex(savedIndex + 1)}
                        disabled={savedIndex === savedIdeas.length - 1}
                    >
                        Next <span className="ml-2">→</span>
                    </button>
                </div>
                
                <button 
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold shadow-lg"
                    onClick={() => setViewingSaved(false)}
                >
                    Back to Brainstorming
                </button>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 relative">
            {/* Confirmation Message */}
            {showConfirmation && (
                <div className="bg-green-600 text-white py-2 px-4 rounded-md transition-opacity duration-300 absolute top-4 left-1/2 transform -translate-x-1/2 z-10 shadow-lg">
                    Ideas saved successfully!
                </div>
            )}
            
            {viewingSaved ? renderSavedIdeasView() : renderBrainstormingInterface()}
            
            <div className="text-sm text-gray-400 mt-6 text-center">
                <p>Jot down three quick ideas related to the prompt above. Use the timer for quick brainstorming sessions!</p>
            </div>
        </div>
    );
};

export default IdeateFront;