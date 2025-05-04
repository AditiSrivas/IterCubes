import { useState } from 'react';
import FlipCard from './FlipCard';
import { empathizeFrontInfo } from '../../constants/cube_info';

const SelectedPersonaDetails = ({ persona }) => {
    if (!persona) return null;

    // Find the matching persona data from cube_info
    const personaData = empathizeFrontInfo.find(p => p.id === persona.id) || empathizeFrontInfo[0];

    // Icons for each card
    const empathyIcon = (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    );
    
    const quoteIcon = (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
        </svg>
    );
    
    const dayInLifeIcon = (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    );

    // Prepare Empathy Map content
    const empathyMapContent = (
        <div className="space-y-4">
            {personaData.empathyMap ? (
                Object.entries(personaData.empathyMap).map(([key, value]) => {
                    if (!value) return null;
                    
                    const formattedKey = key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase());
                    
                    return (
                        <div key={key} className="bg-gray-700 p-3 rounded border border-gray-600">
                            <h4 className="font-medium text-sm text-blue-300 mb-1">{formattedKey}</h4>
                            <p className="text-gray-200">{value}</p>
                        </div>
                    );
                })
            ) : (
                <div className="bg-gray-700 p-3 rounded border border-gray-600">
                    <p className="text-gray-200">No empathy map data available</p>
                </div>
            )}
        </div>
    );

    // Prepare Quote content
    const quoteContent = (
        <>
            <blockquote className="text-xl italic text-gray-200 border-l-4 border-blue-500 pl-4 py-2">
                {personaData.quote ? personaData.quote : "No quote available"}
            </blockquote>
            
            <div className="mt-6 pt-4 border-t border-gray-700">
                <p className="text-gray-300 text-sm">
                    Key values: {persona.bio ? persona.bio.split(' ').slice(0, 10).join(' ') + '...' : 'Efficiency, innovation, and adaptability'}
                </p>
            </div>
        </>
    );

    // Prepare Day in Life content
    const dayInLifeContent = (
        <div className="space-y-3">
            {personaData.dayInLife && personaData.dayInLife.length > 0 ? (
                personaData.dayInLife.map((item, index) => (
                    <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 mr-2">
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                        </div>
                        <p className="text-gray-200">{item}</p>
                    </div>
                ))
            ) : (
                <>
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mr-2">
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                        </div>
                        <p className="text-gray-200">No day in life data available</p>
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="flex flex-col">
            {/* Profile Header */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg mb-6">
                <div className="flex items-center mb-4">
                    <img
                        src={persona.imgPath || "/api/placeholder/64/64"}
                        alt={persona.name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-500"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-white">{persona.name}</h2>
                        <p className="text-blue-400">{persona.archetype || "The Digital Native"}</p>
                    </div>
                </div>
                {/* Basic info summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {persona.demographics?.age && (
                        <div className="text-gray-200">
                            <span className="font-medium text-blue-300">Age:</span> {persona.demographics.age}
                        </div>
                    )}
                    {persona.demographics?.occupation && (
                        <div className="text-gray-200">
                            <span className="font-medium text-blue-300">Occupation:</span> {persona.demographics.occupation}
                        </div>
                    )}
                    {persona.demographics?.family && (
                        <div className="text-gray-200">
                            <span className="font-medium text-blue-300">Family:</span> {persona.demographics.family}
                        </div>
                    )}
                    {(persona.demographics?.location || persona.demographics?.loaction) && (
                        <div className="text-gray-200">
                            <span className="font-medium text-blue-300">Location:</span> {persona.demographics?.location || persona.demographics?.loaction}
                        </div>
                    )}
                </div>
            </div>

            {/* Flip Cards Container with proper card proportions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-full">
                    <FlipCard 
                        title="Empathy Map" 
                        frontContent={null} 
                        backContent={empathyMapContent}
                        icon={empathyIcon}
                    />
                </div>
                
                <div className="h-full">
                    <FlipCard 
                        title="Quote" 
                        frontContent={null} 
                        backContent={quoteContent}
                        icon={quoteIcon}
                    />
                </div>
                
                <div className="h-full">
                    <FlipCard 
                        title="A Day in Life" 
                        frontContent={null} 
                        backContent={dayInLifeContent}
                        icon={dayInLifeIcon}
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectedPersonaDetails;