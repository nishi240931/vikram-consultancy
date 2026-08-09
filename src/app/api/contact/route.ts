import { NextResponse } from "next/server";
import { contactInquirySchema } from "@/validators/contact.validator";
import { contactRepository } from "@/repositories/contact.repository";
import { emailService } from "@/services/email.service";
import { checkRateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  // Rate limiting check: 5 requests per minute
  const rateLimit = checkRateLimit(req, 5, 60000);
  if (!rateLimit.success && rateLimit.response) {
    return rateLimit.response;
  }

  try {
    const body = await req.json();

    // 1. Validate payload using Zod
    const validationResult = contactInquirySchema.safeParse(body);
    if (!validationResult.success) {
      logger.warn("Invalid contact form submission payload", { errors: validationResult.error.flatten() });
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const inputData = validationResult.data;

    // 2. Persist to Database with fallback safety
    let dbRecord = null;
    try {
      dbRecord = await contactRepository.createInquiry(inputData);
      logger.info("Contact inquiry stored in database", { inquiryId: dbRecord.id, email: dbRecord.email });
    } catch (dbError) {
      logger.warn("Failed to persist inquiry to database (dev fallback active)", { error: dbError });
    }

    // 3. Send Emails via Resend Service
    const adminEmailResult = await emailService.sendContactNotificationToAdmin({
      name: inputData.name,
      email: inputData.email,
      phone: inputData.phone,
      targetDestination: inputData.targetDestination,
      message: inputData.message,
      createdAt: dbRecord?.createdAt || new Date(),
    });

    const userEmailResult = await emailService.sendUserConfirmationEmail({
      name: inputData.name,
      email: inputData.email,
      phone: inputData.phone,
      targetDestination: inputData.targetDestination,
      message: inputData.message,
    });

    logger.info("Contact processing completed", {
      adminEmailSent: adminEmailResult.success,
      userEmailSent: userEmailResult.success,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted successfully! An education advisor will contact you shortly.",
        inquiryId: dbRecord?.id || "submitted",
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Unhandled error in POST /api/contact", { error });
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
