import React, { useState } from 'react'
import PersonaCard from './PersonaCard';
import PersonaModal from './PersonaModal';

const PersonaGrid = ({ personas, onSelectPersona }) => {
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    
    const handleShowDetails = (persona) => {
        setSelectedPersona(persona);
        setModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    
    const handleSelectPersona = (persona) => {
        if (onSelectPersona) {
            onSelectPersona(persona);
        }
        setModalOpen(false);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {personas && personas.length > 0 ? (
                    personas.map((persona) => (
                        <PersonaCard 
                            key={persona.id}
                            persona={persona}
                            onShowDetails={handleShowDetails}
                        />
                    ))
                ) : (
                    <div className='col-span-full text-center py-8 text-gray-500'>
                        No personas available
                    </div>
                )}
            </div>
            
            {/* Modal for persona details */}
            <PersonaModal 
                persona={selectedPersona}
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onSelect={handleSelectPersona}
            />
        </>
    );
};

export default PersonaGrid;