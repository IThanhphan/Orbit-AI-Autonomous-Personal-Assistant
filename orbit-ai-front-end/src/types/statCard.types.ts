// src/types/statCard.types.ts
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { SparklineColor, StatIconColor } from "./dashboard.types";

export interface StatCardProps {
  title: string;
  value: string;
  note: ReactNode;
  icon: LucideIcon;
  color: StatIconColor;
  trend?: SparklineColor;
}