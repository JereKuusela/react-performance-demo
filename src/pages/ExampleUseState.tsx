import React from 'react'
import { Divider, Header } from 'semantic-ui-react'
import DataList from '../components/DataList'
import TrackingButton from '../components/TrackingButton'
import { MemoizedNameInputs } from '../components/NameInputs'
import {
  useButtonHandlersWithState,
  useButtonHandlersWithRef,
  useButtonHandlersWithGlobal,
  useButtonHandlersWithRedux,
  useButtonHandlersWithImprovedRedux,
  useButtonHandlersWithFixedRedux,
  useButtonHandlersWithRefLikeState,
  useButtonHandlersWithReducer,
} from '../app/actions'

const component = 'ExampleUseState_'

const ExampleUseState = () => {
  return (
    <>
      <Header>
        In the following example, add and remove buttons only work every 3th click. <u>No memoization</u> is used.
      </Header>
      <ItemList
        name={`${component}useButtonHandlersWithState`}
        header='useState forces a render when the value changes so every click will render both buttons.'
        useHook={useButtonHandlersWithState}
      />
      <ItemList
        name={`${component}useButtonHandlersWithReducer`}
        header='With useReducer, clicks no longer cause a render.'
        useHook={useButtonHandlersWithReducer}
      />
      <ItemList
        name={`${component}useButtonHandlersWithRef`}
        header='With useRef, clicks no longer cause a render.'
        useHook={useButtonHandlersWithRef}
      />
      <ItemList
        name={`${component}useButtonHandlersWithRefLikeState`}
        header='useState can only also be used like useRef.'
        useHook={useButtonHandlersWithRefLikeState}
      />
      <ItemList
        name={`${component}useButtonHandlersWithGlobal`}
        header='The variable can also be stored as a global variable.'
        useHook={useButtonHandlersWithGlobal}
      />
      <Divider />
      <Header>The variable can also be stored on Redux but requires a proper implementation.</Header>
      <ItemList
        name={`${component}useButtonHandlersWithRedux`}
        header='A naive implementation will cause a render every click.'
        useHook={useButtonHandlersWithRedux}
      />
      <ItemList
        name={`${component}useButtonHandlersWithImprovedRedux`}
        header='With improved logic, the render happens when the action changes.'
        useHook={useButtonHandlersWithImprovedRedux}
      />
      <ItemList
        name={`${component}useButtonHandlersWithFixedRedux`}
        header='With the whole logic in Redux, clicks no longer cause a render.'
        useHook={useButtonHandlersWithFixedRedux}
      />
    </>
  )
}

interface Props extends ButtonProps {
  header: string
}

const ItemList = ({ header, name, useHook }: Props) => (
  <>
    <DataList name={name} header={header} Component={MemoizedNameInputs} />
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

export default ExampleUseState
