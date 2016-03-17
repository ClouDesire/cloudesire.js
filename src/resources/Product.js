'use strict'

import BaseResource from './../BaseResource'

export default class Product extends BaseResource {
  constructor(self) {
    super(self)
    this.path = 'product'
  }
}
