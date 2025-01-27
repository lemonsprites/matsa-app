import { Switch } from '@/components/ui/switch';
import supabase from '@/lib/supabase-client';
import React, { useEffect, useState } from 'react'

const AdminSettingGeneral = () => {
    const [siteName, setSiteName] = useState("Nama Situs Anda");
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
    const [, setLoading] = useState(true);


    useEffect(() => {
        const fetchMaintenanceStatus = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('web_config')
                .select('web_mode')
                .eq('id', 1) // Adjust ID or condition as needed
                .single();

            if (error) {
                console.error('Error fetching maintenance status:', error);
            } else {
                setIsMaintenanceMode(Boolean(data?.web_mode));
            }
            setLoading(false);
        };

        fetchMaintenanceStatus();
    }, []);

    const handleSiteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSiteName(e.target.value);
    };

    const toggleMaintenanceMode = () => {
        setIsMaintenanceMode(!isMaintenanceMode);
    };

    const [, setErrorMessage] = useState("");

    const saveSettings = async () => {
        try {
            setLoading(true);
            setErrorMessage(""); // Reset error message
            const { error } = await supabase
                .from('web_config')
                .update({ web_mode: Number(isMaintenanceMode) })
                .eq('id', 1);

            if (error) {
                throw new Error("Gagal menyimpan pengaturan: " + error.message);
            }

            alert("Pengaturan berhasil disimpan!");
        } catch (err:any) {
            console.error(err);
            setErrorMessage(err.message || "Terjadi kesalahan.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Pengaturan Situs</h1>
                <div className="mb-4">
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                        Nama Situs
                    </label>
                    <input
                        id="siteName"
                        type="text"
                        value={siteName}
                        onChange={handleSiteNameChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan nama situs"
                    />
                </div>
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-gray-700">Mode Pemeliharaan</span>
                    <Switch
                        checked={isMaintenanceMode}
                        onCheckedChange={toggleMaintenanceMode}
                        className="bg-gray-300 border-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={saveSettings}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                    Simpan Pengaturan
                </button>
            </div>
        </div>
    );
}

export default AdminSettingGeneral