import Constants from './Constants'

describe('V2 - Constants', () => {
  describe('baseUrl', () => {
    it('is defined', () => {
      expect(Constants.baseUrl).toBeDefined()
    })

    it('is a function', () => {
      expect(typeof Constants.baseUrl).toBe('function')
    })

    it('generates a tenant url correctly', () => {
      expect(Constants.baseUrl('lemontech')).toBe('https://lemontech.thetimebilling.com/time_tracking/api/v2')
    })
  })
})