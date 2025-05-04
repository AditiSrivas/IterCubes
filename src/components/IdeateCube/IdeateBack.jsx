import React, { useState, useEffect } from 'react';

const IdeateBack = ({ selectedPrompt }) => {
    const [ideas, setIdeas] = useState([]);
    const [newIdea, setNewIdea] = useState('');
    const [currentUser, setCurrentUser] = useState('Student1'); 
    
    // Mock data for initial ideas
    useEffect(() => {
        // from an API or database
        const mockIdeas = [
        { 
            id: 1, 
            text: 'App that gamifies classroom participation',
            author: 'Student2',
            innovation: { total: 7, votes: 2 },
            feasibility: { total: 8, votes: 2 }
        },
        { 
            id: 2, 
            text: 'AI-powered study buddy that adapts to learning style',
            author: 'Student3',
            innovation: { total: 9, votes: 3 },
            feasibility: { total: 6, votes: 3 }
        }
        ];
        
        setIdeas(mockIdeas);
    }, [selectedPrompt]); 
    
    const handleAddIdea = () => {
        if (!newIdea.trim()) return;
        
        const newIdeaObj = {
        id: Date.now(),
        text: newIdea,
        author: currentUser,
        innovation: { total: 0, votes: 0 },
        feasibility: { total: 0, votes: 0 }
        };
        
        setIdeas([...ideas, newIdeaObj]);
        setNewIdea('');
    };
    
    const handleVote = (ideaId, category, rating) => {
        setIdeas(ideas.map(idea => {
        if (idea.id === ideaId) {
            const updatedCategory = {
            total: idea[category].total + rating,
            votes: idea[category].votes + 1
            };
            
            return {
            ...idea,
            [category]: updatedCategory
            };
        }
        return idea;
        }));
    };
    
    const getAverageRating = (total, votes) => {
        if (votes === 0) return 0;
        return (total / votes).toFixed(1);
    };
    
    return (
        <div className="bg-gray-900 p-6 rounded-lg">
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Idea Validation</h2>
            <p className="text-gray-400">
            {selectedPrompt ? 
                `Vote on ideas for: "${selectedPrompt}"` : 
                'Select a prompt from the top side to begin idea validation'}
            </p>
        </div>
        
        {selectedPrompt && (
            <>
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Add Your Idea</h3>
                <div className="flex gap-2">
                <input
                    type="text"
                    value={newIdea}
                    onChange={(e) => setNewIdea(e.target.value)}
                    className="flex-1 bg-gray-800 text-white p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your idea..."
                />
                <button
                    onClick={handleAddIdea}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    Add
                </button>
                </div>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-3">Vote on Ideas</h3>
                
                {ideas.length === 0 ? (
                <p className="text-gray-500 italic">No ideas have been submitted yet.</p>
                ) : (
                <div className="space-y-4">
                    {ideas.map(idea => (
                    <div key={idea.id} className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="font-medium">{idea.text}</p>
                            <p className="text-sm text-gray-500">By {idea.author}</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="text-center">
                            <p className="text-xs text-gray-400">Innovation</p>
                            <p className="text-lg font-bold text-blue-400">
                                {getAverageRating(idea.innovation.total, idea.innovation.votes)}
                            </p>
                            </div>
                            <div className="text-center">
                            <p className="text-xs text-gray-400">Feasibility</p>
                            <p className="text-lg font-bold text-green-400">
                                {getAverageRating(idea.feasibility.total, idea.feasibility.votes)}
                            </p>
                            </div>
                        </div>
                        </div>
                        
                        {idea.author !== currentUser && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <p className="text-sm mb-1 text-blue-400">Innovation Rating</p>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(rating => (
                                <button
                                    key={`innovation-${rating}`}
                                    onClick={() => handleVote(idea.id, 'innovation', rating)}
                                    className="w-8 h-8 rounded bg-gray-700 hover:bg-blue-600 flex items-center justify-center text-sm"
                                >
                                    {rating}
                                </button>
                                ))}
                            </div>
                            </div>
                            
                            <div>
                            <p className="text-sm mb-1 text-green-400">Feasibility Rating</p>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(rating => (
                                <button
                                    key={`feasibility-${rating}`}
                                    onClick={() => handleVote(idea.id, 'feasibility', rating)}
                                    className="w-8 h-8 rounded bg-gray-700 hover:bg-green-600 flex items-center justify-center text-sm"
                                >
                                    {rating}
                                </button>
                                ))}
                            </div>
                            </div>
                        </div>
                        )}
                        
                        {idea.author === currentUser && (
                        <p className="text-xs text-gray-500 mt-2 italic">
                            You cannot vote on your own idea
                        </p>
                        )}
                    </div>
                    ))}
                </div>
                )}
            </div>
            </>
        )}
        </div>
    );
};

export default IdeateBack;