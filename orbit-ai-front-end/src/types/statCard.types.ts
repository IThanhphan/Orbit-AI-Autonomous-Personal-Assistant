import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type SparklineColor = "purple" | "cyan" | "amber" | "green";
export type StatIconColor = "purple" | "teal" | "amber" | "green";

export interface StatCardProps {
  title: string;
  value: string | number;
  note?: ReactNode;
  icon: LucideIcon;
  color: StatIconColor;
  trend?: SparklineColor;
}