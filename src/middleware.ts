import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/destinations(.*)",
  "/universities(.*)",
  "/courses(.*)",
  "/scholarships(.*)",
  "/blogs(.*)",
  "/events(.*)",
  "/about(.*)",
  "/contact(.*)",
  "/services(.*)",
  "/book-consultation(.*)",
  "/privacy(.*)",
  "/terms(.*)",
  "/cookies(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/api/contact(.*)",
  "/api/appointments(.*)",
]);

const isStudentRoute = createRouteMatcher(["/dashboard(.*)"]);
const isCounsellorRoute = createRouteMatcher(["/counsellors(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Protect all non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  // Role-specific protected route checks
  if (isStudentRoute(req) || isCounsellorRoute(req) || isAdminRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
