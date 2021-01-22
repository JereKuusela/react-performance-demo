import React from 'react'
import { Divider, Header } from 'semantic-ui-react'
import {
  useButtonHandlersWithStateStable,
  useButtonHandlersWithRef,
  useButtonHandlersWithGlobal,
  useButtonHandlersWithRedux,
  useButtonHandlersWithImprovedRedux,
  useButtonHandlersWithFixedRedux,
  useButtonHandlersWithRefLikeState,
  useButtonHandlersWithReducer,
} from '../app/actions'
import DataListWithButtons from '../components/DataListWithButtons'

const component = 'ExampleUseState_'

const ExampleUseState = () => {
  return (
    <>
      <Header>
        In the following example, add and remove buttons only work every 3th click. <u>No memoization</u> is used.
      </Header>
      <DataListWithButtons
        name={`${component}useButtonHandlersWithState`}
        header='useState forces a render when the value changes so every click will render both buttons.'
        useHook={useButtonHandlersWithStateStable}
      />
      <DataListWithButtons
        name={`${component}useButtonHandlersWithReducer`}
        header='With useReducer, clicks no longer cause a render.'
        useHook={useButtonHandlersWithReducer}
      />
      <DataListWithButtons
        name={`${component}useButtonHandlersWithRef`}
        header='With useRef, clicks no longer cause a render.'
        useHook={useButtonHandlersWithRef}
      />
      <DataListWithButtons
        name={`${component}useButtonHandlersWithRefLikeState`}
        header='useState can only also be used like useRef.'
        useHook={useButtonHandlersWithRefLikeState}
      />
      <DataListWithButtons
        name={`${component}useButtonHandlersWithGlobal`}
        header='The variable can also be stored as a global variable.'
        useHook={useButtonHandlersWithGlobal}
      />
      <Divider />
      <Header>The variable can also be stored on Redux but requires a proper implementation.</Header>
      <DataListWithButtons
        name={`${component}useButtonHandlersWithRedux`}
        header='A naive implementation will cause a render every click.'
        useHook={useButtonHandlersWithRedux}
      />
      <DataListWithButtons
        name={`${component}useButtonHandlersWithImprovedRedux`}
        header='With improved logic, the render happens when the action changes.'
        useHook={useButtonHandlersWithImprovedRedux}
      />
      <DataListWithButtons
        name={`${component}useButtonHandlersWithFixedRedux`}
        header='With the whole logic in Redux, clicks no longer cause a render.'
        useHook={useButtonHandlersWithFixedRedux}
      />
    </>
  )
}

export default ExampleUseState
