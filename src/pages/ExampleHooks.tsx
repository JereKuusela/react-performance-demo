import React, { memo, useMemo } from 'react'
import { Divider, Header } from 'semantic-ui-react'
import { useUpdateWithoutUseCallback } from '../app/actions'
import { MemoizedTrackingInput, TrackingInput } from '../components/TrackingInput'
import DataList from '../components/DataList'
import { ItemProps } from '../app/utils'
import { MemoizedNameInputs, NameInputs } from '../components/NameInputs'

const ExampleHooks = () => {
  return (
    <>
      <Header>
        useCallback can be used to keep function references same. This prevents extra renders for <u>memoized</u>{' '}
        components.
      </Header>
      <DataList
        name='ExampleHooks_WithoutUseCallback'
        header='Without useCallback, everything renders on change.'
        Component={MemoizedNameInputs}
        componentProps={{
          useHook: useUpdateWithoutUseCallback,
        }}
      />
      <DataList
        name='ExampleHooks_MemoizedNameInputs'
        header='With useCallback, only the changed input renders.'
        Component={MemoizedNameInputs}
      />
      <DataList
        name='ExampleHooks_NameInputs'
        header='Without memo, useCallback has no effect.'
        Component={NameInputs}
      />
      <Divider />
      <Header>
        useMemo can be used to keep object references same. This prevents extra renders for <u>memoized</u> components.
      </Header>
      <DataList
        name='ExampleHooks_FullNameFromArray'
        header='Full name field gets props as an array. This array is created every render with a different reference.'
        Component={FullNameFromArray}
      />
      <DataList
        name='ExampleHooks_FullNameFromArrayWithUseMemo'
        header='With useMemo, only the changed name renders.'
        Component={FullNameFromArrayWithUseMemo}
      />
      <Divider />
      <Header>useMemo is pointless for plain values like strings (except if the calculation is expensive).</Header>
      <DataList
        name='ExampleHooks_FullName'
        header='Full name field gets props as an string, only the changed name renders.'
        Component={FullName}
      />
      <DataList
        name='ExampleHooks_FullNameWithUseMemo'
        header='The behavior is exactly same with useMemo.'
        Component={FullNameWithUseMemo}
      />
      <DataList
        name='ExampleHooks_FullNameWithoutMemoization'
        header='Without memoization, useMemo is still pointless.'
        Component={FullNameWithoutMemoization}
      />
    </>
  )
}

const FullNameFromArray = ({ item, instance }: ItemProps) => {
  const { first, last } = item
  const name = [first, last] as const
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <RenderFullNameFromArray name={name} />
    </MemoizedNameInputs>
  )
}

const FullNameFromArrayWithUseMemo = ({ item, instance }: ItemProps) => {
  const { first, last } = item
  const name = useMemo(() => [first, last] as const, [first, last])
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <RenderFullNameFromArray name={name} />
    </MemoizedNameInputs>
  )
}

const FullName = ({ item, instance }: ItemProps) => {
  const { first, last } = item

  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <MemoizedTrackingInput value={`${first} ${last}`} />
    </MemoizedNameInputs>
  )
}

const FullNameWithUseMemo = ({ item, instance }: ItemProps) => {
  const { first, last } = item
  const fullName = useMemo(() => `${first} ${last}`, [first, last])
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <MemoizedTrackingInput value={fullName} />
    </MemoizedNameInputs>
  )
}

const FullNameWithoutMemoization = ({ item, instance }: ItemProps) => {
  const { first, last } = item
  const fullName = useMemo(() => `${first} ${last}`, [first, last])
  return (
    <NameInputs item={item} instance={instance}>
      <TrackingInput value={fullName} />
    </NameInputs>
  )
}

const RenderFullNameFromArray = memo(({ name }: { name: readonly [string, string] }) => (
  <TrackingInput value={`${name[0]} ${name[1]}`} />
))

export default ExampleHooks
