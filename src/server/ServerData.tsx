import React from 'react'
import { ListItem } from 'semantic-ui-react'
import { ItemProps } from '../app/utils'
import { useData, useUpdateByAttribute } from '../client/hooks'
import Input from '../components/Input'
import List from '../components/List'

const ServerData = ({ instance }: { instance: number }) => {
  const data = useData(instance)
  return (
    <List header='Server data'>
      {data.map((item) => (
        <RenderItem item={item} instance={instance} key={item.index} />
      ))}
    </List>
  )
}

const RenderItem = ({ item, instance }: ItemProps) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)

  return (
    <ListItem>
      <Input style={{ padding: 5 }} value={first} onChange={handleFirstChange} />
      <Input style={{ padding: 5 }} value={last} onChange={handleLastChange} />
    </ListItem>
  )
}
export default ServerData
