import { Resend } from "resend";
import { logger } from "@/lib/logger";
import { APP_CONFIG } from "@/config/app.config";

export interface ContactNotificationPayload {
  name: string;
  email: string;
  phone?: string | null;
  targetDestination?: string | null;
  message: string;
  createdAt?: Date;
}

export interface AppointmentNotificationPayload {
  appointmentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string | null;
  counsellorName: string;
  counsellorEmail?: string | null;
  scheduledAt: Date;
  meetingUrl?: string | null;
  targetCountry?: string | null;
  notes?: string | null;
}

export class EmailService {
  private resend: Resend | null = null;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && apiKey.trim() !== "") {
      this.resend = new Resend(apiKey);
    } else {
      logger.warn("RESEND_API_KEY is missing or empty. Email sending will run in simulation mode.");
    }
  }

  /**
   * Sends an admin alert email when a new student inquiry is received.
   */
  async sendContactNotificationToAdmin(payload: ContactNotificationPayload): Promise<{ success: boolean; id?: string }> {
    const recipient = APP_CONFIG.contact.email;
    const submissionTime = (payload.createdAt || new Date()).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF9F5; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0B1B3D; padding: 24px; text-align: center;">
          <h1 style="color: #D4AF37; margin: 0; font-size: 22px;">VIKRAM EDU CONSULTANTS</h1>
          <p style="color: #FFFFFF; margin: 4px 0 0 0; font-size: 14px;">New Student Inquiry Alert</p>
        </div>
        <div style="padding: 24px; color: #1E293B;">
          <h2 style="font-size: 18px; color: #0B1B3D; margin-top: 0;">Inquiry Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #64748B;">Student Name:</td>
              <td style="padding: 8px 0; color: #0F172A;">${payload.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748B;">Email Address:</td>
              <td style="padding: 8px 0; color: #0F172A;"><a href="mailto:${payload.email}" style="color: #2563EB;">${payload.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748B;">Phone Number:</td>
              <td style="padding: 8px 0; color: #0F172A;">${payload.phone || "Not Provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748B;">Target Country:</td>
              <td style="padding: 8px 0; color: #0F172A;">${payload.targetDestination || "General Inquiry"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748B;">Submitted At:</td>
              <td style="padding: 8px 0; color: #0F172A;">${submissionTime} IST</td>
            </tr>
          </table>
          <div style="background-color: #FFFFFF; padding: 16px; border-radius: 8px; border-left: 4px solid #D4AF37; margin-bottom: 20px;">
            <p style="font-weight: bold; margin: 0 0 8px 0; color: #0B1B3D;">Message:</p>
            <p style="margin: 0; color: #334155; white-space: pre-wrap; font-size: 14px;">${payload.message}</p>
          </div>
        </div>
      </div>
    `;

    if (!this.resend) {
      logger.info("[Simulated Email] Admin notification skipped (Resend key missing).", { recipient, payload });
      return { success: true, id: "simulated-email-id" };
    }

    try {
      const response = await this.resend.emails.send({
        from: "Vikram Edu <onboarding@resend.dev>",
        to: [recipient],
        subject: `New Inquiry from ${payload.name} (${payload.targetDestination || "Study Abroad"})`,
        html: htmlContent,
      });

      if (response.error) {
        logger.error("Resend API error sending admin notification", { error: response.error });
        return { success: false };
      }

      return { success: true, id: response.data?.id };
    } catch (error) {
      logger.error("Exception in sendContactNotificationToAdmin", { error });
      return { success: false };
    }
  }

  /**
   * Sends a confirmation receipt email to the prospective student.
   */
  async sendUserConfirmationEmail(payload: ContactNotificationPayload): Promise<{ success: boolean; id?: string }> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF9F5; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0B1B3D; padding: 24px; text-align: center;">
          <h1 style="color: #D4AF37; margin: 0; font-size: 22px;">VIKRAM EDU CONSULTANTS</h1>
          <p style="color: #FFFFFF; margin: 4px 0 0 0; font-size: 14px;">Inquiry Received</p>
        </div>
        <div style="padding: 24px; color: #1E293B;">
          <p style="font-size: 16px; font-weight: bold; color: #0B1B3D;">Dear ${payload.name},</p>
          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            Thank you for reaching out to <strong>Vikram Edu Consultants</strong>. We have successfully received your inquiry regarding <strong>${payload.targetDestination || "Overseas Admissions"}</strong>.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            One of our senior education advisors will review your details and contact you within <strong>2 business hours</strong> to guide you through university selection, admission requirements, and scholarship eligibility.
          </p>
          <div style="background-color: #FFFFFF; padding: 16px; border-radius: 8px; border: 1px solid #E2E8F0; margin: 20px 0;">
            <p style="margin: 0; font-size: 13px; color: #64748B;">Need immediate assistance?</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold; color: #0B1B3D;">
              Call us at <a href="tel:${APP_CONFIG.contact.phone}" style="color: #D4AF37;">${APP_CONFIG.contact.phone}</a> or email <a href="mailto:${APP_CONFIG.contact.email}" style="color: #2563EB;">${APP_CONFIG.contact.email}</a>
            </p>
          </div>
          <p style="font-size: 13px; color: #94A3B8; margin-top: 24px;">
            Warm regards,<br />
            <strong>Admissions Team</strong><br />
            Vikram Edu Consultants Pvt Ltd
          </p>
        </div>
      </div>
    `;

    if (!this.resend) {
      logger.info("[Simulated Email] User confirmation skipped (Resend key missing).", { recipient: payload.email });
      return { success: true, id: "simulated-user-email-id" };
    }

    try {
      const response = await this.resend.emails.send({
        from: "Vikram Edu Consultants <onboarding@resend.dev>",
        to: [payload.email],
        subject: "We received your inquiry — Vikram Edu Consultants",
        html: htmlContent,
      });

      if (response.error) {
        logger.error("Resend API error sending user confirmation email", { error: response.error });
        return { success: false };
      }

      return { success: true, id: response.data?.id };
    } catch (error) {
      logger.error("Exception in sendUserConfirmationEmail", { error });
      return { success: false };
    }
  }

  /**
   * Sends consultation appointment confirmation email to the student.
   */
  async sendAppointmentConfirmationToStudent(payload: AppointmentNotificationPayload): Promise<{ success: boolean; id?: string }> {
    const formattedDate = payload.scheduledAt.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = payload.scheduledAt.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF9F5; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0B1B3D; padding: 24px; text-align: center;">
          <h1 style="color: #D4AF37; margin: 0; font-size: 22px;">VIKRAM EDU CONSULTANTS</h1>
          <p style="color: #FFFFFF; margin: 4px 0 0 0; font-size: 14px;">Consultation Appointment Confirmed</p>
        </div>
        <div style="padding: 24px; color: #1E293B;">
          <p style="font-size: 16px; font-weight: bold; color: #0B1B3D;">Dear ${payload.studentName},</p>
          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            Your 1-on-1 overseas education consultation has been successfully scheduled!
          </p>

          <div style="background-color: #FFFFFF; padding: 20px; border-radius: 10px; border: 1px solid #E2E8F0; margin: 20px 0;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #D4AF37; text-transform: uppercase;">Appointment Details</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #64748B; width: 140px;">Booking Ref:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #0F172A;">${payload.appointmentId}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748B;">Senior Advisor:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #0F172A;">${payload.counsellorName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748B;">Date & Time:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #0F172A;">${formattedDate} at ${formattedTime}</td>
              </tr>
              ${payload.targetCountry ? `
              <tr>
                <td style="padding: 6px 0; color: #64748B;">Target Country:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #0F172A;">${payload.targetCountry}</td>
              </tr>` : ""}
            </table>
          </div>

          ${payload.meetingUrl ? `
          <div style="text-align: center; margin: 24px 0;">
            <a href="${payload.meetingUrl}" style="display: inline-block; background-color: #0B1B3D; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px;">
              Join Video Consultation
            </a>
          </div>` : ""}

          <p style="font-size: 13px; color: #64748B;">
            Please ensure you have your transcripts, IELTS/TOEFL scores (if available), and target program preferences ready for the call.
          </p>
        </div>
      </div>
    `;

    if (!this.resend) {
      logger.info("[Simulated Email] Appointment confirmation skipped (Resend key missing).", { recipient: payload.studentEmail });
      return { success: true, id: "simulated-appt-email-id" };
    }

    try {
      const response = await this.resend.emails.send({
        from: "Vikram Edu Appointments <onboarding@resend.dev>",
        to: [payload.studentEmail],
        subject: `Consultation Confirmed with ${payload.counsellorName} — ${formattedDate}`,
        html: htmlContent,
      });

      if (response.error) {
        logger.error("Resend API error sending appointment confirmation to student", { error: response.error });
        return { success: false };
      }

      return { success: true, id: response.data?.id };
    } catch (error) {
      logger.error("Exception in sendAppointmentConfirmationToStudent", { error });
      return { success: false };
    }
  }

  /**
   * Sends appointment alert notification to the advisor / admissions team.
   */
  async sendAppointmentAlertToCounsellor(payload: AppointmentNotificationPayload): Promise<{ success: boolean; id?: string }> {
    const recipient = payload.counsellorEmail || APP_CONFIG.contact.email;
    const formattedDate = payload.scheduledAt.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = payload.scheduledAt.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF9F5; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0B1B3D; padding: 24px; text-align: center;">
          <h1 style="color: #D4AF37; margin: 0; font-size: 22px;">VIKRAM EDU CONSULTANTS</h1>
          <p style="color: #FFFFFF; margin: 4px 0 0 0; font-size: 14px;">New Booking Assigned: ${payload.counsellorName}</p>
        </div>
        <div style="padding: 24px; color: #1E293B;">
          <p style="font-size: 14px; color: #334155;">
            A new consultation appointment has been scheduled and assigned to <strong>${payload.counsellorName}</strong>.
          </p>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 16px 0;">
            <tr>
              <td style="padding: 6px 0; color: #64748B; width: 140px;">Student Name:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0F172A;">${payload.studentName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748B;">Student Email:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0F172A;"><a href="mailto:${payload.studentEmail}">${payload.studentEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748B;">Student Phone:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0F172A;">${payload.studentPhone || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748B;">Scheduled Time:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0F172A;">${formattedDate} at ${formattedTime}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748B;">Meeting Link:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #2563EB;">${payload.meetingUrl || "N/A"}</td>
            </tr>
          </table>

          ${payload.notes ? `
          <div style="background-color: #FFFFFF; padding: 12px; border-radius: 6px; border-left: 3px solid #D4AF37;">
            <p style="margin: 0; font-size: 13px; color: #475569;"><strong>Notes:</strong> ${payload.notes}</p>
          </div>` : ""}
        </div>
      </div>
    `;

    if (!this.resend) {
      logger.info("[Simulated Email] Counsellor appointment alert skipped (Resend key missing).", { recipient });
      return { success: true, id: "simulated-counsellor-email-id" };
    }

    try {
      const response = await this.resend.emails.send({
        from: "Vikram Edu System <onboarding@resend.dev>",
        to: [recipient],
        subject: `New Booking: ${payload.studentName} on ${formattedDate}`,
        html: htmlContent,
      });

      if (response.error) {
        logger.error("Resend API error sending appointment alert to counsellor", { error: response.error });
        return { success: false };
      }

      return { success: true, id: response.data?.id };
    } catch (error) {
      logger.error("Exception in sendAppointmentAlertToCounsellor", { error });
      return { success: false };
    }
  }
}

export const emailService = new EmailService();
