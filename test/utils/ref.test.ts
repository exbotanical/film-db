import { copy } from '@/utils/ref'

describe('ref utils', () => {
  it('copies an object by value', () => {
    const obj = { a: 1 }
    const cp = copy(obj)
    cp.a = 12

    expect(1).toEqual(obj.a)
  })
})
