// Selector hooks to return data from Redux.
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from './store'
import { canAct } from './utils'

const getAllData = (state: RootState) => state.names
const getData = (state: RootState, instance: number) => getAllData(state)[instance]
const getName = (state: RootState, instance: number, index: number) => getData(state, instance)[index]
const getFullName = (state: RootState, instance: number, index: number) => {
  const { first, last } = getName(state, instance, index)
  return { first, last }
}
export const useClicks = (instance: number) => useSelector((state: RootState) => state.clicks[instance])

export const useAllData = () => useSelector(getAllData)

export const useData = (instance: number) => useSelector((state: RootState) => getData(state, instance))

export const useName = (instance: number, index: number) =>
  useSelector((state: RootState) => getName(state, instance, index))

export const useFirstName = (instance: number, index: number) =>
  useSelector((state: RootState) => getName(state, instance, index).first)

export const useLastName = (instance: number, index: number) =>
  useSelector((state: RootState) => getName(state, instance, index).last)

export const useFullName = (instance: number, index: number) =>
  useSelector((state: RootState) => getFullName(state, instance, index))

export const useFullNameWithShallow = (instance: number, index: number) =>
  useSelector((state: RootState) => getFullName(state, instance, index), shallowEqual)

export const useClick = () => useSelector((state: RootState) => state.click)

export const useCanAct = () => useSelector((state: RootState) => canAct(state.click))
