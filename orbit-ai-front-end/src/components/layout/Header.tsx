import { Menu, Moon, Plus, Sun, X } from "lucide-react";
import type { Theme } from "../../types";
import { iconBtnClass, primaryBtnClass } from "../ui/styles";

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export function Header({
  theme,
  onToggleTheme,
  menuOpen,
  onToggleMenu,
}: HeaderProps) {
  return (
    <header className="mb-[24px] flex items-start justify-between gap-[12px] max-[430px]:flex-wrap min-[761px]:mb-[28px] min-[761px]:items-center min-[761px]:gap-[20px]">
      <button
        type="button"
        className="mt-px hidden h-[38px] w-[38px] shrink-0 cursor-pointer place-items-center rounded-[10px] border border-border bg-surface text-text max-[760px]:grid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onClick={onToggleMenu}
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
          onClick={onToggleTheme}
          className={iconBtnClass}
          title={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
          aria-label={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <div className="border-r border-border pr-[16px] text-[13px] whitespace-nowrap text-text-secondary max-[760px]:hidden">
          Tue, Nov 24, 2026
        </div>
        <button type="button" className={primaryBtnClass}>
          <Plus size={17} />
          New task
        </button>
      </div>
    </header>
  );
}
