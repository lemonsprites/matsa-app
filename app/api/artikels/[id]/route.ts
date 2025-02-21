import { createClient } from "@/utils/supabase/server";


type Props = {
    params: Promise<{ slug: string | null }>
}
// GET request to fetch tags
export async function GET({ params }: Props) {
    const supabase = await createClient();
    const slug = (await params).slug
    try {
        const { data, error } = await supabase.from("tb_artikel").select().eq('id', slug);

        if (error) {
            return new Response(
                JSON.stringify({ error: "Error fetching artikel" }),
                { status: 500 }
            );
        }

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "An error occurred while fetching artikel" }),
            { status: 500 }
        );
    }
}
