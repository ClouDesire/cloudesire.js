'use strict'

import fetchival from 'fetchival'
import Product from './resources/Product'
import ProductVersion from './resources/ProductVersion'

const BASE_URL = 'https://backend.cloudesire.com/api'

export default class Client {
  constructor(baseUrl) {
    if(typeof window === 'undefined')
      fetchival.fetch = require('node-fetch')

    this.baseUrl = baseUrl || BASE_URL
    this.request = fetchival
    this.product = new Product(this)
    this.productVersion = new ProductVersion(this)
  }
}
