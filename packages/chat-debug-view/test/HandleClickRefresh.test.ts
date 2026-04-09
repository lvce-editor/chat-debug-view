import { afterEach, expect, jest, test } from '@jest/globals'
import * as HandleClickRefresh from '../src/parts/HandleClickRefresh/HandleClickRefresh.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('handleClickRefresh should delegate to refresh', async () => {
  const state = createDefaultState()
  const expectedState = {
    ...state,
    initial: false,
  }
  const refreshSpy = jest.spyOn(HandleClickRefresh.handleClickRefreshDependencies, 'refresh').mockResolvedValue(expectedState)

  const result = await HandleClickRefresh.handleClickRefresh(state)

  expect(result).toBe(expectedState)
  expect(refreshSpy).toHaveBeenCalledTimes(1)
  expect(refreshSpy).toHaveBeenCalledWith(state)
})
