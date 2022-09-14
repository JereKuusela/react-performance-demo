import React from 'react'
import { Divider, Header } from 'semantic-ui-react'
import { useClicks } from '../app/selectors'
import { getInstanceNumber } from '../app/utils'
import { NumericInput } from './Input'
import { MemoizedTrackingButton, TrackingButton } from './TrackingButton'

interface SharedProps {
  header: string
  name: string
}

interface Props extends SharedProps {
  hook: (instance: number) => { clicks: number; setClicks: (value: number) => void; handleClick: () => void }
  memoized?: boolean
}

const Adder = ({ hook, name, header, memoized }: Props) => {
  const instance = getInstanceNumber(name)
  const { clicks, setClicks, handleClick } = hook(instance)
  const ButtonComponent = memoized ? MemoizedTrackingButton : TrackingButton
  const totalClicks = useClicks(instance)
  return (
    <>
      <Divider />
      <Header size='small'>{header}</Header>
      <NumericInput value={clicks} onChange={setClicks} />
      <ButtonComponent onClick={handleClick}>Add</ButtonComponent>
      <NumericInput value={totalClicks} />
    </>
  )
}

export default Adder
