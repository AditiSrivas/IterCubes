import React from 'react'

const ProgressBar = ({value, label, maxValue = 10, color = "blue" }) => {
    const percentage = (value / maxValue) * 100;

    const colorClasses = {
        pink: "bg-pink-500",
        blue: "bg-blue-500",
        green: "bg-green-500",
        purple: "bg-purple-500",
        orange: "bg-orange-500",
    };

    const barColor = colorClasses[color] || colorClasses.blue;
    return (
        <div className='mb-3'>
            <div className='flex justify-between mb-1'>
                <span className='text-sm font-medium text-gray-300'>{label}</span>
                <span className='text-sm font-medium text-gray-300'>{value}/{maxValue}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                    className={`${barColor} h-2.5 rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

const PersonaModal = ({ persona, isOpen, onClose, onSelect }) => {
    if (!isOpen || !persona) {
        return null;
    }
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white">{persona.name}</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left column - Image and basic info */}
                        <div className="md:col-span-1">
                            <div className="mb-4">
                                <img
                                    src={persona.imgPath}
                                    alt={persona.name}
                                    className="w-full rounded-lg shadow-md"
                                />
                            </div>
                        
                            <div className="bg-gray-900 p-4 rounded-lg shadow border border-gray-700">
                                <h3 className="font-bold text-lg mb-2 text-white">Basic Info</h3>
                                <div className="space-y-2 text-gray-300">
                                    <p><span className="font-medium">Age:</span> {persona.demographics?.age}</p>
                                    <p><span className="font-medium">Occupation:</span> {persona.demographics?.occupation}</p>
                                    <p><span className="font-medium">Family:</span> {persona.demographics?.family}</p>
                                    <p><span className="font-medium">Location:</span> {persona.demographics?.loaction || persona.demographics?.location}</p>
                                </div>
                            
                                <div className="mt-4 py-3 px-4 bg-gray-800 rounded-lg border border-gray-700">
                                    <p className="italic text-sm text-gray-300">"{persona.bio || 'No bio available'}"</p>
                                </div>
                            
                                {/* Brands */}
                                {persona.brands && persona.brands.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="font-medium mb-2 text-white">Preferred Brands</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {persona.brands.map((brand, index) => (
                                                <span 
                                                    key={index} 
                                                    className="bg-blue-900 text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded"
                                                >
                                                    {brand}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Right column - Detailed information */}
                        <div className="md:col-span-2">
                            {/* MOVED: Personality, Channels, and Motivations to this area (previously highlighted in red) */}
                            <div className="grid grid-cols-1 gap-4 mb-4">
                                {/* Personality Traits with Progress Bars */}
                                {persona.personality && (
                                    <div className="bg-gray-900 p-4 rounded-lg shadow border border-gray-700">
                                        <h3 className="font-bold text-lg mb-3 text-white">Personality Traits</h3>
                                        {Object.entries(persona.personality).map(([key, value]) => {
                                            const formattedKey = key
                                                .replace(/([A-Z])/g, ' $1')
                                                .replace(/^./, (str) => str.toUpperCase());
                                            
                                            // Extract trait pairs (e.g., "introvertExtrovert" → "Introvert - Extrovert")
                                            const traitPair = formattedKey.split(/(?=[A-Z])/).join(' - ');
                                            
                                            return (
                                                <ProgressBar
                                                    key={key}
                                                    label={traitPair}
                                                    value={value}
                                                    maxValue={10}
                                                    color="blue"
                                                />
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Preferred Channels with Progress Bars */}
                                {persona.preferredChannels && (
                                    <div className="bg-gray-900 p-4 rounded-lg shadow border border-gray-700">
                                        <h3 className="font-bold text-lg mb-3 text-white">Preferred Channels</h3>
                                        {Object.entries(persona.preferredChannels).map(([key, value]) => {
                                            const formattedKey = key
                                                .replace(/([A-Z])/g, ' $1')
                                                .replace(/^./, (str) => str.toUpperCase());
                                            
                                            return (
                                                <ProgressBar
                                                    key={key}
                                                    label={formattedKey}
                                                    value={value}
                                                    maxValue={10}
                                                    color="green"
                                                />
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Motivations with Progress Bars */}
                                {persona.motivations && (
                                    <div className="bg-gray-900 p-4 rounded-lg shadow border border-gray-700">
                                        <h3 className="font-bold text-lg mb-3 text-white">Motivations</h3>
                                        {Object.entries(persona.motivations).map(([key, value]) => {
                                            const formattedKey = key
                                                .replace(/([A-Z])/g, ' $1')
                                                .replace(/^./, (str) => str.toUpperCase());
                                            
                                            return (
                                                <ProgressBar
                                                    key={key}
                                                    label={formattedKey}
                                                    value={value}
                                                    maxValue={10}
                                                    color="purple"
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Empathy Map */}
                            {persona.empathyMap && (
                                <div className="bg-gray-900 p-4 rounded-lg shadow mb-4 border border-gray-700">
                                    <h3 className="font-bold text-lg mb-3 text-white">Empathy Map</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(persona.empathyMap).map(([key, value]) => {
                                            const formattedKey = key
                                                .replace(/([A-Z])/g, ' $1')
                                                .replace(/^./, (str) => str.toUpperCase());
                                            
                                            return (
                                                <div key={key} className="bg-gray-800 p-3 rounded border border-gray-700">
                                                    <h4 className="font-medium text-sm text-gray-400 mb-1">{formattedKey}</h4>
                                                    <p className="text-gray-300">{value}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        
                            {/* Goals and Frustrations */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {/* Goals */}
                                {persona.goals && persona.goals.length > 0 && (
                                    <div className="bg-gray-900 p-4 rounded-lg shadow border border-gray-700">
                                        <h3 className="font-bold text-lg mb-3 text-white">Goals</h3>
                                        <ul className="list-disc pl-5 space-y-2 text-gray-300">
                                            {persona.goals.map((goal, index) => (
                                                <li key={index}>{goal}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                
                                {/* Frustrations */}
                                {persona.frustrations && persona.frustrations.length > 0 && (
                                    <div className="bg-gray-900 p-4 rounded-lg shadow border border-gray-700">
                                        <h3 className="font-bold text-lg mb-3 text-white">Frustrations</h3>
                                        <ul className="list-disc pl-5 space-y-2 text-gray-300">
                                            {persona.frustrations.map((frustration, index) => (
                                                <li key={index}>{frustration}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Quote */}
                            {persona.quote && (
                                <div className="bg-gray-900 p-4 rounded-lg shadow mb-4 border border-gray-700">
                                    <h3 className="font-bold text-lg mb-2 text-white">Quote</h3>
                                    <blockquote className="text-xl italic text-gray-300 border-l-4 border-blue-500 pl-4 py-2">
                                        {persona.quote}
                                    </blockquote>
                                </div>
                            )}
                        
                            {/* Day in Life */}
                            {persona.dayInLife && persona.dayInLife.length > 0 && (
                                <div className="bg-gray-900 p-4 rounded-lg shadow mb-4 border border-gray-700">
                                    <h3 className="font-bold text-lg mb-3 text-white">A Day in Life</h3>
                                    <div className="space-y-3">
                                        {persona.dayInLife.map((item, index) => (
                                            <div key={index} className="flex items-start">
                                                <div className="flex-shrink-0 mr-2">
                                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                                                </div>
                                                <p className="text-gray-300">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Footer with Select button */}
                <div className="flex justify-end p-4 border-t border-gray-700">
                    <button 
                        onClick={() => onSelect(persona)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-colors"
                    >
                        Select
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonaModal;