import { useCallback, useMemo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import {
  Item,
  set,
  setFirstName,
  setFirstNameWithDelay,
  setLastName,
  setLastNameWithDelay,
  setWithDelay,
} from '../server/reducer'
import { createSelector } from 'reselect'

const getAllData = (state: RootState) => state.server.names
const getData = (state: RootState, instance: number) => getAllData(state)[instance]
const getName = (state: RootState, instance: number, index: number) => getData(state, instance)[index]

const getNameArray = (state: RootState, instance: number, index: number) => {
  const name = getData(state, instance)[index]
  return [name.first, name.last]
}
const getNameDeepArray = (state: RootState, instance: number, index: number) => {
  const name = getData(state, instance)[index]
  return [[name.first], [name.last]]
}

const getNameWithProps = (state: RootState, path: [number, number]) => getName(state, path[0], path[1])
const createNnameDeepArraySelector = () => createSelector(getNameWithProps, (name) => [[name.first], [name.last]])
const nameDeepArraySelector = createNnameDeepArraySelector()

export const useAllData = () => useSelector(getAllData)

export const useData = (instance: number) => useSelector((state: RootState) => getData(state, instance))

export const useName = (instance: number, index: number) =>
  useSelector((state: RootState) => getName(state, instance, index))

export const useNameWithShallow = (instance: number, index: number) =>
  useSelector((state: RootState) => getName(state, instance, index), shallowEqual)

export const useFirstName = (instance: number, index: number) =>
  useSelector((state: RootState) => getName(state, instance, index).first)
export const useLastName = (instance: number, index: number) =>
  useSelector((state: RootState) => getName(state, instance, index).last)

export const useNameArray = (instance: number, index: number) =>
  useSelector((state: RootState) => getNameArray(state, instance, index))

export const useNameArrayWithShallow = (instance: number, index: number) =>
  useSelector((state: RootState) => getNameArray(state, instance, index), shallowEqual)

export const useNameDeepArray = (instance: number, index: number) =>
  useSelector((state: RootState) => getNameDeepArray(state, instance, index), shallowEqual)

export const useNameDeepArrayWithCheck = (instance: number, index: number) =>
  useSelector(
    (state: RootState) => getNameDeepArray(state, instance, index),
    (a, b) => {
      return a[0][0] === b[0][0] && a[0][1] === b[0][1]
    }
  )

export const useNameDeepArrayWithMemo = (instance: number, index: number) => {
  const name = useSelector((state: RootState) => getName(state, instance, index))
  return useMemo(() => [[name.first], [name.last]], [name.first, name.last])
}

export const useNameDeepArrayWithReselect = (instance: number, index: number) =>
  useSelector((state: RootState) => nameDeepArraySelector(state, [instance, index]))

export const useNameDeepArrayWithCustomReselect = (instance: number, index: number) => {
  const selector = useMemo(() => createNnameDeepArraySelector(), [])
  return useSelector((state: RootState) => selector(state, [instance, index]))
}

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

export const useUpdateByAttribute = (instance: number, index: number) => {
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
