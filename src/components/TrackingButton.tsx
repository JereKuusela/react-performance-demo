import React, { memo, PropsWithChildren, useEffect, useRef } from 'react'
import { Button } from 'semantic-ui-react'
import { getNextColor } from '../app/utils'

type ButtonProps = PropsWithChildren<{ onClick?: () => void }>

/**
 * A button that tracks rendering with background color.
 */
export const TrackingButton = ({ children, onClick }: ButtonProps) => {
  const ref = useRef('')
  useEffect(() => {
    ref.current = getNextColor(ref.current)
  })
  return (
    <Button
      onClick={onClick}
      disabled={!onClick}
      style={{ backgroundColor: ref.current, padding: 5, border: 'solid 2px black', width: 40, height: 40 }}
      circular
    >
      {children}
    </Button>
  )
}

export const MemoizedTrackingButton = memo(TrackingButton)
