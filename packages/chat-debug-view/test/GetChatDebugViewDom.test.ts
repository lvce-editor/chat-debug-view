import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import * as GetChatDebugViewDom from '../src/parts/GetChatDebugViewDom/GetChatDebugViewDom.ts'

test('getChatDebugViewDom should return debug error dom when error message is set', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom('Failed to load chat debug session', '', EventCategoryFilter.All, false, false, false, true, null, '', '', [], []) as readonly {
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
  const dom = GetChatDebugViewDom.getChatDebugViewDom('', '', EventCategoryFilter.All, false, false, false, false, null, '', '', [], []) as readonly {
    readonly autocomplete?: string
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
})

test('getChatDebugViewDom should include devtools layout toggle', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom('', '', EventCategoryFilter.All, false, false, false, true, null, '', '', [], []) as readonly {
    readonly checked?: boolean
    readonly name?: string
  }[]
  const layoutToggle = dom.find((node) => node.name === 'useDevtoolsLayout')

  expect(layoutToggle).toBeDefined()
  expect(layoutToggle?.checked).toBe(true)
})

test('getChatDebugViewDom should render quick filter pills in devtools layout', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom('', '', EventCategoryFilter.All, false, false, false, true, null, '', '', [], []) as readonly {
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

test('getChatDebugViewDom should place toggles above the filter row in devtools layout', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom('', '', EventCategoryFilter.All, false, false, false, true, null, '', '', [], []) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly inputType?: string
    readonly name?: string
    readonly type?: number
  }[]

  const toggleRowIndex = dom.findIndex((node) => node.className === 'ChatDebugViewToggle')
  const filterRowIndex = dom.findIndex((node) => node.className === 'ChatDebugViewTop ChatDebugViewTop--devtools')
  const filterRow = dom[filterRowIndex]
  const quickFilterGroupIndex = dom.findIndex((node) => node.className === 'ChatDebugViewQuickFilters')
  const mainPaneIndex = dom.findIndex((node) => node.className === 'ChatDebugViewDevtoolsMain')
  const root = dom.find((node) => node.className === 'ChatDebugView ChatDebugView--devtools')

  expect(toggleRowIndex).toBeGreaterThan(-1)
  expect(filterRowIndex).toBeGreaterThan(toggleRowIndex)
  expect(quickFilterGroupIndex).toBeGreaterThan(filterRowIndex)
  expect(mainPaneIndex).toBeGreaterThan(quickFilterGroupIndex)
  expect(filterRow?.type).toBe(VirtualDomElements.Search)
  expect(dom[filterRowIndex + 1]).toEqual(
    expect.objectContaining({
      inputType: 'search',
      name: 'filter',
    }),
  )
  expect(root?.childCount).toBe(3)
})

test('getChatDebugViewDom should render the legacy filter row as a search wrapper', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom('', '', EventCategoryFilter.All, false, false, false, false, null, '', '', [], []) as readonly {
    readonly className?: string
    readonly type?: number
  }[]
  const filterRow = dom.find((node) => node.className === 'ChatDebugViewTop')

  expect(filterRow?.type).toBe(VirtualDomElements.Search)
})

test('getChatDebugViewDom should render selected details panel in devtools layout', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    EventCategoryFilter.All,
    false,
    false,
    false,
    true,
    0,
    '',
    '',
    events,
    events,
  ) as readonly {
    readonly className?: string
    readonly name?: string
  }[]
  const detailsPanel = dom.find((node) => node.className === 'ChatDebugViewDetails')
  const closeButton = dom.find((node) => node.name === 'closeDetails')

  expect(detailsPanel).toBeDefined()
  expect(closeButton).toBeDefined()
})

test('getChatDebugViewDom should not render event count message', () => {
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
  const dom = GetChatDebugViewDom.getChatDebugViewDom(
    '',
    '',
    EventCategoryFilter.All,
    false,
    false,
    false,
    false,
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
    false,
    false,
    false,
    false,
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
