import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetDevtoolsDom from '../src/parts/GetDevtoolsDom/GetDevtoolsDom.ts'

test('getDevtoolsDom should render empty state when there are no events', () => {
  const dom = GetDevtoolsDom.getDevtoolsDom([], null) as readonly {
    readonly className?: string
  }[]
  const emptyState = dom.find((node) => node.className === 'ChatDebugViewEmpty')

  expect(emptyState).toBeDefined()
})

test('getDevtoolsDom should render selected details panel and close input', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, 0) as readonly {
    readonly className?: string
    readonly name?: string
    readonly onChange?: number
  }[]
  const detailsPanel = dom.find((node) => node.className === 'ChatDebugViewDetails')
  const closeButton = dom.find((node) => node.name === 'closeDetails')

  expect(detailsPanel).toBeDefined()
  expect(closeButton).toBeDefined()
  expect(closeButton?.onChange).toBe(DomEventListenerFunctions.HandleSimpleInput)
})

test('getDevtoolsDom should render computed duration from timestamps', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      sessionId: 'session-1',
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null) as readonly {
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '250ms',
    }),
  )
})