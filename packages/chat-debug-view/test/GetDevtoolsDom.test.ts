import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetDevtoolsDom from '../src/parts/GetDevtoolsDom/GetDevtoolsDom.ts'

test('getDevtoolsDom should render empty state when there are no events', () => {
  const dom = GetDevtoolsDom.getDevtoolsDom([], null, null, [], '', '', 'No events have been found') as readonly {
    readonly className?: string
    readonly text?: string
  }[]
  const emptyState = dom.find((node) => node.className === 'ChatDebugViewEmpty')
  const table = dom.find((node) => node.className === 'ChatDebugViewTable')

  expect(emptyState).toBeDefined()
  expect(table).toBeUndefined()
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: 'No events have been found',
    }),
  )
})

test('getDevtoolsDom should render selected details panel and close input', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, events[0], 0, events, '', '') as readonly {
    readonly className?: string
    readonly name?: string
    readonly onClick?: number
    readonly onPointerDown?: number
    readonly childCount?: number
  }[]
  const detailsPanel = dom.find((node) => node.className === 'ChatDebugViewDetails')
  const closeButton = dom.find((node) => node.name === 'closeDetails')
  const sash = dom.find((node) => node.className === 'ChatDebugViewSash')
  const sashLine = dom.find((node) => node.className === 'ChatDebugViewSashLine')

  expect(detailsPanel).toBeDefined()
  expect(closeButton).toBeDefined()
  expect(closeButton?.onClick).toBe(DomEventListenerFunctions.HandleSimpleInput)
  expect(sash?.childCount).toBe(1)
  expect(sash?.onPointerDown).toBe(DomEventListenerFunctions.HandleSashPointerDown)
  expect(sashLine).toBeDefined()
})

test('getDevtoolsDom should wrap header and body in a table container', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, null, events, '', '') as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly type?: number
  }[]
  const table = dom.find((node) => node.className === 'ChatDebugViewTable')
  const header = dom.find((node) => node.className === 'ChatDebugViewTableHeader')
  const body = dom.find((node) => node.className === 'ChatDebugViewTableBody')

  expect(table).toBeDefined()
  expect(table?.childCount).toBe(2)
  expect(table?.type).toBe(VirtualDomElements.Table)
  expect(header).toBeDefined()
  expect(body).toBeDefined()
})

test('getDevtoolsDom should delegate row pointerdown from table body using data-index', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, events[0], 0, events, '', '') as readonly {
    readonly ['data-index']?: string
    readonly className?: string
    readonly inputType?: string
    readonly name?: string
    readonly onPointerDown?: number
    readonly onContextMenu?: number
    readonly type?: number
  }[]
  const tableBody = dom.find((node) => node.className === 'ChatDebugViewTableBody')
  const eventRow = dom.find((node) => node.className === 'ChatDebugViewEventRow ChatDebugViewEventRowSelected')
  const selectedEventInput = dom.find((node) => node.name === 'selectedEventIndex')

  expect(tableBody?.onPointerDown).toBe(DomEventListenerFunctions.HandleEventRowClick)
  expect(tableBody?.onContextMenu).toBe(DomEventListenerFunctions.HandleTableBodyContextMenu)
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
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, null, events, '5', '7') as readonly {
    readonly className?: string
    readonly name?: string
    readonly text?: string
    readonly value?: string
  }[]

  expect(dom.find((node) => node.className === 'ChatDebugViewTimeline')).toBeDefined()
  expect(dom.find((node) => node.name === 'timelineStartSeconds')).toBeUndefined()
  expect(dom.find((node) => node.name === 'timelineEndSeconds')).toBeUndefined()
  expect(dom.find((node) => node.name === 'timelineRangePreset' && node.value === '')).toBeUndefined()
  expect(dom.find((node) => node.text === 'Window 5s-7s of 10s')).toBeDefined()
})

test('getDevtoolsDom should keep the timeline outside the table-details split', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, events[0], 0, events, '', '') as readonly {
    readonly childCount?: number
    readonly className?: string
  }[]
  const mainPane = dom.find((node) => node.className === 'ChatDebugViewDevtoolsMain')
  const timeline = dom.find((node) => node.className === 'ChatDebugViewTimeline')
  const splitPane = dom.find((node) => node.className === 'ChatDebugViewDevtoolsSplit')

  expect(mainPane?.childCount).toBe(2)
  expect(timeline?.childCount).toBe(2)
  expect(timeline).toBeDefined()
  expect(splitPane?.childCount).toBe(3)
})

test('getDevtoolsDom should make the events pane full width when details are closed', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, null, events, '', '') as readonly {
    readonly className?: string
  }[]
  const eventsPane = dom.find((node) => node.className === 'ChatDebugViewEvents ChatDebugViewEventsFullWidth')
  const sash = dom.find((node) => node.className === 'ChatDebugViewSash')

  expect(eventsPane).toBeDefined()
  expect(sash).toBeUndefined()
})

test('getDevtoolsDom should keep details as a second split-pane child when selected', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, events[0], 0, events, '', '') as readonly {
    readonly childCount?: number
    readonly className?: string
  }[]
  const mainPane = dom.find((node) => node.className === 'ChatDebugViewDevtoolsMain')
  const splitPane = dom.find((node) => node.className === 'ChatDebugViewDevtoolsSplit')
  const sash = dom.find((node) => node.className === 'ChatDebugViewSash')
  const table = dom.find((node) => node.className === 'ChatDebugViewTable')
  const details = dom.find((node) => node.className === 'ChatDebugViewDetails')

  expect(mainPane?.childCount).toBe(2)
  expect(splitPane?.childCount).toBe(3)
  expect(sash).toBeDefined()
  expect(table).toBeDefined()
  expect(details).toBeDefined()
})

test('getDevtoolsDom should count direct table body children per event', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'response',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, events[0], 0, events, '', '') as readonly {
    readonly childCount?: number
    readonly className?: string
  }[]
  const tableBody = dom.find((node) => node.className === 'ChatDebugViewTableBody')

  expect(tableBody?.childCount).toBe(2)
})

test('getDevtoolsDom should apply explicit duration and status column classes to headers and rows', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:01.000Z',
      sessionId: 'session-1',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, null, events, '', '') as readonly {
    readonly className?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellDuration',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewCell ChatDebugViewCellDuration',
    }),
  )
})

test('getDevtoolsDom should render computed duration without start and end timestamps in rows', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      sessionId: 'session-1',
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, null, events, '', '') as readonly {
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '250ms',
    }),
  )

  expect(dom).not.toContainEqual(
    expect.objectContaining({
      text: 'Mar 08, 2026, 00:00:01.000 UTC',
    }),
  )

  expect(dom).not.toContainEqual(
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
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, null, events, '', '') as readonly {
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

test('getDevtoolsDom should render tool execution row labels with tool name', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      toolName: 'getWorkspaceUri',
      type: 'tool-execution',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, null, events, '', '') as readonly {
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: 'tool-execution, getWorkspaceUri',
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
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, null, events, '', '') as readonly {
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
  const dom = GetDevtoolsDom.getDevtoolsDom(events, events[0], 0, events, '', '') as readonly {
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
