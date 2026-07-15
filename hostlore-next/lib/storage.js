/**
 * Simple file-based storage for user questions.
 * Stored in data/questions.json — excluded from git via .gitignore.
 */

const fs   = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'data', 'questions.json');

function loadQuestions() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch { /* ignore parse errors */ }
  return [];
}

function saveQuestion(entry) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    const all = loadQuestions();
    all.push(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(all.slice(-2000), null, 2));
  } catch (err) {
    console.error('[storage] write failed:', err.message);
  }
}

function getStats() {
  const all = loadQuestions();
  return {
    total:     all.length,
    matched:   all.filter(q => q.matched).length,
    unmatched: all.filter(q => !q.matched).length,
  };
}

module.exports = { loadQuestions, saveQuestion, getStats };
