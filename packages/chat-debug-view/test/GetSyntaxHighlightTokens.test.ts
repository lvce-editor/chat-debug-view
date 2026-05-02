import { expect, test } from '@jest/globals'
import {
  TokenAttributeName,
  TokenComment,
  TokenKey,
  TokenKeyword,
  TokenNumeric,
  TokenPropertyName,
  TokenSelector,
  TokenString,
  TokenTag,
} from '../src/parts/ClassNames/ClassNames.ts'
import { getSyntaxHighlightTokens } from '../src/parts/GetSyntaxHighlightTokens/GetSyntaxHighlightTokens.ts'

test('getSyntaxHighlightTokens should highlight javascript', () => {
  const result = getSyntaxHighlightTokens('const answer = 42 // done', 'javascript')

  expect(result).toEqual([
    {
      className: TokenKeyword,
      value: 'const',
    },
    {
      className: 'Token TokenText',
      value: ' answer = ',
    },
    {
      className: TokenNumeric,
      value: '42',
    },
    {
      className: 'Token TokenText',
      value: ' ',
    },
    {
      className: TokenComment,
      value: '// done',
    },
  ])
})

test('getSyntaxHighlightTokens should highlight typescript', () => {
  const result = getSyntaxHighlightTokens('interface Person { age: number }', 'typescript')

  expect(result).toEqual([
    {
      className: TokenKeyword,
      value: 'interface',
    },
    {
      className: 'Token TokenText',
      value: ' Person { age: ',
    },
    {
      className: TokenKeyword,
      value: 'number',
    },
    {
      className: 'Token TokenText',
      value: ' }',
    },
  ])
})

test('getSyntaxHighlightTokens should highlight css', () => {
  const result = getSyntaxHighlightTokens('.item { color: red; width: 10px; }', 'css')

  expect(result).toEqual([
    {
      className: TokenSelector,
      value: '.item',
    },
    {
      className: 'Token TokenText',
      value: ' { ',
    },
    {
      className: TokenPropertyName,
      value: 'color',
    },
    {
      className: 'Token TokenText',
      value: ': red; ',
    },
    {
      className: TokenPropertyName,
      value: 'width',
    },
    {
      className: 'Token TokenText',
      value: ': ',
    },
    {
      className: TokenNumeric,
      value: '10',
    },
    {
      className: 'Token TokenText',
      value: 'px; }',
    },
  ])
})

test('getSyntaxHighlightTokens should highlight html', () => {
  const result = getSyntaxHighlightTokens('<div class="hero">Hello</div>', 'html')

  expect(result).toEqual([
    {
      className: TokenTag,
      value: '<div',
    },
    {
      className: 'Token TokenText',
      value: ' ',
    },
    {
      className: TokenAttributeName,
      value: 'class',
    },
    {
      className: 'Token TokenText',
      value: '=',
    },
    {
      className: TokenString,
      value: '"hero"',
    },
    {
      className: 'Token TokenText',
      value: '>Hello',
    },
    {
      className: TokenTag,
      value: '</div>',
    },
  ])
})

test('getSyntaxHighlightTokens should highlight json with existing token classes', () => {
  const result = getSyntaxHighlightTokens('{"ok": true}', 'json')

  expect(result).toEqual([
    {
      className: 'Token TokenText',
      value: '{',
    },
    {
      className: TokenKey,
      value: '"ok"',
    },
    {
      className: 'Token TokenText',
      value: ': ',
    },
    {
      className: 'Token TokenBoolean',
      value: 'true',
    },
    {
      className: 'Token TokenText',
      value: '}',
    },
  ])
})

test('getSyntaxHighlightTokens should highlight python', () => {
  const result = getSyntaxHighlightTokens('def greet(name):\n    return "hi"', 'python')

  expect(result).toEqual([
    {
      className: TokenKeyword,
      value: 'def',
    },
    {
      className: 'Token TokenText',
      value: ' greet(name):\n    ',
    },
    {
      className: TokenKeyword,
      value: 'return',
    },
    {
      className: 'Token TokenText',
      value: ' ',
    },
    {
      className: TokenString,
      value: '"hi"',
    },
  ])
})