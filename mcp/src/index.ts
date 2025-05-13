import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const main = async () => {
  const server = new McpServer({
    name: 'Lucian MCP',
    version: '0.0.1',
  })

  // agent: voice note roulette

  // resources: images
  // resources: songs
  //  https://api.elijahlucian.ca/songs

  server.resource('songs://', 'https://api.elijahlucian.ca/songs', async () => {
    const response = await fetch('https://api.elijahlucian.ca/songs')
    const data = await response.json()
    return data
  })

  // resources: thoughts
  // resources: conversations

  // tools tools tools....
  // todo: scrape socials -> resources

  // tool: ffmpeg -> audio details and conversion
  // create vectors of all conversations

  server.tool(
    'random_number',
    'Get a random number between specified minimum and maximum values',
    { min: z.number(), max: z.number() },
    async ({ min, max }) => {
      return {
        content: [
          {
            type: 'text',
            text: `Your random number between ${min} and ${max} is ${
              Math.floor(Math.random() * (max - min + 1)) + min
            }`,
          },
        ],
      }
    },
  )

  try {
    const transport = new StdioServerTransport()
    await server.connect(transport)
    console.error('Lucian MCP Started!')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
