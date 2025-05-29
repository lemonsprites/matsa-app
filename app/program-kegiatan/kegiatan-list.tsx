"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const activities = [
  {
    title: "Basketball Team",
    description: `Join our competitive basketball team that participates in regional tournaments and promotes teamwork, fitness, and leadership.`,
    highlights: [
      "Professional coaching staff",
      "Weekly training sessions",
      "Annual inter-school championships",
    ],
    img: "/img/basketball.jpg",
    learnMoreUrl: "/activities/basketball",
  },
  {
    title: "Science Club",
    description: `Explore hands-on experiments, science fairs, and cutting-edge research projects guided by our dedicated science faculty.`,
    highlights: [
      "Monthly science fairs",
      "Lab access with modern equipment",
      "Guest lectures by scientists",
    ],
    img: "/img/science-club.jpg",
    learnMoreUrl: "/activities/science-club",
  },
  {
    title: "Art Workshop",
    description: `Develop creativity through painting, sculpture, and digital arts with experienced artists and a vibrant community.`,
    highlights: [
      "Workshops with local artists",
      "Exhibition opportunities",
      "Access to art supplies and studios",
    ],
    img: "/img/art-workshop.jpg",
    learnMoreUrl: "/activities/art-workshop",
  },
];

export default function FeaturedActivities() {
  const [index, setIndex] = useState(0);
  const activity = activities[index];

  function prev() {
    setIndex((index - 1 + activities.length) % activities.length);
  }
  function next() {
    setIndex((index + 1) % activities.length);
  }
  function goTo(i: number) {
    setIndex(i);
  }

  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-green-700">
        Featured Activities
      </h2>
      <Card className="relative overflow-hidden">
        {/* Image with caption overlay */}
        <div className="relative w-full md:h-96 h-64 rounded-t-lg overflow-hidden">
          <img
            src={activity.img}
            alt={activity.title}
            className="object-cover w-full h-full transition-transform duration-700 ease-in-out transform hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <h3 className="text-3xl font-semibold">{activity.title}</h3>
          </div>
        </div>

        {/* Content */}
        <CardContent className="px-8 py-6 md:flex md:gap-12">
          <div className="md:flex-1">
            <p className="mb-4 text-lg text-gray-700">{activity.description}</p>
            <ul className="list-disc list-inside text-green-700 space-y-2 mb-6">
              {activity.highlights.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <div className="flex gap-4">
              <Link
                href={activity.learnMoreUrl}
                target="_blank"
                className="px-6"
              >
                Learn More
              </Link>
              <Button variant="outline" className="px-6">
                Join Now
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Navigation buttons */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg"
        >
          ›
        </button>
      </Card>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 space-x-3">
        {activities.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to ${activities[i].title}`}
            className={`w-4 h-4 rounded-full ${
              i === index ? "bg-green-700" : "bg-green-300"
            } transition`}
          />
        ))}
      </div>
    </section>
  );
}
