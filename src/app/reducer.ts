import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { canAct } from './utils'

export interface Item {
  index: number
  first: string
  last: string
}

interface State {
  names: Item[][]
  clicks: number
}

const initialState: State = {
  names: Array(50)
    .fill(null)
    .map(() => [
      { index: 0, first: 'John', last: 'Doe' },
      { index: 1, first: 'Jane', last: 'Doe' },
    ]),
  clicks: 1,
}

export const slice = createSlice({
  name: 'counter',
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
      if (canAct(state.clicks)) {
        const [instance] = payload
        state.names[instance].push({ index: state.names[instance].length, first: '', last: '' })
      }
      state.clicks++
    },
    removeWithLogic: (state, { payload }: PayloadAction<[number]>) => {
      if (canAct(state.clicks)) {
        const [instance] = payload
        state.names[instance].pop()
      }
      state.clicks++
    },
    addClick: (state) => {
      state.clicks++
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
export const addClick = slice.actions.addClick

export default slice.reducer
