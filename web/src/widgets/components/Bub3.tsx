import { Button } from '@/lib'

import { FlexCol, FlexRow, P } from '@/lib'
import { toRelative } from '@/lib/magic'
import { Filter } from 'bad-words'

type Props = {
  id: string
  title: string
  text: string
  createdAt: string
  onDestroy?: () => void
  highlight?: boolean
  selected?: boolean
}

export const Bub3 = ({
  id,
  title,
  text,
  createdAt,
  onDestroy,
  highlight,
  selected,
}: Props) => {
  const filter = new Filter({ placeHolder: 'x' })
  // todo: scale to new size.
  // todo: replace swears with the cool dos shit
  // todo: grow upwards to full size.
  // todo: generative ambience background.
  // like noise or smth. but maybe time / music based. (component)
  // as in the component is the generative ambience background component.

  return (
    <FlexRow
      key={id}
      gap="0.5rem"
      padding="0.5rem 1rem"
      alignItems="center"
      justifyContent="space-between"
      background={highlight ? 'rgba(255,255,255,0.1)' : 'var(--brand-1)'}
      boxShadow="0.5rem 0.5rem 0 0 rgba(0, 0, 0, 0.9)"
    >
      <FlexCol gap="0.25rem">
        <FlexRow gap="1rem" textShadow="1px 1px 1px var(--text-dark-muted)">
          {title && (
            <P
              color="var(--text-muted)"
              textTransform="uppercase"
              fontWeight="light"
              background="#000"
              padding="0.25rem 0.5rem"
            >
              {title}
            </P>
          )}
          <P>{filter.clean(text)}</P>
        </FlexRow>
        <FlexRow gap="0.25rem" justifyContent="flex-end">
          <P color="var(--text-dark-muted)">{toRelative(createdAt)}</P>
        </FlexRow>
      </FlexCol>
      <Button variant="ghost" size="small" onClick={onDestroy}>
        ☞
      </Button>
    </FlexRow>
  )
}
