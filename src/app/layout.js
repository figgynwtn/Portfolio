import './globals.css';

export const metadata = {
  title: 'Hannah Newton | Festival Portfolio',
  description: 'Creative developer portfolio with WebGL effects',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎵</text></svg>" />
      </head>
      <body className="h-full">
        {children}
      </body>
    </html>
  );
}