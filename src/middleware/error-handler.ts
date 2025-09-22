import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function errorHandler(request: NextRequest, error: any) {
  console.error(`[Error Handler] ${error}`);

  // Handle specific error types
  if (error?.name === 'AbortError' || error?.message?.includes('timeout')) {
    return NextResponse.json(
      { error: 'Request timed out' },
      { status: 504 }
    );
  }

  if (error?.code === 'PAYLOAD_TOO_LARGE') {
    return NextResponse.json(
      { error: 'Request payload too large' },
      { status: 413 }
    );
  }

  if (error?.code === 'FUNCTION_INVOCATION_FAILED') {
    return NextResponse.json(
      { error: 'Function invocation failed' },
      { status: 500 }
    );
  }

  // Default error response
  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 }
  );
}