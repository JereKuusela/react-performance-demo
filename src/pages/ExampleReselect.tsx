import React from 'react'
import { Header } from 'semantic-ui-react'
import {
  useFullNameCounter,
  useFullNameCounterWithReselect,
  useFullNameCounterWithFixedReselect,
} from '../app/reselect'
import {} from '../app/selectors'
import { ItemProps } from '../app/utils'
import DataList from '../components/DataList'
import { FullNameString } from '../components/FullName'
import { MemoizedNameInputs } from '../components/NameInputs'

const component = 'ExampleReselect_'

const ExampleReselect = () => {
  return (
    <>
      <Header>reselect library allows memoization based on input instead of output values.</Header>
      <Header>This can be used to avoid expensive calculations and reusing complex selector logic.</Header>
      <DataList
        name={`${component}FromRedux`}
        header='Without reselect, the full name is recalculated every time.'
        Component={FromRedux}
      />
      <DataList
        name={`${component}FromReselect`}
        header="Default implementation of reselect doesn't work for lists (cachesize of 1)."
        Component={FromReselect}
      />
      <DataList
        name={`${component}FromFixedReselect`}
        header='This can be fixed by creating selector instance for every item.'
        Component={FromFixedReselect}
      />
    </>
  )
}

const FromRedux = ({ item, instance }: ItemProps) => {
  const { index } = item
  const name = useFullNameCounter(instance, index)
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <FullNameString name={name} />
    </MemoizedNameInputs>
  )
}
const FromReselect = ({ item, instance }: ItemProps) => {
  const { index } = item
  const name = useFullNameCounterWithReselect(instance, index)
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <FullNameString name={name} />
    </MemoizedNameInputs>
  )
}
const FromFixedReselect = ({ item, instance }: ItemProps) => {
  const { index } = item
  const name = useFullNameCounterWithFixedReselect(instance, index)
  return (
    <MemoizedNameInputs item={item} instance={instance}>
      <FullNameString name={name} />
    </MemoizedNameInputs>
  )
}
export default ExampleReselect
