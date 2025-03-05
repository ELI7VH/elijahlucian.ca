import {
  Button,
  Divider,
  FlexRow,
  Grid,
  H1,
  Input,
  Json,
  Link,
  P,
  Page,
  useForm,
  useSearchParams,
} from '@/lib'
import { Song, useSongs } from '@/lib/hooks/api/useSongs'
import { useToast } from '@/lib/hooks/useToast'
import { UserChip } from '@/widgets/UserChip'
import { useState } from 'react'

export const AdminDashboard = () => {
  const songs = useSongs()
  const sp = useSearchParams()
  const [file, setFile] = useState<File | null>(null)
  const { toast } = useToast()

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
      toast('Please fill in all fields')
      console.log('form', form.values)
      return
    }

    if (file) {
      // upload to s3
      // get url
      // update form with link=url
    }

    const song = await songs.create.mutateAsync({
      ...values,
      bucket: 'songs',
      folder: 'songs',
    })

    sp.set('song-id', song.id)
    form.reset()
    toast('Song uploaded')
  })

  return (
    <Page
      width="60vw"
      maxWidth="700px"
      alignContent="center"
      maxHeight="100vh"
      overflow="auto"
      background="rgba(0,0,0,0.4)"
    >
      <FlexRow justifyContent="center">
        <Link to="/">
          <H1>Admin Dashboard</H1>
        </Link>
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
            <FlexRow justifyContent="space-between">
              <Button
                size="small"
                onClick={() => {
                  navigator.clipboard.readText().then((text) => {
                    const {
                      id,
                      filename,
                      originalFilename,
                      // Unused values kept as comments for reference
                      // signedUrl,
                      // s3Key,
                      // type,
                      // scope,
                      ...json
                    } = JSON.parse(text)

                    form.update({
                      ...json,
                      id,
                      filename: filename || originalFilename,
                    })
                  })
                }}
              >
                paste
              </Button>
            </FlexRow>
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
        <Divider />
        {/* <Resources /> */}
      </Grid>
    </Page>
  )
}
