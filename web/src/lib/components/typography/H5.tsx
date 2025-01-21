import { InlineHStyle } from "@/lib/types";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
} & InlineHStyle;

export const H5 = ({ children, ...style }: Props) => {
  return <h5 style={style}>{children}</h5>;
};
