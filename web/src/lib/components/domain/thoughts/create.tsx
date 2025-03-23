import { useEffect, useState } from 'react'
import { Grid } from '../../layout/Grid'
import { FlexRow } from '../../layout/Flex'
import { P } from '../../typography/P'
import { Input } from '../../form/Input'
import { TextArea } from '../../form/TextArea'
import { Button } from '../../elements/Button'
import { useToast } from '@/lib/hooks/useToast'
import { useThoughts } from '@/lib/hooks/api/useThoughts'

type Props = {
  title?: string
  text?: string
}

export const ThoughtCreate = ({ title, text }: Props) => {
  const [formTitle, setFormTitle] = useState(title || '')
  const [formText, setFormText] = useState(text || '')

  const thoughts = useThoughts()

  const { toast } = useToast()

  const handleSubmit = async () => {
    await thoughts.create.mutateAsync({ title: formTitle, text: formText })
    toast(`${formTitle} ${formText}`)
  }

  useEffect(() => {
    if (title) setFormTitle(title)
    if (text) setFormText(text)
  }, [title, text])

  return (
    <Grid gap="0.5rem">
      <FlexRow
        background="var(--trans-black-2)"
        padding="0.25rem 0.5rem"
        justifyContent="space-between"
      >
        <P color="var(--text-light-muted)" fontSize="0.5rem">
          new, original thought
        </P>
      </FlexRow>
      <Input
        placeholder="Title"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
      />
      <TextArea
        placeholder="Thought"
        onChange={(e) => setFormText(e.target.value)}
        value={formText}
      />
      <FlexRow justifyContent="flex-end">
        <Button variant="text" size="small" onClick={handleSubmit}>
          ►
        </Button>
      </FlexRow>
    </Grid>
  )
}
