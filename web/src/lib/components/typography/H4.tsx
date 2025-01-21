import { InlineHStyle } from "@/lib/types";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
} & InlineHStyle;

export const H4 = ({ children, ...style }: Props) => {
  return <h4 style={style}>{children}</h4>;
};
