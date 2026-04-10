import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetDetailsDom from '../src/parts/GetDetailsDom/GetDetailsDom.ts'

test('getDetailsDom should render details panel nodes, close control, and tabs', () => {
  const selectedEventNodes = [
    {
      childCount: 1,
      className: 'SelectedEventNode',
      type: VirtualDomElements.Div,
    },
  ]

  const dom = GetDetailsDom.getDetailsDom(selectedEventNodes) as readonly {
    readonly ['aria-label']?: string
    readonly ['aria-controls']?: string
    readonly ['aria-labelledby']?: string
    readonly ['aria-selected']?: boolean
    readonly childCount?: number
    readonly className?: string
    readonly id?: string
    readonly name?: string
    readonly onChange?: number
    readonly onClick?: number
    readonly onContextMenu?: number
    readonly role?: string
    readonly tabIndex?: number
    readonly value?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugViewDetails',
      type: VirtualDomElements.Section,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewDetailsTop',
      onContextMenu: DomEventListenerFunctions.HandleDetailsTopContextMenu,
      type: VirtualDomElements.Div,
    },
    {
      'aria-label': 'Close details',
      childCount: 0,
      className: 'ChatDebugViewDetailsClose',
      name: 'closeDetails',
      onChange: DomEventListenerFunctions.HandleCloseDetails,
      onClick: DomEventListenerFunctions.HandleCloseDetails,
      type: VirtualDomElements.Button,
      value: 'close',
    },
    {
      'aria-label': 'Detail sections',
      childCount: 3,
      className: 'ChatDebugViewDetailsTabs',
      role: 'tablist',
      type: VirtualDomElements.Div,
    },
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-preview',
      'aria-selected': false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      id: 'ChatDebugViewDetailsTab-preview',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
      value: 'preview',
    },
    text('Preview'),
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-response',
      'aria-selected': true,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab ChatDebugViewDetailsTabSelected',
      id: 'ChatDebugViewDetailsTab-response',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: 0,
      type: VirtualDomElements.Button,
      value: 'response',
    },
    text('Response'),
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-timing',
      'aria-selected': false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      id: 'ChatDebugViewDetailsTab-timing',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
      value: 'timing',
    },
    text('Timing'),
    {
      'aria-labelledby': 'ChatDebugViewDetailsTab-response',
      childCount: 1,
      className: 'ChatDebugViewDetailsBottom',
      id: 'ChatDebugViewDetailsPanel-response',
      onContextMenu: DomEventListenerFunctions.HandleDetailsContextMenu,
      role: 'tabpanel',
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

test('getDetailsDom should render timing panel content when timing tab is selected', () => {
  const dom = GetDetailsDom.getDetailsDom(
    [
      {
        childCount: 1,
        className: 'SelectedEventNode',
        type: VirtualDomElements.Div,
      },
    ],
    undefined,
    {
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
      started: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
    'timing',
  ) as readonly {
    readonly ['aria-selected']?: boolean
    readonly className?: string
    readonly role?: string
    readonly text?: string
    readonly value?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewDetailsBottom',
      role: 'tabpanel',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewDetailsTab ChatDebugViewDetailsTabSelected',
      role: 'tab',
      value: 'timing',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewTiming',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: 'Duration',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '250ms',
    }),
  )
})

test('getDetailsDom should render selected event content when preview tab is selected', () => {
  const selectedEventNodes = [
    {
      childCount: 1,
      className: 'SelectedEventNode',
      type: VirtualDomElements.Div,
    },
  ]

  const dom = GetDetailsDom.getDetailsDom(selectedEventNodes, undefined, null, 'preview') as readonly {
    readonly ['aria-labelledby']?: string
    readonly ['aria-selected']?: boolean
    readonly className?: string
    readonly role?: string
    readonly value?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewDetailsTab ChatDebugViewDetailsTabSelected',
      role: 'tab',
      value: 'preview',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      'aria-labelledby': 'ChatDebugViewDetailsTab-preview',
      className: 'ChatDebugViewDetailsBottom',
      role: 'tabpanel',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'SelectedEventNode',
    }),
  )
})
