import { useState, useEffect } from "react";
import supabase from "@/lib/supabase-client";
import PegawaiModalJadwalAdd from "@/components/layouts/block/pegawai-modal-jadwal-add";

const PegawaiJadwalPreview = () => {
    const [jadwal, setJadwal] = useState<any[]>([]); // Schedule data state
    const [teachers, setTeachers] = useState<any[]>([]); // Teachers data state
    const [classes, setClasses] = useState<any[]>([]); // Classes data state
    const [generatedSchedules, setGeneratedSchedules] = useState<any[]>([]); // Generated schedules state
    const [showModal, setShowModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false); // To control saving state

    // Constraints for daily teacher teaching hours
    const min_teacher_jtm_per_day = 2; // Example min
    const max_teacher_jtm_per_day = 4; // Example max

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // Fetch teachers, classes, and jadwal data
        const { data: teacherData, error: teacherError } = await supabase
            .from("tb_pegawai")
            .select("*");

        if (teacherError) {
            console.error("Error fetching teachers:", teacherError);
        } else {
            setTeachers(teacherData);
        }

        const { data: classData, error: classError } = await supabase
            .from("tb_kelas")
            .select("*");

        if (classError) {
            console.error("Error fetching classes:", classError);
        } else {
            setClasses(classData);
        }

        const { data: jadwalData, error: jadwalError } = await supabase
            .from("tb_jadwal")
            .select("*");

        if (jadwalError) {
            console.error("Error fetching jadwal:", jadwalError);
        } else {
            setJadwal(jadwalData);
        }
    };

    const findAvailableJtmForTeacher = (teacher: any, day: string) => {
        const teacherSchedule = jadwal.filter(
            (entry) => entry.id_pegawai === teacher.id
        );

        const totalJtmForWeek = teacherSchedule.reduce((acc, curr) => acc + curr.jtm, 0);
        const availableJtm = Math.max(0, 24 - totalJtmForWeek);

        const teacherDailySchedule = teacherSchedule.filter((entry) => entry.hari === day);
        const totalJtmForDay = teacherDailySchedule.reduce((acc, curr) => acc + curr.jtm, 0);

        return { availableJtm, totalJtmForDay };
    };

    const generateSchedules = () => {
        const schedules: any[] = [];
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

        daysOfWeek.forEach((day) => {
            classes.forEach((classItem) => {
                let assignedTeacher = null;

                for (let i = 0; i < teachers.length; i++) {
                    const teacher = teachers[i];
                    const { availableJtm, totalJtmForDay } = findAvailableJtmForTeacher(teacher, day);

                    if (
                        availableJtm >= classItem.jtm &&
                        totalJtmForDay + classItem.jtm <= max_teacher_jtm_per_day &&
                        totalJtmForDay + classItem.jtm >= min_teacher_jtm_per_day
                    ) {
                        schedules.push({
                            id_pegawai: teacher.id,
                            id_kelas: classItem.id,
                            id_mapel: classItem.id_mapel,
                            hari: day,
                            jtm: classItem.jtm,
                        });

                        break;
                    }
                }

                if (!assignedTeacher) {
                    console.log(`No available teacher for class ${classItem.id} on ${day}`);
                }
            });
        });

        setGeneratedSchedules(schedules); // Store generated schedules in state
    };

    const handleSaveSchedules = async () => {
        setIsSaving(true);
        try {
            // Save schedules to the database
            const { error } = await supabase
                .from("tb_jadwal")
                .upsert(generatedSchedules);

            if (error) {
                console.error("Error saving schedules:", error);
            } else {
                alert("Schedules saved successfully!");
            }
        } catch (error) {
            console.error("Error saving schedules:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSlotClick = (day: string, slot: string, slotData: any) => {
        setSelectedSlot(slotData);
        setShowModal(true);
    };

    const handleSaveSlot = (formData: any) => {
        console.log("Saving schedule", formData);
        setShowModal(false);
    };

    return (
        <div>
            {/* Button to generate schedules */}
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                onClick={generateSchedules}
            >
                Generate Schedules for All Teachers
            </button>

            {/* Preview of generated schedules */}
            {generatedSchedules.length > 0 && (
                <div>
                    <div className="grid grid-cols-5 gap-4">
                        {generatedSchedules.map((schedule) => (
                            <div
                                key={`${schedule.id_pegawai}-${schedule.id_kelas}-${schedule.hari}`}
                                className="border p-2 flex items-center justify-center cursor-pointer"
                                onClick={() => handleSlotClick(schedule.hari, schedule.jtm, schedule)}
                            >
                                <div className="text-sm text-center">
                                    <div>
                                        Teacher:{" "}
                                        {teachers.find((t) => t.id === schedule.id_pegawai)?.nama}
                                    </div>
                                    <div>
                                        Class: {classes.find((c) => c.id === schedule.id_kelas)?.nama}
                                    </div>
                                    <div>Subject: {schedule.id_mapel}</div>
                                    <div>Time Slot: {schedule.jtm} JTM</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Save Button */}
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded mt-4"
                        onClick={handleSaveSchedules}
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Save to Database"}
                    </button>
                </div>
            )}

            {/* Modal for adding or editing schedules */}
            <PegawaiModalJadwalAdd
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSaveSlot}
                selectedSlot={selectedSlot}
            />
        </div>
    );
};

export default PegawaiJadwalPreview;
