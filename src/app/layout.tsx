/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import './globals.css';
import './animations.css';

export const metadata: Metadata = {
  title: 'Brenda Gaio | Portfólio',
  description: 'Portfólio de Brenda Aldrovandi Gaio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt'>
      <head>
        <title>Brenda Gaio | Portfólio</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Zain:ital,wght@0,200;0,300;0,400;0,700;0,800;0,900;1,300;1,400&display=swap' rel='stylesheet' />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className='antialiased'>
        {children}
      </body>
    </html>
  );
}
