'use strict'

import fetchival from 'fetchival'
import Product from './resources/Product'
import ProductVersion from './resources/ProductVersion'
import Category from './resources/Category'

const BASE_URL = 'https://backend.cloudesire.com/api'

export default class Client {
  constructor(args) {
    const {baseUrl, username, password, token} = args

    if(typeof window === 'undefined')
      fetchival.fetch = require('node-fetch')
    else fetchival.fetch = window.fetch

    this.baseUrl = baseUrl || BASE_URL
    this.username = username
    this.password = password
    this.token = token
    this.request = fetchival

    this.product = new Product(this)
    this.productVersion = new ProductVersion(this)
    this.category = new Category(this)
  }
}

export { Client as Client }
