import NeedsAuthentication from './NeedsAuthentication'

export default class Projects extends NeedsAuthentication{
  all(params = {}) {
    return this.apiClient().get('/projects', params)
      .then(response => response.data)
  }
}