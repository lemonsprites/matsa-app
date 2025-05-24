
"use client"
import { useState, useEffect } from 'react';

const testimonials = [
    {
        name: "Aisyah",
        role: "Student",
        avatar: "/avatars/aisyah.jpg",
        quote: "Madrasah has given me a strong foundation and confidence to pursue my dreams."
    },
    {
        name: "Pak Budi",
        role: "Teacher",
        avatar: "/avatars/budi.jpg",
        quote: "Our school fosters creativity and character building like no other."
    },
    {
        name: "Siti",
        role: "Student",
        avatar: "/avatars/siti.jpg",
        quote: "The supportive environment makes learning fun and meaningful."
    },
];

const TestimoniRotor = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000); // rotates every 5 seconds
        return () => clearInterval(timer);
    }, []);

    const { name, role, avatar, quote } = testimonials[index];

    return (
        <div className="w-full max-w-md h-80 p-6 bg-green-600 rounded-xl shadow-lg text-white flex flex-col justify-between overflow-hidden">
            {/* Top Section: Avatar + Quote */}
            <div className="flex flex-col items-center space-y-4">
                <img
                    src={avatar}
                    alt={`${name}'s avatar`}
                    className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md"
                />
                <blockquote className="italic text-center text-lg text-wrap">
                    “{quote}”
                </blockquote>
            </div>

            {/* Bottom Section: Name & Role pinned to bottom */}
            <div className="text-center pt-4">
                <p className="font-semibold">{name}</p>
                <p className="text-sm opacity-80">{role}</p>
            </div>
        </div>


    );
};

export default TestimoniRotor;
