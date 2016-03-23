'use strict'

import fetchival from 'fetchival'
import Product from './resources/Product'
import ProductVersion from './resources/ProductVersion'
import Category from './resources/Category'
import User from './resources/User'

const BASE_URL = 'https://backend.cloudesire.com/api'

/**
 * Contains all the instantiated resources classes
 * @constructor
 * @param {String} baseUrl override the server base url
 * @example
 * var client = new cloudesire.Client('https://staging-cr.cloudesire.com/api')
 */
export default class Client {
  constructor(baseUrl) {
    if(typeof window === 'undefined')
      fetchival.fetch = require('node-fetch')
    else fetchival.fetch = window.fetch

    this.baseUrl = baseUrl || BASE_URL
    this.request = fetchival

    this.product = new Product(this)
    this.productVersion = new ProductVersion(this)
    this.category = new Category(this)
    this.user = new User(this)
  }

  /**
  * Login with the given username, password or token
  * @method login
  * @param  {String} [username] the username
  * @param  {String} [password] the password
  * @param  {String} [token] the token
  * @return {Promise} resolved with a true value
  * @example
  * var client = new cloudesire.Client()
  * var helloStatement = client
  * 	.login('peppa', 'pig')
  * 	.then(client.user.me)
  * 	.then(function(user) {
  *   	return 'It\'s me! ' + user.name
  *   })
  *   .catch(function(err) {
  *     console.log(err)
  *   })
  */
  login(...args) {
    const [username, password, token] = args
    this.username = username
    this.password = password
    this.token = token
    return Promise.resolve(true)
  }
  /**
  * Logout the current user
  * @method logout
  * @return {Promise} resolved with a true value
  * @example
  * var client = new cloudesire.Client()
  * client
  * 	.logout()
  * 	.then(function() {
  * 	  console.log('Logged out!!!')
  * 	})
  * })
  */
  logout() {
    this.username = void 0
    this.password = void 0
    this.token = void 0
    return Promise.resolve(true)
  }
}

export { Client as Client }
