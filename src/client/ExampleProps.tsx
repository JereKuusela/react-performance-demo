import React, { memo } from 'react'
import { Header, ItemProps, ListItem } from 'semantic-ui-react'
import { getInstanceNumber } from '../app/utils'
import { Item } from '../server/reducer'
import { useData, useUpdateByAttribute } from './hooks'
import List from '../components/List'
import { MemoizedTrackingInput, TrackingInput } from '../components/TrackingInput'

const ExampleProps = () => {
  return (
    <>
      <Header>
        Components render when parent renders. This can be prevented with memo which makes the component only render
        when props change.
      </Header>
      <RenderWithItem />
      <RenderWithMemoizedItem />
      <RenderWithAttribute />
      <RenderWithMemoizedAttribute />
    </>
  )
}

const RenderWithItem = () => {
  const instance = getInstanceNumber('RenderWithItem')
  const data = useData(instance)
  return (
    <List header='Inputs use the whole name object. Without memo, everything renders on change.'>
      {data.map((item) => (
        <RenderItemWithItem item={item} key={item.index} instance={instance} />
      ))}
    </List>
  )
}

const RenderItemWithItem = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)

  return (
    <ListItem>
      <RenderFirstName item={item} onChange={handleFirstChange} />
      <RenderLastName item={item} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderWithMemoizedItem = () => {
  const instance = getInstanceNumber('RenderWithMemoizedItem')
  const data = useData(instance)
  return (
    <List header='With memo, only the changed row renders.'>
      {data.map((item) => (
        <RenderItemWithMemoizedItem item={item} key={item.index} instance={instance} />
      ))}
    </List>
  )
}

const RenderItemWithMemoizedItem = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)

  return (
    <ListItem>
      <MemoizedRenderFirstName item={item} onChange={handleFirstChange} />
      <MemoizedRenderLastName item={item} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderWithAttribute = () => {
  const instance = getInstanceNumber('RenderWithAttribute')
  const data = useData(instance)
  return (
    <List header='Inputs to use only the value. Without memo, everything still renders on change.'>
      {data.map((item) => (
        <RenderItemWithAttribute item={item} key={item.index} instance={instance} />
      ))}
    </List>
  )
}

const RenderItemWithAttribute = ({ item, instance }: ItemProps) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)

  return (
    <ListItem>
      <TrackingInput value={first} onChange={handleFirstChange} />
      <TrackingInput value={last} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderWithMemoizedAttribute = () => {
  const instance = getInstanceNumber('RenderWithMemoizedAttribute')
  const data = useData(instance)
  return (
    <List header='With memo, only the changed input renders.'>
      {data.map((item) => (
        <RenderItemWithMemoizedAttribute item={item} key={item.index} instance={instance} />
      ))}
    </List>
  )
}

const RenderItemWithMemoizedAttribute = ({ item, instance }: ItemProps) => {
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

export default ExampleProps
