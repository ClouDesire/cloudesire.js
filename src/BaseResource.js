'use strict'

import BaseResponse from './BaseResponse'
import BaseArrayResponse from './BaseArrayResponse'

/** Class representing a base resource. */
export default class BaseResource {
  constructor(self) {
    this.self = self
    this.baseUrl = this.self.baseUrl
  }

  /**
  a quite wonderful function
  @param {object} - privacy gown
  @param {object} - security
  @returns {survival}
  */
  retrieve(id) {
    return this._get(this.path, id)
  }

  //////////////////////////////////////////////////////////////////////////////

  _get(path, id, params) {
    return this._wrap(this.self.request(this._buildUrl(path, id), { mode: 'cors' }).get(params))
  }

  _wrap(promise) {
    return promise.then((response) => {
      if(Array.isArray(response)) return new BaseArrayResponse(response)
      else return new BaseResponse(response)
    })
  }

  _buildUrl(path, id) {
    return `${this.baseUrl}/${path}` + (id ? `/${id}` : '')
  }

  _extractFetchResponse(response) {
    return response.json()
  }

  _mandatory(who) {
    throw new Error(`Missing parameter ${who}`);
  }
}
