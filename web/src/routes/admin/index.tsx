import { Button, FlexRow, Grid, H1, Input, P, Page, useForm } from '@/lib'
import { Song, useSongs } from '@/lib/hooks/api/useSongs'
import { useState } from 'react'

export const AdminDashboard = () => {
  const songs = useSongs()
  const [file, setFile] = useState<File | null>(null)

  const form = useForm<Song>({
    initialValues: {
      name: '',
      filename: '',
      mime: '',
      size: 0,
      bpm: 0,
      notes: '',
      key: '',
    },
  })

  const handleAddFile = (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return

    const name = file.name.split('.')[0]?.replace(/[^a-z0-9]/gi, ' ')
    const trimmedName = name.replace(/\s+/g, ' ')

    form.update({
      name: trimmedName.trim(),
      filename: file.name,
      mime: file.type,
      size: file.size,
    })
  }

  // todo: key selector.

  return (
    <Page width="60vw">
      <FlexRow justifyContent="center">
        <H1>Admin Dashboard</H1>
      </FlexRow>
      <Grid textAlign="center" gap="1rem">
        <P>Upload Song</P>
        {file && <P>{form.watch('name')}</P>}
        <Input
          type="file"
          accept="audio/*"
          onChange={(e) => handleAddFile(e.target.files)}
        />
        <Grid>
          <Input placeholder="Song Name" {...form.bind('name')} />
          <Input placeholder="filename" {...form.bind('filename')} />
          <Input disabled placeholder="mime" {...form.bind('mime')} />
          <Input disabled placeholder="size" {...form.bind('size')} />
          <Grid gridTemplateColumns="1fr 1fr">
            <Input placeholder="key" {...form.bind('key')} />
            <Input placeholder="bpm" {...form.bind('bpm')} type="number" />
          </Grid>
          <Input placeholder="notes" {...form.bind('notes')} />
        </Grid>
        <Button>Upload</Button>
      </Grid>
    </Page>
  )
}
