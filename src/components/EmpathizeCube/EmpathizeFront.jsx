import React from 'react';
import SelectedPersonaDetails from '../persona/SelectedPersonaDetails';

const EmpathizeFront = ({ selectedPersona }) => {
    const personaId = selectedPersona?.id;
    
    return (
        <div className="p-6">
            {selectedPersona ? (
                <SelectedPersonaDetails
                    persona={selectedPersona}
                    key={personaId}
                />
            ) : (
                <div className="text-center py-20 text-gray-400">
                    <p>No persona selected. Please select a persona from the top side of the cube.</p>
                </div>
            )}
        </div>
    );
};

export default EmpathizeFront;