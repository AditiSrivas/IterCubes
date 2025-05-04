import React from 'react'
import PersonaGrid from '../persona/PersonaGrid'
import { empathizeTopInfo } from '../../constants/cube_info'

const EmpathizeTop = ({ onSelectPersona }) => {
    const handleSelectPersona = (persona) => {
        if (onSelectPersona) {
            onSelectPersona(persona);
        }
    };

    return (
        <div className='text-white'>
            <div className='mb-6'>
                <h2 className='text-2xl font-bold mb-2'>Empathize - User Personas</h2>
                <p className='text-gray-300'>
                    Select a persona to view detailed information. Hover over a persona to see the animation.
                </p>
            </div>

            <div className='flex justify-center'>
                <div className='w-full max-w-6xl'>
                    <PersonaGrid 
                        personas = {empathizeTopInfo} 
                        onSelectPersona={handleSelectPersona}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmpathizeTop;