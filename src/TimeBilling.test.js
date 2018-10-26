import TimeBilling from './TimeBilling'

describe('TimeBilling', () => {
  it('is not null', () => {
    expect(TimeBilling).not.toBeNull()
  })

  describe('V2', () => {
    it('is defined', () => {
      expect(TimeBilling.V2).toBeDefined()
    })

    it('is a function', () => {
      expect(typeof TimeBilling.V2).toBeDefined()
    })

    it('responds an instance', () => {
      const V2 = TimeBilling.V2('lemontech')
      expect(V2).toBeDefined()
      expect(typeof V2).toBe('object')
    })
  })
})