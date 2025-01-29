import PostPageContent from '@/components/matsa/artikel/page-content'
import { Tag } from '@/lib/type/tag-type'
import { createClient } from '@/utils/supabase/client'


type Props = {
    params: Promise<{ slug: string }>
}


async function Page({ params }: Props) {
    const supabase = createClient()
    const slug = (await params).slug

    try {
        // Fetch the article
        const { data: article, error: articleError } = await supabase
            .from('tb_artikel')
            .select('id, title, content, created_at, thumbnail_url, user_profiles(display_name)')
            .eq('slug', slug)
            .single()

        if (articleError || !article) {
            console.error('Error fetching article:', articleError)
            return (
                <div>Failed to load the article. Please try again later.</div>
            )
        }

        // Fetch tags for the article
        const { data: tags, error: tagsError } = await supabase
            .from('artikel_tag')
            .select('tb_tag(id, tag, tag_slug)')
            .eq('artikel_id', article.id)

        if (tagsError) {
            console.error('Error fetching tags:', tagsError)
        }

        const formattedTags = tags?.map((item: any) => item.tb_tag) || []

        return (
            <PostPageContent
                article={{
                    ...article,
                    author: article.user_profiles ?? null,
                }}
                tags={formattedTags}
                error={null}
            />
        )
    } catch (err) {
        console.error('Error fetching article:', err)
        return (
            <div>Something went wrong. Please try again later.</div>
        )
    }
}

export default Page;


export async function generateMetadata({ params }: { params: { slug: string } }) {
    const supabase = createClient();
    const slug = params.slug;

    try {
        // Fetch the article to get the title
        const { data: article, error } = await supabase
            .from('tb_artikel')
            .select('title, thumbnail_url')
            .eq('slug', slug)
            .single();

        if (error || !article) {
            console.error('Error fetching article for metadata:', error);
            return {
                title: `Artikel | ${slug}`,
            };
        }

        // Use the fetched article title in the metadata
        const articleTitle = article.title;

        return {
            title: `MTsN 1 | ${articleTitle}`,
            description: `Baca artikel kami "${articleTitle}" on our platform.`,
            openGraph: {
                title: articleTitle,
                description: `Baca artikel kami "${articleTitle}" on our platform.`,
                url: `https://mtsn1ciamis.sch.id/artikel/${slug}`,
                image: `${article.thumbnail_url}`,
                site_name: 'MTsN 1 Ciamis',
            },
            twitter: {
                card: 'summary_large_image',
                title: articleTitle,
                description: `Baca artikel kami "${articleTitle}" on our platform.`,
                image: `${article.thumbnail_url}`
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: `Artikel - ${slug}`,
        };
    }
}