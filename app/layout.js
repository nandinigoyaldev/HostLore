import './globals.css';

export const metadata = {
  title:       'HostLore — Learn Hosting the Fun Way',
  description: 'DNS to databases, servers to serverless. HostLore explains the internals of web hosting clearly, with real analogies and zero jargon.',
  keywords:    'web hosting, DNS, VPS, databases, SQL, NoSQL, Vercel, Netlify, AWS, cloud hosting, serverless',
  authors:     [{ name: 'Nandini Goyal', url: 'https://github.com/nandinigoyaldev' }],
  openGraph: {
    title:       'HostLore — Learn Hosting the Fun Way',
    description: 'DNS to databases, servers to serverless. HostLore makes hosting concepts actually stick.',
    type:        'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
