let instanceIndex = 0
const instances = {} as Record<string, number>

/**
 * Instance numbering is used to give a separate state to each example.
 * Name is used to return same instance number even when an example remounts.
 */
export const getInstanceNumber = (name: string) => {
  if (!instances[name]) instances[name] = instanceIndex++
  return instances[name]
}

export interface Item {
  index: number
  first: string
  last: string
}

export type ItemProps = {
  item: Item
  instance: number
}

const counter = {} as Record<number, number>
/**
 * Simulates expensive calculations by tracking amount of calls.
 * This number is shown on UI to demonstrate how wasteful default useSelectors are.
 */
export const doExpensiveCalculation = (instance: number) => {
  if (!counter[instance]) counter[instance] = 0
  return ++counter[instance]
}

export const red = '#fc9d9d'
export const blue = '#827cf7'
export const yellow = '#e0de6e'
export const white = 'white'

export const getNextColor = (previous: string) => {
  switch (previous) {
    case white:
      return red
    case red:
      return blue
    case blue:
      return yellow
    case yellow:
      return red
    default:
      return red
  }
}
