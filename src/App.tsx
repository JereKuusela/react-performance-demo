import React from 'react'
import { Container, Tab } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import ExampleProps from './pages/ExampleProps'
import ExampleUseSelector from './pages/ExampleUseSelector'
import ExampleReselect from './pages/ExampleReselect'
import ExampleUseMemo from './pages/ExampleUseMemo'
import ExampleUseState from './pages/ExampleUseState'
import ExampleUseCallback from './pages/ExampleUseCallback'

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
      menuItem: 'useCallback',
      render: () => (
        <Tab.Pane>
          <ExampleUseCallback />
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
      menuItem: 'useMemo',
      render: () => (
        <Tab.Pane>
          <ExampleUseMemo />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'reselect',
      render: () => (
        <Tab.Pane>
          <ExampleReselect />
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
