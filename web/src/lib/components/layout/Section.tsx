import { InlineDivStyle } from "@/lib/types";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
} & InlineDivStyle;

export const Section = ({ children, ...style }: Props) => {
  return (
    <section style={{ display: "grid", gap: "1rem", ...style }}>
      {children}
    </section>
  );
};
