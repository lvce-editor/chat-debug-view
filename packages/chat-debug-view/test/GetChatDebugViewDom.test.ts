// cspell:ignore multiselectable
import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ChatDebugStrings from '../src/parts/ChatDebugStrings/ChatDebugStrings.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import * as GetChatDebugViewDom from '../src/parts/GetChatDebugViewDom/GetChatDebugViewDom.ts'

const categoryFilters = EventCategoryFilter.createCategoryFilters()

test('getChatDebugViewDom should return debug error dom when error message is set', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    'Failed to load chat debug session',
    '',
    [EventCategoryFilter.All],
    categoryFilters,
    false,
    false,
    false,
    true,
    null,
    null,
    '',
    '',
    '',
    [],
    [],
  )

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
    [EventCategoryFilter.All],
    categoryFilters,
    false,
    false,
    false,
    false,
    null,
    null,
    '',
    '',
    '',
    [],
    [],
  )
  const filterInput = dom.find((node) => node.name === 'filter')

  expect(filterInput).toBeDefined()
  expect(filterInput?.onInput).toBe(DomEventListenerFunctions.HandleFilterInput)
  expect(filterInput?.inputType).toBe('search')
  expect(filterInput?.autocomplete).toBe('off')
  expect(filterInput?.className).toBe('InputBox ChatDebugViewFilterInput')
})

test('getChatDebugViewDom should not include top checkbox controls', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    [EventCategoryFilter.All],
    categoryFilters,
    false,
    false,
    false,
    true,
    null,
    null,
    '',
    '',
    '',
    [],
    [],
  )
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
    [EventCategoryFilter.All],
    categoryFilters,
    false,
    false,
    false,
    true,
    null,
    null,
    '',
    '',
    '',
    [],
    [],
  )

  expect(dom).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugView ChatDebugView--devtools',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: 'ChatDebugViewTop ChatDebugViewTop--devtools',
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.Search,
    },
    {
      autocomplete: 'off',
      childCount: 0,
      className: 'InputBox ChatDebugViewFilterInput ChatDebugViewFilterInput--devtools',
      inputType: 'search',
      name: 'filter',
      onInput: DomEventListenerFunctions.HandleFilterInput,
      placeholder: ChatDebugStrings.filterEvents(),
      type: VirtualDomElements.Input,
      value: '',
    },
    {
      'aria-multiselectable': true,
      childCount: 5,
      className: 'ChatDebugViewQuickFilters',
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'listbox',
      type: VirtualDomElements.Div,
    },
    {
      ariaSelected: true,
      childCount: 1,
      className: 'ChatDebugViewQuickFilterPill ChatDebugViewQuickFilterPillSelected',
      name: EventCategoryFilter.All,
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'option',
      type: VirtualDomElements.Button,
    },
    text(ChatDebugStrings.all()),
    {
      ariaSelected: false,
      childCount: 1,
      className: 'ChatDebugViewQuickFilterPill',
      name: EventCategoryFilter.Tools,
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'option',
      type: VirtualDomElements.Button,
    },
    text(ChatDebugStrings.tools()),
    {
      ariaSelected: false,
      childCount: 1,
      className: 'ChatDebugViewQuickFilterPill',
      name: EventCategoryFilter.Network,
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'option',
      type: VirtualDomElements.Button,
    },
    text(ChatDebugStrings.network()),
    {
      ariaSelected: false,
      childCount: 1,
      className: 'ChatDebugViewQuickFilterPill',
      name: EventCategoryFilter.Ui,
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'option',
      type: VirtualDomElements.Button,
    },
    text(ChatDebugStrings.ui()),
    {
      ariaSelected: false,
      childCount: 1,
      className: 'ChatDebugViewQuickFilterPill',
      name: EventCategoryFilter.Stream,
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'option',
      type: VirtualDomElements.Button,
    },
    text(ChatDebugStrings.stream()),
    {
      'aria-label': ChatDebugStrings.refreshEvents(),
      childCount: 1,
      className: 'ChatDebugViewRefreshButton',
      name: 'refresh',
      onClick: DomEventListenerFunctions.HandleClickRefresh,
      type: VirtualDomElements.Button,
      value: 'refresh',
    },
    text(ChatDebugStrings.refresh()),
    {
      childCount: 1,
      className: 'ChatDebugViewDevtoolsSplit',
      role: 'none',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewEvents ChatDebugViewEventsFullWidth',
      role: 'application',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewEmpty',
      type: VirtualDomElements.Div,
    },
    text(ChatDebugStrings.noEventsFound()),
  ])
})

test('getChatDebugViewDom should render dedicated empty message for tools quick filter', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    [EventCategoryFilter.Tools],
    categoryFilters,
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
  )

  const emptyState = dom.find((node) => node.className === 'ChatDebugViewEmpty')
  const emptyStateText = dom.find((node) => node.text === 'No tool call events.')

  expect(emptyState).toBeDefined()
  expect(emptyStateText).toBeDefined()
})

test('getChatDebugViewDom should place the filter row before the main pane in devtools layout', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    [EventCategoryFilter.All],
    categoryFilters,
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
  )

  const filterRowIndex = dom.findIndex((node) => node.className === 'ChatDebugViewTop ChatDebugViewTop--devtools')
  const filterRow = dom[filterRowIndex]
  const quickFilterGroupIndex = dom.findIndex((node) => node.className === 'ChatDebugViewQuickFilters')
  const splitPaneIndex = dom.findIndex((node) => node.className === 'ChatDebugViewDevtoolsSplit')
  const root = dom.find((node) => node.className === 'ChatDebugView ChatDebugView--devtools')

  expect(filterRowIndex).toBeGreaterThan(-1)
  expect(quickFilterGroupIndex).toBeGreaterThan(filterRowIndex)
  expect(splitPaneIndex).toBeGreaterThan(quickFilterGroupIndex)
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

test('getChatDebugViewDom should expose timeline and split as direct devtools children when timeline is visible', () => {
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
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    [EventCategoryFilter.All],
    categoryFilters,
    false,
    false,
    false,
    true,
    events[0],
    0,
    '',
    '',
    '',
    events,
    events,
  )
  const root = dom.find((node) => node.className === 'ChatDebugView ChatDebugView--devtools')
  const timelineIndex = dom.findIndex((node) => node.className === 'ChatDebugViewTimeline')
  const splitPaneIndex = dom.findIndex((node) => node.className === 'ChatDebugViewDevtoolsSplit')

  expect(root?.childCount).toBe(3)
  expect(timelineIndex).toBeGreaterThan(-1)
  expect(splitPaneIndex).toBeGreaterThan(timelineIndex)
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
    [EventCategoryFilter.All],
    categoryFilters,
    false,
    false,
    false,
    true,
    events[0],
    0,
    '',
    '',
    '',
    events,
    events,
  )
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
  expect(dom[detailsTopIndex + 3]).toEqual(
    expect.objectContaining({
      'aria-label': 'Detail sections',
      className: 'ChatDebugViewDetailsTabs',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewDetailsTab ChatDebugViewDetailsTabSelected',
      name: 'response',
      onClick: DomEventListenerFunctions.SelectDetailTab,
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
      [EventCategoryFilter.All],
      categoryFilters,
      false,
      false,
      false,
      true,
      null,
      null,
      '',
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
    [EventCategoryFilter.All],
    categoryFilters,
    false,
    false,
    false,
    false,
    null,
    null,
    '',
    '',
    '',
    events,
    events,
  )

  const eventCount = dom.find((node) => node.className === 'ChatDebugViewEventCount')
  const eventCountText = dom.find((node) => node.text === '2 events')

  expect(eventCount).toBeUndefined()
  expect(eventCountText).toBeUndefined()
})

test('getChatDebugViewDom should render table summary status in devtools layout', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:00.250Z',
      eventId: 1,
      sessionId: 'session-1',
      started: '2026-03-08T00:00:00.000Z',
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
    [EventCategoryFilter.All],
    categoryFilters,
    false,
    false,
    false,
    true,
    null,
    null,
    '',
    '',
    '',
    events,
    events,
  )
  const tableWrapperIndex = dom.findIndex((node) => node.className === 'TableWrapper')
  const summaryIndex = dom.findIndex((node) => node.className === 'TableSummary')

  expect(summaryIndex).toBeGreaterThan(tableWrapperIndex)
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'TableSummary',
      role: 'status',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '2 events, 1s from start to finish',
    }),
  )
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
    [EventCategoryFilter.All],
    categoryFilters,
    false,
    false,
    false,
    false,
    null,
    null,
    '',
    '',
    '',
    events,
    events,
  )

  expect(dom).toContainEqual(
    expect.objectContaining({
      text: '"tool-execution, getWorkspaceUri"',
    }),
  )
})
