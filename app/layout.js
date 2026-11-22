"use client";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <title>Happy birthday Novria</title>
        <meta name="description" content="A romantic birthday surprise for someone special" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Dancing+Script:wght@500;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
