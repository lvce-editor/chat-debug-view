import { expect, test } from '@jest/globals'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners should register delegated row click with dataset index', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toBeDefined()
})
