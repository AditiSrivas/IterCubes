import React from 'react';
import { empathizeBackInfo } from '../../constants/cube_info';

const EmpathizeBack = ({ selectedPersona }) => {
    if (!selectedPersona) {
        return (
            <div className="p-6">
                <div className="text-center py-20 text-gray-400">
                    <p>No persona selected. Please select a persona from the top side of the cube.</p>
                </div>
            </div>
        );
    }

    const moodboardData = empathizeBackInfo[selectedPersona.id - 1] || empathizeBackInfo[0];

    return (
        <div className="p-6">
            <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
                {/* Persona header */}
                <div className="bg-gray-900 p-4 border-b border-gray-700">
                    <div className="flex items-center">
                        <img
                            src={selectedPersona.imgPath || "/api/placeholder/48/48"}
                            alt={selectedPersona.name}
                            className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-blue-500"
                        />
                        <div>
                            <h2 className="text-xl font-bold text-white">{selectedPersona.name}</h2>
                            <p className="text-blue-400">{selectedPersona.archetype || "Moodboard"}</p>
                        </div>
                    </div>
                </div>
                
                {/* Moodboard image */}
                <div className="p-4">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                        {moodboardData.moodBoard ? (
                            <img 
                                src={moodboardData.moodBoard} 
                                alt={`${selectedPersona.name}'s moodboard`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-700">
                                <p className="text-gray-300">Moodboard not available</p>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Caption or description if available */}
                <div className="p-4 pt-2">
                    <p className="text-gray-300 text-center italic">
                        Visual representation of {selectedPersona.name}'s lifestyle, preferences, and environment
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmpathizeBack;