import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetDetailsCloseButtonDom from '../src/parts/GetDetailsCloseButtonDom/GetDetailsCloseButtonDom.ts'

test('getDetailsCloseButtonDom should render close button nodes', () => {
  const dom = GetDetailsCloseButtonDom.getDetailsCloseButtonDom() as readonly {
    readonly ['aria-label']?: string
    readonly childCount?: number
    readonly className?: string
    readonly name?: string
    readonly onChange?: number
    readonly onClick?: number
    readonly value?: string
  }[]

  expect(dom).toEqual([
    {
      'aria-label': 'Close details',
      childCount: 1,
      className: 'ChatDebugViewDetailsClose',
      name: 'closeDetails',
      onChange: DomEventListenerFunctions.HandleCloseDetails,
      onClick: DomEventListenerFunctions.HandleCloseDetails,
      type: VirtualDomElements.Button,
      value: 'close',
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconClose',
      type: VirtualDomElements.Div,
    },
  ])
})

test('getDetailsCloseButtonDom should reuse the static close button dom', () => {
  const first = GetDetailsCloseButtonDom.getDetailsCloseButtonDom()
  const second = GetDetailsCloseButtonDom.getDetailsCloseButtonDom()

  expect(first).toBe(second)
  expect(first[0]).toBe(second[0])
  expect(first[1]).toBe(second[1])
})
