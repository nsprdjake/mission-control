import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mission-Control-Status-Checker/1.0',
      },
    });

    clearTimeout(timeoutId);

    return NextResponse.json({
      isUp: response.ok,
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error) {
    return NextResponse.json({
      isUp: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
