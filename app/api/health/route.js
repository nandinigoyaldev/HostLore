import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status:        'ok',
    service:       'HostLore',
    version:       '1.0.0',
    githubEnabled: !!process.env.GITHUB_TOKEN,
    uptime:        Math.round(process.uptime()),
    timestamp:     new Date().toISOString(),
  });
}
