"use client";

import React, { useRef, useState } from "react";

const timelineEvents = [
  {
    year: "2010",
    title: "Pendirian MTSN 1 Ciamis",
    description:
      "MTSN 1 Ciamis didirikan untuk memenuhi kebutuhan pendidikan menengah di daerah.",
  },
  {
    year: "2015",
    title: "Penerapan Program Tahfidz",
    description:
      "Dimulainya program penghafalan Al-Qur’an sebagai bagian dari kurikulum unggulan.",
  },
  {
    year: "2018",
    title: "Pengakuan Adiwiyata",
    description:
      "MTSN 1 Ciamis menerima penghargaan sebagai sekolah peduli lingkungan.",
  },
  {
    year: "2021",
    title: "Peluncuran Bank Sampah",
    description:
      "Program inovatif pengelolaan sampah untuk meningkatkan kesadaran lingkungan.",
  },
  {
    year: "2024",
    title: "Ekspansi Fasilitas Sekolah",
    description:
      "Penambahan ruang kelas dan laboratorium modern untuk mendukung pembelajaran.",
  },
];

const collageStyles = [
  "w-72 h-64 translate-y-0 rotate-1",
  "w-80 h-56 -translate-y-6 -rotate-2",
  "w-72 h-60 translate-y-4 rotate-0",
  "w-64 h-56 -translate-y-2 rotate-3",
  "w-80 h-64 translate-y-2 -rotate-1",
];

export default function CollageTimeline() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const slider = sliderRef.current;
    if (!slider) return;
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const slider = sliderRef.current;
    if (!slider) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    slider.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="max-w-full py-5 select-none ">
      <h2 className="text-4xl font-extrabold text-center text-green-800 mb-12">
        Roadmap Journey MTSN 1 Ciamis
      </h2>
      <div
        ref={sliderRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className={`flex items-start gap-6 min-h-[380px] pt-10 px-5 overflow-x-auto overflow-y-hidden cursor-${isDragging ? "grabbing" : "grab"} scrollbar-thin scrollbar-thumb-yellow-500/40 scrollbar-track-yellow-200/20`}
        style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
      >
        {timelineEvents.map(({ year, title, description }, idx) => (
          <div
            key={idx}
            className={`snap-center flex-shrink-0 bg-white rounded-xl shadow-lg border h-fit pb-5 border-yellow-200 p-6 relative ${collageStyles[idx % collageStyles.length]}`}
            style={{ scrollSnapAlign: "center" }}
          >
            <div className="absolute top-4 right-4 text-yellow-400 font-bold text-lg opacity-30 pointer-events-none">
              {year}
            </div>
            <h3 className="font-semibold text-yellow-500 text-xl mb-3 mt-5">{title}</h3>
            <p className="text-gray-700">{description}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-gray-500 text-sm">
        Click and drag horizontally to explore
      </p>
    </section>
  );
}
