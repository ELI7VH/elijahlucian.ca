import Axios from 'axios'

const log = (...args: any[]) => {
  const debug = document.getElementById('debug')
  if (!debug) return

  debug.setAttribute('value', args.join(' '))
}

const main = async () => {
  log('loaded!')

  const response = await Axios.get<any[]>('/api/songs')
  log(response.data.length, 'records')
}

main()
