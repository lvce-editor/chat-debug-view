import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetRefreshButtonDom from '../src/parts/GetRefreshButtonDom/GetRefreshButtonDom.ts'

test('getRefreshButtonDom should render refresh button nodes', () => {
  const dom = GetRefreshButtonDom.getRefreshButtonDom() as readonly {
    readonly ['aria-label']?: string
    readonly childCount?: number
    readonly className?: string
    readonly name?: string
    readonly onClick?: number
    readonly value?: string
  }[]

  expect(dom).toEqual([
    {
      'aria-label': 'Refresh events',
      childCount: 1,
      className: 'IconButton',
      name: 'refresh',
      onClick: DomEventListenerFunctions.HandleClickRefresh,
      type: VirtualDomElements.Button,
      value: 'refresh',
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconRefresh',
      type: VirtualDomElements.Div,
    },
  ])
})

test('getRefreshButtonDom should reuse the static refresh button dom', () => {
  const first = GetRefreshButtonDom.getRefreshButtonDom()
  const second = GetRefreshButtonDom.getRefreshButtonDom()

  expect(first).toBe(second)
  expect(first[0]).toBe(second[0])
  expect(first[1]).toBe(second[1])
})
