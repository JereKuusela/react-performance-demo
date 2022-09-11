import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item } from './utils'

interface State {
  names: Item[][]
  clicks: number[]
  stateClicks: number
  addClicks: number
}

const initialState: State = {
  names: Array(50)
    .fill(null)
    .map(() => [
      { index: 0, first: 'John', last: 'Doe' },
      { index: 1, first: 'Jane', last: 'Doe' },
      { index: 2, first: 'Jay', last: 'Doe' },
    ]),
  clicks: Array(50).fill(0),
  stateClicks: 0,
  addClicks: 0,
}

export const slice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<[number, Item]>) => {
      const [instance, item] = payload
      state.names[instance][item.index] = item
    },
    setFirstName: (state, { payload }: PayloadAction<[number, number, string]>) => {
      const [instance, index, name] = payload
      state.names[instance][index].first = name
    },
    setLastName: (state, { payload }: PayloadAction<[number, number, string]>) => {
      const [instance, index, name] = payload
      state.names[instance][index].last = name
    },
    addStateClick: (state) => {
      state.stateClicks++
    },
    addClicks: (state, { payload }: PayloadAction<[number, number]>) => {
      const [instance, clicks] = payload
      state.clicks[instance] += clicks
    },
    addClicksWithAdd: (state, { payload }: PayloadAction<[number]>) => {
      const [instance] = payload
      state.clicks[instance] += state.addClicks
    },
    setAddClicks: (state, { payload }: PayloadAction<[number]>) => {
      const [clicks] = payload
      state.addClicks += clicks
    },
  },
})

const unboxParameters = <T extends unknown[], R>(callback: (args: T) => R) => (...args: T) => callback(args)

export const set = unboxParameters(slice.actions.set)
export const setFirstName = unboxParameters(slice.actions.setFirstName)
export const setLastName = unboxParameters(slice.actions.setLastName)
export const addClicks = unboxParameters(slice.actions.addClicks)
export const addClicksWithAdd = unboxParameters(slice.actions.addClicksWithAdd)
export const setAddClicks = unboxParameters(slice.actions.setAddClicks)
export const addStateClick = slice.actions.addStateClick

export default slice.reducer
