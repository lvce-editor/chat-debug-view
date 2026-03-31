import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import * as GetChatDebugViewDom from '../src/parts/GetChatDebugViewDom/GetChatDebugViewDom.ts'

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

test('getChatDebugViewDom should render selected details panel in devtools layout', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]
  const dom = GetChatDebugViewDom.getChatDebugViewDom('', '', EventCategoryFilter.All, false, false, false, true, 0, '', '', events, events) as readonly {
    readonly className?: string
    readonly name?: string
  }[]
  const detailsPanel = dom.find((node) => node.className === 'ChatDebugViewDetails')
  const closeButton = dom.find((node) => node.name === 'closeDetails')

  expect(detailsPanel).toBeDefined()
  expect(closeButton).toBeDefined()
})
