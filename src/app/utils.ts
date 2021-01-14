import { Item } from '../server/reducer'

let instanceIndex = 0
let instances = {} as Record<string, number>

export const getInstanceNumber = (name: string) => {
  if (!instances[name]) instances[name] = instanceIndex++
  return instances[name]
}

export type ItemProps = {
  item: Item
  instance: number
}
export const canAct = (value: number) => value % 5 === 0
