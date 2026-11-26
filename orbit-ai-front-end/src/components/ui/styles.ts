import type {
  SparklineColor,
  StatIconColor,
  TaskStatus,
  TaskTone,
  TimelineColor,
} from "../../types";

/* Sử dụng CSS variables để màu biểu đồ tự thích nghi Light/Dark */
export const sparklineStyles: Record<
  SparklineColor,
  { path: string; stroke: string }
> = {
  purple: {
    path: "M2 30 C15 18 20 36 34 26 S51 31 65 20 S82 34 98 9",
    stroke: "var(--color-primary)",
  },
  cyan: {
    path: "M2 32 C16 28 18 35 31 23 S46 30 60 17 S79 26 98 7",
    stroke: "var(--color-secondary)",
  },
  amber: {
    path: "M2 31 C14 24 20 34 32 22 S49 31 64 14 S82 20 98 5",
    stroke: "var(--color-warning)",
  },
  green: {
    path: "M2 29 C14 22 21 32 33 19 S48 29 62 15 S82 22 98 4",
    stroke: "var(--color-success)",
  },
};

export const statIconStyles: Record<StatIconColor, string> = {
  purple: "bg-primary-soft text-primary",
  teal: "bg-success-soft text-secondary",
  amber: "bg-warning-soft text-warning",
  green: "bg-success-soft text-success",
};

export const taskIconStyles: Record<TaskTone, string> = {
  violet: "bg-primary-soft text-primary",
  blue: "bg-info-soft text-info",
  neutral: "bg-surface-muted text-text-secondary",
};

export const statusStyles: Record<TaskStatus, string> = {
  Completed: "text-success bg-success-soft",
  "In progress": "text-info bg-info-soft",
  "Waiting approval": "text-warning bg-warning-soft",
};

export const timelineStyles: Record<
  TimelineColor,
  { dot: string; title: string }
> = {
  purple: { dot: "bg-primary", title: "text-primary" },
  cyan: { dot: "bg-secondary", title: "text-secondary" },
  green: { dot: "bg-success", title: "text-success" },
  amber: { dot: "bg-warning", title: "text-warning" },
};

export const navItemBase =
  "flex h-[48px] w-full cursor-pointer items-center gap-[14px] rounded-[12px] border-0 px-[16px] text-left text-[14px] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const iconBtnClass =
  "grid h-[38px] w-[38px] cursor-pointer place-items-center rounded-[10px] border border-border bg-surface text-text-secondary transition-colors duration-150 hover:bg-surface-muted hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const moreBtnClass =
  "grid h-[30px] w-[26px] shrink-0 cursor-pointer place-items-center rounded-[10px] border-0 bg-transparent text-text-secondary transition-colors duration-150 hover:bg-surface-muted hover:text-text min-[761px]:w-[30px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const primaryBtnClass =
  "inline-flex h-[40px] cursor-pointer items-center justify-center gap-[8px] rounded-[10px] border border-transparent bg-primary px-[12px] text-[12px] font-semibold text-white transition-[background,transform] duration-150 hover:-translate-y-px hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 min-[761px]:h-[42px] min-[761px]:px-[17px] min-[761px]:text-[13px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const panelClass =
  "min-w-0 overflow-hidden rounded-[16px] border border-border bg-surface transition-colors duration-150";
