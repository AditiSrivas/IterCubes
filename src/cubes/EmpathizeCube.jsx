import React, { useEffect, useState } from 'react'
import EmpathizeTop from '../components/EmpathizeCube/EmpathizeTop';
import { Link } from 'react-router-dom';
import EmpathizeFront from '../components/EmpathizeCube/EmpathizeFront';
import EmpathizeRight from '../components/EmpathizeCube/EmpathizeRight';
import EmpathizeBack from '../components/EmpathizeCube/EmpathizeBack';
import EmpathizeLeft from '../components/EmpathizeCube/EmpathizeLeft';

const EmpathizeCube = () => {
  const sides = ['top', 'front', 'right', 'back', 'left'];
  const [activeSide, setActiveSide] = useState('top');
  const [displayMessage, setDisplayMessage] = useState('');
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    setDisplayMessage(`Flip the Empathize Cube to ${activeSide} side`);

    const timer = setTimeout(() => {
      setDisplayMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeSide]);

  const handleSideChange = (side) => {
    setActiveSide(side);
    setDisplayMessage(`Flip the Empathize Cube to ${side} side`);

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

  const handleSelectPersona = (persona) => {
    console.log("Selected persona:", persona); // Add this for debugging
    setSelectedPersona(persona);
    handleSideChange('front'); 
  };

  const renderContent = () => {
    switch(activeSide) {
      case 'top':
        return <EmpathizeTop onSelectPersona={handleSelectPersona}/>;
      case 'front':
        return <EmpathizeFront selectedPersona={selectedPersona} />;
      case 'right':
        return <EmpathizeRight onSelectProblem={(problem) => {
          setSelectedProblem(problem);
          console.log("Selected problem:", problem);
        }} />;
      case 'back':
        return <EmpathizeBack selectedPersona={selectedPersona} />;
      case 'left':
        return <EmpathizeLeft selectedPersona={selectedPersona} />;
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
          <p>Selected Persona: {selectedPersona ? `${selectedPersona.id} - ${selectedPersona.name}` : 'None'}</p>
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
          <h1 className="text-3xl font-bold">Empathize Cube</h1>
          {selectedPersona && (
            <span className="text-sm text-gray-400">
              • {selectedPersona.name}
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

export default EmpathizeCube;