import React, { useRef, useEffect, memo } from 'react'
import { getColor } from './colors'
import Input from './Input'

export const TrackingInput = ({ value, onChange }: { value: string; onChange?: (value: string) => void }) => {
  const ref = useRef('white')
  useEffect(() => {
    ref.current = getColor(ref.current)
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
