import React from 'react'
import { Container, Tab } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import ExampleRendering from './pages/ExampleRendering'
import ExampleSelectors from './pages/ExampleSelectors'
import ExampleReselect from './pages/ExampleReselect'
import ExampleValues from './pages/ExampleValues'
import ExampleState from './pages/ExampleState'
import ExampleHandlers from './pages/ExampleHandlers'

function App() {
  const panes = [
    {
      menuItem: 'Rendering',
      render: () => (
        <Tab.Pane>
          <ExampleRendering />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'State',
      render: () => (
        <Tab.Pane>
          <ExampleState />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Selectors',
      render: () => (
        <Tab.Pane>
          <ExampleSelectors />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Handlers',
      render: () => (
        <Tab.Pane>
          <ExampleHandlers />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Values',
      render: () => (
        <Tab.Pane>
          <ExampleValues />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Reselect',
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
