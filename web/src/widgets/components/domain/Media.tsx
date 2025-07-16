type Props = {
  //
  type: 'image' | 'video' | 'audio'
  url: string
  description: string
  comments: string[]
}

export const Media = ({ type, url }: Props) => {
  // s3 media show
  return <div>Media</div>
}
