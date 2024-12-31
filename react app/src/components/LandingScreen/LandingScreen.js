import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import landingPageImage from "../../assets/LandingPageImage.jpg";
import myVideo from "../../assets/Video.mp4";

const LandingScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0); // Schritte: Bild -> Text -> Verdunkelung -> "Are you ready?" -> Video
  const [playing, setPlaying] = useState(false); // Ob das Video abgespielt wird
  const [fadeOut, setFadeOut] = useState(false); // für das Verschwinden des Textes
  const videoRef = useRef(null); // Referenz für das Video

  const messages = ["Happy", "New", "Year", "Leopold!"];

  useEffect(() => {
    if (playing && videoRef.current) {
      videoRef.current.muted = false; // Entmute das Video nach Start
    }
  }, [playing]);

  const handlePlay = () => {
    setFadeOut(true); // Starte die Fade-out-Animation
    setTimeout(() => {
      setPlaying(true); // Nach der Animation Video starten
      if (videoRef.current) {
        videoRef.current.play(); // Starte das Video
      }
    }, 1000); // Warte 1 Sekunde für die Animation
  };

  const handleVideoEnd = () => {
    if (onComplete) {
      onComplete(); // Signal: Video vorbei ist
    }
  };

  return (
    <motion.div
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "#131211",
        overflow: "hidden",
        cursor: !playing && step === messages.length + 2
          ? 'url("data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 height=%2220%22 width=%2280%22><text x=%220%22 y=%2215%22 font-size=%2214%22 fill=%22white%22>YES!</text></svg>") 39 10, auto'
          : "default", // Zeige "Yes!" nur, wenn nicht abgespielt wird
      }}
      onClick={
        !playing && step === messages.length + 2 ? handlePlay : undefined
      } // Klick aktiviert das Video
    >
      {/* Bild fading out */}
      {step === 0 && (
        <motion.img
          src={landingPageImage}
          alt="Landing"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 3 }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onAnimationComplete={() => setStep(1)} // Weiter zur Textanimation
        />
      )}

      {/* Textanimation */}
      {step > 0 && step <= messages.length && (
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#ffffffdf", //weiss
            fontSize: "6rem",
            textAlign: "center",
          }}
          key={messages[step - 1]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => {
            if (step < messages.length) setStep(step + 1);
            else setStep(messages.length + 1); // Weiter zur Verdunkelung
          }}
        >
          {messages[step - 1]}
        </motion.div>
      )}

      {/* Verdunkelung */}
      {step === messages.length + 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#131211",
            zIndex: 2,
          }}
          onAnimationComplete={() => setStep(step + 1)} // Weiter zu "Are you ready?"
        />
      )}

      {/* "Are you ready?" */}
      {step === messages.length + 2 && !playing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }} // Verzögerung für den Text
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#ffffffdf",
            fontSize: "4rem",
            textAlign: "center",
            zIndex: 3,
          }}
        >
          Are you ready?
        </motion.div>
      )}

      {/* Video abspielen */}
      {step === messages.length + 2 && (
        <motion.video
          ref={videoRef}
          src={myVideo}
          autoPlay
          controls={false} // Keine Steuerung anzeigen
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: !playing ? "brightness(50%)" : "none", // Verdunkeltes Video, bis es abgespielt wird
            zIndex: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }} // Langsames Einblenden des Videos
          onEnded={handleVideoEnd} // Gehe zum Carousel nach dem Video
          />
          )}
        </motion.div>
      );
    };
    
    export default LandingScreen;