import React from 'react'
import { Container, Tab } from 'semantic-ui-react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import ReceiveItem from './client/ReceiveItem'
import UpdateItem from './client/UpdateItem'

function App() {
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

  return (
    <Container>
      <Tab panes={panes} />
    </Container>
  )
}

export default App
