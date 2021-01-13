import React, { memo } from 'react'
import { Header, ItemProps, ListItem } from 'semantic-ui-react'
import { Item } from '../server/reducer'
import { useUpdate } from './actions'
import { MemoizedTrackingInput, TrackingInput } from '../components/TrackingInput'
import DataList from './DataList'

const ExampleProps = () => {
  return (
    <>
      <Header>
        Components render when parent renders. This can be prevented with memo which makes the component only render
        when props change.
      </Header>
      <DataList
        name='ExampleProps_Item'
        header='Inputs use the whole name object. Without memo, everything renders on change.'
        Component={WithItem}
      />
      <DataList
        name='ExampleProps_MemoizedItem'
        header='With memo, only the changed row renders.'
        Component={WithMemoizedItem}
      />
      <DataList
        name='ExampleProps_Attribute'
        header='Inputs to use only the value. Without memo, everything still renders on change.'
        Component={WithAttribute}
      />
      <DataList
        name='ExampleProps_MemoizedAttribute'
        header='With memo, only the changed input renders.'
        Component={WithMemoizedAttribute}
      />
    </>
  )
}

const WithItem = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)

  return (
    <ListItem>
      <RenderFirstName item={item} onChange={handleFirstChange} />
      <RenderLastName item={item} onChange={handleLastChange} />
    </ListItem>
  )
}

const WithMemoizedItem = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)

  return (
    <ListItem>
      <MemoizedRenderFirstName item={item} onChange={handleFirstChange} />
      <MemoizedRenderLastName item={item} onChange={handleLastChange} />
    </ListItem>
  )
}

const WithAttribute = ({ item, instance }: ItemProps) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)

  return (
    <ListItem>
      <TrackingInput value={first} onChange={handleFirstChange} />
      <TrackingInput value={last} onChange={handleLastChange} />
    </ListItem>
  )
}

const WithMemoizedAttribute = ({ item, instance }: ItemProps) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)

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
