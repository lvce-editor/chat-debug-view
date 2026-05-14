import { expect, test } from '@jest/globals'
import { indent } from '../src/parts/Indent/Indent.ts'

test('indent should prefix each line with the requested spaces', () => {
  expect(indent('first\nsecond', 2)).toBe('  first\n  second')
})
