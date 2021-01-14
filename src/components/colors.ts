export const red = '#fc9d9d'
export const blue = '#827cf7'
export const white = 'white'

export const getColor = (previous: string) => {
  switch (previous) {
    case white:
      return red
    case red:
      return blue
    case blue:
      return red
    default:
      return white
  }
}
