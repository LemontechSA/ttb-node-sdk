import Moxios from 'moxios'
import Clients from './Clients'

describe('Clients', () => {
  it('is defined', () => {
    expect(Clients).toBeDefined()
  })

  describe('all()', () => {
    it('is defined', () => {
      const client = new Clients()
      expect(client.all).toBeDefined()
    })

    it('is a function', () => {
      const client = new Clients()
      expect(typeof client.all).toBe('function')
    })

    it('obtains an API key', (done) => {
      const client = new Clients('lemontech', '1234')

      Moxios.withMock(() => {
        client.all().then((data) => {
          expect(data[0].id).toBe("1")
          expect(data.length).toBe(2)
        })

        Moxios.wait(() => {
          const request = Moxios.requests.mostRecent()
          request.respondWith({
            status: 200,
            response: [
              {
                "id": "1",
                "code": "000001",
                "name": "INTELIGENCIA LTDA.",
                "group_id": null,
                "agreement_start_date": "2015-02-15",
                "active": "1",
                "created_at": "2015-03-24 22:07:21",
                "updated_at": "2017-07-31 21:30:59",
                "secondary_code": "00003",
                "default_agreement": null
              },
            {
              "id": "2",
              "code": "000002",
              "name": "NOSOTROS S.A.",
              "group_id": null,
              "agreement_start_date": "2014-03-24",
              "active": "1",
              "created_at": "2014-03-24 22:07:22",
              "updated_at": "2017-06-05 14:36:05",
              "secondary_code": "00018",
              "default_agreement": null
            }
          ]
          }).then(() => {
            done()
          })
        })
      })
    })
  })
})