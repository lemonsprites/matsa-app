import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'; // Assuming ShadCN UI for dialog
import supabase from '@/lib/supabase-client';
import React, { useState } from 'react';

interface UploadCardProps {
    bucketPath: string;
    className?: string; // Adding className as an optional prop
}


const IntegritasUpload: React.FC<UploadCardProps> = ({ bucketPath, className }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const bucketPublicURL = "https://yvlcbqoabvoapczvckny.supabase.co/storage/v1/object/public/";

    const handleFileUpload = async () => {
        if (!file) return;

        try {
            setUploading(true);

            // Extract the last segment of the bucket path
            const bucketSegments = bucketPath.split('/');
            const lastSegment = bucketSegments[bucketSegments.length - 1];

            // Generate a unique file name using timestamp
            const fileExtension = file.name.split('.').pop();
            const timestamp = Date.now();
            const uniqueFileName = `${lastSegment}-${timestamp}.${fileExtension}`;

            const { data, error } = await supabase.storage
                .from(bucketSegments[0]) // The bucket name
                .upload(bucketSegments.slice(1).join('/') + `/${uniqueFileName}`, file);

            if (error) throw error;
            // console.log(data)
            // 

            const { error: dbError } = await supabase
                .from('tb_integritas_evidence')
                .insert([
                    {
                        nama_dokumen: file.name,
                        file_path: bucketPublicURL + data.fullPath,
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
        }
    };

    return (
        <Card className={`card overflow-hidden ${className}`}>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-2">
                    <CardTitle className="card-title">Role Model</CardTitle>
                </div>
                <button
                    className="flex bg-green-400 text-black"
                    onClick={() => setIsModalOpen(true)}
                >
                    <div className="flex flex-1 flex-col justify-center px-6 py-2 gap-1 border-t text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0">
                        <span className="text-xs">Upload Button</span>
                    </div>
                </button>
            </CardHeader>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>Choose a file to upload.</DialogDescription>

                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <DialogClose asChild>
                            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                        </DialogClose>
                        <button
                            className="btn btn-primary"
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
