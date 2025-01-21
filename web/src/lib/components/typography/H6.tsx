import { InlineHStyle } from "@/lib/types";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
} & InlineHStyle;

export const H6 = ({ children, ...style }: Props) => {
  return <h6 style={style}>{children}</h6>;
};
