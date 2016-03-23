'use strict'

import BaseResource from './../BaseResource'

/**
 * @class
 * @example
 * var client = new cloudesire.Client()
 * var categoriesPromise = client.category.all()
 * var categoryWithID2Promise = client.category.one(2)
 */
class Category extends BaseResource {
  constructor(self) {
    super(self)
    this.path = 'category'
  }

  /**
   * Retrieve the current user
   * @method me
   * @return {Promise<Object>} a promise resolved with current user
   * @example
   * var client = new cloudesire.Client({username: 'peppa', password: 'pig'})
   * client.product.me().then(function(user) {
   * 	console.log(user) // prints {id: 1, username: 'peppa', ...}
   * })
   */
  me() {
    return this.customGET('/me')
  }
}

export default Category
