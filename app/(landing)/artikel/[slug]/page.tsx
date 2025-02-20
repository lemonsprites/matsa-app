import PostPageContent from '@/components/matsa/artikel/page-content'
import LandingComponent from '@/components/matsa/landing/landing-component'
import { Tag } from '@/lib/type/tag-type'
import { createClient } from '@/utils/supabase/client'
import Script from 'next/script'


type Props = {
    params: Promise<{ slug: string | null }>
}


async function Page({ params }: Props) {

    const supabase = createClient()
    const slug = (await params).slug

    try {
        // Fetch the article
        const { data: article, error: articleError } = await supabase
            .from('tb_artikel')
            .select('id, title, content, deskripsi, created_at, thumbnail_url, user_profiles(display_name), created_at, updated_at')
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

        const formattedTags = tags?.map((item: any) => item.tb_tag) || [];

        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.deskripsi,
            "image": article.thumbnail_url,
            "author": {
                "@type": "Person",
                // @ts-ignore
                "name": article.user_profiles.display_name,
            },
            "datePublished": article.created_at,
            "dateModified": article.updated_at,
        };

        return (
            <LandingComponent>

                <PostPageContent
                    article={{
                        ...article,
                        author: article.user_profiles ?? null,
                    }}
                    tags={formattedTags}
                    error={null}
                />
                <Script
                    id="json-ld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </LandingComponent>
        )
    } catch (err) {
        console.error('Error fetching article:', err)
        return (
            <div>Something went wrong. Please try again later.</div>
        )
    }
}

export default Page;


export async function generateMetadata({ params }: Props) {
    const supabase = createClient();
    const slug = (await params).slug;

    try {
        // Fetch the article to get the title
        const { data: article, error } = await supabase
            .from('tb_artikel')
            .select('id, title, content, deskripsi, created_at, thumbnail_url, user_profiles(display_name)')
            .eq('slug', slug)
            .single()

        if (error || !article) {
            console.error('Error fetching article for metadata:', error);
            return {
                title: `Artikel | ${slug}`,
            };
        }

        return {
            title: `MTsN 1 Ciamis | ${article.title}`,
            description: article.deskripsi,
            openGraph: {
                title: article.title,
                description: article.deskripsi,
                images: [
                    {
                        url: article.thumbnail_url || "/default-thumbnail.jpg",
                        width: 1200,
                        height: 630,
                        alt: article.title,
                    },
                ],
                type: "article",
            },
            twitter: {
                card: "summary_large_image",
                title: article.title,
                description: article.deskripsi,
                images: [article.thumbnail_url || "/default-thumbnail.jpg"],
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: `Artikel - ${slug}`,
        };
    }
}