import {
  Activity,
  BarChart3,
  CalendarDays,
  CheckSquare,
  FileText,
  GitBranch,
  LayoutDashboard,
  ListChecks,
  MessageCircle,
} from "lucide-react";
import type { NavItem, TaskItem, TimelineEntry } from "../types";

export const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Chat", icon: MessageCircle },
  { label: "Tasks", icon: CheckSquare },
  { label: "Plans", icon: ListChecks },
  { label: "Calendar", icon: CalendarDays },
  { label: "Activity", icon: Activity },
];

export const taskItems: TaskItem[] = [
  {
    title: "Summarize research papers",
    detail: "Processed 3 documents from arXiv",
    status: "Completed",
    time: "9:42 AM",
    icon: FileText,
    tone: "violet",
  },
  {
    title: "Prepare weekly report",
    detail: "Compile project report",
    status: "In progress",
    time: "9:28 AM",
    icon: BarChart3,
    tone: "blue",
  },
  {
    title: "Monitor GitHub repository",
    detail: "Check new issues and PRs",
    status: "Waiting approval",
    time: "9:15 AM",
    icon: GitBranch,
    tone: "neutral",
  },
];

export const timelineItems: TimelineEntry[] = [
  {
    state: "Thinking",
    detail: "Research Agent is analyzing your request...",
    time: "9:44 AM",
    color: "purple",
  },
  {
    state: "Working",
    detail: "Writer Agent is generating the report...",
    time: "9:28 AM",
    color: "cyan",
  },
  {
    state: "Completed",
    detail: "Monitor Agent finished checking GitHub.",
    time: "9:15 AM",
    color: "green",
  },
  {
    state: "Waiting for approval",
    detail: "Please review the suggested changes.",
    time: "9:10 AM",
    color: "amber",
  },
];