'use strict'

import BaseResource from './../BaseResource'

/** Methods to retrieve and filter products */
class Product extends BaseResource {
  constructor(self) {
    super(self)
    this.path = 'product'
  }

  /**
   * Retrieve all the products filtered by name or by vendor name
   * @method allByNameOrVendorName
   * @param  {String} name the name of the product or the vendor
   * @param  {Options} [options={}] the options to pass to the request
   * @return {Promise<PaginatedResponse>} a promise resolved with the paginated response array object
   * @example
   * var client = new cloudesire.Client()
   * var productsByCloudesirePromise = client.product.allByNameOrVendorName('cloudesire')
   * var wordpressProductsPromise = client.product.allByNameOrVendorName('wordpress')
   */
  allByNameOrVendorName(name, options = {}) {
    return this.all(options, {'name': name})
  }


  /**
   * Retrieve all the featured products
   * @method allFeatured
   * @param  {Options} [options={}] the options to pass to the request
   * @return {Promise<PaginatedResponse>} a promise resolved with the paginated response array object
   * @example
   * var client = new cloudesire.Client()
   * var featuredProductsPromise = client.product.allFeatured({pageSize: 50, pageNumber: 2})
   */
  allFeatured(options = {}) {
    return this.all(options, {'featured': true})
  }

  /**
   * Retrieve products filtered by category
   * @method allByCategory
   * @param  {Number} category id of the category
   * @param  {Options} [options={}] the options to pass to the request
   * @return {Promise<PaginatedResponse>} a promise resolved with the paginated response array object
   * @example
   * var client = new cloudesire.Client()
   * var productOfCategory2Promise = client.product.allByCategory(2, {pageSize: 5, pageNumber: 1})
   */
  allByCategory(category, options = {}) {
    return this.all(options, {'category': category})
  }

  /**
   * Retrieve featured products filtered by category
   * @method allByCategoryAndFeatured
   * @param  {Number} category id of the category
   * @param  {Options} [options={}] the options to pass to the request
   * @return {Promise<PaginatedResponse>} a promise resolved with the paginated response array object
   * @example
   * var client = new cloudesire.Client()
   * var featuredProductsOfCategory5Promise = client.product.allByCategoryAndFeatured(5)
   */
  allByCategoryAndFeatured(category, options = {}) {
    return this.all(options, {'category': category, 'featured': true})
  }

  /**
   * Retrieve all the owned products
   * @method allByCategory
   * @param  {Options} [options={}] the options to pass to the request
   * @return {Promise<PaginatedResponse>} a promise resolved with the paginated response array object
   * @example
   * var client = new cloudesire.Client()
   * var mineProductsPromise = client.product.allOwned()
   */
  allOwned(options = {}) {
    return this.all(options, {'ownCompany': true})
  }

  /**
   * Search products by parts of the name, category, tags and sort results by top sold or top tried
   * @method search
   * @param  {String} [name='%'] the part of the name of the product
   * @param  {Number} [category=undefined] id of the category
   * @param  {String} [tag=undefined] tag of the product
   * @param  {String} [ordering=undefined] can be `TOPTRIED` or `TOPSOLD`
   * @param  {Options} [options] the options to pass to the request
   * @return {Promise<PaginatedResponse>} a promise resolved with the paginated response array object
   * @example
   * var client = new cloudesire.Client()
   * var productsThatContainsGAMEPromise = client.product.searchAndSort('game')
   * var productsThatContainsGAMEInCategory10Promise = client.product.searchAndSort('game', 10)
   * var productsInCategory5TaggedWithOPEN_SOURCEPromise = client.product.searchAndSort(null, 10, 'OPEN_SOURCE')
   * var secondPageOfAllProductsOrderedByTopTriedPromise = client.product.searchAndSort(null, null, null, 'TOPTRIED', {pageNumber: 2})
   */
  searchAndSort(name, category, tag, ordering, options = {}) {
    return this.all(options, {
      'name': name,
      'category': category,
      'tag': tag,
      'ordering': ordering
    })
  }
}

export default Product
