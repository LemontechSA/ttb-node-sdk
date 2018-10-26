import TimeBilling from './TimeBilling'

describe('TimeBilling', () => {
  it('is not null', () => {
    expect(TimeBilling).not.toBeNull()
  })

  describe('V2', () => {
    it('is defined', () => {
      expect(TimeBilling.V2).toBeDefined()
    })

    describe('Session', () => {
      it('respond correctly', () => {
        expect(TimeBilling.V2.Session).toBeDefined()
      })

      it('type is function', () => {
        expect(typeof TimeBilling.V2.Session).toBe('function')
      })
    })
  })
})