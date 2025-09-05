export type UUID = string;

export interface HealthStatus {
  status: "ok" | "degraded" | "down";
  time: string; // ISO 8601
}

export interface Site {
  id: UUID;
  name: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Inspection {
  id: UUID;
  siteId: UUID;
  inspector: string;
  scheduledAt: string;
  completedAt?: string;
  notes?: string;
}