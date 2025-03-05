import { Button, FlexCol, FlexRow, H1, Input, Json, P } from '@/lib'
import { useResources } from '@/lib/hooks/api/useResources'
import { useToast } from '@/lib/hooks/useToast'

export const Resources = () => {
  const resources = useResources()
  const { toast } = useToast()

  const handleSubmit = resources.form.handleSubmit(async (values) => {
    console.log(values)
    await resources.create.mutateAsync(values)
    toast('Resource created successfully', 'success')
    resources.form.reset()
  })

  return (
    <FlexCol>
      <H1>Resources</H1>
      <P>user defined resources</P>
      <Json
        data={resources.data?.map((r) => (
          <FlexRow key={r.id}>
            <P>{r.id}</P>
            <Button
              onClick={async () => {
                await resources.destroy.mutateAsync(r.id)
                toast('Resource deleted', 'warning')
              }}
            >
              delete
            </Button>
          </FlexRow>
        ))}
      />
      <form onSubmit={handleSubmit}>
        <Input placeholder="path" {...resources.form.bind('path')} />
        <Input placeholder="type" {...resources.form.bind('dbType')} />
        <Input placeholder="scope" {...resources.form.bind('dbScope')} />
        <Button type="submit">Add</Button>
      </form>
    </FlexCol>
  )
}
