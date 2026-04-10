import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getTimelineNodes } from '../src/parts/GetTimelineNodes/GetTimelineNodes.ts'

const events = [
  {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  },
  {
    eventId: 2,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:10.000Z',
    type: 'response',
  },
]

test('getTimelineNodes should wire interactive timeline selection handlers', () => {
  const nodes = getTimelineNodes(events, '', '', false, '', '') as readonly {
    readonly className?: string
    readonly onDoubleClick?: number
    readonly onPointerDown?: number
    readonly type?: number
  }[]
  const interactive = nodes.find((node) => node.className === 'ChatDebugViewTimelineInteractive')

  expect(interactive).toEqual(
    expect.objectContaining({
      className: 'ChatDebugViewTimelineInteractive',
      onDoubleClick: DomEventListenerFunctions.HandleTimelineDoubleClick,
      onPointerDown: DomEventListenerFunctions.HandleTimelinePointerDown,
      type: VirtualDomElements.Div,
    }),
  )
})

test('getTimelineNodes should render the timeline container as a section', () => {
  const nodes = getTimelineNodes(events, '', '', false, '', '') as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly onContextMenu?: number
    readonly type?: number
  }[]

  const timeline = nodes.find((node) => node.className === 'ChatDebugViewTimeline')

  expect(timeline).toEqual({
    childCount: 2,
    className: 'ChatDebugViewTimeline',
    onContextMenu: DomEventListenerFunctions.HandleTimelineContextMenu,
    type: VirtualDomElements.Section,
  })
})

test('getTimelineNodes should render selection markers only when a range exists', () => {
  const nodes = getTimelineNodes(events, '2', '8', false, '', '') as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly style?: string
    readonly type?: number
  }[]

  const range = nodes.find((node) => node.className === 'ChatDebugViewTimelineSelectionRange')
  const markers = nodes.filter((node) => node.className?.includes('ChatDebugViewTimelineSelectionMarker'))

  expect(range?.style).toBe('left:20%;width:60%;')
  expect(markers).toEqual([
    {
      childCount: 0,
      className: 'ChatDebugViewTimelineSelectionMarker ChatDebugViewTimelineSelectionMarkerStart',
      style: 'left:20%;',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewTimelineSelectionMarker ChatDebugViewTimelineSelectionMarkerEnd',
      style: 'left:80%;',
      type: VirtualDomElements.Div,
    },
  ])
})

test('getTimelineNodes should omit selection markers when no range is selected', () => {
  const nodes = getTimelineNodes(events, '', '', false, '', '') as readonly {
    readonly className?: string
  }[]

  expect(nodes.some((node) => node.className === 'ChatDebugViewTimelineSelectionRange')).toBe(false)
  expect(nodes.some((node) => node.className?.includes('ChatDebugViewTimelineSelectionMarker'))).toBe(false)
})

test('getTimelineNodes should not render a timeline title heading', () => {
  const nodes = getTimelineNodes(events, '', '', false, '', '') as readonly {
    readonly className?: string
    readonly text?: string
  }[]

  expect(nodes.some((node) => node.className === 'ChatDebugViewTimelineTitle')).toBe(false)
  expect(nodes.some((node) => node.text === 'Timeline')).toBe(false)
})

test('getTimelineNodes should render the timeline summary as a heading', () => {
  const nodes = getTimelineNodes(events, '', '', false, '', '') as readonly {
    readonly className?: string
    readonly type?: number
  }[]

  const summary = nodes.find((node) => node.className === 'ChatDebugViewTimelineSummary')

  expect(summary?.type).toBe(VirtualDomElements.H2)
})

test('getTimelineNodes should render drag preview markers while selecting', () => {
  const nodes = getTimelineNodes(events, '', '', true, '1', '4') as readonly {
    readonly className?: string
    readonly style?: string
  }[]

  const range = nodes.find((node) => node.className === 'ChatDebugViewTimelineSelectionRange')

  expect(range?.style).toBe('left:10%;width:30%;')
})
