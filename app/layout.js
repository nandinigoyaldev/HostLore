import './globals.css';

export const metadata = {
  title: 'HostLore — Learn Hosting the Fun Way',
  description: 'DNS to databases, servers to serverless. HostLore explains the internals of web hosting clearly, with real analogies and zero jargon.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
