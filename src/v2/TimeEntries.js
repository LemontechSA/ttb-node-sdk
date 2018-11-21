import NeedsAuthentication from './NeedsAuthentication'

export default class TimeEntries extends NeedsAuthentication {
  constructor(subdomain, authToken, userId) {
    super(subdomain, authToken)
    this.userId = userId
  }

  baseEndpoint() {
    return `users/${this.userId}/time_entries`
  }

  all(params = {}) {
    return this.apiClient().get(this.baseEndpoint(), params)
      .then(response => response.data)
  }
}