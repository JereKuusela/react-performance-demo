import { Item } from '../server/reducer'

let instanceIndex = 0
let instances = {} as Record<string, number>

export const getInstanceNumber = (name: string) => {
  if (!instances[name]) instances[name] = instanceIndex++
  return instances[name]
}

export type UpdateHook = (
  instance: number,
  index: number
) => { handleFirstChange: (first: string) => void; handleLastChange: (first: string) => void }

export type ItemProps = {
  item: Item
  instance: number
  useHook?: UpdateHook
}
export const canAct = (value: number) => value % 3 === 0
