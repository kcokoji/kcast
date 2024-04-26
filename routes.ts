/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/register",
  "/reset-password",
  "/verify",
  "/error",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api";

/**
 * The prefix for Podcast routes
 * Routes that start with this prefix are for podcasts
 * @type {string}
 */

/**
 * The prefix for Admin routes
 * Routes that start with this prefix are used only by admins
 */
export const adminPrefix = "/admin";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/podcasts";
