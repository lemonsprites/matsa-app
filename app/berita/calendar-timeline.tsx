"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

// Dummy data untuk satu semester
const semesterEvents = [
    { start: "2025-02-10", end: "2025-02-14", title: "Ujian Tengah Semester" },
    { start: "2025-02-27", end: "2025-03-07", title: "Libur Semester" },
    { start: "2025-03-10", end: "2025-03-12", title: "Workshop Guru" },
    { start: "2025-03-25", end: "2025-03-25", title: "Rapat Orang Tua Siswa" },
    { start: "2025-04-05", end: "2025-04-05", title: "Peringatan Isra' Mi'raj" },
    { start: "2025-04-15", end: "2025-04-20", title: "Ujian Akhir Semester" },
    { start: "2025-05-01", end: "2025-05-01", title: "Hari Buruh Nasional" },
    { start: "2025-05-20", end: "2025-05-20", title: "Hari Kebangkitan Nasional" },
    { start: "2025-06-01", end: "2025-06-01", title: "Hari Lahir Pancasila" },
    { start: "2025-06-10", end: "2025-06-15", title: "Penerimaan Raport" },
    { start: "2025-06-20", end: "2025-07-10", title: "Libur Akhir Semester" }
];

// Mengubah range tanggal ke array tanggal spesifik
const getEventDays = () => {
    return semesterEvents.flatMap(event => {
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        const days = [];

        while (startDate <= endDate) {
            days.push(new Date(startDate));
            startDate.setDate(startDate.getDate() + 1);
        }
        return days;
    });
};

const CalendarTimeline = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [eventDays, setEventDays] = useState<Date[]>(getEventDays());
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

    useEffect(() => {
        if (date) {
            const foundEvent = semesterEvents.find(event => {
                const selectedDate = new Date(date);
                selectedDate.setHours(0, 0, 0, 0);

                const startDate = new Date(event.start);
                startDate.setHours(0, 0, 0, 0);

                const endDate = new Date(event.end);
                endDate.setHours(0, 0, 0, 0);

                return selectedDate >= startDate && selectedDate <= endDate;
            });

            setSelectedEvent(foundEvent ? foundEvent.title : null);
        }
    }, [date]);

    return (
        <div className="matsa-wrapper px-6">
            <h1 className="text-3xl font-bold mb-4">Pengumuman</h1>

            <div className="grid grid-cols-1 md:grid-cols-[auto_400px_min-content] gap-6">
                <div className="bg-gray-200 w-full">
                    asdasd
                </div>
                {/* Timeline */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Timeline Pengumuman</h2>
                    <div className="relative border-l-2 border-gray-300 pl-4">
                        {semesterEvents.map((announcement, index) => (
                            <div key={index} className="mb-6 relative">
                                <div className="absolute -left-[10px] top-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{announcement.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-500">
                                            {announcement.start} - {announcement.end}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Kalender dengan penanda event */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-semibold">Kalender Jadwal</h2>
                        <Calendar
                            showOutsideDays={true}
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            modifiers={{ event: eventDays }}
                            modifiersClassNames={{ event: "bg-yellow-300/85 text-white rounded-sm" }}
                            className="rounded-md border w-full"
                            style={{ width: "100%", minWidth: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                        />

                    {/* Tampilkan event yang dipilih */}
                    {selectedEvent && (
                        <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-md">
                            📅 <strong>{selectedEvent}</strong>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarTimeline;
