import React, { useMemo } from 'react'
import { Divider, Header } from 'semantic-ui-react'
import DataList from '../components/DataList'
import { ItemProps } from '../app/utils'
import { MemoizedNameInputs } from '../components/NameInputs'
import {
  MemoizedFullNameObject,
  MemoizedFullNameRedux,
  FullNameRedux,
  MemoizedFullNameString,
  FullNameString,
} from '../components/FullName'
import { useFullName, useFullNameWithShallow } from '../app/selectors'
import { useFullNameWithReselect } from '../app/reselect'

const component = 'ExampleUseMemo_'

const ExampleUseMemo = () => {
  return (
    <>
      <Header>
        useMemo can be used to keep object references same. This prevents extra renders for <u>memoized</u> components.
      </Header>
      <DataList
        name={`${component}FromObject`}
        header='Full name field gets props as an object. This object is created every render with a different reference.'
        Component={FromObject}
      />
      <DataList
        name={`${component}FromObjectWithMemo`}
        header='With useMemo, only the changed name renders.'
        Component={FromObjectWithMemo}
      />
      <Divider />
      <Header>useMemo is pointless for plain values like strings (except if the calculation is expensive).</Header>
      <DataList
        name={`${component}FromString`}
        header='Full name field gets props as an string, only the changed name renders.'
        Component={FromString}
      />
      <DataList
        name={`${component}FromStringWithUseMemo`}
        header='The behavior is exactly same with useMemo.'
        Component={FromStringWithUseMemo}
      />
      <DataList
        name={`${component}FromStringWithouMemoization`}
        header="Without memoization, useMemo is still pointless because it doesn't prevent renders."
        Component={FromStringWithoutMemoization}
      />
      <Divider />
      <Header>Redux can also be used but requires a proper implementation.</Header>
      <DataList
        name={`${component}FromRedux`}
        header='The original issue exists with the default implementation.'
        Component={FromRedux}
      />
      <DataList
        name={`${component}FromReduxShallow`}
        header='useSelector supports memoization to prevent unnecessary renders.'
        Component={FromReduxShallow}
      />
      <DataList
        name={`${component}FromReduxShallowWithoutMemo`}
        header='useSelector has a bit surpising feature that the memoization is forgotten when the parent causes the render.'
        Component={FromReduxShallowWithoutMemo}
      />
      <DataList
        name={`${component}FromReselect`}
        header='This works better with reselect library.'
        Component={FromReselect}
      />
    </>
  )
}

const FromObject = ({ item, instance }: ItemProps) => {
  const { first, last } = item
  const name = { first, last }
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <MemoizedFullNameObject name={name} />
    </MemoizedNameInputs>
  )
}

const FromObjectWithMemo = ({ item, instance }: ItemProps) => {
  const { first, last } = item
  const name = useMemo(() => ({ first, last }), [first, last])
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <MemoizedFullNameObject name={name} />
    </MemoizedNameInputs>
  )
}

const FromString = ({ item, instance }: ItemProps) => {
  const { first, last } = item

  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <MemoizedFullNameString name={`${first} ${last}`} />
    </MemoizedNameInputs>
  )
}

const FromStringWithUseMemo = ({ item, instance }: ItemProps) => {
  const { first, last } = item
  const name = useMemo(() => `${first} ${last}`, [first, last])
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <MemoizedFullNameString name={name} />
    </MemoizedNameInputs>
  )
}

const FromStringWithoutMemoization = ({ item, instance }: ItemProps) => {
  const { first, last } = item
  const name = useMemo(() => `${first} ${last}`, [first, last])
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <FullNameString name={name} />
    </MemoizedNameInputs>
  )
}

const FromRedux = ({ item, instance }: ItemProps) => {
  const { index } = item
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <MemoizedFullNameRedux instance={instance} index={index} selector={useFullName} />
    </MemoizedNameInputs>
  )
}

const FromReduxShallow = ({ item, instance }: ItemProps) => {
  const { index } = item
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <MemoizedFullNameRedux instance={instance} index={index} selector={useFullNameWithShallow} />
    </MemoizedNameInputs>
  )
}

const FromReduxShallowWithoutMemo = ({ item, instance }: ItemProps) => {
  const { index } = item
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <FullNameRedux instance={instance} index={index} selector={useFullNameWithShallow} />
    </MemoizedNameInputs>
  )
}

const FromReselect = ({ item, instance }: ItemProps) => {
  const { index } = item
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <FullNameRedux instance={instance} index={index} selector={useFullNameWithReselect} />
    </MemoizedNameInputs>
  )
}

export default ExampleUseMemo
