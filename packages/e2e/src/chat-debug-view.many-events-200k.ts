import { createLargeStoredEventsTest } from './parts/CreateLargeStoredEventsTest/CreateLargeStoredEventsTest.ts'

export const name = 'chat-debug-view.many-events-200k'

export const test = createLargeStoredEventsTest(200_000)
