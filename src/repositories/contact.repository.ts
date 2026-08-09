import { prisma } from "@/lib/prisma";
import type { ContactInquiry } from "@prisma/client";
import { ContactInquiryInput } from "@/validators/contact.validator";

export class ContactRepository {
  async createInquiry(data: ContactInquiryInput): Promise<ContactInquiry> {
    return prisma.contactInquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        targetDestination: data.targetDestination || null,
        message: data.message,
      },
    });
  }

  async getAllInquiries(): Promise<ContactInquiry[]> {
    return prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
}

export const contactRepository = new ContactRepository();
