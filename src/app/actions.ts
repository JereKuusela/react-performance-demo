import { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { add, addClick, addWithLogic, remove, removeWithLogic, setFirstName, setLastName } from './reducer'
import { useClicks, useCanAct } from './selectors'
import { getInstanceNumber, canAct } from './utils'

export const useUpdate = (instance: number, index: number) => {
  const dispatch = useDispatch()
  const handleFirstChange = useCallback(
    (first: string) => {
      dispatch(setFirstName(instance, index, first))
    },
    [dispatch, instance, index]
  )
  const handleLastChange = useCallback(
    (last: string) => {
      dispatch(setLastName(instance, index, last))
    },
    [dispatch, instance, index]
  )
  return { handleFirstChange, handleLastChange }
}

export const useUpdateWithoutUseCallback = (instance: number, index: number) => {
  const dispatch = useDispatch()
  const handleFirstChange = (first: string) => {
    dispatch(setFirstName(instance, index, first))
  }
  const handleLastChange = (last: string) => {
    dispatch(setLastName(instance, index, last))
  }
  return { handleFirstChange, handleLastChange }
}

export const useButtonHandlersWithState = (name: string) => {
  const instance = getInstanceNumber(name)
  const [, setClicks] = useState(1)
  const dispatch = useDispatch()
  const handleAdd = useCallback(() => {
    setClicks((prev) => {
      if (canAct(prev)) dispatch(add(instance))
      return prev + 1
    })
  }, [dispatch, instance])
  const handleRemove = useCallback(() => {
    setClicks((prev) => {
      if (canAct(prev)) dispatch(remove(instance))
      return prev + 1
    })
  }, [dispatch, instance])
  return { handleAdd, handleRemove }
}

export const useButtonHandlersWithRef = (name: string) => {
  const instance = getInstanceNumber(name)
  const clicks = useRef(1)
  const dispatch = useDispatch()
  const handleAdd = useCallback(() => {
    if (canAct(clicks.current)) dispatch(add(instance))
    clicks.current++
  }, [dispatch, instance])
  const handleRemove = useCallback(() => {
    if (canAct(clicks.current)) dispatch(remove(instance))
    clicks.current++
  }, [dispatch, instance])
  return { handleAdd, handleRemove }
}

let clicks = 1

export const useButtonHandlersWithGlobal = (name: string) => {
  const instance = getInstanceNumber(name)
  const dispatch = useDispatch()
  const handleAdd = useCallback(() => {
    if (canAct(clicks)) dispatch(add(instance))
    clicks++
  }, [dispatch, instance])
  const handleRemove = useCallback(() => {
    if (canAct(clicks)) dispatch(remove(instance))
    clicks++
  }, [dispatch, instance])
  return { handleAdd, handleRemove }
}

export const useButtonHandlersWithRedux = (name: string) => {
  const instance = getInstanceNumber(name)
  const clicks = useClicks()
  const dispatch = useDispatch()
  const handleAdd = useCallback(() => {
    if (canAct(clicks)) dispatch(add(instance))
    dispatch(addClick())
  }, [dispatch, instance, clicks])
  const handleRemove = useCallback(() => {
    if (canAct(clicks)) dispatch(remove(instance))
    dispatch(addClick())
  }, [dispatch, instance, clicks])
  return { handleAdd, handleRemove }
}

export const useButtonHandlersWithImprovedRedux = (name: string) => {
  const instance = getInstanceNumber(name)
  const canAct = useCanAct()
  const dispatch = useDispatch()
  const handleAdd = useCallback(() => {
    if (canAct) dispatch(add(instance))
    dispatch(addClick())
  }, [dispatch, instance, canAct])
  const handleRemove = useCallback(() => {
    if (canAct) dispatch(remove(instance))
    dispatch(addClick())
  }, [dispatch, instance, canAct])
  return { handleAdd, handleRemove }
}

export const useButtonHandlersWithFixedRedux = (name: string) => {
  const instance = getInstanceNumber(name)
  const dispatch = useDispatch()
  const handleAdd = useCallback(() => {
    dispatch(addWithLogic(instance))
  }, [dispatch, instance])
  const handleRemove = useCallback(() => {
    dispatch(removeWithLogic(instance))
  }, [dispatch, instance])
  return { handleAdd, handleRemove }
}
