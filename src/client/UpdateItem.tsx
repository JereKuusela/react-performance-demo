import React, { useRef } from 'react'
import { ItemProps, ListItem } from 'semantic-ui-react'
import { getInstanceNumber } from '../app/utils'
import Grid from '../components/Grid'
import { useData, useUpdateByDelayedAttribute, useUpdateWithDelayedSet, useUpdateWithSet } from './hooks'
import Input from '../components/Input'
import List from '../components/List'
import ServerData from '../server/ServerData'

const UpdateItem = () => (
  <>
    <RenderItemWithSetList />
    <RenderItemWithDelayList />
    <RenderItemByAttributeList />
  </>
)

const RenderItemWithSetList = () => {
  const instance = useRef(getInstanceNumber())
  const data = useData(instance.current)
  return (
    <Grid>
      <List header='Update by setting the whole entity'>
        {data.map((item) => (
          <RenderItemWithSet item={item} key={item.index} instance={instance.current} />
        ))}
      </List>
      <ServerData instance={instance.current} />
    </Grid>
  )
}

const RenderItemWithSet = ({ item, instance }: ItemProps) => {
  const { first, last } = item
  const { handleFirstChange, handleLastChange } = useUpdateWithSet(instance, item)
  return (
    <ListItem>
      <Input value={first} onChange={handleFirstChange} />
      <Input value={last} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderItemWithDelayList = () => {
  const instance = useRef(getInstanceNumber())
  const data = useData(instance.current)
  return (
    <Grid>
      <List header='With delay'>
        {data.map((item) => (
          <RenderItemWithDelay item={item} key={item.index} instance={instance.current} />
        ))}
      </List>
      <ServerData instance={instance.current} />
    </Grid>
  )
}

const RenderItemWithDelay = ({ item, instance }: ItemProps) => {
  const { first, last } = item
  const { handleFirstChange, handleLastChange } = useUpdateWithDelayedSet(instance, item)
  return (
    <ListItem>
      <Input value={first} onChange={handleFirstChange} />
      <Input value={last} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderItemByAttributeList = () => {
  const instance = useRef(getInstanceNumber())
  const data = useData(instance.current)
  return (
    <Grid>
      <List header='Update by only setting the attribute'>
        {data.map((item) => (
          <RenderItemByAttribute item={item} key={item.index} instance={instance.current} />
        ))}
      </List>
      <ServerData instance={instance.current} />
    </Grid>
  )
}

const RenderItemByAttribute = ({ item, instance }: ItemProps) => {
  const { first, last, index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByDelayedAttribute(instance, index)
  return (
    <ListItem>
      <Input value={first} onChange={handleFirstChange} />
      <Input value={last} onChange={handleLastChange} />
    </ListItem>
  )
}

export default UpdateItem
