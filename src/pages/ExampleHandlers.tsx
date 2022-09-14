import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Header } from 'semantic-ui-react'
import { addClicks, addClicksWithAdd, setAddClicks } from '../app/reducer'
import { RootState } from '../app/store'
import Adder from '../components/Adder'

const component = 'ExampleHandlers_'

const ExampleHandlers = () => {
  return (
    <>
      <Header>Following example has a button that sets value to a counter.</Header>
      <Header>
        useCallback can be used to keep function references same. This prevents extra renders for <u>memoized</u>{' '}
        components.
      </Header>
      <Adder
        name={`${component}useWithoutUsecallback`}
        header='Without useCallback, changing the value and clicking the button invalidate the handler reference.'
        hook={useWithoutUsecallback}
        memoized
      />
      <Adder
        name={`${component}useWithUseCallback`}
        header='Without memoization of the component, useCallback has no effect.'
        hook={useWithUseCallback}
      />
      <Adder
        name={`${component}useWithUseCallback`}
        header='With memoization and useCallback, changing the value still invalidates the reference because of dependency.'
        hook={useWithUseCallback}
        memoized
      />
      <Divider />
      <Header>There are multiple ways to break this dependency.</Header>
      <Adder
        name={`${component}useWithUpdater`}
        header="The state updater function allows getting the state value without a dependency. However updater functions shouldn't have side effects so dispatching requires a bit more code."
        hook={useWithUpdater}
        memoized
      />
      <Adder
        name={`${component}useWithRef`}
        header="The state value can be copied to a mutable ref which doesn't require a dependency."
        hook={useWithRef}
        memoized
      />
      <Adder
        name={`${component}useWithCallbackRef`}
        header='Another way is to put the whole callback to a mutable ref.'
        hook={useWithCallbackRef}
        memoized
      />
      <Divider />
      <Header>
        Reducers allow separating the logic of setting and adding the value. This further removes the need of passing
        the handler as a prop.
      </Header>
      <Adder
        name={`${component}useWithRedux`}
        header='The state value is stored in Redux.'
        hook={useWithRedux}
        memoized
      />
    </>
  )
}

const useWithoutUsecallback = (instance: number) => {
  const [clicks, setClicks] = useState(0)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addClicks(instance, clicks))
  }

  return { clicks, setClicks, handleClick }
}

const useWithUseCallback = (instance: number) => {
  const [clicks, setClicks] = useState(0)
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(addClicks(instance, clicks))
  }, [dispatch, instance, clicks])

  return { clicks, setClicks, handleClick }
}

const useWithUpdater = (instance: number) => {
  const [clicks, setClicks] = useState(0)
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    let value = 0
    // Updater function shouldn't have side effects so Redux dispatch must be outside of it.
    setClicks((prev) => {
      value = prev
      return prev
    })
    dispatch(addClicks(instance, value))
  }, [dispatch, instance])

  return { clicks, setClicks, handleClick }
}

const useWithRef = (instance: number) => {
  const [clicks, setClicks] = useState(0)
  const dispatch = useDispatch()

  // Break the dependency bu copying to state to a mutable ref.
  const clicksRef = useRef(clicks)
  useEffect(() => {
    clicksRef.current = clicks
  }, [clicks])

  const handleClick = useCallback(() => {
    dispatch(addClicks(instance, clicksRef.current))
  }, [dispatch, instance])

  return { clicks, setClicks, handleClick }
}

const useWithCallbackRef = (instance: number) => {
  const [clicks, setClicks] = useState(0)
  const dispatch = useDispatch()

  // Break the dependency bu copying to state to a mutable ref.
  const callbackRef = useRef(() => {})
  useEffect(() => {
    callbackRef.current = () => {
      dispatch(addClicks(instance, clicks))
    }
  }, [dispatch, instance, clicks])

  const handleClick = useCallback(() => {
    callbackRef.current()
  }, [])

  return { clicks, setClicks, handleClick }
}

const useWithRedux = (instance: number) => {
  const dispatch = useDispatch()
  const setClicks = useCallback(
    (value: number) => {
      dispatch(setAddClicks(value))
    },
    [dispatch]
  )
  const clicks = useSelector((state: RootState) => state.addClicks)

  const handleClick = useCallback(() => {
    dispatch(addClicksWithAdd(instance))
  }, [dispatch, instance])

  return { clicks, setClicks, handleClick }
}

export default ExampleHandlers
