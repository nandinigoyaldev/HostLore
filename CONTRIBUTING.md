# Contributing to HostLore

Thank you for helping make hosting concepts clearer for everyone. 🙌

---

## Ways to contribute

| Type | Description |
|---|---|
| 📚 **Content** | Add or improve explanations, fix inaccuracies |
| 🐛 **Bug fix** | Fix broken layouts, JS errors, accessibility issues |
| 🎨 **Design** | Improve the UI without breaking existing style |
| 🌐 **Topics** | Add new hosting platforms, databases, or concepts |
| 🔌 **Backend** | Improve the Express API or add new endpoints |

---

## Before you open a PR

1. **Check open issues** — someone may already be working on it.
2. **Open an issue first** for any substantial content addition or new feature. Tag it with the appropriate label.
3. **Keep PRs focused** — one thing per PR makes review much faster.

---

## Development setup

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/WEB-HOSTING.git
cd WEB-HOSTING

# 2. (Optional) Install backend dependencies
npm install

# 3. Copy env variables
cp .env.example .env
# Edit .env and add your GITHUB_TOKEN if you want GitHub integration

# 4. Run with backend
npm run dev
# → http://localhost:3000

# OR just open index.html directly for static development
open index.html
```

---

## Content guidelines

- Write for a developer who is **learning hosting for the first time** — not a systems engineer.
- Use **real analogies** (apartments, restaurants, phonebooks) rather than abstract technical definitions.
- Every claim should be **accurate**. If it's a simplification, that's fine, but say so.
- Keep sentences short and scannable.
- Emoji are allowed but not required.

---

## Code style

- **HTML** — Semantic elements, ARIA labels on interactive elements, BEM-ish class names.
- **CSS** — Use `var(--token)` from the design system. No inline styles. No new dependencies.
- **JavaScript** — Vanilla JS only. `'use strict'`. Arrow functions preferred. Named functions for anything non-trivial.
- **Backend** — CommonJS (`require`). Async/await. Validate all user input. No new npm dependencies unless absolutely necessary.

---

## Adding a new platform to the comparison table

1. Add a `.platform-card` to the right `<div class="platform-grid">` section in `index.html`.
2. Add the platform's keywords to the `TOPIC_MAP` array in both `js/script.js` and `server.js`.
3. No CSS changes needed for standard platform cards.

---

## Reporting a content error

Open an issue with the `content-error` label. Include:
- The incorrect statement
- What it should say
- A source or reference (docs, RFC, etc.)

---

## License

By contributing, you agree your changes will be released under the [MIT License](./LICENSE).
