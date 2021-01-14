import React, { PropsWithChildren } from 'react'
import { ListItem } from 'semantic-ui-react'
import { ItemProps, UpdateHook } from '../app/utils'
import Input from '../components/Input'
import { MemoizedTrackingInput, TrackingInput } from '../components/TrackingInput'
import { useUpdate } from './actions'

export const MemoizedNameInputs = ({ item, instance, useHook, children }: PropsWithChildren<ItemProps>) => {
  const { first, last, index } = item

  return (
    <MemoizedNameInputsFromAttribute
      useHook={useHook}
      instance={instance}
      first={first}
      last={last}
      index={index}
      children={children}
    />
  )
}

export const NameInputs = ({ item, instance, useHook, children }: PropsWithChildren<ItemProps>) => {
  const { first, last, index } = item

  return (
    <NameInputsFromAttribute
      useHook={useHook}
      instance={instance}
      first={first}
      last={last}
      index={index}
      children={children}
    />
  )
}

export const PlainNameInputs = ({ item, instance, useHook, children }: PropsWithChildren<ItemProps>) => {
  const { first, last, index } = item

  return (
    <PlainNameInputsFromAttribute
      useHook={useHook}
      instance={instance}
      first={first}
      last={last}
      index={index}
      children={children}
    />
  )
}

interface Props {
  instance: number
  index: number
  first: string
  last: string
  useHook?: UpdateHook
}

export const NameInputsFromAttribute = ({
  first,
  last,
  index,
  useHook,
  instance,
  children,
}: PropsWithChildren<Props>) => {
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

export const MemoizedNameInputsFromAttribute = ({
  first,
  last,
  useHook,
  index,
  instance,
  children,
}: PropsWithChildren<Props>) => {
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

export const PlainNameInputsFromAttribute = ({
  first,
  last,
  index,
  useHook,
  instance,
  children,
}: PropsWithChildren<Props>) => {
  const hook = useHook ?? useUpdate
  const { handleFirstChange, handleLastChange } = hook(instance, index)

  return (
    <ListItem>
      <Input value={first} onChange={handleFirstChange} />
      <Input value={last} onChange={handleLastChange} />
      {children}
    </ListItem>
  )
}
