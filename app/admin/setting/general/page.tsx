'use client';

import AdminContent from '@/components/matsa/admin/admin-content';
import { useEffect, useState } from 'react';

export default function GeneralSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [siteTitle, setSiteTitle] = useState('');
    const [siteDescription, setSiteDescription] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchConfig() {
            const res = await fetch('/api/config', { cache: 'no-store' });
            const json = await res.json();
            const data = json?.data;

            setMaintenanceMode(data?.web_mode === 1);
            setSiteTitle(data?.site_title || '');
            setSiteDescription(data?.site_description || '');
            setLoading(false);
        }

        fetchConfig();
    }, []);

    const handleSave = async () => {
        setMessage('Saving...');
        const res = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                maintenanceMode,
                // siteTitle,
                // siteDescription,
            }),
        });

        const json = await res.json();
        setMessage(json.success ? 'Saved successfully!' : `Error: ${json.error}`);
    };


    return (
        <AdminContent title="General Settings">
            <div className="space-y-4">
                <div>
                    <label className="font-medium">Maintenance Mode</label>
                    <div>
                        <input
                            type="checkbox"
                            checked={maintenanceMode}
                            onChange={(e) => setMaintenanceMode(e.target.checked)}
                            className="mr-2"
                        />
                        <span>{maintenanceMode ? 'ON (site is down)' : 'OFF (site is live)'}</span>
                    </div>
                </div>

                <div>
                    <label className="font-medium">Site Title</label>
                    <input
                        type="text"
                        value={siteTitle}
                        onChange={(e) => setSiteTitle(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="font-medium">Site Description</label>
                    <textarea
                        value={siteDescription}
                        onChange={(e) => setSiteDescription(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Save Changes
                </button>

                {message && <p className="text-sm mt-2">{message}</p>}
            </div>
        </AdminContent>
    );
}
