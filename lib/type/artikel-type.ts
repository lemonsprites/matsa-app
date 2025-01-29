
export type Artikel = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at?: string; // Optional if not present in your object
    slug: string;
    thumbnail_url?: string | null; // Nullable as it is null in your object
    status: number; // Matches `status` in your object
    author_id: number; // Matches `author_id` in your object
    author?: {
        display_name: string;
    }; // Optional author object for display_name
    user_profiles?: {
        display_name: string;
    }; // Optional user_profiles for display_name
};
