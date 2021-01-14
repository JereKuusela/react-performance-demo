import React from 'react'
import Grid from '../components/Grid'
import { useUpdateByDelayedAttribute, useUpdateWithDelayedSet, useUpdateWithSet } from './actions'
import ServerData from '../server/ServerData'
import DataList from './DataList'
import { PlainNameInputs } from './NameInputs'
import { Header } from 'semantic-ui-react'

const ExampleUpdating = () => (
  <>
    <Header>Extra: Updating an entity on a "server".</Header>
    <Grid>
      <DataList
        header='Sending the whole entity works as long as the network is fast.'
        name='UpdateItem_Set'
        Component={PlainNameInputs}
        componentProps={{ useHook: useUpdateWithSet }}
      />
      <ServerData name='UpdateItem_Set' />
    </Grid>
    <Grid>
      <DataList
        header='With delay, the user can '
        name='UpdateItem_Delay'
        Component={PlainNameInputs}
        componentProps={{ useHook: useUpdateWithDelayedSet }}
      />
      <ServerData name='UpdateItem_Delay' />
    </Grid>
    <Grid>
      <DataList
        header='With attribute'
        name='UpdateItem_Attribute'
        Component={PlainNameInputs}
        componentProps={{ useHook: useUpdateByDelayedAttribute }}
      />
      <ServerData name='UpdateItem_Attribute' />
    </Grid>
  </>
)

export default ExampleUpdating
