import { diffFromNowInSecs, toReadableDate } from '@/utils'

const now = 1687322898041
beforeAll(() => {
  vi.useFakeTimers()
  vi.setSystemTime(now)
})

// expect(Date.now()).toBe(date.valueOf())

afterAll(() => {
  vi.useRealTimers()
})

describe('datetime utils', () => {
  it.each([
    { input: 1687322898046, expected: '06/20/2023' },
    { input: 9999999999999, expected: '11/20/2286' },
    { input: 0, expected: null },
  ])(
    'converts a UNIX timestamp $input into a readable MM/DD/YYYY date $expected',
    ({ input, expected }) => {
      const actual = toReadableDate(input)
      expect(expected).toEqual(actual)
    },
  )

  it.each([
    { input: 1687322838041, expected: 60 },
    { input: 1687322298041, expected: 600 },
    { input: 1687316298041, expected: 6600 },
    { input: 1687328898041, expected: -6000 },
    { input: -1, expected: 1687322898 },
  ])(
    'computes the difference between the given date $input in seconds as $expected',
    ({ input, expected }) => {
      const actual = diffFromNowInSecs(input)
      expect(expected).toEqual(actual)
    },
  )
})
