import { createLargeStoredEventsTest } from './parts/CreateLargeStoredEventsTest/CreateLargeStoredEventsTest.ts'

export const name = 'chat-debug-view.many-events-100'

export const test = createLargeStoredEventsTest(100)
