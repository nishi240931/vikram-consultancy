import { userRepository, CreateClerkUserData } from "@/repositories/user.repository";
import { logger } from "@/lib/logger";

export class UserSyncService {
  /**
   * Synchronizes a user record from Clerk into Prisma User table.
   * Performs an upsert operation to prevent duplicate user creation.
   */
  async syncClerkUser(data: CreateClerkUserData) {
    try {
      logger.info(`Syncing Clerk user to database: ${data.clerkUserId} (${data.email})`);
      const user = await userRepository.upsertFromClerk(data);
      logger.info(`User synchronized successfully: ${user.id} [${user.role}]`);
      return user;
    } catch (error) {
      logger.error(`Failed to synchronize Clerk user: ${data.clerkUserId}`, { error });
      throw error;
    }
  }

  /**
   * Deletes user record when deleted in Clerk.
   */
  async deleteClerkUser(clerkUserId: string) {
    try {
      logger.info(`Deleting synced user for Clerk ID: ${clerkUserId}`);
      const deletedUser = await userRepository.deleteByClerkId(clerkUserId);
      if (deletedUser) {
        logger.info(`User record deleted from database: ${deletedUser.id}`);
      }
      return deletedUser;
    } catch (error) {
      logger.error(`Failed to delete user record for Clerk ID: ${clerkUserId}`, { error });
      throw error;
    }
  }
}

export const userSyncService = new UserSyncService();
