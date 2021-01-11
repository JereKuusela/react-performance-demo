import React from 'react'
import { PropsWithChildren } from 'react'
import { Header, ListList } from 'semantic-ui-react'

const List = ({ header, children }: PropsWithChildren<{ header: string }>) => (
  <>
    <Header>{header}</Header>
    <ListList>{children}</ListList>
  </>
)

export default List
