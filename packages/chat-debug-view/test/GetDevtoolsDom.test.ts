import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetDevtoolsDom from '../src/parts/GetDevtoolsDom/GetDevtoolsDom.ts'

test('getDevtoolsDom should render empty state when there are no events', () => {
  const dom = GetDevtoolsDom.getDevtoolsDom([], null, [], '', '') as readonly {
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
  const dom = GetDevtoolsDom.getDevtoolsDom(events, 0, events, '', '') as readonly {
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

test('getDevtoolsDom should delegate row clicks from table body using data-index', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, 0, events, '', '') as readonly {
    readonly ['data-index']?: string
    readonly className?: string
    readonly inputType?: string
    readonly name?: string
    readonly onClick?: number
    readonly type?: number
  }[]
  const tableBody = dom.find((node) => node.className === 'ChatDebugViewTableBody')
  const eventRow = dom.find((node) => node.className === 'ChatDebugViewEventRow ChatDebugViewEventRowSelected')
  const selectedEventInput = dom.find((node) => node.name === 'selectedEventIndex')

  expect(tableBody?.onClick).toBe(DomEventListenerFunctions.HandleEventRowClick)
  expect(eventRow?.['data-index']).toBe('0')
  expect(selectedEventInput).toBeUndefined()
})

test('getDevtoolsDom should render timeline filters when timestamps are available', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, events, '5', '7') as readonly {
    readonly className?: string
    readonly name?: string
    readonly text?: string
    readonly value?: string
  }[]

  expect(dom.find((node) => node.className === 'ChatDebugViewTimeline')).toBeDefined()
  expect(dom.find((node) => node.name === 'timelineStartSeconds')).toBeUndefined()
  expect(dom.find((node) => node.name === 'timelineEndSeconds')).toBeUndefined()
  expect(dom.find((node) => node.name === 'timelineRangePreset' && node.value === '')).toBeDefined()
  expect(dom.find((node) => node.text === 'Window 5s-7s of 10s')).toBeDefined()
})

test('getDevtoolsDom should make the events pane full width when details are closed', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, events, '', '') as readonly {
    readonly className?: string
  }[]
  const eventsPane = dom.find((node) => node.className === 'ChatDebugViewEvents ChatDebugViewEventsFullWidth ChatDebugViewEvents--timeline')

  expect(eventsPane).toBeDefined()
})

test('getDevtoolsDom should keep details as a second split-pane child when selected', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, 0, events, '', '') as readonly {
    readonly childCount?: number
    readonly className?: string
  }[]
  const mainPane = dom.find((node) => node.className === 'ChatDebugViewDevtoolsMain')

  expect(mainPane?.childCount).toBe(2)
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
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, events, '', '') as readonly {
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '250ms',
    }),
  )

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: 'Mar 08, 2026, 00:00:01.000 UTC',
    }),
  )

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: 'Mar 08, 2026, 00:00:01.250 UTC',
    }),
  )
})

test('getDevtoolsDom should render 200 status for successful events', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      toolName: 'read_file',
      type: 'tool-execution-finished',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, events, '', '') as readonly {
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: 'Status',
    }),
  )

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '200',
    }),
  )
})

test('getDevtoolsDom should render 400 status for errored events', () => {
  const events = [
    {
      error: 'tool call failed',
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      toolName: 'apply_patch',
      type: 'tool-execution-finished',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, events, '', '') as readonly {
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '400',
    }),
  )
})

test('getDevtoolsDom should show merged tool output in the selected event preview', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:01.000Z',
      output: {
        contents: 'hello',
      },
      sessionId: 'session-1',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      toolName: 'read_file',
      type: 'tool-execution',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, 0, events, '', '') as readonly {
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"output"',
    }),
  )

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"hello"',
    }),
  )
})
