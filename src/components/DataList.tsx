import React, { FC } from 'react'
import { Divider, Header, List } from 'semantic-ui-react'
import { getInstanceNumber, ItemProps } from '../app/utils'
import { useData } from '../app/selectors'

interface Props {
  name: string
  header: string
  Component: FC<ItemProps>
}

/**
 * Renders items of an instance with a given component.
 * This is used by most of the examples.
 */
const DataList = ({ header, name, Component }: Props) => {
  const instance = getInstanceNumber(name)
  const data = useData(instance)
  return (
    <>
      <Divider />
      <Header size='small'>{header}</Header>
      <List>
        {data.map((item) => (
          <Component item={item} key={item.index} instance={instance} />
        ))}
      </List>
    </>
  )
}

export default DataList
