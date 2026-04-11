import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getTimelineInfo } from '../src/parts/GetTimelineInfo/GetTimelineInfo.ts'
import { getTimelineDom } from '../src/parts/GetTimelineNodes/GetTimelineNodes.ts'

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
  const nodes = getTimelineDom(getTimelineInfo(events, '', '')) as readonly {
    readonly className?: string
    readonly onDblClick?: number
    readonly onPointerLeave?: number
    readonly onPointerMove?: number
    readonly onPointerDown?: number
    readonly type?: number
  }[]
  const interactive = nodes.find((node) => node.className === 'ChatDebugViewTimelineInteractive')

  expect(interactive).toEqual(
    expect.objectContaining({
      className: 'ChatDebugViewTimelineInteractive',
      onDblClick: DomEventListenerFunctions.HandleTimelineDoubleClick,
      onPointerDown: DomEventListenerFunctions.HandleTimelinePointerDown,
      onPointerLeave: DomEventListenerFunctions.HandleTimelinePointerLeave,
      onPointerMove: DomEventListenerFunctions.HandleTimelinePointerMove,
      type: VirtualDomElements.Div,
    }),
  )
})

test('getTimelineNodes should render the timeline container as a section', () => {
  const nodes = getTimelineDom(getTimelineInfo(events, '', '')) as readonly {
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
  const nodes = getTimelineDom(getTimelineInfo(events, '2', '8')) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly name?: string
    readonly role?: string
    readonly style?: string
    readonly type?: number
  }[]

  const range = nodes.find((node) => node.className === 'ChatDebugViewTimelineSelectionRange')
  const markers = nodes.filter((node) => node.className?.includes('ChatDebugViewTimelineSelectionMarker'))

  expect(range?.style).toBe('left:20%;width:60%;')
  expect(markers).toEqual([
    {
      childCount: 0,
      className:
        'ChatDebugViewTimelineSelectionHandle ChatDebugViewTimelineSelectionHandleStart ChatDebugViewTimelineSelectionMarker ChatDebugViewTimelineSelectionMarkerStart',
      name: 'TimelineSelectionStartHandle',
      role: 'none',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className:
        'ChatDebugViewTimelineSelectionHandle ChatDebugViewTimelineSelectionHandleEnd ChatDebugViewTimelineSelectionMarker ChatDebugViewTimelineSelectionMarkerEnd',
      name: 'TimelineSelectionEndHandle',
      role: 'none',
      type: VirtualDomElements.Button,
    },
  ])
})

test('getTimelineNodes should wrap cursor guides and selections in separate overlay divs', () => {
  const nodes = getTimelineDom(getTimelineInfo(events, '2', '8'), 50) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly style?: string
    readonly type?: number
  }[]

  const overlayIndex = nodes.findIndex((node) => node.className === 'ChatDebugViewTimelineSelectionOverlay')

  expect(nodes[overlayIndex]).toEqual({
    childCount: 2,
    className: 'ChatDebugViewTimelineSelectionOverlay',
    type: VirtualDomElements.Div,
  })
  expect(nodes[overlayIndex + 1]).toEqual({
    childCount: 1,
    type: VirtualDomElements.Div,
  })
  expect(nodes[overlayIndex + 2]).toEqual(
    expect.objectContaining({
      className: 'ChatDebugViewTimelineCursorGuide ChatDebugViewTimelineCursorGuideVisible',
      style: 'left:50%;',
      type: VirtualDomElements.Div,
    }),
  )
  expect(nodes[overlayIndex + 3]).toEqual({
    childCount: 3,
    type: VirtualDomElements.Div,
  })
  expect(nodes[overlayIndex + 4]).toEqual(
    expect.objectContaining({
      className: 'ChatDebugViewTimelineSelectionRange',
      style: 'left:20%;width:60%;',
      type: VirtualDomElements.Div,
    }),
  )
})

test('getTimelineNodes should omit selection markers when no range is selected', () => {
  const nodes = getTimelineDom(getTimelineInfo(events, '', '')) as readonly {
    readonly className?: string
  }[]

  expect(nodes.some((node) => node.className === 'ChatDebugViewTimelineSelectionRange')).toBe(false)
  expect(nodes.some((node) => node.className?.includes('ChatDebugViewTimelineSelectionMarker'))).toBe(false)
})

test('getTimelineNodes should not render a timeline title heading', () => {
  const nodes = getTimelineDom(getTimelineInfo(events, '', '')) as readonly {
    readonly className?: string
    readonly text?: string
  }[]

  expect(nodes.some((node) => node.className === 'ChatDebugViewTimelineTitle')).toBe(false)
  expect(nodes.some((node) => node.text === 'Timeline')).toBe(false)
})

test('getTimelineNodes should render the timeline summary as a heading', () => {
  const nodes = getTimelineDom(getTimelineInfo(events, '', '')) as readonly {
    readonly className?: string
    readonly type?: number
  }[]

  const summary = nodes.find((node) => node.className === 'ChatDebugViewTimelineSummary')

  expect(summary?.type).toBe(VirtualDomElements.H2)
})

test('getTimelineNodes should render the timeline top container', () => {
  const nodes = getTimelineDom(getTimelineInfo(events, '', '')) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly type?: number
  }[]

  const top = nodes.find((node) => node.className === 'ChatDebugViewTimelineTop')

  expect(top).toEqual({
    childCount: 1,
    className: 'ChatDebugViewTimelineTop',
    type: VirtualDomElements.Div,
  })
})

test('getTimelineNodes should render drag preview markers while selecting', () => {
  const nodes = getTimelineDom(getTimelineInfo(events, '1', '4')) as readonly {
    readonly className?: string
    readonly style?: string
  }[]

  const range = nodes.find((node) => node.className === 'ChatDebugViewTimelineSelectionRange')

  expect(range?.style).toBe('left:10%;width:30%;')
})

test('getTimelineNodes should render timestamp badges across the timeline', () => {
  const nodes = getTimelineDom(getTimelineInfo(events, '', '')) as readonly {
    readonly className?: string
    readonly style?: string
    readonly text?: string
  }[]

  const badgeTexts = nodes.flatMap((node, index) => {
    if (node.className !== 'ChatDebugViewTimelineBadge') {
      return []
    }
    const textNode = nodes[index + 1]
    return [
      {
        style: node.style,
        text: textNode?.text,
      },
    ]
  })

  expect(badgeTexts).toEqual([
    {
      style: 'left:0;transform:translateX(0);',
      text: '0s',
    },
    {
      style: 'left:20%;transform:translateX(-50%);',
      text: '2s',
    },
    {
      style: 'left:40%;transform:translateX(-50%);',
      text: '4s',
    },
    {
      style: 'left:60%;transform:translateX(-50%);',
      text: '6s',
    },
    {
      style: 'left:80%;transform:translateX(-50%);',
      text: '8s',
    },
    {
      style: 'left:100%;transform:translateX(-100%);',
      text: '10s',
    },
  ])
})

test('getTimelineNodes should render the bucket container', () => {
  const timelineInfo = getTimelineInfo(events, '', '')
  const nodes = getTimelineDom(timelineInfo) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly type?: number
  }[]

  expect(nodes).toContainEqual({
    childCount: timelineInfo.buckets.length,
    className: 'ChatDebugViewTimelineBuckets',
    type: VirtualDomElements.Div,
  })
})
