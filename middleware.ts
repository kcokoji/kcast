import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";
import {
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  podcastPrefix,
} from "./routes";
import prisma from "./lib/edge-db";
export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPodcastRoute = nextUrl.pathname.startsWith(podcastPrefix);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (data.user) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!data.user && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }
  const podcastId = request.nextUrl.pathname.split("/")[2]; // Assuming podcast ID is at index 2
  if (isPodcastRoute && data.user && podcastId) {
    const membership = await prisma.podcastMembership.findFirst({
      where: {
        podcastId: podcastId,
        userId: data.user.id,
      },
      cacheStrategy: {
        ttl: 60,
        swr: 30,
      },
    });
    if (!membership) {
      // User does not have membership, redirect to 404
      return NextResponse.redirect(new URL("/404", request.url));
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/(api|trpc)(.*)",
  ],
};
