'use strict'

import BaseResource from './../BaseResource'

/**
 * @class
 * @example
 * var client = new cloudesire.Client()
 * var categories = client.category.all()
 * var categoryWithID2 = client.category.one(2)
 */
class Category extends BaseResource {
  constructor(self) {
    super(self)
    this.path = 'category'
  }
}

export default Category
