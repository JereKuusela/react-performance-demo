import React, { memo, useMemo } from 'react'
import { Divider, Header, ListItem } from 'semantic-ui-react'
import { useUpdate, useUpdateWithoutUseCallback } from './actions'
import { MemoizedTrackingInput, TrackingInput } from '../components/TrackingInput'
import DataList from './DataList'
import { ItemProps } from '../app/utils'

const ExampleHooks = () => {
  return (
    <>
      <Header>useCallback</Header>
      <DataList name='ExampleHooks_WithMemoizedAttribute' header='Working example' Component={WithMemoizedAttribute} />
      <DataList
        name='ExampleHooks_WithoutUseCallback'
        header='Without useCallback, everything renders on change.'
        Component={WithoutUseCallback}
      />
      <Divider />
      <Header>useMemo</Header>
      <DataList name='ExampleHooks_FullName' header='Additional field' Component={FullName} />
      <DataList
        name='ExampleHooks_FullNameFromUseMemo'
        header='useMemo is pointless, '
        Component={FullNameFromUseMemo}
      />
      <DataList
        name='ExampleHooks_FullNameFromArray'
        header='Additional field with an array'
        Component={FullNameFromArray}
      />
      <DataList
        name='ExampleHooks_FullNameFromArrayWithUseMemo'
        header='Now useMemo works '
        Component={FullNameFromArrayWithUseMemo}
      />
    </>
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

const WithoutUseCallback = ({ item, instance }: ItemProps) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdateWithoutUseCallback(instance, index)

  return (
    <ListItem>
      <MemoizedTrackingInput value={first} onChange={handleFirstChange} />
      <MemoizedTrackingInput value={last} onChange={handleLastChange} />
    </ListItem>
  )
}

const FullName = ({ item, instance }: ItemProps) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)

  return (
    <ListItem>
      <MemoizedTrackingInput value={first} onChange={handleFirstChange} />
      <MemoizedTrackingInput value={last} onChange={handleLastChange} />
      <MemoizedTrackingInput value={`${first} ${last}`} />
    </ListItem>
  )
}

const FullNameFromUseMemo = ({ item, instance }: ItemProps) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)
  const fullName = useMemo(() => `${first} ${last}`, [first, last])
  return (
    <ListItem>
      <MemoizedTrackingInput value={first} onChange={handleFirstChange} />
      <MemoizedTrackingInput value={last} onChange={handleLastChange} />
      <MemoizedTrackingInput value={fullName} />
    </ListItem>
  )
}

const FullNameFromArray = ({ item, instance }: ItemProps) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)
  const name = [first, last] as const
  return (
    <ListItem>
      <MemoizedTrackingInput value={first} onChange={handleFirstChange} />
      <MemoizedTrackingInput value={last} onChange={handleLastChange} />
      <RenderFullNameFromArray name={name} />
    </ListItem>
  )
}

const FullNameFromArrayWithUseMemo = ({ item, instance }: ItemProps) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)
  const name = useMemo(() => [first, last] as const, [first, last])
  return (
    <ListItem>
      <MemoizedTrackingInput value={first} onChange={handleFirstChange} />
      <MemoizedTrackingInput value={last} onChange={handleLastChange} />
      <RenderFullNameFromArray name={name} />
    </ListItem>
  )
}

const RenderFullNameFromArray = memo(({ name }: { name: readonly [string, string] }) => (
  <TrackingInput value={`${name[0]} ${name[1]}`} />
))

export default ExampleHooks
