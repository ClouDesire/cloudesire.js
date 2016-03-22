'use strict';

/**
 * An array plus the the pagination properties
 * @property {totalPages} The on the server
 * @property {pageSize} The of the current page
 * @property {totalItems} The number of the total pages
 * @property {pageNumber} The of the current page
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
