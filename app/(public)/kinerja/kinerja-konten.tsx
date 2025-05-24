"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const kpiData = [
  { name: "Akademik", value: 87 },
  { name: "Non-Akademik", value: 75 },
  { name: "Kehadiran", value: 92 },
  { name: "Disiplin", value: 89 },
  { name: "Kinerja Guru", value: 80 },
];

const KPIMadrasah = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="matsa-wrapper px-6">
      <h1 className="text-3xl font-bold mb-4">📈 KPI Madrasah</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {kpiData.map((item) => (
          <Card key={item.name} className="cursor-pointer" onClick={() => setSelected(item.name)}>
            <CardHeader className="pb-0">
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-600">{item.value}%</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Grafik KPI */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">📊 Grafik Tren KPI</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={kpiData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detail KPI */}
      {selected && (
        <div className="mt-6 p-4 border rounded-md bg-gray-100">
          <h3 className="text-lg font-semibold">🔍 Detail: {selected}</h3>
          <p className="text-gray-700">Informasi lebih lanjut mengenai {selected} akan ditampilkan di sini.</p>
        </div>
      )}
    </div>
  );
};

export default KPIMadrasah;
