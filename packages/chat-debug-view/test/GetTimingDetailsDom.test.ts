import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../src/parts/ChatDebugStrings/ChatDebugStrings.ts'
import { getDurationText } from '../src/parts/GetDurationText/GetDurationText.ts'
import { getEndText } from '../src/parts/GetEndText/GetEndText.ts'
import { getStartText } from '../src/parts/GetStartText/GetStartText.ts'
import { getTimingDetailsDom } from '../src/parts/GetTimingDetailsDom/GetTimingDetailsDom.ts'
import { getTimingRowDom } from '../src/parts/GetTimingRowDom/GetTimingRowDom.ts'

test('getTimingDetailsDom should render started ended and duration rows', () => {
  const event: ChatViewEvent = {
    ended: '2026-03-08T00:00:01.250Z',
    eventId: 1,
    started: '2026-03-08T00:00:01.000Z',
    type: 'request',
  }

  const result = getTimingDetailsDom(event)

  expect(result).toEqual([
    {
      childCount: 3,
      className: 'ChatDebugViewTiming',
      type: VirtualDomElements.Div,
    },
    ...getTimingRowDom(ChatDebugStrings.started(), getStartText(event)),
    ...getTimingRowDom(ChatDebugStrings.ended(), getEndText(event)),
    ...getTimingRowDom(ChatDebugStrings.duration(), getDurationText(event)),
  ])
})
