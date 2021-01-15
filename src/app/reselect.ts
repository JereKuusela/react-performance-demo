import { createSelector } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from './store'
import { doExpensiveCalculation } from './utils'

const getName = (state: RootState, instance: number, index: number) => state.names[instance][index]

const getInstance = (_state: RootState, path: [number, number]) => path[0]
const getFirstNameWithProps = (state: RootState, path: [number, number]) => getName(state, path[0], path[1]).first
const getLastNameWithProps = (state: RootState, path: [number, number]) => getName(state, path[0], path[1]).last
const createFullNameCounterSelector = () =>
  createSelector(
    getInstance,
    getFirstNameWithProps,
    getLastNameWithProps,
    (instance, first, last) => `${first} ${last} ${doExpensiveCalculation(instance)}`
  )
const fullNameCounterSelector = createFullNameCounterSelector()

export const useFullNameCounter = (instance: number, index: number) => {
  return useSelector((state: RootState) => {
    const { first, last } = getName(state, instance, index)
    return `${first} ${last} ${doExpensiveCalculation(instance)}`
  }, shallowEqual)
}

export const useFullNameCounterWithReselect = (instance: number, index: number) =>
  useSelector((state: RootState) => fullNameCounterSelector(state, [instance, index]))

export const useFullNameCounterWithFixedReselect = (instance: number, index: number) => {
  const selector = useMemo(() => createFullNameCounterSelector(), [])
  return useSelector((state: RootState) => selector(state, [instance, index]))
}
const createFullNameSelector = () =>
  createSelector(getFirstNameWithProps, getLastNameWithProps, (first, last) => ({ first, last }))

export const useFullNameWithReselect = (instance: number, index: number) => {
  const selector = useMemo(() => createFullNameSelector(), [])
  return useSelector((state: RootState) => selector(state, [instance, index]))
}
