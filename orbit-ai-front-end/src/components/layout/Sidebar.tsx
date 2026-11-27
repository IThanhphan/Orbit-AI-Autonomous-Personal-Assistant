import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Orbit,
  Settings,
} from "lucide-react";
import { navItems } from "../../services/dashboardMock";
import { navItemBase } from "../ui/styles";

interface SidebarProps {
  menuOpen: boolean;
  onCloseMenu: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  menuOpen,
  onCloseMenu,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    `${navItemBase} no-underline ${
      collapsed ? "min-[761px]:justify-center min-[761px]:px-0" : ""
    } ${
      isActive
        ? "bg-primary-soft font-semibold text-primary"
        : "bg-transparent text-text-secondary hover:bg-surface-muted hover:text-text"
    }`;

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-20 flex flex-col border-r border-border bg-surface pt-[28px] pb-[18px] transition-all duration-200 ease-out max-[760px]:w-[260px] max-[760px]:-translate-x-full max-[760px]:px-[16px] max-[760px]:shadow-none ${
          menuOpen
            ? "max-[760px]:translate-x-0 max-[760px]:shadow-[var(--shadow-floating)]"
            : ""
        } ${
          collapsed
            ? "min-[761px]:w-[82px] min-[761px]:px-[12px]"
            : "min-[761px]:w-[230px] min-[761px]:px-[16px] min-[1151px]:w-[260px]"
        }`}
      >
        {/* Nút thu gọn / mở rộng (chỉ hiện trên tablet/desktop) */}
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Mở rộng thanh bên" : "Thu gọn thanh bên"}
          title={collapsed ? "Mở rộng thanh bên" : "Thu gọn thanh bên"}
          className="absolute top-[38px] -right-[13px] z-30 hidden h-[26px] w-[26px] cursor-pointer place-items-center rounded-full border border-border bg-surface text-text-secondary shadow-sm transition-colors hover:bg-surface-muted hover:text-text min-[761px]:grid"
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>

        {/* Logo */}
        <NavLink
          to="/"
          onClick={onCloseMenu}
          title="Orbit AI"
          className={`flex items-center gap-[12px] pb-[42px] no-underline ${
            collapsed
              ? "min-[761px]:justify-center min-[761px]:px-0"
              : "px-[7px]"
          }`}
        >
          <div
            className={`grid shrink-0 -rotate-12 place-items-center rounded-[14px] bg-primary-soft text-primary transition-all ${
              collapsed ? "h-[46px] w-[46px]" : "h-[54px] w-[54px]"
            }`}
          >
            <Orbit size={collapsed ? 26 : 32} />
          </div>

          <div className={collapsed ? "min-[761px]:hidden" : ""}>
            <div className="text-[20px] font-semibold tracking-[-0.4px] text-text">
              Orbit AI
            </div>
            <div className="mt-[3px] text-[12px] leading-[1.4] text-text-secondary">
              Autonomous Personal
              <br />
              Assistant
            </div>
          </div>
        </NavLink>

        {/* Navigation */}
        <nav className="flex flex-col gap-[7px]" aria-label="Main navigation">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              title={collapsed ? label : undefined}
              className={getNavClassName}
              onClick={onCloseMenu}
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <Icon
                    size={20}
                    className={`shrink-0 ${isActive ? "text-primary" : ""}`}
                  />
                  <span className={collapsed ? "min-[761px]:hidden" : ""}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}

          <div className="mx-[8px] my-[16px] h-px bg-border" />

          <NavLink
            to="/notifications"
            title={collapsed ? "Notifications" : undefined}
            className={getNavClassName}
            onClick={onCloseMenu}
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <Bell
                  size={20}
                  className={`shrink-0 ${isActive ? "text-primary" : ""}`}
                />
                <span className={collapsed ? "min-[761px]:hidden" : ""}>
                  Notifications
                </span>
              </>
            )}
          </NavLink>
        </nav>

        {/* Footer: Settings + User Profile */}
        <div className="relative mt-auto">
          <NavLink
            to="/settings"
            title={collapsed ? "Settings" : undefined}
            className={getNavClassName}
            onClick={onCloseMenu}
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <Settings
                  size={20}
                  className={`shrink-0 ${isActive ? "text-primary" : ""}`}
                />
                <span className={collapsed ? "min-[761px]:hidden" : ""}>
                  Settings
                </span>
              </>
            )}
          </NavLink>

          <button
            type="button"
            title={collapsed ? "Thanh Phan (thanhphan@ntu.edu.vn)" : undefined}
            className={`mt-[14px] flex w-full cursor-pointer items-center gap-[10px] border-0 border-t border-border bg-transparent pt-[15px] pb-[2px] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              collapsed
                ? "min-[761px]:justify-center min-[761px]:px-0"
                : "px-[4px]"
            }`}
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="grid h-[40px] w-[40px] shrink-0 place-items-center rounded-full bg-primary text-[13px] font-bold text-white">
              TP
            </div>
            <div
              className={`flex min-w-0 flex-1 flex-col gap-[3px] ${
                collapsed ? "min-[761px]:hidden" : ""
              }`}
            >
              <strong className="text-[13px] font-semibold text-text">
                Thanh Phan
              </strong>
              <small className="truncate text-[11px] text-text-muted">
                thanhphan@ntu.edu.vn
              </small>
            </div>
            <ChevronDown
              size={17}
              className={`text-text-muted ${
                collapsed ? "min-[761px]:hidden" : ""
              }`}
            />
          </button>

          {showProfile && (
            <div
              className={`absolute bottom-[68px] left-0 flex flex-col gap-[7px] rounded-[12px] border border-border bg-surface p-[14px] text-[13px] shadow-[var(--shadow-floating)] ${
                collapsed ? "w-[220px]" : "right-0"
              }`}
            >
              <strong className="text-text">Thanh Phan</strong>
              <span className="text-[12px] text-text-muted">
                Personal workspace
              </span>
              <button
                type="button"
                className="mt-[7px] cursor-pointer rounded-[8px] border-0 bg-primary-soft p-[8px] text-left font-medium text-primary transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => {
                  navigate("/settings");
                  setShowProfile(false);
                  onCloseMenu();
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
