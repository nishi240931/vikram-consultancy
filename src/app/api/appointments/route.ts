import { NextResponse } from "next/server";
import { appointmentBookingSchema } from "@/validators/appointment.validator";
import { appointmentService, FALLBACK_COUNSELLORS } from "@/services/appointment.service";
import { emailService } from "@/services/email.service";
import { checkRateLimit } from "@/lib/rate-limit";
import { AppError } from "@/lib/error";
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
    const validationResult = appointmentBookingSchema.safeParse(body);
    if (!validationResult.success) {
      logger.warn("Invalid appointment booking payload", { errors: validationResult.error.flatten() });
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      counsellorId,
      date,
      timeSlot,
      studentName,
      studentEmail,
      studentPhone,
      targetCountry,
      targetDegree,
      notes,
    } = validationResult.data;

    // 2. Validate that selected date is not in the past
    const todayStr = new Date().toISOString().split("T")[0];
    if (date < todayStr) {
      return NextResponse.json(
        {
          success: false,
          error: "Consultation date cannot be in the past. Please select a future date.",
        },
        { status: 400 }
      );
    }

    // 3. Construct scheduled Date object
    const scheduledDateTime = new Date(`${date} ${timeSlot}`);
    if (isNaN(scheduledDateTime.getTime())) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid date or time slot format.",
        },
        { status: 400 }
      );
    }

    // 4. Create appointment using AppointmentService
    const combinedNotes = `Target Country: ${targetCountry || "Not specified"}. Degree: ${targetDegree || "N/A"}. ${notes || ""}`.trim();

    let newAppt;
    try {
      newAppt = await appointmentService.createAppointment({
        studentId: `anon-${studentEmail.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
        counsellorId,
        scheduledAt: scheduledDateTime,
        durationMinutes: 30,
        notes: combinedNotes,
      });
    } catch (apptErr: any) {
      if (apptErr instanceof AppError && apptErr.statusCode === 409) {
        return NextResponse.json(
          {
            success: false,
            error: "That consultation slot is no longer available. Please choose another time.",
          },
          { status: 409 }
        );
      }
      throw apptErr;
    }

    const counsellorObj = FALLBACK_COUNSELLORS.find((c) => c.id === counsellorId) || FALLBACK_COUNSELLORS[0];
    const counsellorName = `${counsellorObj.firstName} ${counsellorObj.lastName}`;

    // 5. Send Transactional Emails via Resend (Non-blocking failure handling)
    try {
      await emailService.sendAppointmentConfirmationToStudent({
        appointmentId: newAppt.id,
        studentName,
        studentEmail,
        studentPhone,
        counsellorName,
        counsellorEmail: counsellorObj.email,
        scheduledAt: scheduledDateTime,
        meetingUrl: newAppt.meetingUrl,
        targetCountry,
        notes: combinedNotes,
      });

      await emailService.sendAppointmentAlertToCounsellor({
        appointmentId: newAppt.id,
        studentName,
        studentEmail,
        studentPhone,
        counsellorName,
        counsellorEmail: counsellorObj.email,
        scheduledAt: scheduledDateTime,
        meetingUrl: newAppt.meetingUrl,
        targetCountry,
        notes: combinedNotes,
      });
    } catch (emailError) {
      logger.warn("Appointment created successfully, but email dispatch encountered an issue", { emailError });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Consultation appointment scheduled successfully!",
        appointment: {
          id: newAppt.id,
          scheduledAt: scheduledDateTime,
          counsellorName,
          counsellorEmail: counsellorObj.email,
          meetingUrl: newAppt.meetingUrl,
          studentName,
          studentEmail,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Unhandled error in POST /api/appointments", { error });
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your appointment. Please try again later.",
      },
      { status: 500 }
    );
  }
}
