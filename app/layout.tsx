import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import "@/app/globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// export const metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: "Next.js and Supabase Starter Kit",
//   description: "The fastest way to build apps with Next.js and Supabase",
// };

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="id" className={geistSans.className} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WX176DS1C4"></script>
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-4">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
