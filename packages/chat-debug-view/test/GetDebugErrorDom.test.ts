import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getDebugErrorDom } from '../src/parts/GetDebugErrorDom/GetDebugErrorDom.ts'

test('getDebugErrorDom should render root and error message nodes', () => {
  const result = getDebugErrorDom('Something went wrong') as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly text?: string
    readonly type?: number
  }[]

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugView',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewError',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Something went wrong',
      type: 12,
    },
  ])
})

test('getDebugErrorDom should reuse static wrapper nodes', () => {
  const first = getDebugErrorDom('first')
  const second = getDebugErrorDom('second')

  expect(first[0]).toBe(second[0])
  expect(first[1]).toBe(second[1])
  expect(first[2]).not.toBe(second[2])
})
