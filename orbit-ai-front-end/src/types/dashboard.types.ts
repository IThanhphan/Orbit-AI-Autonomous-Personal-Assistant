import type { LucideIcon } from "lucide-react";

export type Theme = "light" | "dark";

export type SparklineColor = "purple" | "cyan" | "amber" | "green";
export type StatIconColor = "purple" | "teal" | "amber" | "green";
export type TaskTone = "violet" | "blue" | "neutral";
export type TaskStatus = "Completed" | "In progress" | "Waiting approval";
export type TimelineColor = "purple" | "cyan" | "green" | "amber";

export interface NavItem {
  label: string;
  icon: LucideIcon;
}

export interface TaskItem {
  title: string;
  detail: string;
  status: TaskStatus;
  time: string;
  icon: LucideIcon;
  tone: TaskTone;
}

export interface TimelineEntry {
  state: string;
  detail: string;
  time: string;
  color: TimelineColor;
}