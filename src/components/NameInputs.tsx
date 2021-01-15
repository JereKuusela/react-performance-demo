import React, { PropsWithChildren } from 'react'
import { ListItem } from 'semantic-ui-react'
import { ItemProps } from '../app/utils'
import { MemoizedTrackingInput, TrackingInput } from './TrackingInput'
import { useUpdate } from '../app/actions'

export const MemoizedNameInputs = ({ item, instance, useHook, children }: PropsWithChildren<ItemProps>) => {
  const { first, last, index } = item
  const hook = useHook ?? useUpdate
  const { handleFirstChange, handleLastChange } = hook(instance, index)

  return (
    <ListItem>
      <MemoizedTrackingInput value={first} onChange={handleFirstChange} />
      <MemoizedTrackingInput value={last} onChange={handleLastChange} />
      {children}
    </ListItem>
  )
}

export const NameInputs = ({ item, instance, useHook, children }: PropsWithChildren<ItemProps>) => {
  const { first, last, index } = item
  const hook = useHook ?? useUpdate
  const { handleFirstChange, handleLastChange } = hook(instance, index)

  return (
    <ListItem>
      <TrackingInput value={first} onChange={handleFirstChange} />
      <TrackingInput value={last} onChange={handleLastChange} />
      {children}
    </ListItem>
  )
}
