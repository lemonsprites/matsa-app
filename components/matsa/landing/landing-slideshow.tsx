"use client"

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

const slides = [
  {
    id: 1,
    imageUrl: 'https://yvlcbqoabvoapczvckny.supabase.co/storage/v1/object/public/public-data/general/1740108096013-IMG_5798.JPG',
    headline: 'Welcome to Our Madrasah',
    subtitle: 'A Place of Excellence and Faith',
  },
  {
    id: 2,
    imageUrl: 'https://yvlcbqoabvoapczvckny.supabase.co/storage/v1/object/public/public-data/general/1740108091200-IMG_2426.JPG',
    headline: 'Explore Our Programs',
    subtitle: 'Engaging and Inclusive Learning Experiences',
  },
  {
    id: 3,
    imageUrl: 'https://yvlcbqoabvoapczvckny.supabase.co/storage/v1/object/public/public-data/general/1740108083712-IMG_8072.JPG',
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
