export const red = '#fc9d9d'
export const blue = '#827cf7'
export const yellow = '#e0de6e'
export const white = 'white'

export const getColor = (previous: string) => {
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
