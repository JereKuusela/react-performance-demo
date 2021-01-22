import React, { PropsWithChildren } from 'react'
import { ListItem } from 'semantic-ui-react'
import { ItemProps } from '../app/utils'
import { MemoizedTrackingInput, TrackingInput } from './TrackingInput'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setFirstName, setLastName } from '../app/reducer'

export const MemoizedNameInputs = ({ item, instance, children }: PropsWithChildren<ItemProps>) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)

  return (
    <ListItem>
      <MemoizedTrackingInput value={first} onChange={handleFirstChange} />
      <MemoizedTrackingInput value={last} onChange={handleLastChange} />
      {children}
    </ListItem>
  )
}

export const NameInputs = ({ item, instance, children }: PropsWithChildren<ItemProps>) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)

  return (
    <ListItem>
      <TrackingInput value={first} onChange={handleFirstChange} />
      <TrackingInput value={last} onChange={handleLastChange} />
      {children}
    </ListItem>
  )
}

export const useUpdate = (instance: number, index: number) => {
  const dispatch = useDispatch()
  const handleFirstChange = useCallback(
    (first: string) => {
      dispatch(setFirstName(instance, index, first))
    },
    [dispatch, instance, index]
  )
  const handleLastChange = useCallback(
    (last: string) => {
      dispatch(setLastName(instance, index, last))
    },
    [dispatch, instance, index]
  )
  return { handleFirstChange, handleLastChange }
}
