import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getTimelineInfo } from '../src/parts/GetTimelineInfo/GetTimelineInfo.ts'
import { getTimelineTopDom } from '../src/parts/GetTimelineTopDom/GetTimelineTopDom.ts'

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

test('getTimelineTopDom should render top wrapper and summary text', () => {
  const timelineInfo = getTimelineInfo(events, '', '')
  const result = getTimelineTopDom(timelineInfo)

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewTimelineTop',
      type: VirtualDomElements.Div,
    },
    text('Window 0s-10s of 10s'),
  ])
})
