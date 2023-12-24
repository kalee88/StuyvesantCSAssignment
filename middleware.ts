import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-rate-limit'

let alerted = 0; 
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (request.nextUrl.pathname === "/") {
    console.log('URL matches');
    if (alerted < 5) {
      alerted += 1;
      return NextResponse.rewrite(new URL(pathname, request.url))
    } else {
      alerted = 0;
      return NextResponse.json(
        { success: false, message:'Too many requests' },
        { status: 429 }
      )
    }
    return NextResponse.rewrite(new URL(pathname, request.url))
  }
}

