import { ReactNode } from "react";
import { InlineDivStyle } from "@/lib/types";
import { dankStylez } from "@/lib/magic";

type BoxProps = {
  children?: ReactNode;
} & InlineDivStyle;

export const Box = ({ children, ...style }: BoxProps) => {
  return <div style={{ ...dankStylez(style) }}>{children}</div>;
};
