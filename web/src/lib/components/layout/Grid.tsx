import { dankStylez, toCssVar } from "@/lib/magic";
import { InlineDivStyle } from "@/lib/types";
import { ReactNode } from "react";

type GridProps = {
  children?: ReactNode;
} & InlineDivStyle;

export const Grid = ({ children, ...style }: GridProps) => {
  return (
    <div style={{ display: "grid", ...dankStylez(style) }}>{children}</div>
  );
};
