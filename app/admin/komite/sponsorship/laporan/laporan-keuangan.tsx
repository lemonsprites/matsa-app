"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function LaporanKeuangan() {
  const [tab, setTab] = useState("neraca");

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Laporan Keuangan</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="flex flex-wrap gap-2">
              <TabsTrigger value="neraca">Neraca</TabsTrigger>
              <TabsTrigger value="arus-kas">Arus Kas</TabsTrigger>
              <TabsTrigger value="laba-rugi">Laba Rugi</TabsTrigger>
              <TabsTrigger value="buku-besar">Buku Besar</TabsTrigger>
              <TabsTrigger value="trial-balance">Neraca Percobaan</TabsTrigger>
              <TabsTrigger value="jurnal-umum">Jurnal Umum</TabsTrigger>
            </TabsList>
            
            <TabsContent value="neraca">
              <div className="p-4">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Kode Akun</th>
                      <th className="border border-gray-300 p-2">Nama Akun</th>
                      <th className="border border-gray-300 p-2">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">1101</td>
                      <td className="border border-gray-300 p-2">Kas</td>
                      <td className="border border-gray-300 p-2">Rp 10.000.000</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">2101</td>
                      <td className="border border-gray-300 p-2">Utang Operasional</td>
                      <td className="border border-gray-300 p-2">Rp 3.000.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="arus-kas">
              <div className="p-4">
                <ul>
                  <li>Penerimaan Kas: Rp 15.000.000</li>
                  <li>Pengeluaran Kas: Rp 5.000.000</li>
                  <li>Saldo Akhir: Rp 10.000.000</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="laba-rugi">
              <div className="p-4">
                <ul>
                  <li>Pendapatan: Rp 20.000.000</li>
                  <li>Beban Operasional: Rp 10.000.000</li>
                  <li>Laba Bersih: Rp 10.000.000</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="buku-besar">
              <div className="p-4">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Tanggal</th>
                      <th className="border border-gray-300 p-2">Keterangan</th>
                      <th className="border border-gray-300 p-2">Debit</th>
                      <th className="border border-gray-300 p-2">Kredit</th>
                      <th className="border border-gray-300 p-2">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">01-02-2025</td>
                      <td className="border border-gray-300 p-2">Setoran Kas</td>
                      <td className="border border-gray-300 p-2">Rp 5.000.000</td>
                      <td className="border border-gray-300 p-2">-</td>
                      <td className="border border-gray-300 p-2">Rp 5.000.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="trial-balance">
              <div className="p-4">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Kode Akun</th>
                      <th className="border border-gray-300 p-2">Nama Akun</th>
                      <th className="border border-gray-300 p-2">Debit</th>
                      <th className="border border-gray-300 p-2">Kredit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">1101</td>
                      <td className="border border-gray-300 p-2">Kas</td>
                      <td className="border border-gray-300 p-2">Rp 10.000.000</td>
                      <td className="border border-gray-300 p-2">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="jurnal-umum">
              <div className="p-4">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Tanggal</th>
                      <th className="border border-gray-300 p-2">Kode Akun</th>
                      <th className="border border-gray-300 p-2">Nama Akun</th>
                      <th className="border border-gray-300 p-2">Debit</th>
                      <th className="border border-gray-300 p-2">Kredit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">01-02-2025</td>
                      <td className="border border-gray-300 p-2">1101</td>
                      <td className="border border-gray-300 p-2">Kas</td>
                      <td className="border border-gray-300 p-2">Rp 5.000.000</td>
                      <td className="border border-gray-300 p-2">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
