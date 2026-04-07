import { expect, test } from '@jest/globals'
import { TokenBoolean, TokenKey, TokenNumeric, TokenString, TokenText } from '../src/parts/ClassNames/ClassNames.ts'
import { getTokenSegments } from '../src/parts/GetTokenSegments/GetTokenSegments.ts'

test('getTokenSegments should classify keys even when whitespace appears before the colon', () => {
  const result = getTokenSegments('{"name" : "value"}')

  expect(result).toEqual([
    {
      className: TokenText,
      value: '{',
    },
    {
      className: TokenKey,
      value: '"name"',
    },
    {
      className: TokenText,
      value: ' : ',
    },
    {
      className: TokenString,
      value: '"value"',
    },
    {
      className: TokenText,
      value: '}',
    },
  ])
})

test('getTokenSegments should keep escaped quotes inside string tokens', () => {
  const result = getTokenSegments('{"message":"say \\"hi\\""}')

  expect(result).toEqual([
    {
      className: TokenText,
      value: '{',
    },
    {
      className: TokenKey,
      value: '"message"',
    },
    {
      className: TokenText,
      value: ':',
    },
    {
      className: TokenString,
      value: '"say \\"hi\\""',
    },
    {
      className: TokenText,
      value: '}',
    },
  ])
})

test('getTokenSegments should parse negative, decimal, and exponent numbers', () => {
  const result = getTokenSegments('[-12.5e+3,0,42.75]')

  expect(result).toEqual([
    {
      className: TokenText,
      value: '[',
    },
    {
      className: TokenNumeric,
      value: '-12.5e+3',
    },
    {
      className: TokenText,
      value: ',',
    },
    {
      className: TokenNumeric,
      value: '0',
    },
    {
      className: TokenText,
      value: ',',
    },
    {
      className: TokenNumeric,
      value: '42.75',
    },
    {
      className: TokenText,
      value: ']',
    },
  ])
})

test('getTokenSegments should classify booleans and null separately from surrounding punctuation', () => {
  const result = getTokenSegments('[true,false,null]')

  expect(result).toEqual([
    {
      className: TokenText,
      value: '[',
    },
    {
      className: TokenBoolean,
      value: 'true',
    },
    {
      className: TokenText,
      value: ',',
    },
    {
      className: TokenBoolean,
      value: 'false',
    },
    {
      className: TokenText,
      value: ',',
    },
    {
      className: TokenBoolean,
      value: 'null',
    },
    {
      className: TokenText,
      value: ']',
    },
  ])
})
