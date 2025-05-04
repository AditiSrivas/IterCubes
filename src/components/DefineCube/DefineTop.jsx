import React, { useEffect, useState } from 'react';
import { defineTopInfo } from '../../constants/cube_info';

const DefineTop = ({ onSelectConstraints }) => {
    const [selectedConstraints, setSelectedConstraints] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
  
    const getRandomConstraint = (currentSelection) => {
        const availableConstraints = defineTopInfo.filter(
            constraint => !currentSelection.includes(constraint)
        );
        
        if (availableConstraints.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * availableConstraints.length);
        return availableConstraints[randomIndex];
    };

    useEffect(() => {
        const initialConstraints = [];
        for (let i = 0; i < 3; i++) {
            const newConstraint = getRandomConstraint(initialConstraints);
            if (newConstraint) initialConstraints.push(newConstraint);
        }
        setSelectedConstraints(initialConstraints);
        
        // Don't automatically call onSelectConstraints here
        // This keeps the constraints in local state until the user confirms
    }, []);
  
    const replaceConstraint = (index) => {
        const updatedConstraints = [...selectedConstraints];
        const newConstraint = getRandomConstraint(updatedConstraints);
        
        if (newConstraint) {
            updatedConstraints[index] = newConstraint;
            setSelectedConstraints(updatedConstraints);
        }
    };
    
    const handleConfirmConstraints = () => {
        if (onSelectConstraints && typeof onSelectConstraints === 'function') {
            onSelectConstraints(selectedConstraints);
        }
        
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
        }, 2000);
    };
  
    return (
        <div className="p-6">
            {/* Confirmation Message */}
            {showConfirmation && (
                <div className="bg-green-600 text-white py-2 px-4 rounded-md mb-4 transition-opacity duration-300 absolute top-4 left-1/2 transform -translate-x-1/2 z-10 shadow-lg">
                    Constraints selected!
                </div>
            )}
            
            <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Design Constraints</h3>
                <p className="text-gray-400">
                    Consider these constraints as you define your solution.
                    Click the refresh button to get a different constraint.
                </p>
            </div>
    
            <div className="space-y-6 mb-8">
                {selectedConstraints.map((constraint, index) => (
                    <div 
                        key={index} 
                        className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg"
                    >
                        <div className="flex-1">
                            <p className="text-lg">{constraint}</p>
                        </div>
                        <button
                            onClick={() => replaceConstraint(index)}
                            className="p-2 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center"
                            aria-label="Get new constraint"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            
            {/* Confirm button */}
            <div className="flex justify-center mt-6">
                <button
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-semibold transition-colors duration-200"
                    onClick={handleConfirmConstraints}
                >
                    Confirm Constraints
                </button>
            </div>
            
            <div className="text-sm text-gray-400 mt-6 text-center">
                <p>Once you're satisfied with your constraints, click Confirm to save them</p>
                <p>Then use the arrows to navigate to the Front side to prioritize them</p>
            </div>
        </div>
    );
};
  
export default DefineTop;