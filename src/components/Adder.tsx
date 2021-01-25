import React, { Dispatch, memo, useContext } from 'react'
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

type DispatchType = Dispatch<{ type: string; value: number }>

const AdderDispatch = React.createContext((null as unknown) as DispatchType)

interface DispatchProps extends SharedProps {
  hook: (instance: number) => { clicks: number; dispatch: DispatchType }
}
export const AdderWithDispatch = ({ header, name, hook }: DispatchProps) => {
  const instance = getInstanceNumber(name)
  const { clicks, dispatch } = hook(instance)
  const totalClicks = useClicks(instance)
  return (
    <>
      <Divider />
      <Header size='small'>{header}</Header>
      <AdderDispatch.Provider value={dispatch}>
        <NumericInputWithDispatch value={clicks} />
        <AdderButtonWithDispatch />
      </AdderDispatch.Provider>

      <NumericInput value={totalClicks} />
    </>
  )
}

const NumericInputWithDispatch = ({ value }: { value: number }) => {
  const dispatch = useContext(AdderDispatch)
  const handleChange = (value: number) => {
    dispatch({ type: 'set', value })
  }
  return <NumericInput value={value} onChange={handleChange} />
}
const AdderButtonWithDispatch = memo(() => {
  const dispatch = useContext(AdderDispatch)
  const handleClick = () => {
    dispatch({ type: 'add', value: 0 })
  }

  return <TrackingButton onClick={handleClick}>Add</TrackingButton>
})

export default Adder
