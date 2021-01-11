import React, { memo, useRef } from 'react'
import { ItemProps, ListItem } from 'semantic-ui-react'
import { getInstanceNumber } from '../app/utils'
import { Item } from '../server/reducer'
import { useData, useUpdateByAttribute } from './hooks'
import List from '../components/List'
import { MemoizedTrackingInput, TrackingInput } from '../components/TrackingInput'

const ReceiveItem = () => {
  return (
    <>
      <RenderWithItemList />
      <RenderWithItemMemoizedList />
      <RenderWithAttributeList />
      <RenderWithAttributeMemoizedList />
    </>
  )
}

const RenderWithItemList = () => {
  const instance = useRef(getInstanceNumber())
  const data = useData(instance.current)
  return (
    <List header='Using whole item'>
      {data.map((item) => (
        <RenderWithItem item={item} key={item.index} instance={instance.current} />
      ))}
    </List>
  )
}

const RenderWithItem = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)

  return (
    <ListItem>
      <RenderFirstName item={item} onChange={handleFirstChange} />
      <RenderLastName item={item} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderWithItemMemoizedList = () => {
  const instance = useRef(getInstanceNumber())
  const data = useData(instance.current)
  return (
    <List header='Using whole item memoized'>
      {data.map((item) => (
        <RenderWithItemMemoized item={item} key={item.index} instance={instance.current} />
      ))}
    </List>
  )
}

const RenderWithItemMemoized = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)

  return (
    <ListItem>
      <MemoizedRenderFirstName item={item} onChange={handleFirstChange} />
      <MemoizedRenderLastName item={item} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderWithAttributeList = () => {
  const instance = useRef(getInstanceNumber())
  const data = useData(instance.current)
  return (
    <List header='Using attributes'>
      {data.map((item) => (
        <RenderWithAttribute item={item} key={item.index} instance={instance.current} />
      ))}
    </List>
  )
}

const RenderWithAttribute = ({ item, instance }: ItemProps) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)

  return (
    <ListItem>
      <TrackingInput value={first} onChange={handleFirstChange} />
      <TrackingInput value={last} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderWithAttributeMemoizedList = () => {
  const instance = useRef(getInstanceNumber())
  const data = useData(instance.current)
  return (
    <List header='Using attributes memoized'>
      {data.map((item) => (
        <RenderWithAttributeMemoized item={item} key={item.index} instance={instance.current} />
      ))}
    </List>
  )
}

const RenderWithAttributeMemoized = ({ item, instance }: ItemProps) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)

  return (
    <ListItem>
      <MemoizedTrackingInput value={first} onChange={handleFirstChange} />
      <MemoizedTrackingInput value={last} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderFirstName = ({ item, onChange }: { item: Item; onChange: (value: string) => void }) => (
  <TrackingInput value={item.first} onChange={onChange} />
)

const RenderLastName = ({ item, onChange }: { item: Item; onChange: (value: string) => void }) => (
  <TrackingInput value={item.last} onChange={onChange} />
)

const MemoizedRenderFirstName = memo(RenderFirstName)

const MemoizedRenderLastName = memo(RenderLastName)

export default ReceiveItem
