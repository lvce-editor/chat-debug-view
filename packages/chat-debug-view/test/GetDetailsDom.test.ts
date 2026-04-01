import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetDetailsDom from '../src/parts/GetDetailsDom/GetDetailsDom.ts'

test('getDetailsDom should render details panel nodes and close input', () => {
  const selectedEventNodes = [
    {
      childCount: 1,
      className: 'SelectedEventNode',
      type: VirtualDomElements.Div,
    },
  ]

  const dom = GetDetailsDom.getDetailsDom(selectedEventNodes) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly name?: string
    readonly onChange?: number
    readonly value?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugViewDetails',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewDetailsTop',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewDetailsTitle',
      type: VirtualDomElements.Div,
    },
    text('Details'),
    {
      childCount: 0,
      className: 'ChatDebugViewDetailsClose',
      inputType: 'checkbox',
      name: 'closeDetails',
      onChange: DomEventListenerFunctions.HandleSimpleInput,
      type: VirtualDomElements.Input,
      value: 'close',
    },
    {
      childCount: 1,
      className: 'ChatDebugViewDetailsBody',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'SelectedEventNode',
      type: VirtualDomElements.Div,
    },
  ])
})

test('getDetailsDom should return an empty array when there is no selected event content', () => {
  const dom = GetDetailsDom.getDetailsDom([])

  expect(dom).toEqual([])
})