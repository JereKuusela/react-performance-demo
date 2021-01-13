import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  Item,
  set,
  setFirstName,
  setFirstNameWithDelay,
  setLastName,
  setLastNameWithDelay,
  setWithDelay,
} from '../server/reducer'

export const useUpdateWithSet = (instance: number, item: Item) => {
  const dispatch = useDispatch()
  const handleFirstChange = useCallback(
    (first: string) => {
      dispatch(set(instance, { ...item, first }))
    },
    [dispatch, instance, item]
  )
  const handleLastChange = useCallback(
    (last: string) => {
      dispatch(set(instance, { ...item, last }))
    },
    [dispatch, instance, item]
  )
  return { handleFirstChange, handleLastChange }
}

export const useUpdateWithDelayedSet = (instance: number, item: Item) => {
  const dispatch = useDispatch()
  const handleFirstChange = useCallback(
    (first: string) => {
      dispatch(setWithDelay(instance, { ...item, first }))
    },
    [dispatch, instance, item]
  )
  const handleLastChange = useCallback(
    (last: string) => {
      dispatch(setWithDelay(instance, { ...item, last }))
    },
    [dispatch, instance, item]
  )
  return { handleFirstChange, handleLastChange }
}

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
export const useUpdateByDelayedAttribute = (instance: number, index: number) => {
  const dispatch = useDispatch()
  const handleFirstChange = useCallback(
    (first: string) => {
      dispatch(setFirstNameWithDelay(instance, index, first))
    },
    [dispatch, instance, index]
  )
  const handleLastChange = useCallback(
    (last: string) => {
      dispatch(setLastNameWithDelay(instance, index, last))
    },
    [dispatch, instance, index]
  )
  return { handleFirstChange, handleLastChange }
}
