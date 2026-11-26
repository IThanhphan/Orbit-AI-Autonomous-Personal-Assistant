import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { Header } from "../components/layout/Header";
import {
  Activity,
  ArrowRight,
  Bot,
  Check,
  CheckSquare,
  CircleHelp,
  Clock,
  MoreVertical,
  RefreshCw,
  Trophy,
} from "lucide-react";
import { StatCard } from "../components/ui/StatCard";
import {
  moreBtnClass,
  panelClass,
  statusStyles,
  taskIconStyles,
  timelineStyles,
} from "../components/ui/styles";
import { taskItems, timelineItems } from "../services/dashboardMock";

interface DashboardPageProps {
  onNavigate: (tab: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
      />
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
              onClick={() => onNavigate("Tasks")}
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
                    {task.status === "Waiting approval" && <Clock size={13} />}
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
            {timelineItems.map((item, idx) => (
              <div
                className={`relative flex gap-[15px] py-[13px] pl-[3px] ${
                  idx !== timelineItems.length - 1
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
    </>
  );
}
