import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DefineTop from '../components/DefineCube/DefineTop';
import DefineFront from '../components/DefineCube/DefineFront';
import DefineRight from '../components/DefineCube/DefineRight';
import DefineBack from '../components/DefineCube/DefineBack'; 
import DefineLeft from '../components/DefineCube/DefineLeft'; // Import the new component

const DefineCube = () => {
  const sides = ['top', 'front', 'right', 'back', 'left'];
  const [activeSide, setActiveSide] = useState('top');
  const [displayMessage, setDisplayMessage] = useState('');
  const [selectedConstraints, setSelectedConstraints] = useState([]);
  const [prioritizedConstraints, setPrioritizedConstraints] = useState([]);
  const [alternativeConstraints, setAlternativeConstraints] = useState([]);
  const [constraintExplanations, setConstraintExplanations] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  
  // Get location to access state passed from EmpathizeRight or any previous step
  const location = useLocation();
  const selectedProblem = location.state?.selectedProblem || "";

  useEffect(() => {
    setDisplayMessage(`Flip the Define Cube to ${activeSide} side`);

    const timer = setTimeout(() => {
      setDisplayMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeSide]);

  const handleSideChange = (side) => {
    setActiveSide(side);
    setDisplayMessage(`Flip the Define Cube to ${side} side`);

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

  const handleSelectConstraints = (constraints) => {
    console.log("Selected constraints:", constraints);
    setSelectedConstraints(constraints);
  };

  const handleConstraintsPrioritized = (prioritized) => {
    console.log("Prioritized constraints:", prioritized);
    setPrioritizedConstraints(prioritized);
    
    // Show a success message
    setDisplayMessage("Constraints prioritized successfully!");
    setTimeout(() => {
      setDisplayMessage('');
    }, 3000);
  };
  
  const handleConstraintUpdate = (updatedConstraints, explanations) => {
    console.log("Updated constraints with alternatives:", updatedConstraints);
    console.log("Constraint explanations:", explanations);
    
    setAlternativeConstraints(updatedConstraints);
    setConstraintExplanations(explanations);
    
    // Show a success message
    setDisplayMessage("Alternative constraints selected!");
    setTimeout(() => {
      setDisplayMessage('');
    }, 3000);
  };

  const handleQuizComplete = (score) => {
    console.log("Quiz completed with score:", score);
    setQuizScore(score);
    
    // Show a success message
    setDisplayMessage(`Quiz completed! Your score: ${score}%`);
    setTimeout(() => {
      setDisplayMessage('');
    }, 3000);
  };

  const renderContent = () => {
    switch(activeSide) {
      case 'top':
        return <DefineTop onSelectConstraints={handleSelectConstraints} />;
      case 'front':
        return (
          <DefineFront 
            selectedProblem={selectedProblem}
            selectedConstraints={selectedConstraints}
            onConstraintsPrioritized={handleConstraintsPrioritized}
          />
        );
      case 'right':
        return (
          <DefineRight 
            selectedConstraints={selectedConstraints}
            onConstraintUpdate={handleConstraintUpdate}
          />
        );
      case 'back':
        return (
          <DefineBack 
            selectedProblem={selectedProblem}
            prioritizedConstraints={alternativeConstraints.length > 0 ? alternativeConstraints : prioritizedConstraints}
            constraintExplanations={constraintExplanations}
          />
        );
      case 'left':
        return <DefineLeft onQuizComplete={handleQuizComplete} />;
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
          <p>Selected Problem: {selectedProblem || 'None'}</p>
          <p>Selected Constraints: {selectedConstraints.length > 0 ? selectedConstraints.join(', ') : 'None'}</p>
          <p>Prioritized Constraints: {prioritizedConstraints.length > 0 ? prioritizedConstraints.join(', ') : 'None'}</p>
          <p>Alternative Constraints: {alternativeConstraints.length > 0 ? alternativeConstraints.join(', ') : 'None'}</p>
          <p>Quiz Score: {quizScore !== null ? `${quizScore}%` : 'Not taken'}</p>
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
          <h1 className="text-3xl font-bold">Define Cube</h1>
          {selectedConstraints.length > 0 && (
            <span className="text-sm text-gray-400">
              • {selectedConstraints.length} constraints selected
            </span>
          )}
          {quizScore !== null && (
            <span className={`text-sm ml-2 ${quizScore >= 70 ? 'text-green-400' : quizScore >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
              • Quiz Score: {quizScore}%
            </span>
          )}
          {selectedProblem && (
            <span className="text-sm text-green-400 ml-auto">
              Problem Statement Ready
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

export default DefineCube;