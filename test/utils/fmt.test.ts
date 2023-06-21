import { maybeApply } from '@/utils'

describe('formatting utils', () => {
  it('applies the formatting function if the input is defined', () => {
    expect(2).toEqual(maybeApply((n: number) => n + 1, 1))
  })

  it('does not apply the formatting function if the input is undefined', () => {
    expect(undefined).toEqual(maybeApply((n: number) => n + 1, undefined))
  })
})
