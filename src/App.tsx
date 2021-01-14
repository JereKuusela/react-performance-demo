import React from 'react'
import { Container, Tab } from 'semantic-ui-react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import ExampleProps from './pages/ExampleProps'
import ExampleUseSelector from './pages/ExampleUseSelector'
import ExampleUseSelectorMemo from './pages/ExampleUseSelectorMemo'
import ExampleHooks from './pages/ExampleHooks'
import ExampleUseState from './pages/ExampleUseState'

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
  ]

  return (
    <Container>
      <Tab panes={panes} />
      <Brrrrrrrrrrrrrr />
    </Container>
  )
}

const Brrrrrrrrrrrrrr = () => (
  <>
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
  </>
)

export default App
