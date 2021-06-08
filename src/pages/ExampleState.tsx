import React, { useCallback, useReducer, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Header } from 'semantic-ui-react'

import { addStateClick } from '../app/reducer'
import { RootState } from '../app/store'
import { TrackingButton } from '../components/TrackingButton'

const ExampleState = () => {
  return (
    <>
      <Header>
        Clicking a button increases an internal counter which is not used at all. This value is stored in different
        ways.
      </Header>
      <Header>Renders still happen because some hooks force a render (useState, useSelector).</Header>
      <Counter
        header='The value is stored in local state (useState). Every click causes a render.'
        hook={useWithState}
      />
      <Counter header="The value is stored in a local ref (useRef). Clicks won't cause renders" hook={useWithRef} />
      <Counter
        header="The value is stored in local state (useState) but mutated. Clicks won't cause renders"
        hook={useWithMutableState}
      />
      <Counter header="The value is stored in Redux store. Clicks won't cause renders." hook={useWithDispatch} />
      <Counter
        header='But if useSelector is used to get the value then every click causes a render.'
        hook={useWithRedux}
      />
      <Counter
        header='The value is stored in local reducer state (useReducer). Every click causes a render.'
        hook={useWithReducer}
      />
    </>
  )
}

interface Props {
  hook: () => () => void
  header: string
}

const Counter = ({ hook, header }: Props) => {
  const handleClick = hook()
  return (
    <>
      <Divider />
      <Header size='small'>{header}</Header>
      <TrackingButton onClick={handleClick}>+</TrackingButton>
    </>
  )
}

/**
 * Amount of clicks is stored in state but the value is not used.
 * All updates still cause a render.
 */
const useWithState = () => {
  const [, setState] = useState(0)

  const handleClick = useCallback(() => {
    setState((prev) => prev + 1)
  }, [])

  return handleClick
}

/**
 * Amount of clicks is stored in a mutable ref.
 * Updates won't cause a render.
 */
const useWithRef = () => {
  const click = useRef(0)

  const handleClick = useCallback(() => {
    click.current++
  }, [])

  return handleClick
}

/**
 * Amount of clicks is stored in a local state. The value is mutated instead of updated.
 * Updates won't cause a render.
 */
const useWithMutableState = () => {
  const [state] = useState({ value: 0 })

  const handleClick = useCallback(() => {
    state.value++
  }, [state])

  return handleClick
}

/**
 * Amount of clicks is stored in Redux.
 * The value is not accessed so updates won't cause a render.
 */
const useWithDispatch = () => {
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(addStateClick())
  }, [dispatch])

  return handleClick
}

/**
 * Amount of clicks is stored in Redux. The value is accessed but not used.
 * All updates still cause a render.
 */
const useWithRedux = () => {
  useSelector((state: RootState) => state.stateClicks)
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(addStateClick())
  }, [dispatch])

  return handleClick
}

const counterReducer = (state: number, type: string) => {
  switch (type) {
    case 'add':
      return state + 1
    default:
      throw new Error()
  }
}

/**
 * Amount of clicks is stored in a local reducer state but the value is not used.
 * All updates still cause a render.
 */
const useWithReducer = () => {
  const [, dispatch] = useReducer(counterReducer, 0)

  const handleClick = useCallback(() => {
    dispatch('add')
  }, [dispatch])

  return handleClick
}

export default ExampleState
