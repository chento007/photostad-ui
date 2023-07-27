// 

import { NextResponse } from 'next/server'

 
export function middleware(request) {

  if (request.nextUrl.pathname.startsWith('/profilew')) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/adminw')) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }
}