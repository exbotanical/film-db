import { date, required } from '@/utils/form'

const TEST_MESSAGE = 'test'

describe('form validator functions', () => {
  it.each([
    { val: '', expected: TEST_MESSAGE },
    { val: ' ', expected: true },
    { val: 'val', expected: true },
    { val: null, expected: TEST_MESSAGE },
  ])('enforces the required rule', ({ val, expected }) => {
    const rule = required(TEST_MESSAGE)
    expect(rule(val)).toEqual(expected)
  })

  it.each([
    { val: '', expected: TEST_MESSAGE },
    { val: ' ', expected: TEST_MESSAGE },
    { val: 'val', expected: TEST_MESSAGE },
    { val: null, expected: TEST_MESSAGE },
    { val: '10-10-2020', expected: true },
    { val: '10/10/2020', expected: true },
  ])('enforces the date rule', ({ val, expected }) => {
    const rule = date(TEST_MESSAGE)
    expect(rule(val)).toEqual(expected)
  })
})
