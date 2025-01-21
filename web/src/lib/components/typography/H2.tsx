import { InlineHStyle } from "@/lib/types";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
} & InlineHStyle;

export const H2 = ({ children, ...style }: Props) => {
  return <h2 style={style}>{children}</h2>;
};
