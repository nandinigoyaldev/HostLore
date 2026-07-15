import ThemeProvider from '@/components/ThemeProvider';
import './globals.css';

export const metadata = {
  title: 'HostLore — Learn Hosting the Fun Way',
  description: 'DNS to databases, servers to serverless. HostLore explains the internals of web hosting clearly, with real analogies and zero jargon.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, title: 'HostLore', statusBarStyle: 'default' },
};

export const viewport = { themeColor: '#f7f6f3' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="HostLore" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('hostlore-theme');
                if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', t);
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js');
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
