import React, { useRef, useEffect, memo } from 'react'
import { getNextColor } from '../app/utils'
import Input from './Input'

/**
 * A text input that tracks rendering with background color.
 */
export const TrackingInput = ({ value, onChange }: { value: string; onChange?: (value: string) => void }) => {
  const ref = useRef('')
  useEffect(() => {
    ref.current = getNextColor(ref.current)
  })
  return (
    <Input
      value={value}
      onChange={onChange}
      style={{ backgroundColor: ref.current, padding: 5, marginRight: 5, borderRadius: 5 }}
    />
  )
}

export const MemoizedTrackingInput = memo(TrackingInput)
