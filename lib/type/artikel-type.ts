
export type Artikel = {
    id: string;
    title: string;
    content: string;
    author_id: string; // Matches `author_id` in your object
    thumbnail_url?: string | null; // Nullable as it is null in your object
    created_at: string;
    updated_at?: string; // Optional if not present in your object
    status: number; // Matches `status` in your object
    slug?: string;
    author?: {
        display_name: string;
    }; // Optional author object for display_name
    user_profiles?: {
        display_name: string;
    }; // Optional user_profiles for display_name
    deskripsi: string
};
