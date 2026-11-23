export const metadata = {
  title: 'İsot — Tarihin Sıfır, Lezzetin Zirve Noktası',
  description: 'Şanlıurfa gastronomi, kültür ve kadim tarih rehberi',
  manifest: '/manifest.json',
  themeColor: '#9E1B1B',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #FDFBF7; color: #1A1A1A; -webkit-tap-highlight-color: transparent; }
          .font-display { font-family: 'Cinzel', serif; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </head>
      <body className="antialiased selection:bg-[#9E1B1B] selection:text-white">
        {children}
      </body>
    </html>
  );
}
