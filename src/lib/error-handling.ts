import { NextResponse } from 'next/server'

export class APIError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly code: string = 'INTERNAL_SERVER_ERROR'
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export function handleError(error: unknown) {
  console.error(error)

  if (error instanceof APIError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    )
  }

  // Handle timeout errors
  if (error instanceof Error && error.name === 'AbortError') {
    return NextResponse.json(
      { error: 'Request timeout', code: 'FUNCTION_INVOCATION_TIMEOUT' },
      { status: 504 }
    )
  }

  // Handle Prisma errors
  if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
    return NextResponse.json(
      { error: 'Database error', code: 'DATABASE_ERROR' },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { error: 'Internal server error', code: 'INTERNAL_SERVER_ERROR' },
    { status: 500 }
  )
}