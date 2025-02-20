import { Box, Button, Input } from '@/lib/components'
import { useState } from 'react'

type Props = {
  value: string
  onFinish: (value: string) => void
  label?: string
}

export const HotInput = ({ value, onFinish, label }: Props) => {
  const [inputValue, setInputValue] = useState(value)

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
      <Box
        position="absolute"
        top="-7px"
        left="10px"
        backgroundColor="white"
        padding="0 6px"
        fontSize="12px"
        border="1px solid var(--brand-1)"
        boxShadow="1px -1px 0 var(--brand-2)"
      >
        {label}
      </Box>
      <Input
        style={{
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
