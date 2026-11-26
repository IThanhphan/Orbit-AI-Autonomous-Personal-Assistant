import { useState } from "react";
import { Bell, ChevronDown, Orbit, Settings } from "lucide-react";
import { navItems } from "../../services/dashboardMock";
import { navItemBase } from "../ui/styles";

interface SidebarProps {
  active: string;
  onSelect: (label: string) => void;
  menuOpen: boolean;
  onCloseMenu: () => void;
}

export function Sidebar({
  active,
  onSelect,
  menuOpen,
  onCloseMenu,
}: SidebarProps) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
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
          {navItems.map(({ label, icon: Icon }) => {
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
                  onSelect(label);
                  onCloseMenu();
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
            onClick={() => onSelect("Notifications")}
          >
            <Bell
              size={20}
              className={
                active === "Notifications" ? "text-primary" : undefined
              }
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
            onClick={() => onSelect("Settings")}
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
                  onSelect("Settings");
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
          onClick={onCloseMenu}
        />
      )}
    </>
  );
}
