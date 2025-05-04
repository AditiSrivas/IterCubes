import React, { useState, useEffect } from 'react';

const IdeateLeft = ({ selectedPrompt }) => {
    // Criteria for ranking ideas
    const criteriaList = [
        { id: "innovation", name: "Innovation", description: "How original and creative is the idea?" },
        { id: "userFriendly", name: "User-Friendliness", description: "How easy would this be to use?" },
        { id: "cost", name: "Cost-Effectiveness", description: "How affordable would this be to implement?" },
        { id: "impact", name: "Potential Impact", description: "How significant would the benefits be?" }
    ];

    const [ideas, setIdeas] = useState([]);
    const [selectedCriteria, setSelectedCriteria] = useState(criteriaList[0].id);
    const [rankingComplete, setRankingComplete] = useState(false);
    const [step, setStep] = useState(1); // 1: Select criteria, 2: Rank ideas, 3: Review results

    // Mock data for ideas - in a real app, this would come from a database or parent component
    useEffect(() => {
        if (selectedPrompt) {
        const mockIdeas = [
            { 
            id: 1, 
            text: "App that gamifies classroom participation", 
            rankings: {
                innovation: 0,
                userFriendly: 0,
                cost: 0,
                impact: 0
            }
            },
            { 
            id: 2, 
            text: "AI-powered study buddy that adapts to learning style", 
            rankings: {
                innovation: 0,
                userFriendly: 0,
                cost: 0,
                impact: 0
            }
            },
            { 
            id: 3, 
            text: "Collaborative digital whiteboard with real-time feedback", 
            rankings: {
                innovation: 0,
                userFriendly: 0,
                cost: 0,
                impact: 0
            }
            },
            { 
            id: 4, 
            text: "Virtual reality field trips for geography lessons", 
            rankings: {
                innovation: 0,
                userFriendly: 0,
                cost: 0,
                impact: 0
            }
            }
        ];
        setIdeas(mockIdeas);
        setRankingComplete(false);
        setStep(1);
        }
    }, [selectedPrompt]);

    const handleCriteriaChange = (criteriaId) => {
        setSelectedCriteria(criteriaId);
    };

    const handleRankChange = (ideaId, newRank) => {
        // Update the rank for the selected idea
        setIdeas(ideas.map(idea => {
        if (idea.id === ideaId) {
            return {
            ...idea,
            rankings: {
                ...idea.rankings,
                [selectedCriteria]: newRank
            }
            };
        }
        return idea;
        }));
    };

    const checkRankingComplete = () => {
        // Check if all ideas have been ranked for the current criteria
        const isComplete = ideas.every(idea => idea.rankings[selectedCriteria] > 0);
        setRankingComplete(isComplete);
    };

    useEffect(() => {
        checkRankingComplete();
    }, [ideas]);

    const moveToNextStep = () => {
        if (step < 3) {
        setStep(step + 1);
        }
    };

    const moveToPreviousStep = () => {
        if (step > 1) {
        setStep(step - 1);
        }
    };

    const moveToCriteria = (criteriaId) => {
        setSelectedCriteria(criteriaId);
        setStep(2);
    };

    const renderStepOne = () => (
        <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Select Ranking Criteria</h3>
        <p className="text-gray-400 mb-6">Choose one criteria at a time to rank your ideas:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criteriaList.map(criteria => (
            <button
                key={criteria.id}
                className={`p-4 rounded-lg text-left transition ${
                selectedCriteria === criteria.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => handleCriteriaChange(criteria.id)}
            >
                <h4 className="font-medium">{criteria.name}</h4>
                <p className="text-sm opacity-80">{criteria.description}</p>
            </button>
            ))}
        </div>
        
        <div className="mt-6 flex justify-end">
            <button 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
            onClick={moveToNextStep}
            >
            Continue
            </button>
        </div>
        </div>
    );

    const renderStepTwo = () => {
        // Find the current criteria object
        const currentCriteria = criteriaList.find(c => c.id === selectedCriteria);
        
        return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Rank by {currentCriteria.name}</h3>
            <span className="text-sm bg-blue-900 text-blue-200 py-1 px-3 rounded-full">
                Step 2 of 3
            </span>
            </div>
            
            <p className="text-gray-400 mb-6">{currentCriteria.description}</p>
            
            <div className="space-y-4 mb-6">
            {ideas.map(idea => (
                <div key={idea.id} className="bg-gray-700 p-4 rounded-lg">
                <p className="mb-3">{idea.text}</p>
                <div className="flex items-center">
                    <span className="text-sm text-gray-400 mr-3">Rank:</span>
                    <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(rank => (
                        <button
                        key={rank}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            idea.rankings[selectedCriteria] === rank
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                        onClick={() => handleRankChange(idea.id, rank)}
                        >
                        {rank}
                        </button>
                    ))}
                    </div>
                </div>
                </div>
            ))}
            </div>
            
            <div className="flex justify-between">
            <button 
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
                onClick={moveToPreviousStep}
            >
                Back
            </button>
            
            <button 
                className={`py-2 px-6 rounded ${
                rankingComplete
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                onClick={moveToNextStep}
                disabled={!rankingComplete}
            >
                Review Results
            </button>
            </div>
        </div>
        );
    };

    const renderStepThree = () => {
        // Calculate the total scores for each idea
        const ideasWithTotals = ideas.map(idea => {
        const totalScore = Object.values(idea.rankings).reduce((sum, rank) => sum + rank, 0);
        return { ...idea, totalScore };
        });
        
        // Sort ideas by total score in descending order
        const sortedIdeas = [...ideasWithTotals].sort((a, b) => b.totalScore - a.totalScore);
        
        return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-1">Ranking Results</h3>
            <p className="text-gray-400 mb-6">Here are your ideas ranked by combined criteria scores:</p>
            
            <div className="space-y-4 mb-6">
            {sortedIdeas.map((idea, index) => (
                <div 
                key={idea.id} 
                className={`p-4 rounded-lg border ${
                    index === 0 ? 'bg-blue-900/30 border-blue-600' : 'bg-gray-700 border-gray-600'
                }`}
                >
                <div className="flex justify-between items-start mb-2">
                    <span className={`font-bold text-lg ${index === 0 ? 'text-blue-400' : 'text-white'}`}>
                    #{index + 1}
                    </span>
                    <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                    Score: {idea.totalScore}
                    </span>
                </div>
                <p className="text-lg mb-3">{idea.text}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {criteriaList.map(criteria => (
                    <div key={criteria.id} className="flex items-center">
                        <span className="text-xs text-gray-400 mr-2">{criteria.name}:</span>
                        <span className="font-medium">{idea.rankings[criteria.id]}</span>
                    </div>
                    ))}
                </div>
                </div>
            ))}
            </div>
            
            <div className="mt-6">
            <h4 className="font-medium mb-2">Continue Ranking by Other Criteria:</h4>
            <div className="flex flex-wrap gap-2">
                {criteriaList.map(criteria => (
                <button
                    key={criteria.id}
                    className={`py-1 px-3 text-sm rounded ${
                    selectedCriteria === criteria.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => moveToCriteria(criteria.id)}
                >
                    {criteria.name}
                </button>
                ))}
            </div>
            </div>
            
            <div className="mt-6 flex justify-between">
            <button 
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
                onClick={moveToPreviousStep}
            >
                Back to Ranking
            </button>
            </div>
        </div>
        );
    };

    return (
        <div className="bg-gray-900 p-6 rounded-lg">
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Idea Ranking</h2>
            <p className="text-gray-400">
            {selectedPrompt ? 
                `Rank ideas for: "${selectedPrompt}"` : 
                'Select a prompt from the top side to begin ranking ideas'}
            </p>
        </div>
        
        {!selectedPrompt && (
            <div className="bg-gray-800 p-6 rounded-lg text-center">
            <p className="text-gray-400">No prompt selected.</p>
            <p className="text-gray-500 text-sm mt-2">Navigate to the top side to select a prompt first.</p>
            </div>
        )}
        
        {selectedPrompt && (
            <>
            {/* Progress indicators */}
            <div className="flex justify-center mb-6">
                <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-blue-600' : 'bg-gray-700'
                }`}>
                    1
                </div>
                <div className={`w-16 h-1 ${step > 1 ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-blue-600' : 'bg-gray-700'
                }`}>
                    2
                </div>
                <div className={`w-16 h-1 ${step > 2 ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 3 ? 'bg-blue-600' : 'bg-gray-700'
                }`}>
                    3
                </div>
                </div>
            </div>
            
            {step === 1 && renderStepOne()}
            {step === 2 && renderStepTwo()}
            {step === 3 && renderStepThree()}
            </>
        )}
        </div>
    );
};

export default IdeateLeft;