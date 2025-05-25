"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

const dummyBudgetData = [
  { kategori: "Operasional", anggaran: 50000000, realisasi: 40000000 },
  { kategori: "Pemeliharaan", anggaran: 20000000, realisasi: 18000000 },
  { kategori: "Pengadaan", anggaran: 30000000, realisasi: 25000000 },
  { kategori: "Kegiatan Akademik", anggaran: 40000000, realisasi: 35000000 },
];

const calculateIKPA = (data: typeof dummyBudgetData) => {
  const totalAnggaran = data.reduce((sum, item) => sum + item.anggaran, 0);
  const totalRealisasi = data.reduce((sum, item) => sum + item.realisasi, 0);
  return (totalRealisasi / totalAnggaran) * 100;
};

const calculateNKA = (data: typeof dummyBudgetData) => {
  return data.map((item) => {
    return {
      kategori: item.kategori,
      nka: (item.realisasi / item.anggaran) * 100,
    };
  });
};

export default function KinerjaAnggaran() {
  const [budgetData] = useState(dummyBudgetData);
  const ikpa = calculateIKPA(budgetData);
  const nkaData = calculateNKA(budgetData);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Kinerja Anggaran Madrasah</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Indikator Kinerja Pelaksanaan Anggaran (IKPA)</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={ikpa} className="h-4" />
          <p className="text-lg font-semibold mt-2">{ikpa.toFixed(2)}%</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Nilai Kinerja Anggaran (NKA) per Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kategori</TableHead>
                <TableHead>NKA (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nkaData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.kategori}</TableCell>
                  <TableCell>{item.nka.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
