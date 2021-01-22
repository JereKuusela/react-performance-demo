import React, { CSSProperties, useEffect, useState } from 'react'
import { Input as SInput } from 'semantic-ui-react'

interface Props {
  value: string
  onChange?: (value: string) => void
  style?: CSSProperties
}

/**
 * A wrapper for input to only update the value when pressing enter or when losing focus.
 */
export const Input = ({ value, onChange, style }: Props) => {
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const update = () => {
    if (currentValue !== value && onChange) onChange(currentValue)
  }

  const handleBlur = update

  const handleKeyPress = ({ key }: { key: string }) => {
    if (key === 'Enter') update()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value)
  }

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

interface NumericProps {
  value: number
  onChange?: (value: number) => void
  style?: CSSProperties
}

/**
 * A wrapper for input to only update the value when pressing enter or when losing focus.
 */
export const NumericInput = ({ value, onChange, style }: NumericProps) => {
  const [currentValue, setCurrentValue] = useState(String(value))

  useEffect(() => {
    setCurrentValue(String(value))
  }, [value])

  const update = () => {
    if (Number(currentValue) !== value && onChange) onChange(Number(currentValue))
  }

  const handleBlur = update

  const handleKeyPress = ({ key }: { key: string }) => {
    if (key === 'Enter') update()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value)
  }

  return (
    <SInput
      value={currentValue}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
      onBlur={handleBlur}
      style={style}
      size='small'
      disabled={!onChange}
      type='number'
    />
  )
}
