import React, { memo } from 'react'
import { Divider, Header, ItemProps, ListItem } from 'semantic-ui-react'
import { getInstanceNumber } from '../app/utils'
import {
  useData,
  useNameArray,
  useNameArrayWithShallow,
  useNameDeepArray,
  useNameDeepArrayWithCheck,
  useNameDeepArrayWithCustomReselect,
  useNameDeepArrayWithMemo,
  useNameDeepArrayWithReselect,
  useUpdateByAttribute,
} from './hooks'
import { TrackingInput } from '../components/TrackingInput'
import List from '../components/List'

const ExampleUseSelectorMemo = () => {
  return (
    <>
      <Header>
        In the following example, the first and last name are converted from an object &#123;first, last&#125; to an
        array [first, last].
      </Header>
      <RenderItemList
        name='RenderWithArray'
        header='By default, this always forces a render because the reference always changes.'
        selector={useNameArray}
      />
      <RenderItemList
        name='useNameArrayWithShallow'
        header='This can be fixed by using shallowEqual comparison.'
        selector={useNameArrayWithShallow}
      />
      <Divider />
      <Header>
        In the following example, the first and last name are converted to a deeper array [[first], [last]].
      </Header>
      <RenderDeepItemList
        name='useNameDeepArray'
        header='This means the shallowEqual no longer works'
        selector={useNameDeepArray}
      />
      <RenderDeepItemList
        name='useNameDeepArrayWithCheck'
        header='Custom equality comparison can created.'
        selector={useNameDeepArrayWithCheck}
      />
      <RenderDeepItemList
        name='useNameDeepArrayWithMemo'
        header='useMemo "works" but has to be outside of useSelector so it actually doesn&apos;t prevent forced renders. '
        selector={useNameDeepArrayWithMemo}
      />
      <RenderDeepItemList
        name='useNameDeepArrayWithReselect'
        header="reselect library provides a way to memoize selectors. The default implementation doesn't work for lists (cache size of 1)."
        selector={useNameDeepArrayWithReselect}
      />
      <RenderDeepItemList
        name='useNameDeepArrayWithCustomReselect'
        header='This can be fixed by creating own selector instance for each item.'
        selector={useNameDeepArrayWithCustomReselect}
      />
    </>
  )
}

type Selector = (instance: number, index: number) => string[]

interface ItemListProps {
  name: string
  header: string
  selector: Selector
}

const RenderItemList = ({ name, header, selector }: ItemListProps) => {
  const instance = getInstanceNumber(name)
  const data = useData(instance)
  return (
    <List header={header}>
      {data.map((item) => (
        <RenderItem item={item} key={item.index} instance={instance} selector={selector} />
      ))}
    </List>
  )
}

interface Props extends ItemProps {
  selector: Selector
}

const RenderItem = memo(({ item, instance, selector }: Props) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)
  const [first, last] = selector(instance, index)

  return (
    <ListItem>
      <TrackingInput value={first} onChange={handleFirstChange} />
      <TrackingInput value={last} onChange={handleLastChange} />
    </ListItem>
  )
})

type DeepSelector = (instance: number, index: number) => string[][]

interface DeepItemListProps {
  name: string
  header: string
  selector: DeepSelector
}

const RenderDeepItemList = ({ name, header, selector }: DeepItemListProps) => {
  const instance = getInstanceNumber(name)
  const data = useData(instance)
  return (
    <List header={header}>
      {data.map((item) => (
        <RenderDeepItem item={item} key={item.index} instance={instance} selector={selector} />
      ))}
    </List>
  )
}

interface DeepProps extends ItemProps {
  selector: DeepSelector
}

const RenderDeepItem = memo(({ item, instance, selector }: DeepProps) => {
  const { index } = item
  const { handleFirstChange, handleLastChange } = useUpdateByAttribute(instance, index)
  const [[first], [last]] = selector(instance, index)

  return (
    <ListItem>
      <TrackingInput value={first} onChange={handleFirstChange} />
      <TrackingInput value={last} onChange={handleLastChange} />
    </ListItem>
  )
})

export default ExampleUseSelectorMemo
