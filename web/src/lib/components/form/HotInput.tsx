import { Box } from '@/lib/components'
import { useEffect, useState } from 'react'

type Props = {
  value: string
  onFinish: (value: string) => void
  label?: string
  width?: string
}

export const HotInput = ({ value, onFinish, label, width }: Props) => {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleFinish = () => {
    if (inputValue === value) return

    onFinish(inputValue)
  }

  const handleBlur = () => {
    handleFinish()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFinish()
    }
  }

  return (
    <Box position="relative">
      <input
        style={{
          width,
          paddingTop: '12px',
        }}
        value={inputValue}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </Box>
  )
}
