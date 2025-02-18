import {
  Button,
  Divider,
  FlexRow,
  Grid,
  H1,
  Input,
  Json,
  P,
  Page,
  useForm,
} from '@/lib'
import { Toast } from '@/lib/components/elements/Toast'
import { Song, useSongs } from '@/lib/hooks/api/useSongs'
import { useToast } from '@/lib/hooks/useToast'
import { UserChip } from '@/widgets/UserChip'
import { useState } from 'react'

export const AdminDashboard = () => {
  const songs = useSongs()
  const [file, setFile] = useState<File | null>(null)
  const toast = useToast()

  const form = useForm<Song>({
    initialValues: {
      name: '',
      filename: '',
      mime: 'audio/mpeg',
      size: '',
      bpm: '',
      notes: '',
      key: '',
      link: '',
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

    setFile(file)
  }

  const handleSubmit = form.handleSubmit(async (values) => {
    if (!form.values.name || !form.values.link) {
      toast.toast('Please fill in all fields')
      console.log('form', form.values)
      return
    }

    if (file) {
      // upload to s3
      // get url
      // update form with link=url
    }

    await songs.create.mutateAsync({
      ...values,
      bucket: 'songs',
      folder: 'songs',
    })

    form.reset()
    toast.toast('Song uploaded')
  })

  return (
    <Page width="60vw" padding="6rem 1rem">
      <FlexRow justifyContent="center">
        <H1>Admin Dashboard</H1>
      </FlexRow>
      <Grid textAlign="center" gap="1rem">
        <P>Upload Song</P>
        {file && <P>{file.name}</P>}
        <Input
          type="file"
          accept="audio/*"
          onChange={(e) => handleAddFile(e.target.files)}
        />
        <form onSubmit={handleSubmit}>
          <Grid gap="0.2rem">
            <Input placeholder="Song Name" {...form.bind('name')} required />
            <Input placeholder="filename" {...form.bind('filename')} required />
            <Input placeholder="mime" {...form.bind('mime')} required />
            <Input placeholder="size" {...form.bind('size')} required />
            <Grid gridTemplateColumns="1fr 1fr">
              <Input placeholder="key" {...form.bind('key')} />
              <Input placeholder="bpm" {...form.bind('bpm')} type="number" />
            </Grid>
            <Input placeholder="link" {...form.bind('link')} required />
            <Input placeholder="notes" {...form.bind('notes')} />
          </Grid>
          <FlexRow justifyContent="end">
            <Button type="submit">Upload</Button>
          </FlexRow>
        </form>
        <Json data={form.values} />
        <Divider />
        <UserChip />
      </Grid>
      <Toast>{toast.message}</Toast>
    </Page>
  )
}
