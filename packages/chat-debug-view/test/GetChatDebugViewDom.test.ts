import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import * as GetChatDebugViewDom from '../src/parts/GetChatDebugViewDom/GetChatDebugViewDom.ts'

const eventCategoryFilterOptions = EventCategoryFilter.createEventCategoryFilterOptions()

test('getChatDebugViewDom should return debug error dom when error message is set', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    'Failed to load chat debug session',
    '',
    EventCategoryFilter.All,
    eventCategoryFilterOptions,
    false,
    false,
    false,
    true,
    null,
    null,
    '',
    '',
    [],
    [],
  ) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly text?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugView',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewError',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Failed to load chat debug session',
      type: 12,
    },
  ])
})

test('getChatDebugViewDom should wire filter input to filter input listener', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    EventCategoryFilter.All,
    eventCategoryFilterOptions,
    false,
    false,
    false,
    false,
    null,
    null,
    '',
    '',
    [],
    [],
  ) as readonly {
    readonly autocomplete?: string
    readonly className?: string
    readonly inputType?: string
    readonly name?: string
    readonly onInput?: number
  }[]
  const filterInput = dom.find((node) => node.name === 'filter')

  expect(filterInput).toBeDefined()
  // @ts-ignore
  expect(filterInput.onInput).toBe(DomEventListenerFunctions.HandleFilterInput)
  // @ts-ignore
  expect(filterInput.inputType).toBe('search')
  // @ts-ignore
  expect(filterInput.autocomplete).toBe('off')
  expect(filterInput?.className).toBe('InputBox ChatDebugViewFilterInput')
})

test('getChatDebugViewDom should not include top checkbox controls', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    EventCategoryFilter.All,
    eventCategoryFilterOptions,
    false,
    false,
    false,
    true,
    null,
    null,
    '',
    '',
    [],
    [],
  ) as readonly {
    readonly checked?: boolean
    readonly name?: string
  }[]
  const names = dom.map((node) => node.name).filter(Boolean)

  expect(names).not.toContain('showEventStreamFinishedEvents')
  expect(names).not.toContain('showInputEvents')
  expect(names).not.toContain('showResponsePartEvents')
  expect(names).not.toContain('useDevtoolsLayout')
})

test('getChatDebugViewDom should render quick filter pills in devtools layout', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    EventCategoryFilter.All,
    eventCategoryFilterOptions,
    false,
    false,
    false,
    true,
    null,
    null,
    '',
    '',
    [],
    [],
  ) as readonly {
    readonly checked?: boolean
    readonly className?: string
    readonly name?: string
    readonly value?: string
  }[]
  const quickFilterGroup = dom.find((node) => node.className === 'ChatDebugViewQuickFilters')
  const allFilter = dom.find((node) => node.name === 'eventCategoryFilter' && node.value === EventCategoryFilter.All)
  const toolsFilter = dom.find((node) => node.name === 'eventCategoryFilter' && node.value === EventCategoryFilter.Tools)

  expect(quickFilterGroup).toBeDefined()
  expect(allFilter?.checked).toBe(true)
  expect(toolsFilter?.checked).toBe(false)
})

test('getChatDebugViewDom should render dedicated empty message for tools quick filter', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    EventCategoryFilter.Tools,
    eventCategoryFilterOptions,
    false,
    false,
    false,
    true,
    null,
    null,
    '',
    '',
    [],
    [],
  ) as readonly {
    readonly className?: string
    readonly text?: string
  }[]

  const emptyState = dom.find((node) => node.className === 'ChatDebugViewEmpty')
  const emptyStateText = dom.find((node) => node.text === 'No tool call events.')

  expect(emptyState).toBeDefined()
  expect(emptyStateText).toBeDefined()
})

test('getChatDebugViewDom should place the filter row before the main pane in devtools layout', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    EventCategoryFilter.All,
    eventCategoryFilterOptions,
    false,
    false,
    false,
    true,
    null,
    null,
    '',
    '',
    [],
    [],
  ) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly inputType?: string
    readonly name?: string
    readonly type?: number
  }[]

  const filterRowIndex = dom.findIndex((node) => node.className === 'ChatDebugViewTop ChatDebugViewTop--devtools')
  const filterRow = dom[filterRowIndex]
  const quickFilterGroupIndex = dom.findIndex((node) => node.className === 'ChatDebugViewQuickFilters')
  const mainPaneIndex = dom.findIndex((node) => node.className === 'ChatDebugViewDevtoolsMain')
  const root = dom.find((node) => node.className === 'ChatDebugView ChatDebugView--devtools')

  expect(filterRowIndex).toBeGreaterThan(-1)
  expect(quickFilterGroupIndex).toBeGreaterThan(filterRowIndex)
  expect(mainPaneIndex).toBeGreaterThan(quickFilterGroupIndex)
  expect(filterRow?.type).toBe(VirtualDomElements.Search)
  expect(dom[filterRowIndex + 1]).toEqual(
    expect.objectContaining({
      className: 'InputBox ChatDebugViewFilterInput ChatDebugViewFilterInput--devtools',
      inputType: 'search',
      name: 'filter',
    }),
  )
  expect(root?.childCount).toBe(2)
})

test('getChatDebugViewDom should render selected details panel in devtools layout', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    EventCategoryFilter.All,
    eventCategoryFilterOptions,
    false,
    false,
    false,
    true,
    events[0],
    0,
    '',
    '',
    events,
    events,
  ) as readonly {
    readonly ['aria-label']?: string
    readonly className?: string
    readonly name?: string
  }[]
  const detailsPanel = dom.find((node) => node.className === 'ChatDebugViewDetails')
  const detailsTopIndex = dom.findIndex((node) => node.className === 'ChatDebugViewDetailsTop')

  expect(detailsPanel).toBeDefined()
  expect(detailsTopIndex).toBeGreaterThan(-1)
  expect(dom[detailsTopIndex + 1]).toEqual(
    expect.objectContaining({
      className: 'ChatDebugViewDetailsClose',
      name: 'closeDetails',
    }),
  )
  expect(dom[detailsTopIndex + 2]).toEqual(
    expect.objectContaining({
      'aria-label': 'Detail sections',
      className: 'ChatDebugViewDetailsTabs',
    }),
  )
})

test('getChatDebugViewDom should not stringify unselected events in devtools layout', () => {
  const circularEvent: {
    readonly eventId: number
    readonly sessionId: string
    readonly timestamp: string
    readonly type: string
    self?: unknown
  } = {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }
  circularEvent.self = circularEvent

  expect(() =>
    GetChatDebugViewDom.getChatDebugViewDom(
      '',
      '',
      EventCategoryFilter.All,
      eventCategoryFilterOptions,
      false,
      false,
      false,
      true,
      null,
      null,
      '',
      '',
      [circularEvent],
      [circularEvent],
    ),
  ).not.toThrow()
})

test('getChatDebugViewDom should not render event count message', () => {
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
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    EventCategoryFilter.All,
    eventCategoryFilterOptions,
    false,
    false,
    false,
    false,
    null,
    null,
    '',
    '',
    events,
    events,
  ) as readonly {
    readonly className?: string
    readonly text?: string
  }[]

  const eventCount = dom.find((node) => node.className === 'ChatDebugViewEventCount')
  const eventCountText = dom.find((node) => node.text === '2 events')

  expect(eventCount).toBeUndefined()
  expect(eventCountText).toBeUndefined()
})

test('getChatDebugViewDom should render tool execution type with tool name in legacy layout', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      toolName: 'getWorkspaceUri',
      type: 'tool-execution',
    },
  ]
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    EventCategoryFilter.All,
    eventCategoryFilterOptions,
    false,
    false,
    false,
    false,
    null,
    null,
    '',
    '',
    events,
    events,
  ) as readonly {
    readonly text?: string
  }[]

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"tool-execution, getWorkspaceUri"',
    }),
  )
})
