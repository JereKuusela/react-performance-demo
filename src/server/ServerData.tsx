import React from 'react'
import { ListItem } from 'semantic-ui-react'
import { useUpdate } from '../client/actions'
import Input from '../components/Input'
import DataList from '../client/DataList'
import { ItemProps } from '../app/utils'

const ServerData = ({ name }: { name: string }) => <DataList header='Server data' name={name} Component={RenderItem} />

const RenderItem = ({ item, instance }: ItemProps) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)

  return (
    <ListItem>
      <Input value={first} onChange={handleFirstChange} />
      <Input value={last} onChange={handleLastChange} />
    </ListItem>
  )
}
export default ServerData
