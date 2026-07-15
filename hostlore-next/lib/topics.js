/**
 * Shared topic map — used by both API routes and client-side fallback.
 * Keys are matched against the user's question (lowercase).
 * Longer keys are matched first to avoid false positives.
 */
const TOPICS = [
  // ── Journey / Network ───────────────────────────────────────────────────
  { keys: ['dns', 'domain name', 'nameserver', 'name server'],               section: 'journey',       label: 'DNS Lookup (Step 2)' },
  { keys: ['ip address', 'ip lookup', 'ip addr'],                            section: 'journey',       label: 'DNS & IP Addresses' },
  { keys: ['url', 'uniform resource locator'],                               section: 'journey',       label: 'URL & DNS' },
  { keys: ['tcp', 'three-way handshake', 'syn-ack', 'syn ack', 'handshake'], section: 'journey',       label: 'TCP Handshake (Step 3)' },
  { keys: ['tls', 'ssl', 'https', 'encryption', 'certificate', 'padlock'],  section: 'journey',       label: 'TLS & HTTPS (Step 4)' },
  { keys: ['http request', 'get request', 'post request', 'http headers'],  section: 'journey',       label: 'HTTP Request (Step 5)' },
  { keys: ['browser cache', 'cached page', 'local cache'],                  section: 'journey',       label: 'Browser Cache (Step 1)' },
  { keys: ['browser render', 'dom', 'page render', 'paint'],                section: 'journey',       label: 'Browser Rendering (Step 8)' },
  { keys: ['fiber optic', 'packet', 'latency', 'ping', 'response travel'],  section: 'journey',       label: 'How Data Travels (Step 7)' },
  { keys: ['nginx', 'apache', 'web server', 'server process'],              section: 'journey',       label: 'Server Processing (Step 6)' },

  // ── Hosting Types ────────────────────────────────────────────────────────
  { keys: ['shared hosting', 'cheap hosting', 'shared server'],             section: 'hosting-types', label: 'Shared Hosting' },
  { keys: ['vps', 'virtual private server', 'virtual server'],              section: 'hosting-types', label: 'VPS Hosting' },
  { keys: ['dedicated server', 'dedicated hosting', 'bare metal'],          section: 'hosting-types', label: 'Dedicated Server' },
  { keys: ['cloud hosting', 'cloud server', 'cloud compute'],               section: 'hosting-types', label: 'Cloud Hosting' },
  { keys: ['serverless', 'lambda', 'cloud function', 'faas', 'functions'],  section: 'hosting-types', label: 'Serverless Hosting' },
  { keys: ['which hosting', 'what hosting', 'type of hosting', 'hosting type',
            'host my site', 'host my app'],                                  section: 'hosting-types', label: 'Hosting Types' },

  // ── Databases ────────────────────────────────────────────────────────────
  { keys: ['postgresql', 'postgres', 'mysql', 'sqlite', 'mariadb'],        section: 'databases',     label: 'SQL Databases' },
  { keys: ['sql', 'relational database', 'relational db', 'acid'],         section: 'databases',     label: 'SQL Databases' },
  { keys: ['mongodb', 'mongo', 'document database', 'document db'],        section: 'databases',     label: 'NoSQL (MongoDB)' },
  { keys: ['redis', 'in-memory', 'key-value', 'cache database'],           section: 'databases',     label: 'NoSQL (Redis)' },
  { keys: ['nosql', 'cassandra', 'dynamodb', 'firebase', 'firestore'],     section: 'databases',     label: 'NoSQL Databases' },
  { keys: ['cockroachdb', 'cockroach', 'planetscale', 'spanner', 'yugabyte', 'newsql'],
                                                                            section: 'databases',     label: 'NewSQL Databases' },
  { keys: ['database', 'which db', 'which database', 'what database',
            'choose database', 'db for'],                                   section: 'databases',     label: 'The Database Trinity' },

  // ── Platforms ────────────────────────────────────────────────────────────
  { keys: ['vercel', 'deploy nextjs', 'deploy next.js', 'deploy react'],   section: 'platforms',     label: 'Vercel' },
  { keys: ['netlify', 'jamstack', 'static deploy'],                        section: 'platforms',     label: 'Netlify' },
  { keys: ['cloudflare pages', 'cloudflare workers', 'edge hosting'],      section: 'platforms',     label: 'Cloudflare Pages' },
  { keys: ['github pages', 'gh-pages'],                                    section: 'platforms',     label: 'GitHub Pages' },
  { keys: ['railway', 'railway.app'],                                      section: 'platforms',     label: 'Railway' },
  { keys: ['render.com', 'render app', 'heroku alternative'],              section: 'platforms',     label: 'Render' },
  { keys: ['supabase', 'baas', 'backend as a service', 'firebase alternative'],
                                                                           section: 'platforms',     label: 'Supabase' },
  { keys: ['digitalocean', 'digital ocean', 'droplet'],                   section: 'platforms',     label: 'DigitalOcean' },
  { keys: ['amazon web services', 'aws', 'ec2', 's3 bucket'],             section: 'platforms',     label: 'AWS' },
  { keys: ['google cloud', 'gcp', 'bigquery', 'cloud run', 'google compute'],
                                                                           section: 'platforms',     label: 'Google Cloud' },
  { keys: ['microsoft azure', 'azure'],                                    section: 'platforms',     label: 'Azure' },
  { keys: ['which platform', 'where to deploy', 'best platform',
            'deploy backend', 'deploy frontend', 'host backend',
            'host frontend', 'which server should'],                       section: 'platforms',     label: 'Deployment Platforms' },
];

/**
 * Find a matching topic for a given question string.
 * @param {string} question
 * @returns {{ section: string, label: string } | null}
 */
function findTopicMatch(question) {
  const q = question.toLowerCase().trim();
  for (const topic of TOPICS) {
    // Sort descending by key length — longer phrases matched first
    const sorted = [...topic.keys].sort((a, b) => b.length - a.length);
    for (const key of sorted) {
      if (q.includes(key)) return { section: topic.section, label: topic.label };
    }
  }
  return null;
}

module.exports = { TOPICS, findTopicMatch };
