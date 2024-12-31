import React, { useState } from "react";
import "./Carousel.css";

// Bilder importieren
import image1 from "../../assets/ColdandImagine.jpg";
import image2 from "../../assets/EdUndCold.jpg";
import image3 from "../../assets/HansZimmer.jpg";
import image4 from "../../assets/LinkinPark.jpg";
import image5 from "../../assets/Ludovico.jpg";
import image6 from "../../assets/MozartZuChopin.jpg";
import image7 from "../../assets/QueenAbba.jpg";
import image8 from "../../assets/QueenandEd.jpg";
import image9 from "../../assets/QueenBeatles.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(4);
  const [selectedItem, setSelectedItem] = useState(null); // Für das angeklickte Item
  const [showMessage, setShowMessage] = useState(false); // Für den finalen Text

  // Bilder und Titel
  const items = [
    { image: image1, title: "Coldplay & Imagine Dragons" },
    { image: image2, title: "Ed Sheeran & Coldplay" },
    { image: image3, title: "Hans Zimmer" },
    { image: image4, title: "Linkin Park Tribut" },
    { image: image5, title: "Ludovico Einaudi" },
    { image: image6, title: "Mazart bis Chopin" },
    { image: image7, title: "Queens & ABBA" },
    { image: image8, title: "Queens & Ed Sheeran" },
    { image: image9, title: "Queens & Beatles" },
  ];

  const handlePrev = () => {
    if (selectedItem !== null) return; // Deaktiviert Navigation, wenn ein Item ausgewählt ist
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    if (selectedItem !== null) return; // Deaktiviert Navigation, wenn ein Item ausgewählt ist
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleItemClick = (index) => {
    setSelectedItem(index); // Wähle das angeklickte Item aus
    setTimeout(() => {
      setShowMessage(true); // Zeigt den Text nach der Animation
    }, 2000); // Wartezeit für die Animation
  };

  if (showMessage) {
    return (
      <div className="carousel-message">
        okay leopold, jetzt kannst du dich auf termin vorschläge freuen <br /> 
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <h1 className="carousel-title">Choose your Vibes</h1>
      <p className="carousel-subtitle">... and I will organize the rest</p>

      <div className="carousel-wrapper">
        {items.map((item, index) => {
          if (selectedItem !== null && selectedItem !== index) {
            return null; // Blendet alle anderen Items aus, wenn eines ausgewählt ist
          }

          const offset = index - currentIndex;
          const isSelected = selectedItem === index;

          return (
            <div
              key={index}
              className="carousel-item"
              onClick={() => handleItemClick(index)} // Klick-Handler
              style={{
                transform: isSelected
                  ? "translateX(0) scale(1.2)" // Vergrößert das ausgewählte Item
                  : `translateX(${offset * 100}%) scale(${
                      Math.abs(offset) === 1 ? 0.8 : Math.abs(offset) > 1 ? 0.6 : 1
                    })`,
                opacity: isSelected ? 1 : Math.abs(offset) > 1 ? 0.5 : 1,
                transition: "transform 0.5s, opacity 0.5s",
              }}
            >
              <img src={item.image} alt={item.title} />
              <p className="carousel-item-title">{item.title}</p>
            </div>
          );
        })}
      </div>

      {selectedItem === null && ( // Navigation nur sichtbar, wenn kein Item ausgewählt ist
        <>
          <button className="carousel-button prev" onClick={handlePrev}>
            &#8592;
          </button>
          <button className="carousel-button next" onClick={handleNext}>
            &#8594;
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
