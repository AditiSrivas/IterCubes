import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import CubeMenu from "./sections/CubeMenu";
import EmpathizeCube from "./cubes/EmpathizeCube";
import DefineCube from "./cubes/DefineCube";
import IdeateCube from "./cubes/IdeateCube";
import PrototypeCube from "./cubes/PrototypeCube";
import TestCube from "./cubes/TestCube";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        {/* Main route with all home sections */}
        <Route path="/" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <Hero />
            <CubeMenu />
            {/* <ShowcaseSection />
            <Experience />
            <FeatureCards />
            <LogoShowcase />
            <TechStack />
            <Testimonials /> */}
            <Contact />
            <Footer />
          </div>
        } />
        
        {/* Individual cube routes */}
        <Route path="/empathize" element={<EmpathizeCube />} />
        <Route path="/define" element={<DefineCube />} />
        <Route path="/ideate" element={<IdeateCube />} />
        <Route path="/prototype" element={<PrototypeCube />} />
        <Route path="/test" element={<TestCube />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
