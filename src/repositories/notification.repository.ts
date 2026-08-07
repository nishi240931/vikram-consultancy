import { prisma } from "@/lib/prisma";
import type { Notification } from "@prisma/client";

export class NotificationRepository {
  async findByUser(userId: string): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findUnreadByUser(userId: string): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: { userId, isRead: false },
      orderBy: { createdAt: "desc" },
    });
  }
}

export const notificationRepository = new NotificationRepository();
