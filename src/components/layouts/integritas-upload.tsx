import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'; // Assuming ShadCN UI for dialog
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getIntegritasEvidenceList } from '@/lib/services/integritas-services';
import supabase from '@/lib/supabase-client';
import { Download, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface UploadCardProps {
    title?: string
    desc?: string
    bucketPath: string;
    className?: string; // Adding className as an optional prop
}

const IntegritasUpload: React.FC<UploadCardProps> = ({ title, desc, bucketPath, className }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [customFileName, setCustomFileName] = useState<string>(''); // State for custom file name
    const [uploading, setUploading] = useState(false);
    const [, setIsLoading] = useState<boolean>(false); // Loading state
    const [, setError] = useState<string | null>(null); // Error state

    const [evList, setEvList] = useState<any[]>([]); // Store the evidence list

    const newTitle = title?.toLocaleLowerCase();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading to true before fetching
            setError(null); // Clear previous errors

            try {
                const res = await getIntegritasEvidenceList(newTitle); // Fetch data
                if (res) {
                    setEvList(res); // Update state if data exists
                }
            } catch (err) {
                setError('An error occurred while fetching the data.');
            } finally {
                setIsLoading(false); // Set loading to false after fetch is done
            }
        };

        fetchData(); // Call the fetchData function inside useEffect

    }, [newTitle]); // Dependency on `newTitle` to trigger the fetch when it changes

    const handleFileUpload = async () => {
        if (!file) return;

        try {
            setUploading(true);

            // Extract the last segment of the bucket path
            const bucketSegments = bucketPath.split('/');
            const lastSegment = bucketSegments[bucketSegments.length - 1];

            // Use the custom file name if provided, otherwise fallback to the original file name
            const fileExtension = file.name.split('.').pop();
            const timestamp = Date.now();
            const uniqueFileName = customFileName ? `${customFileName}_${timestamp}.${fileExtension}` : `${lastSegment}_${timestamp}.${fileExtension}`;

            // Upload the file to Supabase Storage
            const { data, error } = await supabase.storage
                .from(bucketSegments[0]) // The bucket name
                .upload(`${bucketSegments.slice(1).join('/')}/${uniqueFileName}`, file); // Upload path

            if (error) throw error;

            // Get the public URL for the uploaded file
            const { data: { publicUrl } } = supabase.storage
                .from(bucketSegments[0])
                .getPublicUrl(data.path); // Correctly use data.path here

            // Insert the file metadata into the database
            const { error: dbError } = await supabase
                .from('tb_integritas_evidence')
                .insert([
                    {
                        nama_dokumen: `${customFileName}_${timestamp}.${fileExtension}`,
                        file_path: publicUrl, // Use the public URL for the file
                        kategori: lastSegment,
                    }
                ]);

            if (dbError) {
                console.error('Error inserting metadata:', dbError.message);
                setUploading(false);
                return;
            }

            alert(`File uploaded successfully! File name: ${uniqueFileName}`);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('File upload failed.');
        } finally {
            setFile(null);
            setIsModalOpen(false);
            setUploading(false); // Ensure uploading state is reset
        }
    };

    return (
        <Card className={`card overflow-hidden ${className}`}>
            <CardHeader className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4 p-4 border-b">
                <div className="flex flex-1 flex-col justify-center gap-1">
                    <CardTitle className="card-title">{title}</CardTitle>
                    <CardDescription>{desc}</CardDescription>
                </div>
                <Button size="icon"
                    className="flex bg-green-400 text-black sm:h-full rounded-md"
                    onClick={() => setIsModalOpen(true)}
                >
                    <div className="flex justify-center items-center h-full px-6 py-2 gap-1 border-t text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0">
                        <span className="text-xs"><Upload /></span>
                    </div>
                </Button>
            </CardHeader>

            {/* Card Content with the Latest 5 Documents */}
            <div className="">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-xs">Document Name</th>
                            <th className="px-4 py-2 text-center text-xs">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evList.map((doc) => (
                            <tr key={doc.id} className="border-b">
                                <td className="px-4 py-2 text-xs">{doc.nama_dokumen}</td>
                                <td className="px-4 py-2 text-xs text-center">
                                    <button className="btn btn-primary btn-sm">
                                        <a href={doc.file_path} target="_blank" rel="noopener noreferrer"><Download /></a>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogTitle>Upload Evidence Pengungkit {title}</DialogTitle>

                    <div className="grid w-full items-center gap-1.5 mt-4">
                        <Label htmlFor="picture">Nama Dokumen</Label>
                        <Input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Enter custom file name"
                            value={customFileName}
                            onChange={(e) => setCustomFileName(e.target.value)}
                        />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="picture">Upload Dokumen</Label>
                        <Input id="picture" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <DialogClose asChild>
                            <button
                                className="btn btn-secondary text-white bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out px-6 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </DialogClose>
                        <button
                            className="btn btn-primary text-white bg-green-500 hover:bg-green-600 transition-all duration-300 ease-in-out px-6 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:bg-gray-400"
                            onClick={handleFileUpload}
                            disabled={!file || uploading}
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>

                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default IntegritasUpload;
