"use client"

import { useState } from "react";
import { CalendarIcon } from "lucide-react";

const agenda = [
  { date: "2025-06-01", title: "Libur Kenaikan Kelas", category: "Holiday" },
  { date: "2025-06-10", title: "Ujian Akhir Semester", category: "Exam" },
  { date: "2025-06-20", title: "Rapat Kenaikan", category: "Meeting" },
  { date: "2025-06-25", title: "Pembagian Raport", category: "Academic" },
];

export default function AgendaSection() {
  return (
    <section className="px-6 py-16 bg-green-50">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
        Agenda Madrasah Berdasarkan Kalender Akademik
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {agenda.map((event, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 shadow-md border-l-4 ${
              event.category === "Holiday"
                ? "border-red-500 bg-red-50"
                : event.category === "Exam"
                ? "border-blue-500 bg-blue-50"
                : event.category === "Meeting"
                ? "border-yellow-500 bg-yellow-50"
                : "border-green-500 bg-green-50"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <CalendarIcon className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-gray-700">
                {new Date(event.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
            <p className="text-sm text-gray-600 italic">{event.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
