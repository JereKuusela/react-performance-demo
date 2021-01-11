import React, { CSSProperties, useCallback, useEffect, useState } from 'react'
import { Input as SInput } from 'semantic-ui-react'

interface Props {
  value: string
  onChange: (value: string) => void
  style?: CSSProperties
}

const Input = ({ value, onChange, style }: Props) => {
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const handleBlur = useCallback(() => {
    onChange(currentValue)
  }, [onChange, currentValue])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value)
  }, [])

  return <SInput value={currentValue} onChange={handleChange} onBlur={handleBlur} style={style} size='small' />
}

export default Input
