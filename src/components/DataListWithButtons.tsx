import React from 'react'
import DataList from './DataList'
import { MemoizedNameInputs } from './NameInputs'
import { MemoizedTrackingButton, TrackingButton } from './TrackingButton'

interface Props extends ButtonsProps {
  header: string
}

const DataListWithButtons = ({ header, name, useHook, memoize }: Props) => (
  <>
    <DataList name={name} header={header} Component={MemoizedNameInputs} />
    <Buttons name={name} useHook={useHook} memoize={memoize} />
  </>
)

interface ButtonsProps {
  name: string
  useHook: (name: string) => { handleAdd: () => void; handleRemove: () => void }
  memoize?: boolean
}

const Buttons = ({ name, useHook, memoize }: ButtonsProps) => {
  const { handleAdd, handleRemove } = useHook(name)
  const Component = memoize ? MemoizedTrackingButton : TrackingButton
  return (
    <>
      <Component onClick={handleAdd}>+</Component>
      <Component onClick={handleRemove}>-</Component>
    </>
  )
}

export default DataListWithButtons
