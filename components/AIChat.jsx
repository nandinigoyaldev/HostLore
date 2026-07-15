'use client';
import { useState, useRef, useEffect } from 'react';

const TOPICS_QA = [
  { q: 'What is DNS?', a: 'DNS (Domain Name System) is the phonebook of the internet. It translates human-readable domain names like google.com into IP addresses like 142.250.80.46 that computers use to identify each other.' },
  { q: 'What is a VPS?', a: 'A Virtual Private Server is a virtual machine that runs its own copy of an operating system, with dedicated resources. It\'s like having your own apartment in a building — you get privacy and control without the cost of a whole building.' },
  { q: 'SQL vs NoSQL?', a: 'SQL databases (PostgreSQL, MySQL) use rigid schemas and are great for complex queries and data integrity. NoSQL databases (MongoDB, Redis) are flexible and scale easily. Choose SQL for banking, NoSQL for real-time apps.' },
  { q: 'What is HTTPS?', a: 'HTTPS (Hypertext Transfer Protocol Secure) encrypts data between your browser and the server using TLS. That padlock icon means no one can read your data in transit.' },
  { q: 'What is serverless?', a: 'Serverless doesn\'t mean no servers — it means you don\'t manage them. You upload functions (like AWS Lambda) and the platform handles scaling, security, and maintenance. You pay per execution.' },
  { q: 'What is a CDN?', a: 'A Content Delivery Network is a network of servers around the world that cache your site\'s static files. Users download from the nearest server, making your site load faster globally.' },
  { q: 'What is the TCP handshake?', a: 'The TCP three-way handshake is how a browser and server establish a connection: SYN (you there?) → SYN-ACK (yeah, you?) → ACK (cool). All in under 60ms.' },
  { q: 'What is Cloud Computing?', a: 'Cloud computing means running workloads on remote servers (AWS, GCP, Azure) instead of your own hardware. You get scalability, reliability, and pay only for what you use.' },
  { q: 'What is a domain name?', a: 'A domain name is a human-readable address for a website (like hostlore.app). It maps to an IP address via DNS. Domains are rented annually through registrars.' },
  { q: 'What is Docker?', a: 'Docker packages your application and its dependencies into a container — a lightweight, portable unit that runs anywhere. No more "it works on my machine" problems.' },
];

export default function AIChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: '👋 Hi! Ask me anything about hosting, servers, databases, or deployment!' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function findAnswer(q) {
    const lower = q.toLowerCase();
    for (const t of TOPICS_QA) {
      const words = t.q.toLowerCase().replace('?', '').split(' ');
      const matchCount = words.filter(w => lower.includes(w)).length;
      if (matchCount >= 2) return t.a;
    }
    return null;
  }

  function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);

    setTimeout(() => {
      const answer = findAnswer(text);
      if (answer) {
        setMessages(prev => [...prev, { role: 'ai', text: answer }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'ai',
          text: `Great question! I don't have a ready answer for "${text}" yet, but I've logged it. Try browsing the sections above or check back later! 📝`,
        }]);
      }
      setLoading(false);
    }, 600 + Math.random() * 600);
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="chat" role="dialog" aria-label="AI Chat">
        <div className="chat-header">
          <span>🤖 HostLore AI</span>
          <button className="chat-close" onClick={onClose}>✕</button>
        </div>

        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              <div className="chat-msg-text">{m.text}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg ai">
              <div className="chat-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-wrap">
          <input
            ref={inputRef}
            className="chat-input"
            placeholder="Ask a follow-up question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button className="chat-send" onClick={handleSend} disabled={!input.trim() || loading}>
            Send
          </button>
        </div>
      </div>

      <style jsx>{`
        .backdrop {
          position: fixed; inset: 0;
          background: var(--bg-overlay);
          z-index: 800;
        }
        .chat {
          position: fixed;
          bottom: 80px;
          right: 24px;
          width: 380px;
          max-height: 520px;
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          z-index: 850;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s var(--ease-out);
        }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.95rem;
        }
        .chat-close {
          background: none; border: none;
          font-size: 1rem; cursor: pointer;
          color: var(--text-muted); padding: 2px 6px;
          border-radius: 4px;
        }
        .chat-close:hover { background: var(--bg-soft); }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .chat-msg {
          max-width: 85%;
          animation: msgIn 0.25s var(--ease-out);
        }
        @keyframes msgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .chat-msg.user { align-self: flex-end; }
        .chat-msg.ai { align-self: flex-start; }
        .chat-msg-text {
          padding: 10px 16px;
          border-radius: 16px;
          font-size: 0.85rem;
          line-height: 1.6;
        }
        .chat-msg.user .chat-msg-text {
          background: var(--gradient-primary);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .chat-msg.ai .chat-msg-text {
          background: var(--bg-soft);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
        }
        .chat-typing {
          display: flex;
          gap: 4px;
          padding: 12px 18px;
          background: var(--bg-soft);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
        }
        .chat-typing span {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--text-muted);
          animation: bounce 1.2s infinite;
        }
        .chat-typing span:nth-child(2) { animation-delay: 0.2s; }
        .chat-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-8px)} }
        .chat-input-wrap {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          border-top: 1px solid var(--border);
        }
        .chat-input {
          flex: 1;
          padding: 10px 14px;
          border: 2px solid var(--border);
          border-radius: 12px;
          font-size: 0.85rem;
          background: var(--bg);
          color: var(--text-primary);
          font-family: var(--font-body);
          outline: none;
          transition: border-color var(--fast);
        }
        .chat-input:focus { border-color: var(--purple); }
        .chat-send {
          background: var(--gradient-primary);
          color: #fff;
          border: none;
          padding: 10px 18px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-display);
          transition: opacity var(--fast);
        }
        .chat-send:disabled { opacity: 0.5; cursor: not-allowed; }
        .chat-send:hover:not(:disabled) { opacity: 0.9; }

        @media (max-width: 640px) {
          .chat {
            left: 12px; right: 12px;
            bottom: 12px;
            width: auto;
            max-height: 70vh;
          }
        }
      `}</style>
    </>
  );
}
