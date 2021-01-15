import React from 'react'
import { Divider, Header } from 'semantic-ui-react'
import DataList from '../components/DataList'
import TrackingButton from '../components/TrackingButton'
import { NameInputs } from '../components/NameInputs'
import {
  useButtonHandlersWithState,
  useButtonHandlersWithRef,
  useButtonHandlersWithGlobal,
  useButtonHandlersWithRedux,
  useButtonHandlersWithImprovedRedux,
  useButtonHandlersWithFixedRedux,
} from '../app/actions'

const ExampleUseState = () => {
  return (
    <>
      <Header>
        In the following example, add and remove buttons only work every 3th click. <u>No memoization</u> is used.
      </Header>
      <UseState />
      <ItemList
        name='ExampleUseState_UseStateRefactored'
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
      <DataList
        name={name}
        header='useState forces a render when the value changes. Setting the state on the parent component will render everything.'
        Component={NameInputs}
      />
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
    <DataList name={name} header={header} Component={NameInputs} />
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
