import localFont from 'next/font/local';

// Load font directly without CSS modules
const clashGrotesk = localFont({
  src: './../../public/fonts/ClashGrotesk-Regular.woff2',
  display: 'swap',
  variable: '--font-clash'
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={clashGrotesk.className}>
      <body>{children}</body>
    </html>
  );
}