import './globals.css';

export const metadata = {
  title: 'İsot — Tarihin Sıfır, Lezzetin Zirve Noktası',
  description: 'Şanlıurfa gastronomi, kültür ve kadim tarih rehberi',
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#9E1B1B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-[#9E1B1B] selection:text-white">
        {children}
      </body>
    </html>
  );
}
