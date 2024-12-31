import React, { useState } from "react";
import { motion } from "framer-motion";
import LandingScreen from "./components/LandingScreen/LandingScreen";
import Carousel from "./components/Carousel/Carousel";

const App = () => {
  const [phase, setPhase] = useState("landing");
  const [showCarouselContent, setShowCarouselContent] = useState(false); // Für Inhalte

  const handleLandingComplete = () => {
    setPhase("carousel");
    setTimeout(() => setShowCarouselContent(true), 1000); // Inhalte nach 1 Sekunde
  };

  return (
    <div>
      {phase === "landing" && <LandingScreen onComplete={handleLandingComplete} />}

      {phase === "carousel" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }} // Hintergrund direkt einblenden
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            backgroundColor: "#131211", // Hintergrund des Carousels
            overflow: "hidden",
          }}
        >
          {showCarouselContent && ( // Inhalte erst später einblenden
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }} // Leichte Verzögerung und Animation
            >
              <Carousel />
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default App;
