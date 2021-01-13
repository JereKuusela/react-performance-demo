import React from 'react'
import { Container, Tab } from 'semantic-ui-react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import ExampleProps from './client/ExampleProps'
import UpdateItem from './client/UpdateItem'
import ExampleUseSelector from './client/ExampleUseSelector'
import ExampleUseSelectorMemo from './client/ExampleUseSelectorMemo'

function App() {
  const panes = [
    {
      menuItem: 'Props & memo',
      render: () => (
        <Tab.Pane>
          <ExampleProps />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'useSelector',
      render: () => (
        <Tab.Pane>
          <ExampleUseSelector />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'useSelector memo',
      render: () => (
        <Tab.Pane>
          <ExampleUseSelectorMemo />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Update item',

      render: () => (
        <Tab.Pane>
          <UpdateItem />
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
