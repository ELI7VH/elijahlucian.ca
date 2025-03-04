import { useState, useEffect } from 'react'
import { Box } from '@/lib'
import { Bub } from './components/Bub'
import { Filter } from 'bad-words'

type Props = {
  phrase: string
}

export const ThoughtBub2 = ({ phrase }: Props) => {
  const [showWords, setShowWords] = useState(false)
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    // After 1 second, split into words and show them
    const timer = setTimeout(() => {
      setWords(phrase.split(' '))
      setShowWords(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [phrase])

  // censor bad words
  const filter = new Filter()
  const censoredWords = filter.clean(phrase)

  return (
    <Box position="relative" height="200px">
      {!showWords ? (
        <Box>{censoredWords}</Box>
      ) : (
        words.map((word, i) => (
          <Box
            key={`${word}-${i}`}
            position="absolute"
            transition="all 0.5s ease-in-out"
            top={`${Math.random() * 100}%`}
            left={`${i * word.length}ch`}
          >
            <Bub text={word} />
          </Box>
        ))
      )}
    </Box>
  )
}
