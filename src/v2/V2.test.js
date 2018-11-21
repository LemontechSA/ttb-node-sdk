import Moxios from 'moxios'
import V2 from './V2'

describe('V2', () => {
  describe('login()', () => {
    it('is defined', () => {
      const v2 = new V2('lemontech')
      expect(v2.login).toBeDefined()
    })

    it('is a function', () => {
      const v2 = new V2('lemontech')
      expect(typeof v2.login).toBe('function')
    })

    it('sets authToken in instance when called', (done) => {
      Moxios.withMock(() => {
        const v2 = new V2('lemontech')
        expect(v2.authToken).toBeNull()
        v2.login('username', 'passsword', 'app_key')
          .then(() => {
            expect(v2.authToken).not.toBeNull()
            expect(v2.authToken).toBe('this-auth-token')
          })

        Moxios.wait(() => {
          const request = Moxios.requests.mostRecent()
          request.respondWith({
            status: 200,
            response: {
              auth_token: 'this-auth-token',
              user_id: '100'
            }
          }).then(() => {
            done()
          })
        })
      })
    })
  })

  describe('clients()', () => {
    it('is defined', () => {
      const v2 = new V2('lemontech')
      expect(v2.clients).toBeDefined()
    })

    it('is a function', () => {
      const v2 = new V2('lemontech')
      expect(typeof v2.clients).toBe('function')
    })

    it('throws an error when calling and authtoken is null', () => {
      const v2 = new V2('lemontech')
      expect(() => v2.clients()).toThrow()
    })

    it('return an instance when authtoken is defined', () => {
      const v2 = new V2('lemontech')
      v2.authToken = '12345'
      expect(typeof v2.clients()).toBe('object')
    })
  })

  describe('projects()', () => {
    it('is defined', () => {
      const v2 = new V2('lemontech')
      expect(v2.projects).toBeDefined()
    })

    it('is a function', () => {
      const v2 = new V2('lemontech')
      expect(typeof v2.projects).toBe('function')
    })

    it('throws an error when calling and authtoken is null', () => {
      const v2 = new V2('lemontech')
      expect(() => v2.projects()).toThrow()
    })

    it('return an instance when authtoken is defined', () => {
      const v2 = new V2('lemontech')
      v2.authToken = '12345'
      expect(typeof v2.projects()).toBe('object')
    })
  })

  describe('timeEntries()', () => {
    it('is defined', () => {
      const v2 = new V2('lemontech')
      expect(v2.timeEntries).toBeDefined()
    })

    it('is a function', () => {
      const v2 = new V2('lemontech')
      expect(typeof v2.timeEntries).toBe('function')
    })

    it('throws an error when calling and authtoken is null', () => {
      const v2 = new V2('lemontech')
      expect(() => v2.timeEntries()).toThrow()
    })

    it('throws an error when only authtoken is defined', () => {
      const v2 = new V2('lemontech')
      v2.authToken = '12345'
      expect(() => v2.timeEntries()).toThrow()
    })

    it('throws an error when only userId is defined', () => {
      const v2 = new V2('lemontech')
      v2.userId = '12345'
      expect(() => v2.timeEntries()).toThrow()
    })

    it('return an instance when authtoken and userId is defined', () => {
      const v2 = new V2('lemontech')
      v2.authToken = '12345'
      v2.userId = '12345'
      expect(typeof v2.timeEntries()).toBe('object')
    })
  })
})