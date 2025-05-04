import React, { useState, useEffect } from 'react';
import { defineFrontInfo } from '../../constants/cube_info';

const DefineFront = ({ selectedProblem, selectedConstraints, onConstraintsPrioritized }) => {
    const [priorityGroups, setPriorityGroups] = useState({
        "Essential": [],
        "Important": [],
        "Nice to have": [],
        "Future consideration": []
    });
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    // Reset groups when selected constraints change
    useEffect(() => {
        if (selectedConstraints && selectedConstraints.length > 0) {
            // Initialize with all constraints as "Important" by default
            const initialGroups = {
                "Essential": [],
                "Important": [...selectedConstraints],
                "Nice to have": [],
                "Future consideration": []
            };
            setPriorityGroups(initialGroups);
        }
    }, [selectedConstraints]);
    
    // Handle moving a constraint to a different priority group
    const moveConstraint = (constraint, fromGroup, toGroup) => {
        if (fromGroup === toGroup) return;
        
        setPriorityGroups(prev => {
            const newGroups = { ...prev };
            // Remove from current group
            newGroups[fromGroup] = newGroups[fromGroup].filter(c => c !== constraint);
            // Add to new group
            newGroups[toGroup] = [...newGroups[toGroup], constraint];
            return newGroups;
        });
    };
    
    // Get the current group a constraint belongs to
    const getConstraintGroup = (constraint) => {
        for (const [groupName, constraints] of Object.entries(priorityGroups)) {
            if (constraints.includes(constraint)) {
                return groupName;
            }
        }
        return null;
    };
    
    // Handle confirm button click
    const handleConfirm = () => {
        // Gather prioritized constraints (flattened with highest priority first)
        const prioritized = [
            ...priorityGroups["Essential"],
            ...priorityGroups["Important"],
            ...priorityGroups["Nice to have"],
            ...priorityGroups["Future consideration"]
        ];
        
        // Pass prioritized constraints to parent
        if (onConstraintsPrioritized && typeof onConstraintsPrioritized === 'function') {
            onConstraintsPrioritized(prioritized);
        }
        
        // Show confirmation message
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
        }, 2000);
    };
    
    // Render a loading state if no constraints are available
    if (!selectedConstraints || selectedConstraints.length === 0) {
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
                    Priorities confirmed!
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
            
            <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Prioritize Constraints</h3>
                <p className="text-gray-400">
                    Drag and drop constraints to prioritize them based on their importance to your solution.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(priorityGroups).map(([priority, constraints]) => (
                    <div 
                        key={priority} 
                        className="bg-gray-800 rounded-lg p-5"
                    >
                        <div className="flex items-center mb-4">
                            <div className={`w-3 h-3 rounded-full mr-2 ${
                                priority === "Essential" ? "bg-red-500" :
                                priority === "Important" ? "bg-yellow-500" :
                                priority === "Nice to have" ? "bg-green-500" :
                                "bg-blue-500"
                            }`}></div>
                            <h4 className="text-lg font-medium">{priority}</h4>
                        </div>
                        
                        <p className="text-sm text-gray-400 mb-4">
                            {defineFrontInfo.descriptions[priority]}
                        </p>
                        
                        <div className="min-h-32 space-y-2">
                            {constraints.map(constraint => (
                                <div
                                    key={constraint}
                                    className="bg-gray-700 p-3 rounded border border-gray-600"
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{constraint}</span>
                                        <div className="flex space-x-1">
                                            {defineFrontInfo.priorities.map(p => (
                                                <button
                                                    key={p}
                                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                                        p === priority ? 
                                                        (p === "Essential" ? "bg-red-500" :
                                                        p === "Important" ? "bg-yellow-500" :
                                                        p === "Nice to have" ? "bg-green-500" :
                                                        "bg-blue-500") : "bg-gray-600 hover:bg-gray-500"
                                                    }`}
                                                    onClick={() => moveConstraint(constraint, priority, p)}
                                                    disabled={p === priority}
                                                    title={p}
                                                >
                                                    {p.charAt(0)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {constraints.length === 0 && (
                                <div className="text-center py-8 text-gray-500 border border-dashed border-gray-700 rounded">
                                    Drag constraints here
                                </div>
                            )}
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
                    Confirm Priorities
                </button>
            </div>
        </div>
    );
};

export default DefineFront;