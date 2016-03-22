'use strict'

import BaseResource from './../BaseResource'

/** Methods to retrieve and filter products versions */
class ProductVersion extends BaseResource {
  constructor(self) {
    super(self)
    this.path = 'productVersion'
  }

  /**
  * Retrieve all the versions that belongs to a product
  * @method ofProduct
  * @param  {Number} id the id the product
  * @param  {Options} [options={}]
  * @return {PaginatedResponse} the list of product versions retrieved
  * @example
  * var client = new cloudesire.Client()
  * var productVersions = client.productVersion.ofProduct(5)
  */
  ofProduct(id = this.mandatory('id'), options = {}) {
    return this.all(options, {'product': id})
  }
}

export default ProductVersion
