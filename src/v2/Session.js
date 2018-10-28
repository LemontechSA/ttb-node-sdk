import Axios from 'axios'
import _ from 'lodash'

import Constants from './Constants'

export default class Session {
  static login(subdomain, params) {
    const requiredParams = ['user', 'password', 'app_key']

    if (!this.validateParams(params, requiredParams)) {
      throw new Error(this.parameterException(params, requiredParams))
    }

    return Axios.post(`${Constants.baseUrl(subdomain)}/login`, {
      user: params.user,
      password: params.password,
      app_key: params.app_key
    })
    .then(response => response.data)
    .catch(reason => {
      console.log(reason)
    })
  }

  static validateParams(params, requiredParams) {
    return _.intersection(
      _.keys(params),
      requiredParams
    ).length === requiredParams.length
  }

  static parameterException(params, requiredParams) {
    return `Required parameters missing, required are ${requiredParams} but found only ${_.keys(params)}`
  }
}