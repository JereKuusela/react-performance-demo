import React from 'react'
import { ListItem } from 'semantic-ui-react'
import { useData } from '../client/hooks'
import List from '../components/List'

const ServerData = ({ instance }: { instance: number }) => {
  const data = useData(instance)
  return (
    <List header='Server data'>
      {data.map((item) => (
        <ListItem>{`${item.first} ${item.last}`}</ListItem>
      ))}
    </List>
  )
}

export default ServerData
