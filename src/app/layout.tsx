import type { Metadata } from 'next'

type Props = {
    children: React.ReactNode;
};

export const metadata: Metadata = {
    title: 'My App',
    description: 'My App is a...',
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="id">
            <head>
                <link rel="icon" type="image/png" href="/favicon.png" />
                <title>Matsa</title>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-WX176DS1C4"></script>
            </head>
            <body>
                <div id="root">{children}</div>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if (typeof window !== 'undefined') {
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-WX176DS1C4');
                            }
                        `,
                    }}
                ></script>
                <script type="module" src="/src/main.tsx"></script>
            </body>
        </html>
    );
}
