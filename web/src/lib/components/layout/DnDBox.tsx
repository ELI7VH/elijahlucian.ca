import { Box, BoxProps } from './Box'

type DnDBoxProps = BoxProps & {
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void
}

export const DnDBox = ({ onDrop, ...props }: DnDBoxProps) => {
  // a box, but with drag and drop functionality
  // when you drag over it, it changes color
  // when you drop it, it changes color
  // when you drag it, it changes color
  // when you drop it, it changes color

  return <Box {...props}>DnDBox</Box>
}
