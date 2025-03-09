export async function fetchAPI(url: string) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        if (!data) {
            throw new Error('No data returned');
        }
        return data;
    } catch (error) {
        console.error('Failed to fetch pegawai data:', error);
        return [];
    }
}