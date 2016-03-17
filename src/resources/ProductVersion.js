'use strict'

import BaseResource from './../BaseResource'

export default class ProductVersion extends BaseResource {
  constructor(self) {
    super(self)
    this.path = 'productVersion'
  }

  ofProduct(id = this.mandatory('id')) {
    return this._get(this.path, undefined, {product: id})
  }
}
