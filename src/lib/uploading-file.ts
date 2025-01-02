import supabase from "@/lib/supabase-client";

export const uploadFileToFolder = async (file: any, folder = 'general', bucketName: string) => {
    const filePath = `${folder}/${file.name}`; // Include the folder path

    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
            upsert: true, // Set to true to overwrite existing files
        });

    if (error) {
        console.error('Upload failed:', error.message);
        return null;
    }

    console.log('File uploaded successfully:', data);
    return data; // Contains file path and other details
};