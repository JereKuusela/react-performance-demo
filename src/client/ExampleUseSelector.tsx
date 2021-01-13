import React, { memo } from 'react'
import { Header, ItemProps, ListItem } from 'semantic-ui-react'
import { getInstanceNumber } from '../app/utils'
import { useAllData, useData, useFirstName, useLastName, useName, useUpdateByAttribute } from './hooks'
import List from '../components/List'
import { TrackingInput } from '../components/TrackingInput'

const ExampleUseSelector = () => {
  return (
    <>
      <Header>useSelector forces render if the return value changes.</Header>
      <Header>So universal hooks will cause unnecessary renders even the component data doesn't change.</Header>
      <RenderWithAllData />
      <RenderWithData />
      <RenderWithName />
      <RenderWithAttribute />
    </>
  )
}

const RenderWithAllData = () => {
  const instance = getInstanceNumber('RenderWithAllData')
  const data = useData(instance)
  return (
    <List header='Uses data from all instances. Renders even when other components change.'>
      {data.map((item) => (
        <RenderItemWithAllData item={item} key={item.index} instance={instance} />
      ))}
    </List>
  )
}

const RenderItemWithAllData = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)

  return (
    <ListItem>
      <RenderFirstNameWithAllData instance={instance} index={index} onChange={handleFirstChange} />
      <RenderLastNameWithAllData instance={instance} index={index} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderWithData = () => {
  const instance = getInstanceNumber('RenderWithData')
  const data = useData(instance)
  return (
    <List header='Uses all data from own instance. All inputs render.'>
      {data.map((item) => (
        <RenderItemWithData item={item} key={item.index} instance={instance} />
      ))}
    </List>
  )
}

const RenderItemWithData = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)

  return (
    <ListItem>
      <RenderFirstNameWithData instance={instance} index={index} onChange={handleFirstChange} />
      <RenderLastNameWithData instance={instance} index={index} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderWithName = () => {
  const instance = getInstanceNumber('RenderWithName')
  const data = useData(instance)
  return (
    <List header='Uses the whole name object. The whole row renders.'>
      {data.map((item) => (
        <RenderItemWithName item={item} key={item.index} instance={instance} />
      ))}
    </List>
  )
}

const RenderItemWithName = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)

  return (
    <ListItem>
      <RenderFirstNameWithName instance={instance} index={index} onChange={handleFirstChange} />
      <RenderLastNameWithName instance={instance} index={index} onChange={handleLastChange} />
    </ListItem>
  )
}

const RenderWithAttribute = () => {
  const instance = getInstanceNumber('RenderWithAttribute')
  const data = useData(instance)
  return (
    <List header='Uses only the needed attribute. Only the changed value renders.'>
      {data.map((item) => (
        <RenderItemWithAttribute item={item} key={item.index} instance={instance} />
      ))}
    </List>
  )
}

const RenderItemWithAttribute = ({ item, instance }: ItemProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)

  return (
    <ListItem>
      <RenderFirstNameWithAttribute instance={instance} index={index} onChange={handleFirstChange} />
      <RenderLastNameWithAttribute instance={instance} index={index} onChange={handleLastChange} />
    </ListItem>
  )
}

interface DataProps {
  instance: number
  index: number
  onChange: (value: string) => void
}
const RenderFirstNameWithAllData = memo(({ instance, index, onChange }: DataProps) => {
  const value = useAllData()[instance][index].first
  return <TrackingInput value={value} onChange={onChange} />
})

const RenderLastNameWithAllData = memo(({ instance, index, onChange }: DataProps) => {
  const value = useAllData()[instance][index].last
  return <TrackingInput value={value} onChange={onChange} />
})

const RenderFirstNameWithData = memo(({ instance, index, onChange }: DataProps) => {
  const value = useData(instance)[index].first
  return <TrackingInput value={value} onChange={onChange} />
})

const RenderLastNameWithData = memo(({ instance, index, onChange }: DataProps) => {
  const value = useData(instance)[index].last
  return <TrackingInput value={value} onChange={onChange} />
})

const RenderFirstNameWithName = memo(({ instance, index, onChange }: DataProps) => {
  const value = useName(instance, index).first
  return <TrackingInput value={value} onChange={onChange} />
})

const RenderLastNameWithName = memo(({ instance, index, onChange }: DataProps) => {
  const value = useName(instance, index).last
  return <TrackingInput value={value} onChange={onChange} />
})

const RenderFirstNameWithAttribute = memo(({ instance, index, onChange }: DataProps) => {
  const value = useFirstName(instance, index)
  return <TrackingInput value={value} onChange={onChange} />
})

const RenderLastNameWithAttribute = memo(({ instance, index, onChange }: DataProps) => {
  const value = useLastName(instance, index)
  return <TrackingInput value={value} onChange={onChange} />
})
export default ExampleUseSelector
