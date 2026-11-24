import { useEffect, useState } from "react";
import {
  Orbit,
  LayoutDashboard,
  MessageCircle,
  Bot,
  CheckSquare,
  Activity,
  Settings,
  ChevronDown,
  Sun,
  Moon,
  Plus,
  ArrowRight,
  Check,
  FileText,
  BarChart3,
  GitBranch,
  Clock,
  Trophy,
  CalendarDays,
  RefreshCw,
  MoreVertical,
  CircleHelp,
  Menu,
  X,
  ListChecks,
  Bell
} from "lucide-react";

import type { SparklineColor, StatCardProps, StatIconColor } from "./types";

type Theme = "light" | "dark";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Chat", icon: MessageCircle },
  { label: "Tasks", icon: CheckSquare },
  { label: "Plans", icon: ListChecks },
  { label: "Calendar", icon: CalendarDays },
  { label: "Activity", icon: Activity },
];

type TaskTone = "violet" | "blue" | "neutral";
type TaskStatus = "Completed" | "In progress" | "Waiting approval";

const taskItems: {
  title: string;
  detail: string;
  status: TaskStatus;
  time: string;
  icon: typeof FileText;
  tone: TaskTone;
}[] = [
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

type TimelineColor = "purple" | "cyan" | "green" | "amber";

const timeline: {
  state: string;
  detail: string;
  time: string;
  color: TimelineColor;
}[] = [
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

/* Sử dụng CSS variables để màu biểu đồ tự thích nghi Light/Dark */
const sparklineStyles: Record<
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

const statIconStyles: Record<StatIconColor, string> = {
  purple: "bg-primary-soft text-primary",
  teal: "bg-success-soft text-secondary",
  amber: "bg-warning-soft text-warning",
  green: "bg-success-soft text-success",
};

const taskIconStyles: Record<TaskTone, string> = {
  violet: "bg-primary-soft text-primary",
  blue: "bg-info-soft text-info",
  neutral: "bg-surface-muted text-text-secondary",
};

const statusStyles: Record<TaskStatus, string> = {
  Completed: "text-success bg-success-soft",
  "In progress": "text-info bg-info-soft",
  "Waiting approval": "text-warning bg-warning-soft",
};

const timelineStyles: Record<TimelineColor, { dot: string; title: string }> = {
  purple: { dot: "bg-primary", title: "text-primary" },
  cyan: { dot: "bg-secondary", title: "text-secondary" },
  green: { dot: "bg-success", title: "text-success" },
  amber: { dot: "bg-warning", title: "text-warning" },
};

function Sparkline({ color = "purple" }: { color?: SparklineColor }) {
  const item = sparklineStyles[color] || sparklineStyles.purple;
  return (
    <svg
      className="pointer-events-none absolute right-[7px] bottom-[17px] h-[45px] w-[75px] opacity-95 max-[430px]:w-[66px] min-[761px]:right-[13px] min-[761px]:bottom-[22px] min-[761px]:w-[100px]"
      viewBox="0 0 100 40"
      aria-hidden="true"
    >
      <path
        d={item.path}
        fill="none"
        stroke={item.stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatCard({
  title,
  value,
  note,
  icon: Icon,
  color,
  trend = "purple",
}: StatCardProps) {
  return (
    <article className="relative h-[138px] overflow-hidden rounded-[16px] border border-border bg-surface p-[14px] transition-colors duration-150 min-[761px]:h-[145px] min-[761px]:p-[16px] min-[1401px]:h-[155px] min-[1401px]:px-[22px] min-[1401px]:py-[20px]">
      <div
        className={`mb-[8px] grid h-[32px] w-[32px] place-items-center rounded-full min-[761px]:mb-[10px] min-[1401px]:h-[34px] min-[1401px]:w-[34px] ${statIconStyles[color]}`}
      >
        <Icon size={20} />
      </div>
      <div className="absolute top-[23px] left-[55px] text-[11px] font-medium text-text-secondary min-[761px]:left-[60px] min-[761px]:text-[12px] min-[1401px]:top-[27px] min-[1401px]:left-[70px] min-[1401px]:text-[14px]">
        {title}
      </div>
      <div className="text-[25px] leading-[1.1] font-semibold tracking-[-0.5px] text-text min-[761px]:text-[27px] min-[1401px]:text-[30px]">
        {value}
      </div>
      <div className="mt-[8px] text-[12px] text-text-muted">{note}</div>
      <Sparkline color={trend} />
    </article>
  );
}

const navItemBase =
  "flex h-[48px] w-full cursor-pointer items-center gap-[14px] rounded-[12px] border-0 px-[16px] text-left text-[14px] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const iconBtnClass =
  "grid h-[38px] w-[38px] cursor-pointer place-items-center rounded-[10px] border border-border bg-surface text-text-secondary transition-colors duration-150 hover:bg-surface-muted hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const moreBtnClass =
  "grid h-[30px] w-[26px] shrink-0 cursor-pointer place-items-center rounded-[10px] border-0 bg-transparent text-text-secondary transition-colors duration-150 hover:bg-surface-muted hover:text-text min-[761px]:w-[30px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const primaryBtnClass =
  "inline-flex h-[40px] cursor-pointer items-center justify-center gap-[8px] rounded-[10px] border border-transparent bg-primary px-[12px] text-[12px] font-semibold text-white transition-[background,transform] duration-150 hover:-translate-y-px hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 min-[761px]:h-[42px] min-[761px]:px-[17px] min-[761px]:text-[13px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const panelClass =
  "min-w-0 overflow-hidden rounded-[16px] border border-border bg-surface transition-colors duration-150";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("orbit-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [active, setActive] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("orbit-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-150">
      <aside
        className={`fixed inset-y-0 left-0 z-20 flex w-[260px] flex-col border-r border-border bg-surface px-[16px] pt-[28px] pb-[18px] transition-transform duration-200 ease-out max-[760px]:-translate-x-full max-[760px]:shadow-none ${
          menuOpen
            ? "max-[760px]:translate-x-0 max-[760px]:shadow-[var(--shadow-floating)]"
            : ""
        } min-[761px]:max-[1150px]:w-[230px]`}
      >
        <div className="flex items-center gap-[12px] px-[7px] pb-[42px]">
          <div className="grid h-[54px] w-[54px] -rotate-12 place-items-center rounded-[14px] bg-primary-soft text-primary">
            <Orbit size={32} />
          </div>
          <div>
            <div className="text-[20px] font-semibold tracking-[-0.4px] text-text">
              Orbit AI
            </div>
            <div className="mt-[3px] text-[12px] leading-[1.4] text-text-secondary">
              Autonomous Personal
              <br />
              Assistant
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-[7px]" aria-label="Main navigation">
          {nav.map(({ label, icon: Icon }) => {
            const isActive = active === label;
            return (
              <button
                type="button"
                key={label}
                className={`${navItemBase} ${
                  isActive
                    ? "bg-primary-soft font-semibold text-primary"
                    : "bg-transparent text-text-secondary hover:bg-surface-muted hover:text-text"
                }`}
                onClick={() => {
                  setActive(label);
                  setMenuOpen(false);
                }}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-primary" : undefined}
                />
                <span>{label}</span>
              </button>
            );
          })}
          <div className="mx-[8px] my-[16px] h-px bg-border" />
          <button
            type="button"
            className={`${navItemBase} ${
              active === "Notifications"
                ? "bg-primary-soft font-semibold text-primary"
                : "bg-transparent text-text-secondary hover:bg-surface-muted hover:text-text"
            }`}
            onClick={() => setActive("Notifications")}
          >
            <Bell
              size={20}
              className={active === "Notifications" ? "text-primary" : undefined}
            />
            <span>Notifications</span>
          </button>
        </nav>

        <div className="relative mt-auto">
          <button
            type="button"
            className={`${navItemBase} ${
              active === "Settings"
                ? "bg-primary-soft font-semibold text-primary"
                : "bg-transparent text-text-secondary hover:bg-surface-muted hover:text-text"
            }`}
            onClick={() => setActive("Settings")}
          >
            <Settings
              size={20}
              className={active === "Settings" ? "text-primary" : undefined}
            />
            <span>Settings</span>
          </button>

          <button
            type="button"
            className="mt-[14px] flex w-full cursor-pointer items-center gap-[10px] border-0 border-t border-border bg-transparent px-[4px] pt-[15px] pb-[2px] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="grid h-[40px] w-[40px] shrink-0 place-items-center rounded-full bg-primary text-[13px] font-bold text-white">
              TP
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
              <strong className="text-[13px] font-semibold text-text">
                Thanh Phan
              </strong>
              <small className="truncate text-[11px] text-text-muted">
                thanhphan@ntu.edu.vn
              </small>
            </div>
            <ChevronDown size={17} className="text-text-muted" />
          </button>

          {showProfile && (
            <div className="absolute right-0 bottom-[68px] left-0 flex flex-col gap-[7px] rounded-[12px] border border-border bg-surface p-[14px] text-[13px] shadow-[var(--shadow-floating)]">
              <strong className="text-text">Thanh Phan</strong>
              <span className="text-[12px] text-text-muted">
                Personal workspace
              </span>
              <button
                type="button"
                className="mt-[7px] cursor-pointer rounded-[8px] border-0 bg-primary-soft p-[8px] text-left font-medium text-primary transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => {
                  setActive("Settings");
                  setShowProfile(false);
                }}
              >
                Account settings
              </button>
            </div>
          )}
        </div>
      </aside>

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[15] hidden cursor-pointer border-0 bg-[var(--backdrop-overlay)] max-[760px]:block"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main className="max-w-[1800px] px-[16px] pt-[20px] pb-[24px] min-[761px]:ml-[230px] min-[761px]:px-[24px] min-[761px]:py-[32px] min-[1151px]:ml-[260px] min-[1401px]:px-[36px] min-[1401px]:pt-[38px] min-[1401px]:pb-[26px]">
        <header className="mb-[24px] flex items-start justify-between gap-[12px] max-[430px]:flex-wrap min-[761px]:mb-[28px] min-[761px]:items-center min-[761px]:gap-[20px]">
          <button
            type="button"
            className="mt-px hidden h-[38px] w-[38px] shrink-0 cursor-pointer place-items-center rounded-[10px] border border-border bg-surface text-text max-[760px]:grid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="m-0 text-[25px] leading-[1.3] font-semibold tracking-[-0.8px] text-text min-[761px]:text-[32px] min-[761px]:leading-[1.2]">
              Good morning, Thanh{" "}
              <span className="text-[21px] min-[761px]:text-[26px]">👋</span>
            </h1>
            <p className="mt-[8px] mb-0 text-[13px] leading-[1.45] text-text-secondary min-[761px]:text-[16px] min-[761px]:leading-normal">
              Here&apos;s what&apos;s happening with your workspace today.
            </p>
          </div>

          <div className="flex items-center gap-[8px] max-[430px]:ml-auto min-[761px]:gap-[14px]">
            <button
              type="button"
              onClick={toggleTheme}
              className={iconBtnClass}
              title={
                theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
              aria-label={
                theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <div className="border-r border-border pr-[16px] text-[13px] whitespace-nowrap text-text-secondary max-[760px]:hidden">
              Tue, Nov 24, 2026
            </div>
            <button
              type="button"
              className={primaryBtnClass}
            >
              <Plus size={17} />
              New task
            </button>
          </div>
        </header>

        <section
          className="mb-[18px] grid grid-cols-2 gap-[10px] min-[761px]:mb-[26px] min-[761px]:gap-[12px] min-[1151px]:grid-cols-4 min-[1401px]:gap-[16px]"
          aria-label="Workspace statistics"
        >
          <StatCard
            title="Tasks completed"
            value="24"
            note={
              <>
                <span className="font-semibold text-success">↑ +12%</span> this
                week
              </>
            }
            icon={CheckSquare}
            color="purple"
            trend="purple"
          />
          <StatCard
            title="Agent status"
            value="Running"
            note="Agents running"
            icon={Bot}
            color="teal"
            trend="cyan"
          />
          <StatCard
            title="Time saved"
            value="8.4h"
            note="This week"
            icon={Clock}
            color="amber"
            trend="amber"
          />
          <StatCard
            title="Success rate"
            value="96.8%"
            note="Across all tasks"
            icon={Trophy}
            color="green"
            trend="green"
          />
        </section>

        <section className="mb-[16px] grid grid-cols-1 gap-[16px] min-[1151px]:mb-[26px] min-[1151px]:grid-cols-[minmax(0,1.85fr)_minmax(300px,1fr)] min-[1151px]:gap-[22px]">
          <article className={panelClass}>
            <div className="flex min-h-[60px] items-center justify-between gap-[10px] border-b border-border px-[16px] min-[761px]:min-h-[66px] min-[761px]:px-[22px]">
              <div className="flex items-center gap-[13px] text-text-secondary">
                <Activity size={20} />
                <h2 className="m-0 text-[16px] font-semibold tracking-[-0.2px] text-text min-[761px]:text-[18px]">
                  Recent tasks
                </h2>
              </div>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-[7px] border-0 bg-transparent text-[13px] font-medium whitespace-nowrap text-primary hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => setActive("Tasks")}
              >
                View all <ArrowRight size={15} />
              </button>
            </div>

            <div>
              {taskItems.map((task) => {
                const TaskIcon = task.icon;
                return (
                  <div
                    className="flex min-h-[80px] flex-wrap items-center gap-[9px] border-b border-border px-[10px] py-[12px] last:border-b-0 min-[431px]:flex-nowrap min-[761px]:min-h-[88px] min-[761px]:gap-[10px] min-[761px]:py-[12px] min-[761px]:pr-[17px] min-[761px]:pl-[14px] min-[1401px]:gap-[14px] min-[1401px]:pl-[20px]"
                    key={task.title}
                  >
                    <div
                      className={`grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[12px] min-[761px]:h-[43px] min-[761px]:w-[43px] ${taskIconStyles[task.tone]}`}
                    >
                      <TaskIcon size={20} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-[5px] max-[430px]:basis-[calc(100%-55px)]">
                      <strong className="truncate text-[12px] font-medium text-text min-[761px]:text-[13px]">
                        {task.title}
                      </strong>
                      <span className="truncate text-[10px] text-text-secondary min-[761px]:text-[12px]">
                        {task.detail}
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-[5px] rounded-full px-[7px] py-[6px] text-[10px] font-medium whitespace-nowrap max-[430px]:ml-[48px] min-[761px]:px-[8px] min-[761px]:text-[11px] min-[1401px]:px-[10px] min-[1401px]:py-[7px] ${statusStyles[task.status]}`}
                    >
                      {task.status === "Completed" && <Check size={13} />}
                      {task.status === "In progress" && <RefreshCw size={13} />}
                      {task.status === "Waiting approval" && (
                        <Clock size={13} />
                      )}
                      {task.status}
                    </span>
                    <span className="text-[10px] whitespace-nowrap text-text-muted max-[430px]:ml-auto min-[761px]:text-[11px]">
                      {task.time}
                    </span>
                    <button
                      type="button"
                      className={moreBtnClass}
                      aria-label="Task options"
                    >
                      <MoreVertical size={17} />
                    </button>
                  </div>
                );
              })}
            </div>
          </article>

          <article className={panelClass}>
            <div className="flex min-h-[60px] items-center justify-between gap-[10px] px-[16px] min-[761px]:min-h-[66px] min-[761px]:px-[22px]">
              <div className="flex items-center gap-[13px] text-text-secondary">
                <Activity size={20} />
                <h2 className="m-0 text-[16px] font-semibold tracking-[-0.2px] text-text min-[761px]:text-[18px]">
                  Agent activity
                </h2>
              </div>
              <button
                type="button"
                className={moreBtnClass}
                aria-label="More activity options"
              >
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 px-[18px] pt-[4px] pb-[12px] min-[761px]:max-[1150px]:grid-cols-2 min-[761px]:max-[1150px]:gap-x-[22px] min-[761px]:px-[20px] min-[761px]:pt-[3px] min-[761px]:pb-[18px]">
              {timeline.map((item, idx) => (
                <div
                  className={`relative flex gap-[15px] py-[13px] pl-[3px] ${
                    idx !== timeline.length - 1
                      ? `before:absolute before:top-[25px] before:bottom-[-13px] before:left-[7px] before:w-px before:bg-border ${
                          idx === 1
                            ? "min-[761px]:max-[1150px]:before:hidden"
                            : ""
                        }`
                      : ""
                  }`}
                  key={item.state}
                >
                  <div
                    className={`z-[1] mt-[3px] h-[14px] w-[14px] shrink-0 rounded-full ${timelineStyles[item.color].dot}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-[12px]">
                      <strong
                        className={`text-[13px] font-medium ${timelineStyles[item.color].title}`}
                      >
                        {item.state}
                      </strong>
                      <time className="text-[11px] whitespace-nowrap text-text-muted">
                        {item.time}
                      </time>
                    </div>
                    <p className="mt-[6px] mb-0 text-[11.5px] leading-[1.5] text-text-secondary">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <footer className="mt-[22px] flex items-center gap-[8px] text-[11px] leading-[1.5] text-text-muted min-[761px]:leading-normal">
          <CircleHelp size={15} className="shrink-0" /> Orbit AI keeps you in
          control. Review agent actions before they affect your connected apps.
        </footer>
      </main>
    </div>
  );
}

export default App;
