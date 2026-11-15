import "./globals.css";
import { siteConfig } from "@/lib/data-konten";

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden antialiased font-sans selection:bg-pink-300 selection:text-pink-900">
        {children}
      </body>
    </html>
  );
}
