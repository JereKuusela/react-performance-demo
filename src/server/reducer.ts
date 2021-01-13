import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Item {
  index: number
  first: string
  last: string
}

interface DataState {
  names: Item[][]
}

const initialState: DataState = {
  names: Array(50)
    .fill(null)
    .map(() => [
      { index: 0, first: 'John', last: 'Doe' },
      { index: 1, first: 'Jane', last: 'Doe' },
    ]),
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
      state.names[instance].push({ index: state.names.length, first: '', last: '' })
    },
    remove: (state, { payload }: PayloadAction<[number]>) => {
      const [instance] = payload
      state.names[instance].pop()
    },
  },
})

const unboxParameters = <T extends unknown[]>(callback: (args: T) => void) => (...args: T) => callback(args)

const withDelay = <T>(callback: (args: T) => void) => (arg: T) => (dispatch: any) => {
  setTimeout(() => {
    dispatch(callback(arg))
  }, 1000)
}

const withDelayAndUnbox = <T extends unknown[]>(callback: (args: T) => void) => unboxParameters(withDelay(callback))

export const set = unboxParameters(slice.actions.set)
export const setFirstName = unboxParameters(slice.actions.setFirstName)
export const setLastName = unboxParameters(slice.actions.setLastName)
export const add = unboxParameters(slice.actions.add)
export const remove = unboxParameters(slice.actions.remove)

export const setWithDelay = withDelayAndUnbox(slice.actions.set)
export const setFirstNameWithDelay = withDelayAndUnbox(slice.actions.setFirstName)
export const setLastNameWithDelay = withDelayAndUnbox(slice.actions.setLastName)
export const addWithDelay = withDelayAndUnbox(slice.actions.add)
export const removeWithDelay = withDelayAndUnbox(slice.actions.remove)

export default slice.reducer
