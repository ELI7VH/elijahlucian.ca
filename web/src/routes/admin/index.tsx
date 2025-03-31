import {
  Button,
  Divider,
  FlexRow,
  Grid,
  H1,
  Input,
  Link,
  P,
  Page,
  useSearchParams,
} from '@/lib'
import { Song, useSongs } from '@/lib/hooks/api/useSongs'
import { useToast } from '@/lib/hooks/useToast'
import { UserChip } from '@/widgets/UserChip'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const AdminDashboard = () => {
  const songs = useSongs()
  const sp = useSearchParams()
  const [file, setFile] = useState<File | null>(null)
  const { toast } = useToast()

  const form = useForm<Partial<Song>>({
    values: {
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

    form.setValue('name', trimmedName.trim())
    form.setValue('filename', file.name)
    form.setValue('mime', file.type)
    form.setValue('size', file.size)

    setFile(file)
  }

  const handleSubmit = form.handleSubmit(async (values) => {
    if (!values.name || !values.link) {
      toast('Please fill in all fields')
      console.log('form', values)
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
                      // ..._rest
                    } = JSON.parse(text)

                    form.setValue('id', id)
                    form.setValue('filename', filename || originalFilename)
                    form.setValue('originalFilename', originalFilename)
                    form.setValue('bucket', 'songs')
                    form.setValue('folder', 'songs')
                    form.setValue('bucket', 'songs')
                    form.setValue('folder', 'songs')
                  })
                }}
              >
                paste
              </Button>
            </FlexRow>
            <Input
              placeholder="Song Name"
              {...form.register('name')}
              required
            />
            <Input
              placeholder="filename"
              {...form.register('filename')}
              required
            />
            <Input placeholder="mime" {...form.register('mime')} required />
            <Input placeholder="size" {...form.register('size')} required />
            <Grid gridTemplateColumns="1fr 1fr">
              <Input placeholder="key" {...form.register('key')} />
              <Input
                placeholder="bpm"
                {...form.register('bpm')}
                type="number"
              />
            </Grid>
            <Input placeholder="link" {...form.register('link')} required />
            <Input placeholder="notes" {...form.register('notes')} />
          </Grid>
          <FlexRow justifyContent="end">
            <Button type="submit">Upload</Button>
          </FlexRow>
        </form>
        {/* <Json data={form.getValues()} /> */}
        <Divider />
        <UserChip />
        <Divider />
        {/* <Resources /> */}
      </Grid>
    </Page>
  )
}
