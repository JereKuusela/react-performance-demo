import React, { FC } from 'react'
import { Divider, Header, List } from 'semantic-ui-react'
import { getInstanceNumber, ItemProps } from '../app/utils'
import { useData } from '../app/selectors'

interface Props<C> {
  name: string
  header: string
  Component: FC<C & ItemProps>
  componentProps?: C
}

const DataList = <C extends unknown>({ header, name, Component, componentProps }: Props<C>) => {
  const instance = getInstanceNumber(name)
  const data = useData(instance)
  return (
    <>
      <Divider />
      <Header size='small'>{header}</Header>
      <List>
        {data.map((item) => (
          <Component item={item} key={item.index} instance={instance} {...componentProps} />
        ))}
      </List>
    </>
  )
}

export default DataList
