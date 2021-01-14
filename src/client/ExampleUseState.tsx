import React from 'react'
import { Divider, Header, ListItem } from 'semantic-ui-react'
import DataList from './DataList'
import TrackingButton from '../components/TrackingButton'
import {
  useButtonHandlersWithState,
  useButtonHandlersWithRef,
  useButtonHandlersWithGlobal,
  useButtonHandlersWithRedux,
  useButtonHandlersWithImprovedRedux,
  useButtonHandlersWithFixedRedux,
} from './buttonActions'
import { TrackingInput } from '../components/TrackingInput'
import { useUpdate } from './actions'
import { ItemProps } from '../app/utils'

const ExampleUseState = () => {
  return (
    <>
      <Header>
        In the following example, add and remove buttons only work every 5th click. No memoization is used.
      </Header>
      <UseState />
      <ItemList
        name='ExampleuseState_UseStateRefactored'
        header='The button logic can be refactored to own component. Then every click only renders the buttons'
        useHook={useButtonHandlersWithState}
      />
      <ItemList
        name='ExampleUseState_UseRef'
        header='With useRef, clicks no longer cause a render.'
        useHook={useButtonHandlersWithRef}
      />
      <ItemList
        name='ExampleUseState_Global'
        header='The variable can also be stored as a global variable.'
        useHook={useButtonHandlersWithGlobal}
      />
      <Divider />
      <Header>The variable can also be stored on Redux but requires a proper implementation.</Header>
      <ItemList
        name='ExampleUseState_Redux'
        header='A naive implementation will cause a render every click.'
        useHook={useButtonHandlersWithRedux}
      />
      <ItemList
        name='ExampleUseState_ImprovedRedux'
        header='With improved logic, the render only happens when the action changes.'
        useHook={useButtonHandlersWithImprovedRedux}
      />
      <ItemList
        name='ExampleUseState_FixedRedux'
        header='With the whole logic in Redux, clicks no longer cause a render.'
        useHook={useButtonHandlersWithFixedRedux}
      />
    </>
  )
}

const UseState = () => {
  const name = 'ExampleUseState_UseState'
  const { handleAdd, handleRemove } = useButtonHandlersWithState(name)
  return (
    <>
      <DataList name={name} header='With useState, every click renders everything.' Component={RenderItem} />
      <TrackingButton onClick={handleAdd}>+</TrackingButton>
      <TrackingButton onClick={handleRemove}>-</TrackingButton>
    </>
  )
}

interface Props extends ButtonProps {
  header: string
}

const ItemList = ({ header, name, useHook }: Props) => (
  <>
    <DataList name={name} header={header} Component={RenderItem} />
    <Buttons name={name} useHook={useHook} />
  </>
)

interface ButtonProps {
  name: string
  useHook: (name: string) => { handleAdd: () => void; handleRemove: () => void }
}

const Buttons = ({ name, useHook }: ButtonProps) => {
  const { handleAdd, handleRemove } = useHook(name)
  return (
    <>
      <TrackingButton onClick={handleAdd}>+</TrackingButton>
      <TrackingButton onClick={handleRemove}>-</TrackingButton>
    </>
  )
}

const RenderItem = ({ item, instance }: ItemProps) => {
  const { index, first, last } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)

  return (
    <ListItem>
      <TrackingInput value={first} onChange={handleFirstChange} />
      <TrackingInput value={last} onChange={handleLastChange} />
    </ListItem>
  )
}

export default ExampleUseState
