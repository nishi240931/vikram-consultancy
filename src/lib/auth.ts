import { auth, currentUser } from "@clerk/nextjs/server";
import { userRepository } from "@/repositories/user.repository";
import { userSyncService } from "@/services/user-sync.service";
import { Role, User } from "@prisma/client";
import { AppError } from "@/lib/error";
import { logger } from "@/lib/logger";

/**
 * Retrieves the currently authenticated user from Clerk and synchronizes with Prisma DB.
 */
export async function getCurrentUser(): Promise<User | null> {
  const clerkAuth = await auth();
  if (!clerkAuth.userId) return null;

  let dbUser = await userRepository.findByClerkId(clerkAuth.userId);

  // Auto-sync if not found in database yet
  if (!dbUser) {
    const clerkUser = await currentUser();
    if (!clerkUser) return null;

    const primaryEmail = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

    if (!primaryEmail) return null;

    dbUser = await userSyncService.syncClerkUser({
      clerkUserId: clerkUser.id,
      email: primaryEmail,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      avatarUrl: clerkUser.imageUrl,
    });
  }

  return dbUser;
}

/**
 * Asserts that a user is authenticated or throws a 401 Unauthorized AppError.
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    logger.warn("Unauthorized access attempt on protected resource");
    throw new AppError("Authentication required to access this resource", 401, "UNAUTHORIZED");
  }
  return user;
}

/**
 * Checks if a user has any of the required allowed roles.
 */
export function hasRole(user: User | null, allowedRoles: Role[]): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}

/**
 * Asserts that the current user has one of the allowed roles or throws a 403 Forbidden AppError.
 */
export async function requireRole(allowedRoles: Role[]): Promise<User> {
  const user = await requireAuth();

  if (!hasRole(user, allowedRoles)) {
    logger.warn(
      `Forbidden access attempt by User ${user.id} [${user.role}] on role restricted route`
    );
    throw new AppError("Forbidden: Insufficient permissions", 403, "FORBIDDEN");
  }

  return user;
}

/**
 * Role Assertion Helpers
 */
export async function isStudent(): Promise<boolean> {
  const user = await getCurrentUser();
  return hasRole(user, ["STUDENT", "COUNSELLOR", "ADMIN", "SUPER_ADMIN"]);
}

export async function isCounsellor(): Promise<boolean> {
  const user = await getCurrentUser();
  return hasRole(user, ["COUNSELLOR", "ADMIN", "SUPER_ADMIN"]);
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return hasRole(user, ["ADMIN", "SUPER_ADMIN"]);
}

export async function isSuperAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return hasRole(user, ["SUPER_ADMIN"]);
}
