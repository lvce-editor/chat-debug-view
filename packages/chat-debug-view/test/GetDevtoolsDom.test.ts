import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DetailTab from '../src/parts/DetailTab/DetailTab.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetDevtoolsDom from '../src/parts/GetDevtoolsDom/GetDevtoolsDom.ts'
import { setSelectedEventPreview } from '../src/parts/SelectedEventPreview/SelectedEventPreview.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('getDevtoolsDom should render empty state when there are no events', () => {
  const dom = GetDevtoolsDom.getDevtoolsDom([], null, null, [], '', '', 'No events have been found') as readonly {
    readonly className?: string
    readonly text?: string
  }[]
  const emptyState = dom.find((node) => node.className === 'ChatDebugViewEmpty')
  const table = dom.find((node) => node.className === 'Table')

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
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(
    events,
    events[0],
    0,
    events,
    '',
    '',
    undefined,
    false,
    '',
    '',
    DetailTab.createDetailTabs('preview'),
    TableColumn.defaultVisibleTableColumns,
  ) as readonly {
    readonly className?: string
    readonly name?: string
    readonly onChange?: number
    readonly onClick?: number
    readonly onPointerDown?: number
    readonly childCount?: number
  }[]
  const detailsPanel = dom.find((node) => node.className === 'ChatDebugViewDetails')
  const closeButton = dom.find((node) => node.name === 'closeDetails')
  const sash = dom.find((node) => node.className === 'Sash')

  expect(detailsPanel).toBeDefined()
  expect(closeButton).toBeDefined()
  expect(closeButton?.onChange).toBe(DomEventListenerFunctions.HandleCloseDetails)
  expect(closeButton?.onClick).toBe(DomEventListenerFunctions.HandleCloseDetails)
  expect(sash?.childCount).toBe(0)
  expect(sash?.onPointerDown).toBe(DomEventListenerFunctions.HandleSashPointerDown)
})

test('getDevtoolsDom should render accessible response, preview and timing tabs in the details panel', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
      sessionId: 'session-1',
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, events[0], 0, events, '', '') as readonly {
    readonly ariaSelected?: boolean
    readonly className?: string
    readonly name?: string
    readonly role?: string
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewDetailsTabs',
      role: 'tablist',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'PanelTab PanelTabSelected',
      name: 'response',
      role: 'tab',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'PanelTab',
      name: 'preview',
      role: 'tab',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'PanelTab',
      name: 'payload',
      role: 'tab',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'PanelTab',
      name: 'timing',
      role: 'tab',
    }),
  )
})

test('getDevtoolsDom should wrap header and body in a table container', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, null, events, '', '') as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly onPointerDown?: number
    readonly type?: number
  }[]
  const table = dom.find((node) => node.className === 'Table')
  const eventsPane = dom.find((node) => node.className === 'ChatDebugViewEvents ChatDebugViewEventsFullWidth')
  const tableWrapperWrapper = dom.find((node) => node.className === 'TableWrapperWrapper')
  const tableWrapper = dom.find((node) => node.className === 'TableWrapper')
  const header = dom.find((node) => node.className === 'TableHead')
  const body = dom.find((node) => node.className === 'TableBody')
  const resizer = dom.find((node) => node.className === 'Resizer ResizerOne')
  const resizers = dom.find((node) => node.className === 'Resizers')

  expect(eventsPane).toBeDefined()
  expect(tableWrapperWrapper).toBeDefined()
  expect(tableWrapper).toBeDefined()
  expect(tableWrapperWrapper?.childCount).toBe(2)
  expect(table).toBeDefined()
  expect(table?.childCount).toBe(3)
  expect(tableWrapper?.childCount).toBe(2)
  expect(table?.type).toBe(VirtualDomElements.Table)
  expect(header).toBeDefined()
  expect(body).toBeDefined()
  expect(resizers?.childCount).toBe(2)
  expect(resizer?.onPointerDown).toBe(DomEventListenerFunctions.HandleTableResizerPointerDown)
})

test('getDevtoolsDom should expose the events container application role', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, null, events, '', '') as readonly {
    readonly className?: string
    readonly role?: string
    readonly tabIndex?: number
  }[]
  const eventsPane = dom.find((node) => node.className === 'ChatDebugViewEvents ChatDebugViewEventsFullWidth')

  expect(eventsPane).toEqual(
    expect.objectContaining({
      role: 'application',
    }),
  )
})

test('getDevtoolsDom should delegate row pointerdown from table body', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, events[0], 0, events, '', '') as readonly {
    readonly className?: string
    readonly inputType?: string
    readonly name?: string
    readonly onPointerDown?: number
    readonly onContextMenu?: number
    readonly type?: number
  }[]
  const tableBody = dom.find((node) => node.className === 'TableBody')
  const eventRow = dom.find((node) => node.className === 'TableRow TableRowOdd TableRowSelected')
  const selectedEventInput = dom.find((node) => node.name === 'selectedEventIndex')

  expect(tableBody?.onPointerDown).toBe(DomEventListenerFunctions.HandleEventRowClickAt)
  expect(tableBody?.onContextMenu).toBe(DomEventListenerFunctions.HandleTableBodyContextMenu)
  expect(eventRow).toBeDefined()
  expect(selectedEventInput).toBeUndefined()
})

test('getDevtoolsDom should render timeline filters when timestamps are available', () => {
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
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, events[0], 0, events, '', '') as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly onContextMenu?: number
  }[]
  const timeline = dom.find((node) => node.className === 'ChatDebugViewTimeline')
  const splitPane = dom.find((node) => node.className === 'ChatDebugViewDevtoolsSplit')
  const timelineIndex = dom.findIndex((node) => node.className === 'ChatDebugViewTimeline')
  const splitPaneIndex = dom.findIndex((node) => node.className === 'ChatDebugViewDevtoolsSplit')

  expect(timeline?.childCount).toBe(2)
  expect(timeline?.onContextMenu).toBe(DomEventListenerFunctions.HandleTimelineContextMenu)
  expect(timeline).toBeDefined()
  expect(timelineIndex).toBeGreaterThan(-1)
  expect(splitPaneIndex).toBeGreaterThan(timelineIndex)
  expect(splitPane?.childCount).toBe(3)
})

test('getDevtoolsDom should render attachment image previews in the preview panel', () => {
  const events = [
    {
      eventId: 1,
      mimeType: 'image/png',
      name: 'diagram.png',
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'chat-attachment-added',
    },
  ]
  const selectedEvent = setSelectedEventPreview(
    {
      ...events[0],
    },
    {
      alt: 'diagram.png',
      previewType: 'image',
      src: 'data:image/png;base64,preview',
    },
  )
  const dom = GetDevtoolsDom.getDevtoolsDom(
    events,
    selectedEvent,
    0,
    events,
    '',
    '',
    undefined,
    false,
    '',
    '',
    DetailTab.createDetailTabs('preview'),
    TableColumn.defaultVisibleTableColumns,
  ) as readonly {
    readonly alt?: string
    readonly className?: string
    readonly src?: string
    readonly type?: number
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewImagePreview',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewImagePreviewImageWrapper',
      type: VirtualDomElements.Div,
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      alt: 'diagram.png',
      className: 'ChatDebugViewImagePreviewImage',
      src: 'data:image/png;base64,preview',
      type: VirtualDomElements.Img,
    }),
  )
})

test('getDevtoolsDom should expose none role on the devtools split container', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, events[0], 0, events, '', '') as readonly {
    readonly className?: string
    readonly role?: string
  }[]
  const splitPane = dom.find((node) => node.className === 'ChatDebugViewDevtoolsSplit')

  expect(splitPane).toEqual(
    expect.objectContaining({
      role: 'none',
    }),
  )
})

test('getDevtoolsDom should make the events pane full width when details are closed', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, null, events, '', '') as readonly {
    readonly className?: string
  }[]
  const splitPane = dom.find((node) => node.className === 'ChatDebugViewDevtoolsSplit')
  const eventsPane = dom.find((node) => node.className === 'ChatDebugViewEvents ChatDebugViewEventsFullWidth')
  const sash = dom.find((node) => node.className === 'Sash')

  expect(splitPane).toBeUndefined()
  expect(eventsPane).toBeDefined()
  expect(sash).toBeUndefined()
})

test('getDevtoolsDom should keep details as a second split-pane child when selected', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, events[0], 0, events, '', '') as readonly {
    readonly childCount?: number
    readonly className?: string
  }[]
  const splitPane = dom.find((node) => node.className === 'ChatDebugViewDevtoolsSplit')
  const sash = dom.find((node) => node.className === 'Sash')
  const table = dom.find((node) => node.className === 'Table')
  const details = dom.find((node) => node.className === 'ChatDebugViewDetails')

  expect(splitPane?.childCount).toBe(3)
  expect(sash).toBeDefined()
  expect(table).toBeDefined()
  expect(details).toBeDefined()
})

test('getDevtoolsDom should count direct table body children per event', () => {
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
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'response',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, events[0], 0, events, '', '') as readonly {
    readonly childCount?: number
    readonly className?: string
  }[]
  const tableBody = dom.find((node) => node.className === 'TableBody')

  expect(tableBody?.childCount).toBe(2)
})

test('getDevtoolsDom should apply duration and status column classes to row cells', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:01.000Z',
      eventId: 1,
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
      className: 'TableCell',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'TableCell ChatDebugViewCellDuration',
    }),
  )
  expect(dom).not.toContainEqual(
    expect.objectContaining({
      className: 'TableCell ChatDebugViewCellDuration ChatDebugViewColumnFixed',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '1000 ms',
    }),
  )
})

test('getDevtoolsDom should render computed duration without start and end timestamps in rows', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
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
      text: '250 ms',
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

test('getDevtoolsDom should hide disabled table columns in header and rows', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
      sessionId: 'session-1',
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(
    events,
    null,
    null,
    events,
    '',
    '',
    'No events have been found',
    false,
    '',
    '',
    DetailTab.createDetailTabs('preview'),
    [TableColumn.Type, TableColumn.Status],
  ) as readonly {
    readonly className?: string
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: 'Type',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: 'Status',
    }),
  )
  expect(dom).not.toContainEqual(
    expect.objectContaining({
      text: 'Time',
    }),
  )
  expect(dom).not.toContainEqual(
    expect.objectContaining({
      className: 'TableCell ChatDebugViewCellDuration',
    }),
  )
})

test('getDevtoolsDom should render 200 status for successful events', () => {
  const events = [
    {
      eventId: 1,
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
      eventId: 1,
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

test('getDevtoolsDom should render tool execution row labels with top-level name', () => {
  const events = [
    {
      arguments: {
        uri: 'file:///workspace',
      },
      eventId: 1,
      name: 'list_files',
      sessionId: 'session-1',
      timestamp: '2026-04-02T07:26:35.172Z',
      type: 'tool-execution',
    },
  ]
  const dom = GetDevtoolsDom.getDevtoolsDom(events, null, null, events, '', '') as readonly {
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: 'list_files',
    }),
  )
})

test('getDevtoolsDom should render 400 status for errored events', () => {
  const events = [
    {
      error: 'tool call failed',
      eventId: 1,
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
      eventId: 1,
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

test('getDevtoolsDom should simplify preview json to name, arguments and result when available', () => {
  const events = [
    {
      arguments: {
        uri: 'file:///workspace/README.md',
      },
      eventId: 1,
      id: 'call-1',
      name: 'read_file',
      result: {
        content: 'hello',
      },
      sessionId: 'session-1',
      time: '2026-04-02T07:26:35.168Z',
      timestamp: '2026-04-02T07:26:35.172Z',
      type: 'tool-execution',
    },
  ]

  const dom = GetDevtoolsDom.getDevtoolsDom(
    events,
    events[0],
    0,
    events,
    '',
    '',
    'No events have been found',
    false,
    '',
    '',
    DetailTab.createDetailTabs('preview'),
    TableColumn.defaultVisibleTableColumns,
  ) as readonly {
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"name"',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"arguments"',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"result"',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"read_file"',
    }),
  )
  expect(dom).not.toContainEqual(
    expect.objectContaining({
      text: '"sessionId"',
    }),
  )
  expect(dom).not.toContainEqual(
    expect.objectContaining({
      text: '"id"',
    }),
  )
})

test('getDevtoolsDom should omit getWorkspaceUri arguments from the preview tab', () => {
  const events = [
    {
      arguments: {
        baseUri: '/test/chat-debug-view',
        pattern: '**/*',
      },
      error: 'Invalid argument: baseUri must be an absolute URI.',
      eventId: 1,
      name: 'getWorkspaceUri',
      result: {
        uri: 'file:///workspace',
      },
      sessionId: 'session-1',
      timestamp: '2026-04-02T07:26:35.172Z',
      type: 'tool-execution',
    },
  ]

  const dom = GetDevtoolsDom.getDevtoolsDom(
    events,
    events[0],
    0,
    events,
    '',
    '',
    'No events have been found',
    false,
    '',
    '',
    DetailTab.createDetailTabs('preview'),
    TableColumn.defaultVisibleTableColumns,
  ) as readonly {
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"name"',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"getWorkspaceUri"',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"result"',
    }),
  )
  expect(dom).not.toContainEqual(
    expect.objectContaining({
      text: '"arguments"',
    }),
  )
  expect(dom).not.toContainEqual(
    expect.objectContaining({
      text: '"baseUri"',
    }),
  )
})

test('getDevtoolsDom should render chat message preview text as raw wrapped text', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      text: 'first line\nsecond line',
      timestamp: '2026-04-10T10:00:00.000Z',
      type: 'chat-message-updated',
    },
  ]

  const dom = GetDevtoolsDom.getDevtoolsDom(
    events,
    events[0],
    0,
    events,
    '',
    '',
    'No events have been found',
    false,
    '',
    '',
    DetailTab.createDetailTabs('preview'),
    TableColumn.defaultVisibleTableColumns,
  ) as readonly {
    readonly className?: string
    readonly text?: string
    readonly type?: number
  }[]

  expect(dom).not.toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewEventLineNumber',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'EditorContainer',
      type: VirtualDomElements.Div,
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: 'first line',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: 'second line',
    }),
  )
})

test('getDevtoolsDom should render invalid image fallback preview text without numbered rows', () => {
  const events = [
    {
      eventId: 1,
      mimeType: 'image/png',
      name: 'broken.png',
      sessionId: 'session-1',
      timestamp: '2026-04-10T10:00:00.000Z',
      type: 'chat-attachment-added',
    },
  ]
  const selectedEvent = setSelectedEventPreview(
    {
      ...events[0],
    },
    'image could not be loaded',
  )

  const dom = GetDevtoolsDom.getDevtoolsDom(
    events,
    selectedEvent,
    0,
    events,
    '',
    '',
    'No events have been found',
    false,
    '',
    '',
    DetailTab.createDetailTabs('preview'),
    TableColumn.defaultVisibleTableColumns,
  ) as readonly {
    readonly className?: string
    readonly text?: string
  }[]

  expect(dom).not.toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewEventLineNumber',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: 'image could not be loaded',
    }),
  )
})

test('getDevtoolsDom should render simplified tool json in the payload tab', () => {
  const events = [
    {
      arguments: {
        content: 'hello',
        uri: 'file:///workspace/hello.txt',
      },
      eventId: 1,
      name: 'write_file',
      result: {
        ok: true,
      },
      sessionId: 'session-1',
      timestamp: '2026-04-10T10:00:00.000Z',
      type: 'tool-execution',
    },
  ]

  const dom = GetDevtoolsDom.getDevtoolsDom(
    events,
    events[0],
    0,
    events,
    '',
    '',
    'No events have been found',
    false,
    '',
    '',
    DetailTab.createDetailTabs('payload'),
    TableColumn.defaultVisibleTableColumns,
  ) as readonly {
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"name"',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"arguments"',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"write_file"',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"content"',
    }),
  )
})
