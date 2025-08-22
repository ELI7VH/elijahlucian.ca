import { MultiBanger } from '@dank-inc/banger'
import { useCallback, useEffect, useRef } from 'react'

export const useBangerz = () => {
  const banger = useRef<MultiBanger | null>(null)

  useEffect(() => {
    const loadSounds = async () => {
      const sounds = [
        'https://cdn.elijahlucian.ca/ui/thought-ui-1.wav',
        'https://cdn.elijahlucian.ca/ui/thought-ui-2.wav',
        'https://cdn.elijahlucian.ca/ui/thought-ui-3.wav',
        'https://cdn.elijahlucian.ca/ui/thought-ui-4.wav',
        'https://cdn.elijahlucian.ca/ui/thought-ui-5.wav',
        'https://cdn.elijahlucian.ca/ui/thought-ui-6.wav',
        'https://cdn.elijahlucian.ca/ui/thought-ui-7.wav',
        'https://cdn.elijahlucian.ca/ui/thought-ui-8.wav',
        'https://cdn.elijahlucian.ca/ui/thought-ui-9.wav',
        'https://cdn.elijahlucian.ca/ui/thought-ui-10.wav',
        'https://cdn.elijahlucian.ca/ui/thought-ui-11.wav',
      ]

      const arrayBuffers = await Promise.all(
        sounds.map(async (sound) => {
          const response = await fetch(sound)
          return response.arrayBuffer()
        }),
      )

      console.log('sounds', arrayBuffers)

      banger.current = new MultiBanger({
        arrayBuffers,
        name: 'thought-ui',
        onFail: (error) => {
          console.error('error', error)
        },
        onLoaded: () => {
          console.log('loaded')
        },
      })
    }

    loadSounds()
  }, [])

  const play = useCallback(() => {
    console.log('playing')
    banger.current?.play()
  }, [banger.current])

  return { ref: banger, play }
}
