import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import { getTimingPreviewDom } from '../src/parts/GetTimingPreviewDom/GetTimingPreviewDom.ts'

test('getTimingPreviewDom should render a timeline-style duration bar', () => {
  const event: ChatViewEvent = {
    ended: '2026-03-08T00:00:01.250Z',
    eventId: 1,
    started: '2026-03-08T00:00:01.000Z',
    type: 'request',
  }

  const result = getTimingPreviewDom(event)

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewTimingPreview',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 4,
      className: 'ChatDebugViewTimingPreviewTrack',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewTimingPreviewRail',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewTimingPreviewTrackOverlay',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewTimingPreviewSegment',
      style: 'left:0%;width:100%;min-width:2px;',
      type: VirtualDomElements.Div,
    },
    text('250ms'),
    {
      childCount: 0,
      className: 'ChatDebugViewTimingPreviewMarker ChatDebugViewTimingPreviewMarkerStart',
      style: 'left:12px;',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewTimingPreviewMarker ChatDebugViewTimingPreviewMarkerEnd',
      style: 'right:12px;',
      type: VirtualDomElements.Div,
    },
  ])
})
