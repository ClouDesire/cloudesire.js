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

    this.totalPages = headers['cmw-totalpages'] ? parseInt(headers['cmw-totalpages'][0]) : void 0
    this.pageSize = headers['cmw-pagesize'] ? parseInt(headers['cmw-pagesize'][0]) : void 0
    this.totalItems = headers['cmw-totalitems'] ? parseInt(headers['cmw-totalitems'][0]) : void 0
    this.pageNumber = headers['cmw-pagenumber'] ? parseInt(headers['cmw-pagenumber'][0]) : void 0
  }
}
