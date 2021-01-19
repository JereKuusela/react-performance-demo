import { useCallback, useReducer, useRef, useState } from 'react'
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
  // The value of the state is not directly used at all.
  const [, setClicks] = useState(1)
  const dispatch = useDispatch()
  // Using the update function means the click value is not needed on the dependency array.
  // This keeps references of handlers the same so all renders are caused by useState.
  // Note: This is not recommended way to write code. Update functions should have no side effects.
  // On real code, using this kind of trick is pointless because useState causes renders anyways.
  // On development mode, React will call update functions twice to show these kind of mistakes.
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

const reducer = (state: { dispatch: any; clicks: number; instance: number }, type: string) => {
  const { dispatch, instance, clicks } = state
  switch (type) {
    case 'add':
      // Doing the update logic here means that click handlers have no dependencies.
      // This keeps references of handlers the same so all renders are caused by useReducer.
      // Note: This is not recommended way to write code. Reducer functions should have no side effects.
      // On real code, using this kind of trick is pointless because useReducer causes renders anyways.
      // On development mode, React will call reducer functions twice to show these kind of mistakes.
      if (canAct(clicks)) setTimeout(() => dispatch(add(instance)), 50)
      return { ...state, clicks: clicks + 1 }
    case 'remove':
      if (canAct(clicks)) dispatch(remove(instance))
      return { ...state, clicks: clicks + 1 }
    default:
      throw new Error()
  }
}

export const useButtonHandlersWithReducer = (name: string) => {
  const instance = getInstanceNumber(name)
  const dispatch = useDispatch()
  const [, reducerDispatch] = useReducer(reducer, { dispatch, instance, clicks: 1 })
  const handleAdd = useCallback(() => {
    reducerDispatch('add')
  }, [])
  const handleRemove = useCallback(() => {
    reducerDispatch('remove')
  }, [])
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

export const useButtonHandlersWithRefLikeState = (name: string) => {
  const instance = getInstanceNumber(name)
  // Value can only be mutated because the update function is not used.
  const [value] = useState({ current: 1 })
  const dispatch = useDispatch()
  const handleAdd = useCallback(() => {
    if (canAct(value.current)) dispatch(add(instance))
    value.current++
  }, [dispatch, instance, value])
  const handleRemove = useCallback(() => {
    if (canAct(value.current)) dispatch(remove(instance))
    value.current++
  }, [dispatch, instance, value])
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
