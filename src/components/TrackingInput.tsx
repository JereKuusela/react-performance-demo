import React, { useRef, useEffect, memo } from 'react'
import Input from './Input'

const getColor = (previous: string) => {
  switch (previous) {
    case 'white':
      return 'red'
    case 'red':
      return 'blue'
    case 'blue':
      return 'red'
    default:
      return 'white'
  }
}

export const TrackingInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const ref = useRef('white')
  useEffect(() => {
    console.log('input rendering')
    ref.current = getColor(ref.current)
  })
  return <Input value={value} onChange={onChange} style={{ backgroundColor: ref.current, padding: 5 }} />
}

export const MemoizedTrackingInput = memo(TrackingInput)
