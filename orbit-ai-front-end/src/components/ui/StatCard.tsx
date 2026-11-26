import type { StatCardProps } from "../../types";
import { Sparkline } from "./Sparkline";
import { statIconStyles } from "./styles";

export function StatCard({
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
