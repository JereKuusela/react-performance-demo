import React, { memo } from 'react'
import { Divider, Header, ItemProps } from 'semantic-ui-react'
import {
  useNameArray,
  useNameArrayWithShallow,
  useNameDeepArray,
  useNameDeepArrayWithCheck,
  useNameDeepArrayWithMemo,
  useNameDeepArrayWithReselect,
  useNameDeepArrayWithCustomReselect,
} from '../app/selectors'
import DataList from '../components/DataList'
import { NameInputsFromAttribute } from '../components/NameInputs'

const ExampleUseSelectorMemo = () => {
  return (
    <>
      <Header>
        In the following example, the first and last name are converted from an object &#123;first, last&#125; to an
        array [first, last].
      </Header>
      <DataList
        name='ExampleUseSelectorMemo_Array'
        header='By default, this renders both rows because the reference always changes.'
        Component={RenderItem}
        componentProps={{ selector: useNameArray }}
      />
      <DataList
        name='ExampleUseSelectorMemo_ArrayWithShallow'
        header='This can be fixed by using shallowEqual comparison.'
        Component={RenderItem}
        componentProps={{ selector: useNameArrayWithShallow }}
      />
      <Divider />
      <Header>
        In the following example, the first and last name are converted to a deeper array [[first], [last]].
      </Header>
      <DataList
        name='ExampleUseSelectorMemo_DeepArray'
        header='This means the shallowEqual no longer works and both rows render.'
        Component={RenderDeepItem}
        componentProps={{ selector: useNameDeepArray }}
      />
      <DataList
        name='ExampleUseSelectorMemo_DeepArrayWithCheck'
        header='Custom equality comparison can created.'
        Component={RenderDeepItem}
        componentProps={{ selector: useNameDeepArrayWithCheck }}
      />
      <DataList
        name='ExampleUseSelectorMemo_DeepArrayWithMemo'
        header='useMemo "works" in this case but has to be outside of useSelector so it can&apos;t be used to prevent forced renders.'
        Component={RenderDeepItem}
        componentProps={{ selector: useNameDeepArrayWithMemo }}
      />
      <DataList
        name='ExampleUseSelectorMemo_DeepArrayWithReselect'
        header="reselect library provides a way to memoize selectors. The default implementation doesn't work for lists (cache size of 1)."
        Component={RenderDeepItem}
        componentProps={{ selector: useNameDeepArrayWithReselect }}
      />
      <DataList
        name='ExampleUseSelectorMemo_DeepArrayWithCustomReselect'
        header='This can be fixed by creating own selector instance for each item.'
        Component={RenderDeepItem}
        componentProps={{ selector: useNameDeepArrayWithCustomReselect }}
      />
    </>
  )
}

type Selector = (instance: number, index: number) => string[]

interface Props extends ItemProps {
  selector: Selector
}

const RenderItem = memo(({ item, instance, selector }: Props) => {
  const { index } = item
  const [first, last] = selector(instance, index)

  return <NameInputsFromAttribute first={first} last={last} index={index} instance={instance} />
})

type DeepSelector = (instance: number, index: number) => string[][]

interface DeepProps extends ItemProps {
  selector: DeepSelector
}

const RenderDeepItem = memo(({ item, instance, selector }: DeepProps) => {
  const { index } = item
  const [[first], [last]] = selector(instance, index)

  return <NameInputsFromAttribute first={first} last={last} index={index} instance={instance} />
})

export default ExampleUseSelectorMemo
