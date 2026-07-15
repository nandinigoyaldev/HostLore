/* Server component — pure content, no interactivity */
export default function Journey() {
  const steps = [
    {
      num: '01', icon: '🌐', label: '01',
      title: 'Browser Cache Check',
      desc:  'First, your browser checks its local cache. "Have I visited this before?" If yes, it serves the saved copy instantly — no network needed. Déjà vu for websites.',
      timing: '~0ms',
    },
    {
      num: '02', icon: '📖', label: '02',
      title: 'DNS Lookup',
      desc:  'DNS is the phonebook of the internet. It translates google.com → 142.250.80.46. Without DNS, you\'d memorize IP addresses — not ideal.',
      timing: '~20–120ms',
      codeSnippet: 'google.com → 142.250.80.46',
    },
    {
      num: '03', icon: '🤝', label: '03',
      title: 'TCP Handshake',
      desc:  'Browser and server shake hands in three steps: SYN → SYN-ACK → ACK. A mutual agreement that both sides are ready to talk before any data moves.',
      timing: '~40–60ms',
      codeSnippet: 'SYN → SYN-ACK → ACK',
    },
    {
      num: '04', icon: '🔒', label: '04',
      title: 'TLS Encryption',
      desc:  'For HTTPS, your browser and server negotiate encryption keys. Everything from here is scrambled for anyone trying to intercept. That padlock actually means something.',
      timing: '~10–20ms',
    },
    {
      num: '05', icon: '📤', label: '05',
      title: 'HTTP Request',
      desc:  'Your browser formally says: GET /index.html HTTP/2. This tiny message, with headers about your browser and language, travels to the server.',
      timing: '~1ms',
      codeSnippet: 'GET /index.html HTTP/2',
    },
    {
      num: '06', icon: '🖥️', label: '06',
      title: 'Server Processing',
      desc:  'The server receives the request, possibly queries a database, runs application code, and assembles an HTML response. Fast servers with good databases = fast sites.',
      timing: '~1–100ms',
    },
    {
      num: '07', icon: '📡', label: '07',
      title: 'Response Travels Back',
      desc:  'HTML, CSS, and JS are split into packets sent through undersea fiber optic cables at ~200,000 km/s. Yes — actual cables on the ocean floor power the internet.',
      timing: '~20–200ms',
    },
    {
      num: '08', icon: '🎨', label: '08',
      title: 'Browser Renders',
      desc:  'The browser parses HTML → builds the DOM → applies CSS → runs JavaScript → paints pixels. All of that, in a fraction of a second, before you see anything.',
      timing: '~50–200ms',
    },
  ];

  return (
    <section id="journey" className="section" aria-labelledby="journey-heading">
      <div className="section-container">
        <div className="section-header">
          <div className="section-label">Step by step</div>
          <h2 id="journey-heading" className="section-title">
            What happens when you<br />
            <span className="grad-text">hit Enter?</span>
          </h2>
          <p className="section-desc">
            You type a URL and a website appears. Here&rsquo;s every single thing happening
            in those 200 milliseconds — no hand-waving.
          </p>
        </div>

        <div className="journey-flow">
          {steps.map((step) => (
            <div
              key={step.num}
              className="journey-step"
              data-step={step.num}
              data-step-label={step.label}
            >
              <div className="step-top">
                <span className="step-icon" aria-hidden="true">{step.icon}</span>
                <span className="step-num">{step.num}</span>
              </div>
              <h3>{step.title}</h3>
              <p>
                {step.codeSnippet
                  ? step.desc.split(step.codeSnippet).map((part, i, arr) =>
                      i < arr.length - 1
                        ? [part, <code key={i}>{step.codeSnippet}</code>]
                        : part
                    )
                  : step.desc}
              </p>
              <span className="step-timing">{step.timing}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
