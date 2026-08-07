import React from "react";
import { Badge } from "@/design-system";
import { AppointmentStatus } from "@prisma/client";

export interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
}

export const AppointmentStatusBadge: React.FC<AppointmentStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "SCHEDULED":
      return <Badge variant="gold" size="sm">Scheduled</Badge>;
    case "COMPLETED":
      return <Badge variant="success" size="sm">Completed</Badge>;
    case "CANCELLED":
      return <Badge variant="error" size="sm">Cancelled</Badge>;
    case "NO_SHOW":
      return <Badge variant="warning" size="sm">No Show</Badge>;
    default:
      return <Badge variant="outline" size="sm">{status}</Badge>;
  }
};
