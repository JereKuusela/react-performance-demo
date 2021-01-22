import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { canAct, Item } from './utils'

interface State {
  names: Item[][]
  clicks: number[]
  click: number
}

const initialState: State = {
  names: Array(50)
    .fill(null)
    .map(() => [
      { index: 0, first: 'John', last: 'Doe' },
      { index: 1, first: 'Jane', last: 'Doe' },
      { index: 2, first: 'Jay', last: 'Doe' },
      { index: 3, first: 'Jean', last: 'Doe' },
    ]),
  clicks: Array(50).fill(0),
  click: 1,
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
    add: (state, { payload }: PayloadAction<[number]>) => {
      const [instance] = payload
      state.names[instance].push({ index: state.names[instance].length, first: '', last: '' })
    },
    remove: (state, { payload }: PayloadAction<[number]>) => {
      const [instance] = payload
      state.names[instance].pop()
    },
    addWithLogic: (state, { payload }: PayloadAction<[number]>) => {
      if (canAct(state.click)) {
        const [instance] = payload
        state.names[instance].push({ index: state.names[instance].length, first: '', last: '' })
      }
      state.click++
    },
    removeWithLogic: (state, { payload }: PayloadAction<[number]>) => {
      if (canAct(state.click)) {
        const [instance] = payload
        state.names[instance].pop()
      }
      state.click++
    },
    addClick: (state) => {
      state.click++
    },
    addClicks: (state, { payload }: PayloadAction<[number, number]>) => {
      const [instance, clicks] = payload
      state.clicks[instance] += clicks
    },
  },
})

const unboxParameters = <T extends unknown[]>(callback: (args: T) => void) => (...args: T) => callback(args)

export const set = unboxParameters(slice.actions.set)
export const setFirstName = unboxParameters(slice.actions.setFirstName)
export const setLastName = unboxParameters(slice.actions.setLastName)
export const add = unboxParameters(slice.actions.add)
export const remove = unboxParameters(slice.actions.remove)
export const addWithLogic = unboxParameters(slice.actions.addWithLogic)
export const removeWithLogic = unboxParameters(slice.actions.removeWithLogic)
export const addClicks = unboxParameters(slice.actions.addClicks)
export const addClick = slice.actions.addClick

export default slice.reducer
