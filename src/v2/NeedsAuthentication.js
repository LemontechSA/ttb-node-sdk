import Axios from 'axios'

import Constants from './Constants'

export default class NeedsAuthentication {
  constructor(subdomain, authToken) {
    this.authToken = authToken
    this.subdomain = subdomain
  }

  apiClient() {
    return Axios.create({
      baseURL: `${Constants.baseUrl(this.subdomain)}`,
      headers: {
        common: {
          AUTHTOKEN: this.authToken
        }
      }
    })
  }
}