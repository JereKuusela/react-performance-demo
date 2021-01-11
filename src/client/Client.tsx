import React from 'react'
import { Tab } from 'semantic-ui-react'
import ReceiveItem from './ReceiveItem'
import UpdateItem from './UpdateItem'

const Client = () => {
  const panes = [
    {
      menuItem: 'Update item',
      render: () => (
        <Tab.Pane>
          <UpdateItem />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Receive item',
      render: () => (
        <Tab.Pane>
          <ReceiveItem />
        </Tab.Pane>
      ),
    },
  ]

  return <Tab panes={panes} />
}
export default Client
