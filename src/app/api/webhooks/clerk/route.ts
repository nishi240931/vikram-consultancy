import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { userSyncService } from "@/services/user-sync.service";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Signature verification if webhook secret is configured
  if (WEBHOOK_SECRET) {
    if (!svix_id || !svix_timestamp || !svix_signature) {
      logger.warn("Clerk Webhook received missing svix headers");
      return new Response("Missing svix headers", { status: 400 });
    }

    const wh = new Webhook(WEBHOOK_SECRET);
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      logger.error("Error verifying Clerk webhook signature", { err });
      return new Response("Invalid webhook signature", { status: 400 });
    }
  } else {
    // In dev mode without secret, treat payload as event
    evt = payload as WebhookEvent;
  }

  const eventType = evt.type;
  logger.info(`Received Clerk Webhook Event: ${eventType}`);

  try {
    if (eventType === "user.created" || eventType === "user.updated") {
      const { id, email_addresses, primary_email_address_id, first_name, last_name, image_url } =
        evt.data;

      const primaryEmail = email_addresses?.find(
        (email) => email.id === primary_email_address_id
      )?.email_address;

      if (id && primaryEmail) {
        await userSyncService.syncClerkUser({
          clerkUserId: id,
          email: primaryEmail,
          firstName: first_name || null,
          lastName: last_name || null,
          avatarUrl: image_url || null,
        });
      }
    } else if (eventType === "user.deleted") {
      const { id } = evt.data;
      if (id) {
        await userSyncService.deleteClerkUser(id);
      }
    }

    return NextResponse.json({ success: true, eventType }, { status: 200 });
  } catch (error) {
    logger.error(`Error processing Clerk Webhook Event: ${eventType}`, { error });
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
