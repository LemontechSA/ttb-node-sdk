import NeedsAuthentication from './NeedsAuthentication'

export default class Clients extends NeedsAuthentication{
  all(params) {
    return this.apiClient().get('/clients', params)
      .then(response => response.data)
  }
}