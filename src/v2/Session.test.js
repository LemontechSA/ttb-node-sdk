import Moxios from 'moxios'
import Session from './Session'

describe('V2 - Session', () => {
  it('is defined', () => {
    expect(Session).toBeDefined()
  })

  describe('login()', () => {
    it('is defined', () => {
      expect(Session.login).toBeDefined()
    })

    it('is a function', () => {
      expect(typeof Session.login).toBe('function')
    })

    it('fails if required params are missing', () => {
      expect(() => {
        Session.login('5rabiits', {
          user: 'user',
        })
      }).toThrowError(Error)
    })

    it('obtains an API key', (done) => {
      Moxios.withMock(() => {
        Session.login('5rabiits', {
          user: 'user',
          password: 'password',
          app_key: 'app_key'
        }).then((data) => {
          expect(data.auth_token).toBe('this-auth-token')
          expect(data.user_id).toBe('100')
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

  describe('parameterException', () => {
    it('is defined', () => {
      expect(Session.parameterException).toBeDefined()
    })

    it('is a function', () => {
      expect(typeof Session.parameterException).toBe('function')
    })

    it('returns expected exception', () => {
      const expectedParameters = ['foo', 'bar', 'doo']
      const parameters = {foo: 'foo'}

      expect(
        Session.parameterException(parameters, expectedParameters)
      ).toBe(
        "Required parameters missing, required are foo,bar,doo but found only foo"
      )
    })
  })

  describe('validateParams()', () => {
    it('is defined', () => {
      expect(Session.validateParams).toBeDefined()
    })

    it('is a function', () => {
      expect(typeof Session.validateParams).toBe('function')
    })

    it('returns true when expected parameters are all in parameters', () => {
      const expectedParameters = ['foo', 'bar', 'doo']
      const parameters = {foo: 'foo', doo: 'doo', bar: 'bar'}

      expect(Session.validateParams(parameters, expectedParameters)).toBeTruthy()
    })

    it('returns false when expected parameters are not all in parameters', () => {
      const expectedParameters = ['foo', 'bar', 'doo']
      const parameters = {foo: 'foo'}

      expect(Session.validateParams(parameters, expectedParameters)).toBeFalsy()
    })
  })
})