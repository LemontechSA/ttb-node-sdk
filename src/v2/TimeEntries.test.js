import Moxios from 'moxios'
import TimeEntries from './TimeEntries'

describe('TimeEntries', () => {
  it('is defined', () => {
    expect(TimeEntries).toBeDefined()
  })

  describe('baseEndpoint', () => {
    it('is defined', () => {
      const timeEntries = new TimeEntries()
      expect(timeEntries.baseEndpoint).toBeDefined()
    })

    it('should return a well formed endpoint', () => {
      const timeEntries = new TimeEntries('lemontech', '1234', '14')
      expect(timeEntries.baseEndpoint()).toBe('users/14/time_entries')
    })
  })

  describe('all()', () => {
    it('is defined', () => {
      const timeEntries = new TimeEntries()
      expect(timeEntries.all).toBeDefined()
    })

    it('is a function', () => {
      const timeEntries = new TimeEntries()
      expect(typeof timeEntries.all).toBe('function')
    })

    it('obtains an API key', done => {
      const timeEntries = new TimeEntries('lemontech', '1234')

      Moxios.withMock(() => {
        timeEntries.all().then(data => {
          expect(data[0].id).toBe(100)
          expect(data.length).toBe(1)
        })

        Moxios.wait(() => {
          const request = Moxios.requests.mostRecent()
          request
            .respondWith({
              status: 200,
              response: [
                {
                  id: 100,
                  date: '121283477',
                  string_date: '2015-04-10',
                  created_at: '121283477',
                  string_created_at: '2015-04-10',
                  duration: 120,
                  description: 'writing a letter',
                  user_id: 1,
                  billable: 1,
                  visible: 1,
                  read_only: 0,
                  client_id: 1,
                  project_id: 2,
                  activity_id: 3,
                  area_id: 4,
                  task_id: 5,
                  requester: 'Mario Lavandero',
                  project: {
                    id: 2,
                    code: '0001-0002',
                    name: 'Asesorías Financieras',
                    active: 1,
                    client_id: 1,
                    project_area_id: 1,
                    project_type_id: 1,
                    language_code: 'es',
                    language_name: 'Español',
                  },
                  agreement_rate: {
                    amount: '4.5',
                    currency_id: '3',
                  },
                  standard_rate: {
                    amount: '2.5',
                    currency_id: '3',
                  },
                },
              ],
            })
            .then(() => {
              done()
            })
        })
      })
    })
  })
})
