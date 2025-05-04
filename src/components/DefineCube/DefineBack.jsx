import React, { useState, useEffect } from 'react';

const DefineBack = ({ selectedProblem, prioritizedConstraints, constraintExplanations }) => {
    const [currentView, setCurrentView] = useState('comparison'); // 'comparison' or 'reflections'
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [reflection, setReflection] = useState('');
    
    // For the without constraints solution visualization
    const genericSolution = "A generic solution that doesn't take into account specific constraints. This would likely be less effective but easier to implement quickly.";
    
    // For the with constraints solution visualization
    const constrainedSolution = "A tailored solution that carefully addresses all constraints. This would be more realistic, effective, and sustainable in the long run.";
    
    // Handle reflection submission
    const handleSubmitReflection = () => {
        if (reflection.trim() === '') {
            alert("Please enter your reflection before submitting.");
            return;
        }
        
        // Show confirmation message
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
        }, 2000);
    };
    
    // Render a "loading" state if no constraints are available yet
    if (!prioritizedConstraints || prioritizedConstraints.length === 0) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-400">
                    Please complete the previous steps first to see solution comparisons.
                </p>
            </div>
        );
    }
    
    // Get explanation for a constraint from the constraintExplanations object
    const getExplanationForConstraint = (constraint) => {
        // Find the key in constraintExplanations that has this constraint
        for (const [index, explanation] of Object.entries(constraintExplanations)) {
            if (prioritizedConstraints[index] === constraint) {
                return explanation;
            }
        }
        return "No explanation provided.";
    };
    
    return (
        <div className="p-6">
            {/* Confirmation Message */}
            {showConfirmation && (
                <div className="bg-green-600 text-white py-2 px-4 rounded-md mb-4 transition-opacity duration-300 absolute top-4 left-1/2 transform -translate-x-1/2 z-10 shadow-lg">
                    Reflection submitted successfully!
                </div>
            )}
            
            {/* Problem Statement Display */}
            {selectedProblem && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Problem Statement</h3>
                    <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                        <p className="text-white">{selectedProblem}</p>
                    </div>
                </div>
            )}
            
            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
                <button
                    className={`px-4 py-2 font-medium text-sm ${
                        currentView === 'comparison' 
                            ? 'border-b-2 border-blue-500 text-blue-400' 
                            : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => setCurrentView('comparison')}
                >
                    Solution Comparison
                </button>
                <button
                    className={`px-4 py-2 font-medium text-sm ${
                        currentView === 'reflections' 
                            ? 'border-b-2 border-blue-500 text-blue-400' 
                            : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => setCurrentView('reflections')}
                >
                    Constraint Reflections
                </button>
            </div>
            
            {/* Comparison View */}
            {currentView === 'comparison' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Without Constraints Solution */}
                    <div className="bg-gray-800 rounded-lg p-5 border-2 border-dashed border-red-500">
                        <div className="mb-4">
                            <h3 className="text-lg font-medium flex items-center">
                                <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                                Without Constraints
                            </h3>
                            <p className="text-sm text-gray-400 mt-2">
                                A solution that ignores the identified constraints might look like:
                            </p>
                        </div>
                        
                        <div className="bg-gray-700 p-4 rounded-lg mb-4">
                            <p>{genericSolution}</p>
                        </div>
                        
                        <div className="bg-gray-900 p-3 rounded-lg">
                            <h4 className="text-sm font-medium text-red-400 mb-2">Potential Issues:</h4>
                            <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
                                <li>May not address the core needs of the problem</li>
                                <li>Could be unrealistic to implement</li>
                                <li>Likely to face unexpected challenges</li>
                                <li>Might not be sustainable long-term</li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* With Constraints Solution */}
                    <div className="bg-gray-800 rounded-lg p-5 border-2 border-green-500">
                        <div className="mb-4">
                            <h3 className="text-lg font-medium flex items-center">
                                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                                With Constraints
                            </h3>
                            <p className="text-sm text-gray-400 mt-2">
                                A solution that embraces the identified constraints:
                            </p>
                        </div>
                        
                        <div className="bg-gray-700 p-4 rounded-lg mb-4">
                            <p>{constrainedSolution}</p>
                        </div>
                        
                        <div className="bg-gray-900 p-3 rounded-lg">
                            <h4 className="text-sm font-medium text-green-400 mb-2">Key Constraints Applied:</h4>
                            <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
                                {prioritizedConstraints.slice(0, 3).map((constraint, index) => (
                                    <li key={index}>{constraint}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Reflections View */}
            {currentView === 'reflections' && (
                <div>
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">Constraint Reflections</h3>
                        <p className="text-gray-400 mb-6">
                            Review how each constraint impacts your solution and why they're important:
                        </p>
                        
                        <div className="space-y-6">
                            {prioritizedConstraints.map((constraint, index) => (
                                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">{constraint}</h4>
                                    <div className="bg-gray-700 p-3 rounded border-l-4 border-blue-500">
                                        <p className="text-gray-300">
                                            {getExplanationForConstraint(constraint) || 
                                            "This constraint would make the solution more realistic by adding necessary boundaries."}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Reflection Textarea */}
                    <div className="bg-gray-800 p-5 rounded-lg mt-8">
                        <h3 className="text-lg font-medium mb-3">Your Reflection</h3>
                        <p className="text-gray-400 mb-4">
                            How do these constraints make your solution more realistic and effective?
                        </p>
                        <textarea
                            className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white"
                            rows="5"
                            placeholder="Enter your reflection here..."
                            value={reflection}
                            onChange={(e) => setReflection(e.target.value)}
                        ></textarea>
                        
                        <div className="flex justify-end mt-4">
                            <button 
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-medium transition-colors duration-200"
                                onClick={handleSubmitReflection}
                            >
                                Submit Reflection
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Quote about constraints */}
            <div className="mt-8 text-center">
                <blockquote className="italic text-gray-400 border-l-4 border-blue-500 pl-4 py-2 max-w-md mx-auto">
                    "Constraints aren't limitations; they're the foundation of realistic solutions."
                </blockquote>
            </div>
        </div>
    );
};

export default DefineBack;