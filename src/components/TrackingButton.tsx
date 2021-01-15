import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { Button } from 'semantic-ui-react'
import { getColor } from './colors'

const TrackingButton = ({ children, onClick }: PropsWithChildren<{ onClick: () => void }>) => {
  const ref = useRef('')
  useEffect(() => {
    ref.current = getColor(ref.current)
  })
  return (
    <Button
      onClick={onClick}
      style={{ backgroundColor: ref.current, padding: 5, border: 'solid 2px black', width: 40, height: 40 }}
      circular
    >
      {children}
    </Button>
  )
}

export default TrackingButton
