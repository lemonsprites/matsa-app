import { useState, useEffect } from "react";
import supabase from "@/lib/supabase-client";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Define types for the data structures
type Kelas = {
    id: number;
    nama_kelas: string;
    tingkat_kelas: string;
};

type Teacher = {
    id: number;
    nama: string;
};

type Assignments = {
    [tingkat: string]: number[]; // Teacher IDs assigned to a grade
};

const AssignTeacherToGrade = () => {
    const [grades, setGrades] = useState<string[]>([]); // List of grades
    const [kelasByGrade, setKelasByGrade] = useState<Record<string, Kelas[]>>({});
    const [teachers, setTeachers] = useState<Teacher[]>([]); // List of teachers
    const [assignments, setAssignments] = useState<Assignments>({}); // Assignments
    const [activeGrade, setActiveGrade] = useState<string>("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // Fetch the grades (tingkat_kelas) and classes
        const { data: kelasData, error: kelasError } = await supabase
            .from("tb_kelas")
            .select("id, nama_kelas, tingkat_kelas");

        if (kelasError) {
            console.error("Error fetching kelas data:", kelasError);
        } else {
            const groupedByTingkat = kelasData.reduce(
                (acc: Record<string, Kelas[]>, kelas: Kelas) => {
                    if (!acc[kelas.tingkat_kelas]) {
                        acc[kelas.tingkat_kelas] = [];
                    }
                    acc[kelas.tingkat_kelas].push(kelas);
                    return acc;
                },
                {}
            );
            setKelasByGrade(groupedByTingkat);
            setGrades(Object.keys(groupedByTingkat));
            setActiveGrade(Object.keys(groupedByTingkat)[0]);
        }

        // Fetch teacher data
        const { data: teacherData, error: teacherError } = await supabase
            .from("tb_pegawai")
            .select("id, nama");

        if (teacherError) {
            console.error("Error fetching teacher data:", teacherError);
        } else {
            setTeachers(teacherData || []);
        }
    };

    const handleTeacherAssignment = (tingkat: string, teacherId: number) => {
        setAssignments((prevAssignments) => {
            const updatedAssignments = { ...prevAssignments };

            if (!updatedAssignments[tingkat]) {
                updatedAssignments[tingkat] = [];
            }

            if (updatedAssignments[tingkat].includes(teacherId)) {
                // Remove teacher if already assigned
                updatedAssignments[tingkat] = updatedAssignments[tingkat].filter(
                    (id) => id !== teacherId
                );
            } else {
                // Add teacher to the grade
                updatedAssignments[tingkat].push(teacherId);
            }

            return updatedAssignments;
        });
    };

    const handleSaveAssignments = async () => {
        const assignmentsToSave: any[] = [];

        // Prepare the data to be saved
        for (const tingkat in assignments) {
            const teacherIds = assignments[tingkat];
            teacherIds.forEach((teacherId) => {
                assignmentsToSave.push({
                    tingkat_kelas: tingkat,
                    id_pegawai: teacherId,
                });
            });
        }

        try {
            const { error } = await supabase
                .from("tb_tingkat_pegawai") // Assuming this table exists
                .upsert(assignmentsToSave); // Insert or update assignments

            if (error) {
                console.error("Error saving assignments:", error);
            } else {
                alert("Teacher assignments saved successfully!");
            }
        } catch (error) {
            console.error("Error saving assignments:", error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Assign Teachers to Grades</h2>

            {/* Tabs for filtering by grade */}
            <Tabs value={activeGrade} onValueChange={setActiveGrade} className="mb-4">
                <TabsList>
                    {grades.map((grade) => (
                        <TabsTrigger key={grade} value={grade}>
                            {grade}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* TabsContent for each grade */}
                {grades.map((grade) => (
                    <TabsContent key={grade} value={grade}>
                        <div className="border p-4 rounded space-y-4">
                            <div className="font-bold text-lg mb-2">Assign Teachers to {grade}</div>

                            {/* Map over teachers */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {teachers.map((teacher) => (
                                    <div key={teacher.id} className="flex items-center">
                                        <Checkbox
                                            checked={assignments[grade]?.includes(teacher.id) || false}
                                            onCheckedChange={() => handleTeacherAssignment(grade, teacher.id)}
                                            className="mr-2"
                                        />
                                        <label>{teacher.nama}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            <div className="mt-4">
                <Button onClick={handleSaveAssignments}>Save Assignments</Button>
            </div>
        </div>
    );
};

export default AssignTeacherToGrade;
