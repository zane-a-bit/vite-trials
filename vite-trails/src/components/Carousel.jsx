import { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  },);

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="carousel-content">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel; 