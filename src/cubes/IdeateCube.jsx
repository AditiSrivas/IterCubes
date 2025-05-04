import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IdeateTop from '../components/IdeateCube/IdeateTop';
import IdeateFront from '../components/IdeateCube/IdeateFront';
import IdeateRight from '../components/IdeateCube/IdeateRight';
import IdeateBack from '../components/IdeateCube/IdeateBack';
import IdeateLeft from '../components/IdeateCube/IdeateLeft';

const IdeateCube = () => {
  const sides = ['top', 'front', 'right', 'back', 'left'];
  const [activeSide, setActiveSide] = useState('top');
  const [displayMessage, setDisplayMessage] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [selectedIdea, setSelectedIdea] = useState(null);

  useEffect(() => {
    setDisplayMessage(`Flip the Ideate Cube to ${activeSide} side`);

    const timer = setTimeout(() => {
      setDisplayMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeSide]);

  const handleSideChange = (side) => {
    setActiveSide(side);
    setDisplayMessage(`Flip the Ideate Cube to ${side} side`);

    setTimeout(() => {
      setDisplayMessage('');
    }, 3000);
  };

  const goToNextSide = () => {
    const currentIndex = sides.indexOf(activeSide);
    const nextIndex = (currentIndex + 1) % sides.length;
    handleSideChange(sides[nextIndex]);
  };

  const goToPrevSide = () => {
    const currentIndex = sides.indexOf(activeSide);
    const prevIndex = (currentIndex - 1 + sides.length) % sides.length;
    handleSideChange(sides[prevIndex]);
  };

  const handleSelectPrompt = (prompt) => {
    console.log("Selected prompt:", prompt); // Add this for debugging
    setSelectedPrompt(prompt);
    // Optionally navigate to the next side after selecting
    setTimeout(() => {
      handleSideChange('front');
    }, 1000);
  };

  const renderContent = () => {
    switch(activeSide) {
      case 'top':
        return <IdeateTop onSelectPrompt={handleSelectPrompt} />;
      case 'front':
        return <IdeateFront selectedPrompt={selectedPrompt} />;
      case 'right':
        return <IdeateRight onSelectIdea={(idea) => {
          setSelectedIdea(idea);
          console.log("Selected idea:", idea);
        }} />;
      case 'back':
        return <IdeateBack selectedPrompt={selectedPrompt} />;
      case 'left':
        return <IdeateLeft selectedPrompt={selectedPrompt} />;
      default:
        return <div className='p-6'>Select a side</div>;
    }
  };

  // Debug display for development purposes
  const debugInfo = () => {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="mt-4 p-3 bg-gray-800 rounded text-xs">
          <p>Debug Info:</p>
          <p>Selected Prompt: {selectedPrompt || 'None'}</p>
          <p>Current Side: {activeSide}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6 flex items-center gap-4">
          <Link to="/" className="text-blue-400 hover:text-blue-300 flex items-center">
            <span className="mr-2">←</span> Back to Home
          </Link>
          <h1 className="text-3xl font-bold">Ideate Cube</h1>
          {selectedPrompt && (
            <span className="text-sm text-gray-400">
              • {selectedPrompt}
            </span>
          )}
        </div>

        {/* Message display area */}
        {displayMessage && (
          <div className="mb-4 py-2 px-4 bg-blue-900 text-blue-300 rounded-md text-center transition-opacity duration-300">
            {displayMessage}
          </div>
        )}

        {/* Content with navigation arrows */}
        <div className="relative bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          {/* Left arrow */}
          <button 
            onClick={goToPrevSide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-r-md shadow-md z-10"
            aria-label="Previous side"
          >
            ←
          </button>
          
          {/* Content area */}
          <div className="px-16 py-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold capitalize">{activeSide} Side</h2>
              <div className="flex justify-center gap-2 mt-2">
                {sides.map((side) => (
                  <div 
                    key={side}
                    className={`w-3 h-3 rounded-full ${
                      activeSide === side ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {renderContent()}
          </div>
          
          {/* Right arrow */}
          <button 
            onClick={goToNextSide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-l-md shadow-md z-10"
            aria-label="Next side"
          >
            →
          </button>
        </div>

      </div>
    </div>
  );
};

export default IdeateCube;