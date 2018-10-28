import Moxios from 'moxios'
import Projects from './Projects'

describe('Projects', () => {
  it('is defined', () => {
    expect(Projects).toBeDefined()
  })

  describe('all()', () => {
    it('is defined', () => {
      const project = new Projects()
      expect(project.all).toBeDefined()
    })

    it('is a function', () => {
      const project = new Projects()
      expect(typeof project.all).toBe('function')
    })

    it('obtains an API key', (done) => {
      const project = new Projects('lemontech', '1234')

      Moxios.withMock(() => {
        project.all().then((data) => {
          expect(data[0].id).toBe("57")
          expect(data.length).toBe(2)
        })

        Moxios.wait(() => {
          const request = Moxios.requests.mostRecent()
          request.respondWith({
            status: 200,
            response: [
              {
                "id": "57",
                "code": "000073-0001",
                "name": "SALUD",
                "active": "1",
                "client_id": "73",
                "project_area_id": "29",
                "project_type_id": "1",
                "agreement_id": "839",
                "language_code": "es",
                "language_name": "Español",
                "created_at": "2014-06-03 11:58:46",
                "updated_at": "2017-09-04 17:24:12",
                "currency_code": "COLP",
                "has_custom_agreement": "0"
              },
              {
                "id": "6374",
                "code": "000073-9346",
                "name": "LIBERAR MENTE DE CAPRICHITOS",
                "active": "1",
                "client_id": "73",
                "project_area_id": "26",
                "project_type_id": "2",
                "agreement_id": "3527",
                "language_code": "es",
                "language_name": "Español",
                "created_at": "2017-09-04 18:03:00",
                "updated_at": null,
                "currency_code": "COLP",
                "has_custom_agreement": "0"
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