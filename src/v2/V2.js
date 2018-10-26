import _ from 'lodash'

import Session from './Session'
import Clients from './Clients'
import Projects from './Projects'

export default class V2 {
  constructor(subdomain) {
    this.subdomain = subdomain
    this.authToken = null
  }

  login(user, password, appKey) {
    return Session.login(this.subdomain, {
      user, password, app_key: appKey
    }).then(data => {
      this.authToken = data.auth_token
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
}