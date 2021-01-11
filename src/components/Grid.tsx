import React, { Children, PropsWithChildren } from 'react'
import { Grid as SGrid, GridColumn } from 'semantic-ui-react'

const Grid = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <SGrid>
      {Children.map(children, (child) => (
        <GridColumn width='6'>{child}</GridColumn>
      ))}
    </SGrid>
  )
}

export default Grid
