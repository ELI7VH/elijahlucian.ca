import { Box, Button, FlexRow, H3 } from '@/lib'

type Props = {
  name: string
  title: string
  descrption: string
  category: string
  url: string
  posts: string[] // urls -> or ids in the future? url is primary key! - hashed urls are the id. omg.
  comments: string[]
  onUpdate: () => any
  onDelete: () => any
}

export const Post = ({ title }: Props) => {
  //
  return (
    <Box>
      <FlexRow>
        <H3>{title}</H3>
        <Button>share</Button>
      </FlexRow>
      <Box></Box>
      <Box>content</Box>
      <FlexRow>references, to, other, posts</FlexRow>
    </Box>
  )
}
