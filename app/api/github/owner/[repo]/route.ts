import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  context: { params: Promise<{ owner: string; repo: string }> }
) {
  const { owner, repo } = await context.params; 
  const token = process.env.GITHUB_TOKEN;      

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: token
      ? {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github+json',
        }
      : { Accept: 'application/vnd.github+json' },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Repositório não encontrado' },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
