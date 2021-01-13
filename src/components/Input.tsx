import React, { CSSProperties, useCallback, useEffect, useState } from 'react'
import { Input as SInput } from 'semantic-ui-react'

interface Props {
  value: string
  onChange?: (value: string) => void
  style?: CSSProperties
}

const Input = ({ value, onChange, style }: Props) => {
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const update = useCallback(() => {
    setCurrentValue((prev) => {
      if (prev !== value && onChange) onChange(prev)
      return prev
    })
  }, [onChange, value])

  const handleBlur = useCallback(() => {
    update()
  }, [update])

  const handleKeyPress = useCallback(
    ({ key }) => {
      if (key === 'Enter') update()
    },
    [update]
  )

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value)
  }, [])

  return (
    <SInput
      value={currentValue}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
      onBlur={handleBlur}
      style={style}
      size='small'
      disabled={!onChange}
    />
  )
}

export default Input
