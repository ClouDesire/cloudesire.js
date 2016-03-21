'use strict'

import PaginatedResponse from './PaginatedResponse'

/** Contains all the commons methods to all resources */
export default class BaseResource {
  constructor(self) {
    this.self = self
    this.baseUrl = this.self.baseUrl
  }

  /**
  * Retrieve a single resource by id or a set of resources
  * @method retrieve
  * @param  {Number} [id=undefined] id of the resource to retrieve
  * @return {Object|Array.<Object>} An array of resources or the single resource retrieved
  * @example
  * var client = new cloudesire.Client()
  * var listOfProducts = client.product.retrieve()
  * var singleProduct = client.product.retrieve(10)
  */
  retrieve(id) {
    return this._get(this.path, id)
  }

  //////////////////////////////////////////////////////////////////////////////

  _get(path, id, params) {
    return this._wrap(this.self.request(this._buildUrl(path, id), { mode: 'cors', responseAs: 'response' }).get(params))
  }

  _wrap(promise) {
    return promise.then((response) => {
      if(Array.isArray(response)) return new PaginatedResponse(response)
      else return response
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
