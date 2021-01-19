import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { Button } from 'semantic-ui-react'
import { getNextColor } from '../app/utils'
/**
 * A button that tracks rendering with background color.
 */
const TrackingButton = ({ children, onClick }: PropsWithChildren<{ onClick: () => void }>) => {
  const ref = useRef('')
  useEffect(() => {
    ref.current = getNextColor(ref.current)
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
