import { Item } from '../server/reducer'

let instanceIndex = 0

export const getInstanceNumber = () => instanceIndex++

export type ItemProps = {
  item: Item
  instance: number
}
