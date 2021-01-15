import React from 'react'
import { Header } from 'semantic-ui-react'
import { useUpdateWithoutUseCallback } from '../app/actions'
import DataList from '../components/DataList'
import { MemoizedNameInputs, NameInputs } from '../components/NameInputs'

const ExampleUseCallback = () => {
  return (
    <>
      <Header>
        useCallback can be used to keep function references same. This prevents extra renders for <u>memoized</u>{' '}
        components.
      </Header>
      <DataList
        name='ExampleHooks_WithoutUseCallback'
        header='Without useCallback, everything renders on change.'
        Component={MemoizedNameInputs}
        componentProps={{
          useHook: useUpdateWithoutUseCallback,
        }}
      />
      <DataList
        name='ExampleHooks_MemoizedNameInputs'
        header='With useCallback, only the changed input renders.'
        Component={MemoizedNameInputs}
      />
      <DataList
        name='ExampleHooks_NameInputs'
        header='Without memo, useCallback has no effect.'
        Component={NameInputs}
      />
    </>
  )
}

export default ExampleUseCallback
