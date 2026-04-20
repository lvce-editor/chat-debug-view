import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as ChatDebugStrings from '../src/parts/ChatDebugStrings/ChatDebugStrings.ts'
import { getHeadersDetailsDom } from '../src/parts/GetHeadersDetailsDom/GetHeadersDetailsDom.ts'
import { getTimingRowDom } from '../src/parts/GetTimingRowDom/GetTimingRowDom.ts'

test('getHeadersDetailsDom should render general and response headers sections for merged ai request response events', () => {
  const event = {
    eventId: 1,
    requestEvent: {
      eventId: 1,
      method: 'POST',
      type: 'ai-request',
      url: 'https://example.com/v1/chat/completions',
    },
    responseEvent: {
      eventId: 2,
      headers: {
        'content-type': 'application/json',
        'x-request-id': 'abc-123',
      },
      status: 200,
      type: 'ai-response',
    },
    type: 'ai-request',
  }

  const result = getHeadersDetailsDom(event)

  expect(result).toEqual([
    {
      childCount: 7,
      className: 'ChatDebugViewTiming',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewTimingLabel',
      type: VirtualDomElements.Div,
    },
    text(ChatDebugStrings.general()),
    ...getTimingRowDom(ChatDebugStrings.requestUrl(), 'https://example.com/v1/chat/completions'),
    ...getTimingRowDom(ChatDebugStrings.requestMethod(), 'POST'),
    ...getTimingRowDom(ChatDebugStrings.statusCode(), '200'),
    {
      childCount: 1,
      className: 'ChatDebugViewTimingLabel',
      type: VirtualDomElements.Div,
    },
    text(ChatDebugStrings.responseHeaders()),
    ...getTimingRowDom('content-type', 'application/json'),
    ...getTimingRowDom('x-request-id', 'abc-123'),
  ])
})
