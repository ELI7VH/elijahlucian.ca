import { ReactNode } from "react";

import { InlineDivStyle } from "@/lib/types";
import { dankStylez } from "@/lib/magic";

type FlexProps = {
  children?: ReactNode;
} & InlineDivStyle;

export const Flex = ({ children, ...style }: FlexProps) => {
  return (
    <div
      style={{
        display: "flex",
        ...dankStylez(style),
      }}
    >
      {children}
    </div>
  );
};

export const FlexRow = (props: FlexProps) => {
  return <Flex alignItems="center" flexDirection="row" {...props} />;
};

export const FlexCol = (props: FlexProps) => {
  return <Flex flexDirection="column" {...props} />;
};
