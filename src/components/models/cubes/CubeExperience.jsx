import FloatingCube from "./FloatingCube";

const CubeExperience = ({ cubeData, setSelectedCube, selectedCube }) => {
    return (
      <div className="flex flex-wrap justify-center gap-6">
        {cubeData.map((cube) => (
          <FloatingCube
            key={cube.id}
            textures={cube.textures}
            onClick={() => setSelectedCube(cube.title)}
            isSelected={selectedCube === cube.title}
          />
        ))}
      </div>
    );
  };
  
export default CubeExperience;  