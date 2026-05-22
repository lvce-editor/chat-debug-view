import { expect, test } from '@jest/globals'
import { ChatDebugPayloadError } from '../src/parts/ChatDebugPayloadError/ChatDebugPayloadError.ts'
import { createDetailTabs } from '../src/parts/CreateDetailTabs/CreateDetailTabs.ts'
import { getPayloadMismatch } from '../src/parts/GetPayloadMismatch/GetPayloadMismatch.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { shouldHavePayload } from '../src/parts/ShowHavePayload/ShouldHavePayload.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('shouldHavePayload should return state when payload matches expected subset', async () => {
  const selectedEvent = {
    arguments: {
      count: 2,
      input: ['expected text', 'extra text'],
      metadata: {
        nested: true,
        other: 'value',
      },
    },
    eventId: 1,
    name: 'read_file',
    result: {
      ok: true,
    },
    type: 'tool-execution',
  }
  const state = {
    ...createDefaultState(),
    detailTabs: createDetailTabs(InputName.Payload, selectedEvent),
    selectedEvent,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex: 0,
  }

  const result = await shouldHavePayload(state, {
    arguments: {
      input: ['expected text'],
      metadata: {
        nested: true,
      },
    },
  })

  expect(result).toBe(state)
})

test('shouldHavePayload should match merged ai request payloads', async () => {
  const selectedEvent = {
    eventId: 1,
    requestEvent: {
      body: {
        input: [
          {
            content: 'hello',
            role: 'user',
          },
          {
            content: 'ignored',
            role: 'system',
          },
        ],
        model: 'gpt-5.4',
      },
      eventId: 2,
      type: 'ai-request',
    },
    type: 'ai-request',
  }
  const state = {
    ...createDefaultState(),
    detailTabs: createDetailTabs(InputName.Payload, selectedEvent),
    selectedEvent,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex: 0,
  }

  const result = await shouldHavePayload(state, {
    input: [
      {
        content: 'hello',
      },
    ],
  })

  expect(result).toBe(state)
})

test('shouldHavePayload should throw when there is no selected event', async () => {
  const state = {
    ...createDefaultState(),
    detailTabs: createDetailTabs(InputName.Payload),
  }

  await expect(shouldHavePayload(state, {})).rejects.toThrow('Expected selected event to exist')
})

test('shouldHavePayload should throw when payload tab is not selected', async () => {
  const selectedEvent = {
    arguments: {
      input: ['hello'],
    },
    eventId: 1,
    name: 'read_file',
    type: 'tool-execution',
  }
  const state = {
    ...createDefaultState(),
    detailTabs: createDetailTabs(InputName.Response, selectedEvent),
    selectedEvent,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex: 0,
  }

  await expect(shouldHavePayload(state, {})).rejects.toThrow('Expected selected detail tab to be payload but got response')
})

test('shouldHavePayload should throw when payload property is missing', async () => {
  const selectedEvent = {
    arguments: {
      input: ['hello'],
    },
    eventId: 1,
    name: 'read_file',
    type: 'tool-execution',
  }
  const state = {
    ...createDefaultState(),
    detailTabs: createDetailTabs(InputName.Payload, selectedEvent),
    selectedEvent,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex: 0,
  }

  await expect(
    shouldHavePayload(state, {
      arguments: {
        missing: true,
      },
    }),
  ).rejects.toMatchObject({
    actual: undefined,
    expected: true,
    message: 'Expected payload.arguments.missing to exist',
    name: 'ChatDebugPayloadError',
    path: 'payload.arguments.missing',
  })
})

test('shouldHavePayload should throw when payload value does not match', async () => {
  const selectedEvent = {
    arguments: {
      input: ['hello'],
    },
    eventId: 1,
    name: 'read_file',
    type: 'tool-execution',
  }
  const state = {
    ...createDefaultState(),
    detailTabs: createDetailTabs(InputName.Payload, selectedEvent),
    selectedEvent,
    selectedEventId: selectedEvent.eventId,
    selectedEventIndex: 0,
  }

  const result = shouldHavePayload(state, {
    arguments: {
      input: ['goodbye'],
    },
  })

  await expect(result).rejects.toBeInstanceOf(ChatDebugPayloadError)
  await expect(result).rejects.toMatchObject({
    actual: 'hello',
    expected: 'goodbye',
    message: 'Expected payload.arguments.input[0] to equal "goodbye" but got "hello"',
    path: 'payload.arguments.input[0]',
  })
})

test('getPayloadMismatch should return structured mismatch info without throwing', () => {
  const mismatch = getPayloadMismatch(
    {
      arguments: {
        input: ['hello'],
      },
    },
    {
      arguments: {
        input: ['goodbye'],
      },
    },
  )

  expect(mismatch).toEqual({
    actual: 'hello',
    expected: 'goodbye',
    message: 'Expected payload.arguments.input[0] to equal "goodbye" but got "hello"',
    path: 'payload.arguments.input[0]',
  })
})

test('getPayloadMismatch should return undefined when payload matches expected subset', () => {
  const mismatch = getPayloadMismatch(
    {
      arguments: {
        input: ['hello', 'extra'],
        nested: {
          ok: true,
        },
      },
    },
    {
      arguments: {
        input: ['hello'],
        nested: {
          ok: true,
        },
      },
    },
  )

  expect(mismatch).toBeUndefined()
})
