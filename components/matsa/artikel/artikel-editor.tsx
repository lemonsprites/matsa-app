"use client"
import ArtikelMarkEditor from "@/components/matsa/artikel/artikel-mark-editor";
import ArtikelMetadata from "@/components/matsa/artikel/artikel-metadata";
import ArtikelThumbnail from "@/components/matsa/artikel/artikel-thumbnail";
import { ArtikelProvider } from "@/lib/context/artikel-context";


type TagOption = {
    label: string;
    value: string;
};

const dummyTags: TagOption[] = [
    { label: 'Berita', value: 'berita' },
    { label: 'Pengumuman', value: 'pengumuman' },
    { label: 'Event', value: 'event' },
];

export default function ArtikelEditor({ param, mode }: any) {



    return (
        <ArtikelProvider mode={mode === "read" ? mode : "write"} paramID={param}  >

            <div className="flex flex-col gap-6">

                {/* Bagian Atas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Thumbnail (1/3) */}
                    <ArtikelThumbnail />

                    {/* Form (2/3) */}
                    <ArtikelMetadata />
                </div>

                {/* Editor Artikel */}
                <ArtikelMarkEditor />

            </div>
        </ArtikelProvider>

    );
}
