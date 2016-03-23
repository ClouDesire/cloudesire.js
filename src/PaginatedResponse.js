'use strict';

/**
 * An array object that contains the current pagination informations
 * @property {totalPages} The on the server
 * @property {pageSize} The of the current page
 * @property {totalItems} The number of the total pages
 * @property {pageNumber} The of the current page
 * @example
 * var client = new cloudesire.Client()
 * var productsArray = client.product.all() // This returns a PaginatedResponse array object
 * var totalPages = productsArray.totalPages
 * var pageSize = productsArray.pageSize
 * var totalItems = productsArray.totalItems
 * var pageNumber = productsArray.pageNumber
 */
export default class PaginatedResponse extends Array {
  constructor(args, headers) {
    super(...args)

    this.totalPages = headers.has('cmw-totalpages') ? parseInt(headers.get('cmw-totalpages')) : void 0
    this.pageSize = headers.has('cmw-pagesize') ? parseInt(headers.get('cmw-pagesize')) : void 0
    this.totalItems = headers.has('cmw-totalitems') ? parseInt(headers.get('cmw-totalitems')) : void 0
    this.pageNumber = headers.has('cmw-pagenumber') ? parseInt(headers.get('cmw-pagenumber')) : void 0
  }
}
