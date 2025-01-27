import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

const slides = [
  {
    id: 1,
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczMstkmP_-a7F1Em1c0CFrMV4wZcOBXLpypN1r8PKrmwojvnDLPOnzJz5xhjtUf2eMy2lPwyJsZ99jKoEsiQL2d5r5_V7AUs56nshRcZaHdDUArcvpNtwRL3Fsz7ABL7gslJIB0cmKwCFiwN3wmeLwqGgw=w1304-h869-s-no-gm?authuser=0',
    headline: 'Welcome to Our Madrasah',
    subtitle: 'A Place of Excellence and Faith',
  },
  {
    id: 2,
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczOuww3B5i5SXtYCx6iEVygCQLowMKl5VK8fdIGQmqrUHNDb3mevWiyWmzr0O3vatHxRTokny0ImZKoNh4d87BLz0bHb5LGxR12ATBKuZITkHkbVQef_g_IE4UFJBUdUkP2g_a8MbEFvbVu-mEbzEqmlZA=w1304-h869-s-no-gm?authuser=0',
    headline: 'Explore Our Programs',
    subtitle: 'Engaging and Inclusive Learning Experiences',
  },
  {
    id: 3,
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczNJC01Ik59M-GXd8qya1xEeE5Mx5xyojKYtVnDI4W_b8gyS9z2jZmoYyIAlc4st4EMK2sry8PAkDX1EdUIy7-rlXkD395uHGXK-WmcNZ_KAdpIJ4u0fSrl6LhyJYPNQfhIRXmqtxQHanKj5YdK7PFIy=w1304-h869-s-no-gm?authuser=0',
    headline: 'Join Our Community',
    subtitle: 'Together in Learning and Growth',
  },
];

const Slideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 10000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative w-full h-[540px] overflow-hidden">
      {/* Slide image */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            backgroundImage: `url(${slide.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay content */}
          <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50 text-white px-4">
            <h1 className="text-4xl font-bold mb-2 text-center">{slide.headline}</h1>
            <p className="text-lg mb-4">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <Button
          onClick={prevSlide}
          className="px-4 py-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all shadow-md hover:shadow-lg"
        >
          <AiFillCaretLeft />
        </Button>
        <Button
          onClick={nextSlide}
          className="px-4 py-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all shadow-md hover:shadow-lg"
        >
          <AiFillCaretRight />
        </Button>
      </div>
    </div>
  );
};

export default Slideshow;
