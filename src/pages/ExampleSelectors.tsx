import React, { memo } from 'react'
import { Header, ListItem } from 'semantic-ui-react'
import { TrackingInput } from '../components/TrackingInput'
import { useData, useAllData, useName, useFirstName, useLastName } from '../app/selectors'
import DataList from '../components/DataList'
import { useUpdate } from '../components/NameInputs'
import { ItemProps } from '../app/utils'

const component = 'ExampleSelectors_'

const ExampleSelectors = () => {
  return (
    <>
      <Header>useSelector forces a render if the returned value changes.</Header>
      <Header>So universal hooks will cause unnecessary renders even when the component data doesn't change.</Header>
      <DataList
        name={`${component}WithAllData`}
        header='Uses data from all instances. Renders even when other components change.'
        Component={WithAllData}
      />
      <DataList
        name={`${component}WithData`}
        header='Uses all data from own instance. All inputs render.'
        Component={WithData}
      />
      <DataList
        name={`${component}WithName`}
        header='Uses the whole name object. The whole row renders.'
        Component={WithName}
      />
      <DataList
        name={`${component}WithAttribute`}
        header='Uses only the needed attribute. Only the changed value renders.'
        Component={WithAttribute}
      />
    </>
  )
}

const WithAllData = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)

  return (
    <ListItem>
      <RenderFirstNameWithAllData instance={instance} index={index} onChange={handleFirstChange} />
      <RenderLastNameWithAllData instance={instance} index={index} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderFirstNameWithAllData = memo(({ instance, index, onChange }: InputProps) => {
  const value = useAllData()[instance][index].first
  return <TrackingInput value={value} onChange={onChange} />
})

const RenderLastNameWithAllData = memo(({ instance, index, onChange }: InputProps) => {
  const value = useAllData()[instance][index].last
  return <TrackingInput value={value} onChange={onChange} />
})

const WithData = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)

  return (
    <ListItem>
      <RenderFirstNameWithData instance={instance} index={index} onChange={handleFirstChange} />
      <RenderLastNameWithData instance={instance} index={index} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderFirstNameWithData = memo(({ instance, index, onChange }: InputProps) => {
  const value = useData(instance)[index].first
  return <TrackingInput value={value} onChange={onChange} />
})

const RenderLastNameWithData = memo(({ instance, index, onChange }: InputProps) => {
  const value = useData(instance)[index].last
  return <TrackingInput value={value} onChange={onChange} />
})

const WithName = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)

  return (
    <ListItem>
      <RenderFirstNameWithName instance={instance} index={index} onChange={handleFirstChange} />
      <RenderLastNameWithName instance={instance} index={index} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderFirstNameWithName = memo(({ instance, index, onChange }: InputProps) => {
  const value = useName(instance, index).first
  return <TrackingInput value={value} onChange={onChange} />
})

const RenderLastNameWithName = memo(({ instance, index, onChange }: InputProps) => {
  const value = useName(instance, index).last
  return <TrackingInput value={value} onChange={onChange} />
})

const WithAttribute = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdate(instance, index)

  return (
    <ListItem>
      <RenderFirstNameWithAttribute instance={instance} index={index} onChange={handleFirstChange} />
      <RenderLastNameWithAttribute instance={instance} index={index} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderFirstNameWithAttribute = memo(({ instance, index, onChange }: InputProps) => {
  const value = useFirstName(instance, index)
  return <TrackingInput value={value} onChange={onChange} />
})

const RenderLastNameWithAttribute = memo(({ instance, index, onChange }: InputProps) => {
  const value = useLastName(instance, index)
  return <TrackingInput value={value} onChange={onChange} />
})

interface InputProps {
  instance: number
  index: number
  onChange: (value: string) => void
}

export default ExampleSelectors
