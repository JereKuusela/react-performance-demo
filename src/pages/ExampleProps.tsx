import React, { memo } from 'react'
import { Divider, Header, ItemProps, ListItem } from 'semantic-ui-react'
import { useUpdate } from '../app/actions'
import { TrackingInput } from '../components/TrackingInput'
import DataList from '../components/DataList'
import { NameInputs, MemoizedNameInputs } from '../components/NameInputs'
import { Item } from '../app/utils'

const component = 'ExampleProps_'

const ExampleProps = () => {
  return (
    <>
      <Header>Components render when parent renders. This can be prevented with memo.</Header>
      <DataList name={`${component}NameInputs`} header='Everything renders on change.' Component={NameInputs} />
      <DataList
        name={`${component}MemoizedNameInputs`}
        header='With memo, only the changed input renders.'
        Component={MemoizedNameInputs}
      />
      <Divider />
      <Header>
        Components also render when props change. This is important when using references (objects, arrays, functions).
      </Header>
      <DataList
        name={`${component}WithMemoizedItem`}
        header='When props are delivered as an object, the whole row renders.'
        Component={WithMemoizedItem}
      />
    </>
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

const MemoizedRenderFirstName = memo(({ item, onChange }: { item: Item; onChange: (value: string) => void }) => (
  <TrackingInput value={item.first} onChange={onChange} />
))

const MemoizedRenderLastName = memo(({ item, onChange }: { item: Item; onChange: (value: string) => void }) => (
  <TrackingInput value={item.last} onChange={onChange} />
))

export default ExampleProps
