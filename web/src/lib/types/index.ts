export type BaseAttr = React.HTMLAttributes<HTMLDivElement>['style']

export type InlineDivStyle = React.HTMLAttributes<HTMLDivElement>['style'] &
  InlineColors

export type InlinePStyle = React.HTMLAttributes<HTMLParagraphElement>['style'] &
  InlineColors

export type InlineHStyle = React.HTMLAttributes<HTMLHeadingElement>['style'] &
  InlineColors

export type InlineInputStyle = React.HTMLAttributes<HTMLInputElement>['style'] &
  InlineColors

export type InlineColors = {
  bg?: string // now to somehow defined these based on a theme thingy and we goooood
  col?: string
}
