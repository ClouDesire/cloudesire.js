'use strict'

import fetchival from 'fetchival'
import Product from './resources/Product'
import ProductVersion from './resources/ProductVersion'
import Category from './resources/Category'

const BASE_URL = 'https://backend.cloudesire.com/api'

export default class Client {
  constructor(baseUrl) {
    if(typeof window === 'undefined')
      fetchival.fetch = require('node-fetch')

    this.baseUrl = baseUrl || BASE_URL
    this.request = fetchival
    this.product = new Product(this)
    this.productVersion = new ProductVersion(this)
    this.category = new Category(this)
  }
}

export { Client as Client }
