import React from 'react';
import { empathizeLeftInfo } from '../../constants/cube_info';

const EmpathizeLeft = ({ selectedPersona }) => {
    if (!selectedPersona) {
        return (
            <div className="p-6">
                <div className="text-center py-20 text-gray-400">
                    <p>No persona selected. Please select a persona from the top side of the cube.</p>
                </div>
            </div>
        );
    }

    const painPointsData = empathizeLeftInfo[selectedPersona.id - 1] || empathizeLeftInfo[0];

    return (
        <div className="p-6">
            <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
                {/* Header with persona info */}
                <div className="bg-gray-900 p-4 border-b border-gray-700 flex items-center">
                    <img
                        src={selectedPersona.imgPath || "/api/placeholder/48/48"}
                        alt={selectedPersona.name}
                        className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-red-500"
                    />
                    <div>
                        <h2 className="text-xl font-bold text-white">{selectedPersona.name}</h2>
                        <p className="text-red-400">Pain Points</p>
                    </div>
                </div>

                {/* Pain points list */}
                <div className="p-6">
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <div className="flex items-center mb-4">
                            <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                            <h3 className="text-lg font-semibold text-white">Challenges & Frustrations</h3>
                        </div>
                        
                        {painPointsData.painpoints && painPointsData.painpoints.length > 0 ? (
                            <ul className="space-y-3">
                                {painPointsData.painpoints.map((painpoint, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="flex-shrink-0 mr-2">
                                            <div className="w-2 h-2 mt-2 rounded-full bg-red-500"></div>
                                        </div>
                                        <p className="text-gray-200">{painpoint}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400 italic">No pain points available for this persona.</p>
                        )}
                    </div>
                    
                    {/* Impact section */}
                    <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
                        <h4 className="text-sm font-medium text-red-300 mb-2">Impact on Decision Making</h4>
                        <p className="text-gray-300">
                            These pain points significantly influence how {selectedPersona.name} evaluates and chooses 
                            digital products and services, creating opportunities for solutions that address these 
                            specific challenges.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpathizeLeft;