import { useState } from "react";
import CubeExperience from "../components/models/cubes/CubeExperience";
import { cubeData } from "../constants/index";
import TitleHeader from "../components/TitleHeader";

const CubeMenu = () => {
  const [selectedCube, setSelectedCube] = useState(null);

  const handleStart = () => {
    if (selectedCube) {
      const path = `/${selectedCube.toLowerCase()}`;
      window.location.href = path;
    }
  };

  return (
    <section
      id="cubes"
      className="w-full min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="w-full h-full md:px-10 px-5">
        <div className="mb-8">
          <TitleHeader 
            title="Choose Your Cube"
            sub="🎯 Start your learning journey"
          />
        </div>

        <div>
          {/* Cube grid */}
          <CubeExperience
            cubeData={cubeData}
            selectedCube={selectedCube}
            setSelectedCube={setSelectedCube}
          />

          {/* Start button */}
          <div className="w-full flex flex-center">
            <button
              onClick={handleStart}
              className="mt-10 bg-white text-black px-8 py-3 rounded-xl text-lg font-semibold hover:bg-gray-300 transition-all"
              disabled={!selectedCube}
            >
              {selectedCube ? `Start ${selectedCube}` : "Select a Cube to Start"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CubeMenu;

{/**
<div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="What People Say About Me?"
          sub="⭐️ Customer feedback highlights"
        />


   */}