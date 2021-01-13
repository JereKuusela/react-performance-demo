import React from 'react'
import { PropsWithChildren } from 'react'
import { Divider, Header, ListList } from 'semantic-ui-react'

const List = ({ header, children }: PropsWithChildren<{ header: string }>) => (
  <>
    <Divider size='small' />
    <Header>{header}</Header>
    <ListList>{children}</ListList>
  </>
)

export default List
