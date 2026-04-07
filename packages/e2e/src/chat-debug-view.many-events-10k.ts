import { createLargeStoredEventsTest } from './parts/CreateLargeStoredEventsTest/CreateLargeStoredEventsTest.ts'

export const name = 'chat-debug-view.many-events-10k'

export const test = createLargeStoredEventsTest(10_000)
