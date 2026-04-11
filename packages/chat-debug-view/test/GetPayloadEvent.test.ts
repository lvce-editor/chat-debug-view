import { expect, test } from '@jest/globals'
import * as GetPayloadEvent from '../src/parts/GetPayloadEvent/GetPayloadEvent.ts'

test('getPayloadEvent should return only the arguments object for list_files tool execution events', () => {
  const event = {
    arguments: {
      uri: 'file:///workspace',
    },
    eventId: 1,
    name: 'list_files',
    result: {
      entries: [
        {
          name: 'README.md',
          type: 'file',
        },
      ],
      ignored: false,
    },
    type: 'tool-execution',
  }

  const result = GetPayloadEvent.getPayloadEvent(event)

  expect(result).toEqual({
    uri: 'file:///workspace',
  })
})
