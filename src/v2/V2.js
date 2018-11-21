import _ from 'lodash'

import Session from './Session'
import Clients from './Clients'
import Projects from './Projects'
import TimeEntries from './TimeEntries'

export default class V2 {
  constructor(subdomain) {
    this.subdomain = subdomain
    this.authToken = null
    this.userId = null
  }

  login(user, password, appKey) {
    return Session.login(this.subdomain, {
      user, password, app_key: appKey
    }).then(data => {
      this.authToken = data.auth_token
      this.userId = data.user_id
      return data
    })
  }

  clients() {
    if (_.isEmpty(this.authToken)) {
      throw new Error('Undefined authToken. Please login')
    }

    return new Clients(this.subdomain, this.authToken)
  }

  projects() {
    if (_.isEmpty(this.authToken)) {
      throw new Error('Undefined authToken. Please login')
    }

    return new Projects(this.subdomain, this.authToken)
  }

  timeEntries() {
    if (_.isEmpty(this.authToken)) {
      throw new Error('Undefined authToken. Please login')
    }

    if (_.isEmpty(this.userId)) {
      throw new Error('Undefined user. Please login')
    }

    return new TimeEntries(this.subdomain, this.authToken, this.userId)
  }
}