import React, { useState, useEffect } from 'react';
import { defineTopInfo, defineRightInfo } from '../../constants/cube_info';

const DefineRight = ({ selectedConstraints, onConstraintUpdate }) => {
    const [constraintPairs, setConstraintPairs] = useState([]);
    const [selectedPairs, setSelectedPairs] = useState([]);
    const [explanations, setExplanations] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    // Generate a random unexpected constraint from defineRightInfo
    const getRandomUnexpectedConstraint = (excludeList) => {
        const availableConstraints = defineRightInfo.filter(
            constraint => !excludeList.includes(constraint)
        );
        
        if (availableConstraints.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * availableConstraints.length);
        return availableConstraints[randomIndex];
    };
    
    // Initialize constraint pairs when component mounts or selectedConstraints changes
    useEffect(() => {
        if (selectedConstraints && selectedConstraints.length > 0) {
            const pairs = [];
            const usedUnexpected = [];
            
            // For each original constraint, create a pair with an unexpected constraint
            selectedConstraints.forEach(originalConstraint => {
                const unexpectedConstraint = getRandomUnexpectedConstraint(usedUnexpected);
                if (unexpectedConstraint) {
                    usedUnexpected.push(unexpectedConstraint);
                    pairs.push({
                        original: originalConstraint,
                        unexpected: unexpectedConstraint
                    });
                }
            });
            
            setConstraintPairs(pairs);
            
            // Initialize with no selections
            setSelectedPairs(new Array(pairs.length).fill(null));
            
            // Initialize empty explanations
            const initialExplanations = {};
            pairs.forEach((pair, index) => {
                initialExplanations[index] = '';
            });
            setExplanations(initialExplanations);
        }
    }, [selectedConstraints]);
    
    // Handle selection of a constraint (original or unexpected)
    const handleSelectConstraint = (pairIndex, type) => {
        const newSelectedPairs = [...selectedPairs];
        newSelectedPairs[pairIndex] = type;
        setSelectedPairs(newSelectedPairs);
    };
    
    // Handle explanation text change
    const handleExplanationChange = (pairIndex, text) => {
        setExplanations(prev => ({
            ...prev,
            [pairIndex]: text
        }));
    };
    
    // Get the final set of constraints based on selections
    const getFinalConstraints = () => {
        return constraintPairs.map((pair, index) => {
            const selectedType = selectedPairs[index];
            return selectedType === 'unexpected' ? pair.unexpected : pair.original;
        });
    };
    
    // Handle confirmation
    const handleConfirm = () => {
        // Check if all pairs have a selection and explanation
        const allSelected = selectedPairs.every(selection => selection !== null);
        const allExplained = Object.values(explanations).every(exp => exp.trim() !== '');
        
        if (!allSelected || !allExplained) {
            alert("Please select a constraint for each pair and provide explanations.");
            return;
        }
        
        // Create the final constraints list based on selections
        const finalConstraints = getFinalConstraints();
        
        // Pass updated constraints back to parent component
        if (onConstraintUpdate && typeof onConstraintUpdate === 'function') {
            onConstraintUpdate(finalConstraints, explanations);
        }
        
        // Show confirmation message
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
        }, 2000);
    };
    
    // Render a "loading" state if no constraints are available yet
    if (!constraintPairs.length) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-400">
                    Please select constraints on the top side first.
                </p>
            </div>
        );
    }
    
    return (
        <div className="p-6">
            {/* Confirmation Message */}
            {showConfirmation && (
                <div className="bg-green-600 text-white py-2 px-4 rounded-md mb-4 transition-opacity duration-300 absolute top-4 left-1/2 transform -translate-x-1/2 z-10 shadow-lg">
                    Changes confirmed!
                </div>
            )}
            
            <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Constraint Alternatives</h3>
                <p className="text-gray-400 mb-2">
                    For each original constraint, consider an unexpected alternative.
                </p>
                <p className="text-gray-400">
                    Select which constraint you would prioritize and explain how it would affect your solution.
                </p>
            </div>
            
            <div className="space-y-8">
                {constraintPairs.map((pair, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-5">
                        <div className="text-lg font-medium mb-4">Constraint Pair #{index + 1}</div>
                        
                        {/* Original Constraint */}
                        <div 
                            className={`p-4 mb-4 rounded-lg cursor-pointer border-2 transition-all ${
                                selectedPairs[index] === 'original' 
                                    ? 'border-blue-500 bg-gray-700' 
                                    : 'border-gray-700 bg-gray-800 hover:bg-gray-700'
                            }`}
                            onClick={() => handleSelectConstraint(index, 'original')}
                        >
                            <div className="flex items-center">
                                <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 ${
                                    selectedPairs[index] === 'original' ? 'bg-blue-500' : 'bg-gray-600'
                                }`}>
                                    {selectedPairs[index] === 'original' && (
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <div className="text-sm text-blue-400 mb-1">Original Constraint:</div>
                                    <div>{pair.original}</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Unexpected Constraint */}
                        <div 
                            className={`p-4 mb-4 rounded-lg cursor-pointer border-2 transition-all ${
                                selectedPairs[index] === 'unexpected' 
                                    ? 'border-purple-500 bg-gray-700' 
                                    : 'border-gray-700 bg-gray-800 hover:bg-gray-700'
                            }`}
                            onClick={() => handleSelectConstraint(index, 'unexpected')}
                        >
                            <div className="flex items-center">
                                <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 ${
                                    selectedPairs[index] === 'unexpected' ? 'bg-purple-500' : 'bg-gray-600'
                                }`}>
                                    {selectedPairs[index] === 'unexpected' && (
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <div className="text-sm text-purple-400 mb-1">Unexpected Constraint:</div>
                                    <div>{pair.unexpected}</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Explanation Textarea */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Explain how this constraint affects your solution:
                            </label>
                            <textarea
                                className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white"
                                rows="3"
                                placeholder="Your explanation..."
                                value={explanations[index] || ''}
                                onChange={(e) => handleExplanationChange(index, e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Confirm Button */}
            <div className="flex justify-center mt-8">
                <button
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-semibold transition-colors duration-200"
                    onClick={handleConfirm}
                >
                    Confirm Choices
                </button>
            </div>
            
            <div className="text-sm text-gray-400 mt-6 text-center">
                <p>Your selections will update the constraints for your design solution</p>
            </div>
        </div>
    );
};

export default DefineRight;