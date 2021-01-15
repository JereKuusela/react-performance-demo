import React, { memo } from 'react'
import { TrackingInput } from './TrackingInput'

export const FullNameString = ({ name }: { name: string }) => <TrackingInput value={name} />

export const MemoizedFullNameString = memo(FullNameString)

export const MemoizedFullNameObject = memo(({ name }: { name: { first: string; last: string } }) => (
  <FullNameString name={`${name.first} ${name.last}`} />
))

interface Props {
  instance: number
  index: number
  selector: (instance: number, index: number) => { first: string; last: string }
}

export const FullNameRedux = ({ instance, index, selector }: Props) => {
  const name = selector(instance, index)

  return <MemoizedFullNameObject name={name} />
}

export const MemoizedFullNameRedux = memo(FullNameRedux)
