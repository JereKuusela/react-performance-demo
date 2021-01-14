import React from 'react'
import { Container, Tab } from 'semantic-ui-react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import ExampleProps from './client/ExampleProps'
import ExampleUpdating from './client/ExampleUpdating'
import ExampleUseSelector from './client/ExampleUseSelector'
import ExampleUseSelectorMemo from './client/ExampleUseSelectorMemo'
import ExampleHooks from './client/ExampleHooks'
import ExampleUseState from './client/ExampleUseState'

function App() {
  const panes = [
    {
      menuItem: 'props & memo',
      render: () => (
        <Tab.Pane>
          <ExampleProps />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'useCallback & useMemo',
      render: () => (
        <Tab.Pane>
          <ExampleHooks />
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
      menuItem: 'useState & useRef',
      render: () => (
        <Tab.Pane>
          <ExampleUseState />
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
          <ExampleUpdating />
        </Tab.Pane>
      ),
    },
  ]

  return (
    <Container>
      <Tab panes={panes} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  )
}

export default App
