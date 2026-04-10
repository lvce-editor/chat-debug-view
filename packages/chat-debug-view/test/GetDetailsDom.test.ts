import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DetailTab from '../src/parts/DetailTab/DetailTab.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetDetailsDom from '../src/parts/GetDetailsDom/GetDetailsDom.ts'
import { getEndText } from '../src/parts/GetEndText/GetEndText.ts'
import { getStartText } from '../src/parts/GetStartText/GetStartText.ts'

const detailTabs = DetailTab.createDetailTabs()
const previewDetailTabs = DetailTab.createDetailTabs('preview')
const payloadDetailTabs = DetailTab.createDetailTabs('payload')
const timingDetailTabs = DetailTab.createDetailTabs('timing')

test('getDetailsDom should render details panel nodes, close control, and tabs', () => {
  const selectedEventNodes = [
    {
      childCount: 1,
      className: 'SelectedEventNode',
      type: VirtualDomElements.Div,
    },
  ]

  const dom = GetDetailsDom.getDetailsDom(selectedEventNodes, undefined, undefined, null, detailTabs) as readonly {
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
      childCount: 4,
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
      'aria-controls': 'ChatDebugViewDetailsPanel-payload',
      'aria-selected': false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      id: 'ChatDebugViewDetailsTab-payload',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
      value: 'payload',
    },
    text('Payload'),
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
  const dom = GetDetailsDom.getDetailsDom([], [], [], null, detailTabs)

  expect(dom).toEqual([])
})

test('getDetailsDom should render timing panel content when timing tab is selected', () => {
  const event = {
    ended: '2026-03-08T00:00:01.250Z',
    eventId: 1,
    started: '2026-03-08T00:00:01.000Z',
    type: 'request',
  } as const

  const dom = GetDetailsDom.getDetailsDom(
    [
      {
        childCount: 1,
        className: 'SelectedEventNode',
        type: VirtualDomElements.Div,
      },
    ],
    undefined,
    undefined,
    event,
    timingDetailTabs,
  ) as readonly {
    readonly ['aria-selected']?: boolean
    readonly className?: string
    readonly role?: string
    readonly text?: string
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
      childCount: 4,
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
      'aria-controls': 'ChatDebugViewDetailsPanel-payload',
      'aria-selected': false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      id: 'ChatDebugViewDetailsTab-payload',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
      value: 'payload',
    },
    text('Payload'),
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-response',
      'aria-selected': false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      id: 'ChatDebugViewDetailsTab-response',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
      value: 'response',
    },
    text('Response'),
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-timing',
      'aria-selected': true,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab ChatDebugViewDetailsTabSelected',
      id: 'ChatDebugViewDetailsTab-timing',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: 0,
      type: VirtualDomElements.Button,
      value: 'timing',
    },
    text('Timing'),
    {
      'aria-labelledby': 'ChatDebugViewDetailsTab-timing',
      childCount: 1,
      className: 'ChatDebugViewDetailsBottom',
      id: 'ChatDebugViewDetailsPanel-timing',
      onContextMenu: DomEventListenerFunctions.HandleDetailsContextMenu,
      role: 'tabpanel',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: 'ChatDebugViewTiming',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewTimingRow',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewTimingLabel',
      type: VirtualDomElements.Span,
    },
    text('Started'),
    {
      childCount: 1,
      className: 'ChatDebugViewTimingValue',
      type: VirtualDomElements.Span,
    },
    text(getStartText(event)),
    {
      childCount: 2,
      className: 'ChatDebugViewTimingRow',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewTimingLabel',
      type: VirtualDomElements.Span,
    },
    text('Ended'),
    {
      childCount: 1,
      className: 'ChatDebugViewTimingValue',
      type: VirtualDomElements.Span,
    },
    text(getEndText(event)),
    {
      childCount: 2,
      className: 'ChatDebugViewTimingRow',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewTimingLabel',
      type: VirtualDomElements.Span,
    },
    text('Duration'),
    {
      childCount: 1,
      className: 'ChatDebugViewTimingValue',
      type: VirtualDomElements.Span,
    },
    text('250ms'),
  ])
})

test('getDetailsDom should render selected event content when preview tab is selected', () => {
  const selectedEventNodes = [
    {
      childCount: 1,
      className: 'SelectedEventNode',
      type: VirtualDomElements.Div,
    },
  ]

  const dom = GetDetailsDom.getDetailsDom(selectedEventNodes, undefined, undefined, null, previewDetailTabs) as readonly {
    readonly ['aria-labelledby']?: string
    readonly ['aria-selected']?: boolean
    readonly className?: string
    readonly role?: string
    readonly text?: string
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
      childCount: 4,
      className: 'ChatDebugViewDetailsTabs',
      role: 'tablist',
      type: VirtualDomElements.Div,
    },
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-preview',
      'aria-selected': true,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab ChatDebugViewDetailsTabSelected',
      id: 'ChatDebugViewDetailsTab-preview',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: 0,
      type: VirtualDomElements.Button,
      value: 'preview',
    },
    text('Preview'),
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-payload',
      'aria-selected': false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      id: 'ChatDebugViewDetailsTab-payload',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
      value: 'payload',
    },
    text('Payload'),
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-response',
      'aria-selected': false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      id: 'ChatDebugViewDetailsTab-response',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
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
      'aria-labelledby': 'ChatDebugViewDetailsTab-preview',
      childCount: 1,
      className: 'ChatDebugViewDetailsBottom',
      id: 'ChatDebugViewDetailsPanel-preview',
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

test('getDetailsDom should render payload content when payload tab is selected', () => {
  const previewNodes = [
    {
      childCount: 1,
      className: 'PreviewNode',
      type: VirtualDomElements.Div,
    },
  ]
  const payloadNodes = [
    {
      childCount: 1,
      className: 'PayloadNode',
      type: VirtualDomElements.Div,
    },
  ]

  const dom = GetDetailsDom.getDetailsDom(previewNodes, payloadNodes, previewNodes, null, payloadDetailTabs) as readonly {
    readonly ['aria-labelledby']?: string
    readonly ['aria-selected']?: boolean
    readonly className?: string
    readonly role?: string
    readonly text?: string
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
      childCount: 4,
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
      'aria-controls': 'ChatDebugViewDetailsPanel-payload',
      'aria-selected': true,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab ChatDebugViewDetailsTabSelected',
      id: 'ChatDebugViewDetailsTab-payload',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: 0,
      type: VirtualDomElements.Button,
      value: 'payload',
    },
    text('Payload'),
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-response',
      'aria-selected': false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      id: 'ChatDebugViewDetailsTab-response',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
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
      'aria-labelledby': 'ChatDebugViewDetailsTab-payload',
      childCount: 1,
      className: 'ChatDebugViewDetailsBottom',
      id: 'ChatDebugViewDetailsPanel-payload',
      onContextMenu: DomEventListenerFunctions.HandleDetailsContextMenu,
      role: 'tabpanel',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'PayloadNode',
      type: VirtualDomElements.Div,
    },
  ])
})
