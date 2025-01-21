import { InlineDivStyle } from "@/lib/types";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
} & InlineDivStyle;

export const Page = ({ children, ...style }: Props) => {
  return (
    <div
      style={{
        margin: "0 auto",
        display: "grid",
        gap: "1rem",
        padding: "1rem",
        width: "100%",
        maxWidth: "1200px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
