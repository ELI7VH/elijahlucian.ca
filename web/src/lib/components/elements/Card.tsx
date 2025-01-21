import { InlineDivStyle } from "@/lib/types";
import { FlexCol } from "../layout/Flex";
import { Grid } from "../layout/Grid";

type Props = InlineDivStyle & {
  children?: React.ReactNode;
};

export const Card = ({ children, ...style }: Props) => {
  // select on all h1,2,3,4,5,6 and --brand-5
  return (
    <Grid>
      <FlexCol
        gridArea="1/1/1/1"
        gap="1rem"
        padding="1rem"
        border="1px solid"
        alignContent="start"
        boxShadow="var(--box-shadow)"
        bg="cool-bg"
        {...style}
      >
        {children}
      </FlexCol>
      <FlexCol
        gridArea="1/1/1/1"
        bg="background-image-2"
        opacity={0.4}
        pointerEvents="none"
      />
    </Grid>
  );
};
