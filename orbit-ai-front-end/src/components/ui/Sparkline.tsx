import type { SparklineColor } from "../../types";
import { sparklineStyles } from "./styles";

export function Sparkline({ color = "purple" }: { color?: SparklineColor }) {
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
