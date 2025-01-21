import { InlineHStyle } from "@/lib/types";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
} & InlineHStyle;

export const H3 = ({ children, ...style }: Props) => {
  return <h3 style={style}>{children}</h3>;
};
