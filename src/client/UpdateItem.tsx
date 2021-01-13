import React from 'react'
import { ItemProps, ListItem } from 'semantic-ui-react'
import Grid from '../components/Grid'
import { useUpdateByDelayedAttribute, useUpdateWithDelayedSet, useUpdateWithSet } from './actions'
import Input from '../components/Input'
import ServerData from '../server/ServerData'
import DataList from './DataList'

const UpdateItem = () => (
  <>
    <RenderItemWithSetList />
    <RenderItemWithDelayList />
    <RenderItemByAttributeList />
  </>
)

const RenderItemWithSetList = () => (
  <Grid>
    <DataList header='With entity' name='UpdateItem_Set' Component={RenderItemWithSet} />
    <ServerData name='UpdateItem_Set' />
  </Grid>
)

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

const RenderItemWithDelayList = () => (
  <Grid>
    <DataList header='With delay' name='UpdateItem_Delay' Component={RenderItemWithDelay} />
    <ServerData name='UpdateItem_Delay' />
  </Grid>
)

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

const RenderItemByAttributeList = () => (
  <Grid>
    <DataList header='With attribute' name='UpdateItem_Attribute' Component={RenderItemByAttribute} />
    <ServerData name='UpdateItem_Attribute' />
  </Grid>
)

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
