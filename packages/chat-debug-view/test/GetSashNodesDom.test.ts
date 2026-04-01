import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSashNodesDom from '../src/parts/GetSashNodesDom/GetSashNodesDom.ts'

test('getSashNodesDom should return empty array when no event is selected', () => {
  const nodes = GetSashNodesDom.getSashNodesDom(false)

  expect(nodes).toEqual([])
})

test('getSashNodesDom should return sash and sash line when event is selected', () => {
  const nodes = GetSashNodesDom.getSashNodesDom(true)

  expect(nodes).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewSash',
      onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewSashLine',
      type: VirtualDomElements.Div,
    },
  ])
})
