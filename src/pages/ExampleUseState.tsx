import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Header } from 'semantic-ui-react'

import { addStateClick } from '../app/reducer'
import { RootState } from '../app/store'
import { TrackingButton } from '../components/TrackingButton'

const ExampleUseState = () => {
  return (
    <>
      <Header>State updates force render, even when the value is not used for rendering.</Header>
      <Divider />
      <Header>
        In the following examples, amount of clicks is stored in different ways. The value is not used at all.
      </Header>
      <StateButton
        header='Amount of clicks is stored in a local state. Every click causes a render.'
        hook={useWithState}
      />
      <StateButton header="Amount of clicks is stored in Redux. Clicks won't cause renders." hook={useWithDispatch} />
      <StateButton header='But if useSelector is used then every click causes a render.' hook={useWithRedux} />
      <StateButton header="Amount of clicks is stored in a local ref. Clicks won't cause renders" hook={useWithRef} />
      <StateButton
        header="Amount of clicks is sotred in local ref. Clicks won't cause renders"
        hook={useWithMutableState}
      />
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
 * Amount of clicks is stored in Redux.The value is accessed but not used.
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
 * Amount of clicks is stored in a local state. Thevalue is mutated instead of updated.
 * Updates won't cause a render.
 */
const useWithMutableState = () => {
  const [state] = useState({ value: 0 })

  const handleClick = useCallback(() => {
    state.value++
  }, [state])

  return handleClick
}

interface ButtonProps {
  hook: () => () => void
  header: string
}

const StateButton = ({ hook, header }: ButtonProps) => {
  const handleClick = hook()
  return (
    <>
      <Divider />
      <Header size='small'>{header}</Header>
      <TrackingButton onClick={handleClick}>+</TrackingButton>
    </>
  )
}

export default ExampleUseState
