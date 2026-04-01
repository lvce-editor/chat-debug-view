import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getEmptyStateDom } from '../src/parts/GetEmptyStateDom/GetEmptyStateDom.ts'

test('getEmptyStateDom should render empty state container and message', () => {
  const result = getEmptyStateDom('No events have been found') as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly text?: string
    readonly type?: number
  }[]

  expect(result[0]).toEqual({
    childCount: 1,
    className: 'ChatDebugViewEmpty',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual(
    expect.objectContaining({
      text: 'No events have been found',
    }),
  )
})
