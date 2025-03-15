"use client"

import { createClient } from "@/lib/helper/supabase-client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
    pegawaiData: number | null;
};

const StatistikLembaga = () => {

    const [pegawaiData, setPegawaiData] = useState<number | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchPegawaiData = async () => {
            const { count, error } = await supabase
                .from("tb_pegawai")
                .select("*", { count: "exact" });

            if (error) {
                console.error("Error fetching pegawai data:", error);
            } else {
                setPegawaiData(count || 0);
            }
        };

        fetchPegawaiData();
    }, []);
    return (
        <section className="text-gray-600 body-font bg-gradient-to-bl from-cyan-500 via-teal-500 to-cyan-600">
            <div className="py-16 px-6 mx-auto flex flex-wrap matsa-wrapper">
                {/* Animated Image */}
                <motion.div
                    className="lg:w-1/2 sm:w-2/3 w-full rounded-lg shadow-md relative overflow-hidden mb-8 lg:mb-0"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <img
                        className="object-cover object-center w-full h-full"
                        src="https://yvlcbqoabvoapczvckny.supabase.co/storage/v1/object/public/public-data/gallery/1740045123877-IMG_1551.JPG"
                        alt="stats"
                    />
                </motion.div>

                {/* Animated Stats */}
                <motion.div
                    className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start lg:pl-14"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="w-full sm:p-4 px-4 mb-6">
                        <h1 className="title-font font-medium text-xl mb-2 text-gray-900 text-center sm:text-left">
                            Kinerja & Perkembangan
                        </h1>
                        <div className="leading-relaxed text-center sm:text-left">
                            Lacak statistik kunci organisasi kami, termasuk jumlah pegawai, siswa, prestasi, dan status akreditasi. Wawasan ini membantu kami mengukur dan meningkatkan kinerja kami dari waktu ke waktu.
                        </div>
                    </div>

                    {/* Individual Stat Items */}
                    <div className="flex flex-wrap justify-center sm:justify-start w-full">
                        {[
                            { label: "Pegawai", value: pegawaiData },
                            { label: "Siswa", value: "1.8K" },
                            { label: "Prestasi", value: "35" },
                            { label: "Akreditasi", value: "A" },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="p-4 sm:w-1/2 lg:w-1/4 w-1/2"
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2 * index, // Staggered animation
                                    ease: "easeOut",
                                }}
                                viewport={{ once: true }}
                            >
                                <h2 className="title-font font-medium text-3xl text-gray-900 text-center sm:text-left">
                                    {stat.value}
                                </h2>
                                <p className="leading-relaxed text-center sm:text-left">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StatistikLembaga;
