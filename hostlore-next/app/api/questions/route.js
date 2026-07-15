import { NextResponse } from 'next/server';
import { findTopicMatch } from '@/lib/topics';
import { saveQuestion }   from '@/lib/storage';

// Simple in-memory rate limiter
const rateMap = new Map();
function isRateLimited(ip, max = 10, windowMs = 60_000) {
  const now   = Date.now();
  const hits  = (rateMap.get(ip) ?? []).filter(t => t > now - windowMs);
  if (hits.length >= max) return true;
  hits.push(now);
  rateMap.set(ip, hits);
  return false;
}

async function createGitHubIssue(question) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER ?? 'nandinigoyaldev';
  const repo  = process.env.GITHUB_REPO  ?? 'WEB-HOSTING';

  if (!token) throw new Error('GITHUB_TOKEN not set');

  const body = [
    '## 📖 User Question',
    '',
    'A HostLore user asked:',
    '',
    `> **${question}**`,
    '',
    '## 🎯 What to add',
    'Please add an explanation or section covering this topic in HostLore.',
    '',
    '---',
    '*🤖 Auto-created via the HostLore Ask API.*',
  ].join('\n');

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    method: 'POST',
    headers: {
      Authorization:          `token ${token}`,
      Accept:                 'application/vnd.github.v3+json',
      'Content-Type':         'application/json',
      'User-Agent':           'HostLore-Next/1.0',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      title:  `📚 Content Request: ${question.slice(0, 120)}`,
      body,
      labels: ['content-request', 'enhancement'],
    }),
  });

  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
}

function buildFallbackIssueUrl(question) {
  const owner = process.env.GITHUB_OWNER ?? 'nandinigoyaldev';
  const repo  = process.env.GITHUB_REPO  ?? 'WEB-HOSTING';
  const title = encodeURIComponent(`📚 Content Request: ${question.slice(0, 120)}`);
  const body  = encodeURIComponent(`## 📖 User Question\n\n> **${question}**\n\n---\n*Created via HostLore.*`);
  return `https://github.com/${owner}/${repo}/issues/new?title=${title}&body=${body}&labels=content-request,enhancement`;
}

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests — try again shortly.' }, { status: 429 });
  }

  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 }); }

  const { question } = body ?? {};
  if (!question || typeof question !== 'string') {
    return NextResponse.json({ error: '`question` field is required.' }, { status: 400 });
  }

  const trimmed = question.trim().slice(0, 500);
  if (trimmed.length < 3) {
    return NextResponse.json({ error: 'Question too short.' }, { status: 400 });
  }

  const match = findTopicMatch(trimmed);

  saveQuestion({
    id:             Date.now(),
    question:       trimmed,
    matched:        !!match,
    matchedSection: match?.section ?? null,
    timestamp:      new Date().toISOString(),
  });

  if (match) {
    return NextResponse.json({ success: true, matched: true, section: match.section, label: match.label });
  }

  // Not matched — try auto-creating a GitHub issue
  let issueCreated = false;
  let issueUrl     = buildFallbackIssueUrl(trimmed);

  try {
    const issue = await createGitHubIssue(trimmed);
    issueUrl     = issue.html_url;
    issueCreated = true;
  } catch (err) {
    console.warn('[GitHub] issue not auto-created:', err.message);
  }

  return NextResponse.json({ success: true, matched: false, issueCreated, issueUrl });
}
