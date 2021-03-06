'use strict'

/**
 * @typedef {Object} Options
 * @description Options that can be passed to the api methods
 * @property {Number} pageSize - Size of the page to retrieve.
 * @property {Number} pageNumber - Number of the page to retrieve.
 * @example
 * // Retrieve the second page of the results
 * var options = {
 *   pageSize: 6,
 *   pageNumber 2
 * };
 * var client = new cloudesire.Client()
 * var productsPromise = client.product.all(options);
 */

import PaginatedResponse from './PaginatedResponse'
import {isEmpty} from 'lodash/core'

/** Commons methods to all the resources */
export default class BaseResource {
  constructor(self) {
    this.self = self
    this.baseUrl = this.self.baseUrl
  }

  /**
  * Retrieve a single resource
  * @method one
  * @param  {Number} id id the resource
  * @param  {Object} [queryParams={}] query parameters object
  * @return {Promise<Object>} a promise resolved with the resource retrieved
  * @example
  * var client = new cloudesire.Client()
  * var productPromise = client.product.one(10, {featured: true})
  */
  one(id, queryParams = {}) {
    return this._get(this.path, id, queryParams)
  }

  /**
  * Retrieve a list of resources
  * @method all
  * @param  {Options} [options={}]
  * @param  {Object} [queryParams={}] query parameters object
  * @return {Promise<PaginatedResponse>} a promise resolved with the paginated response array object
  * @example
  * var client = new cloudesire.Client()
  * var productsPromise = client.product.all({pageSize: 5, pageNumber: 1})
  * productsPromise.then(function(products) {
  *   var currentPage = products.pageNumber
  *   var totalPages = products.totalPages
  *   var categories = client.category.all()
  * })
  */
  all(options = {}, queryParams = {}) {
    return this._get(this.path, undefined, queryParams, options)
  }

  customGET(path, options = {}, queryParams = {}) {
    return this._get(`${this.path}${path}`, undefined, queryParams, options)
  }

  //////////////////////////////////////////////////////////////////////////////

  _get(path, id, params, options) {
    return this._wrap(
      this.self.request(this._buildUrl(path, id),
        {
          mode: 'cors',
          responseAs: 'response',
          headers: this._buildAuthenticationObject(
            this.self.username, this.self.password, this.self.token
          )
        }).get(this._objectOrNull(Object.assign({}, this._buildPaginationObject(options), params)))
    )
  }

  _objectOrNull(object) {
    return isEmpty(object) ? undefined : object
  }

  _buildAuthenticationObject(...args) {
    const [username, password, token] = args
    const authbasic = new Buffer(`${username}:${password}`).toString('base64')
    return {
      'Authorization': `Basic ${authbasic}`,
      'CMW-Auth-User': username,
      'CMW-Auth-Token': token
    }
  }

  _buildPaginationObject(options) {
    const params = {}

    options && options['pageSize'] && (params.pageSize = options['pageSize'])
    options && options['pageNumber'] && (params.pageNumber = options['pageNumber'])

    return params
  }

  _wrap(promise) {
    return promise.then((response) => {
      var headers = response.headers
      return response.json().then((data) => {
        if(Array.isArray(data)) return new PaginatedResponse(data, headers)
        else return data
      })
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
