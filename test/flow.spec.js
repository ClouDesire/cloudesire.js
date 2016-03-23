'use strict'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import fetch from 'node-fetch'
import fetchMock from 'fetch-mock'
import mockery from 'mockery'

fetchMock.useNonGlobalFetch(fetch);

chai.use(chaiAsPromised)

let expect = chai.expect, server, client

describe('Product / ProductVersion / Category API', function() {
  before(() => {
    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false
    })
    mockery.registerMock('node-fetch',
      fetchMock
    		.mock(/api\/product$/, 'GET', [{id: 1}, {id: 2}])
        .mock(/api\/product\?name\=wordpress$/, 'GET', [{id: 1, name: 'wordpress'}])
        .mock(/api\/product\?featured\=true$/, 'GET', [{id: 1, featured: true}])
        .mock(/api\/product\?category\=1$/, 'GET', [{id: 1, category: {url: 'category/1'}}])
        .mock(/api\/product\?category\=1\&featured\=true$/, 'GET', [{id: 1, featured: true, category: {url: 'category/1'}}])
        .mock(/api\/product\?ownCompany\=true$/, 'GET', [{id: 1}])
        .mock(/api\/product\?name\=ess\&category\=2\&tag\=GAME\&ordering\=TOPSOLD$/, 'GET', [{id: 1, name: 'wordpress', tag: ['GAME'], category: {url: 'category/2'}}])
        .mock(/api\/product\/1$/, 'GET', {id: 1})
        .mock(/api\/productVersion$/, 'GET', {
          body: [{id: 1}, {id: 2}],
          headers: {
            'CMW-TotalPages': 1,
            'CMW-PageSize': 10,
            'CMW-TotalItems': 2,
            'CMW-PageNumber': 1
          }
        })
        .mock(/api\/productVersion\/1$/, 'GET', {id: 1})
        .mock((url, opts) => {
          return url.match(/api\/productVersion\?pageSize\=5\&pageNumber\=2\&product\=1$/)
        }, 'GET', {
          body: [{id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}],
          headers: {
            'CMW-TotalPages': 2,
            'CMW-PageSize': 5,
            'CMW-TotalItems': 10,
            'CMW-PageNumber': 2
          }
        })
        .mock(/api\/productVersion\?product\=1$/, 'GET', [{id: 1}])
        .mock(/api\/category$/, 'GET', [{id: 1, name:'office'}, {id: 2, name: 'CMS'}])
        .mock((url, opts) => {
          return url.match(/api\/product\/test\/auth\/headers$/)
            && opts.headers['CMW-Auth-User'] === 'peppa'
            && opts.headers['CMW-Auth-Token'] === 'abc'
            && opts.headers['Authorization'] === 'Basic cGVwcGE6cGln'
        }, 'GET', {})
        .getMock()
    )

    client = new (require('../lib/client').default)()
  })

  after(() => {
      mockery.deregisterMock('node-fetch')
      mockery.disable()
  })

  afterEach(() => client.logout())

  it('should list all the products', function() {
    return expect(client.product.all())
      .to.eventually.is.an('array')
      .to.deep.include({id: 1})
      .with.length.be(2)
  });

  it('should list all the products by name', function() {
    return expect(client.product.allByNameOrVendorName('wordpress'))
      .to.eventually.is.an('array')
      .to.deep.include({id: 1, name: 'wordpress'})
      .with.length.be(1)
  });

  it('should list all the featured products', function() {
    return expect(client.product.allFeatured())
      .to.eventually.is.an('array')
      .to.deep.include({id: 1, featured: true})
      .with.length.be(1)
  });

  it('should list all the CMS products', function() {
    return expect(client.product.allByCategory('1'))
      .to.eventually.is.an('array')
      .to.deep.include({id: 1, category: {url: 'category/1'}})
      .with.length.be(1)
  });

  it('should list all the featured CMS products', function() {
    return expect(client.product.allByCategoryAndFeatured('1'))
      .to.eventually.is.an('array')
      .to.deep.include({id: 1, featured: true, category: {url: 'category/1'}})
      .with.length.be(1)
  });

  it('should list all the owned products', function() {
    return expect(client.product.allOwned())
      .to.eventually.is.an('array')
      .to.deep.include({id: 1})
      .with.length.be(1)
  });

  it('should search products and return an ordered list', function() {
    return expect(client.product.searchAndSort('ess', 2, 'GAME', 'TOPSOLD'))
      .to.eventually.is.an('array')
      .to.deep.include({id: 1, name: 'wordpress', tag: ['GAME'], category: {url: 'category/2'}})
      .with.length.be(1)
  });

  it('should get a single product', function() {
    return expect(client.product.one(1))
      .to.eventually.is.an('object')
      .to.deep.property('id', 1)
  });

  it('should list all the product versions', function() {
    return expect(client.productVersion.all())
      .to.eventually.is.an('array')
      .to.deep.include({id: 2})
      .with.length.be(2)
  });

  it('should have the totalPages property', function() {
    return expect(client.productVersion.all())
      .to.eventually.is.an('array')
      .to.have.property('totalPages', 1)
  });

  it('should have the pageSize property', function() {
    return expect(client.productVersion.all())
      .to.eventually.is.an('array')
      .to.have.property('pageSize', 10)
  });

  it('should have the totalItems property', function() {
    return expect(client.productVersion.all())
      .to.eventually.is.an('array')
      .to.have.property('totalItems', 2)
  });

  it('should have the pageNumber property', function() {
    return expect(client.productVersion.all())
      .to.eventually.is.an('array')
      .to.have.property('pageNumber', 1)
  });

  it('should get a single product version', function() {
    return expect(client.productVersion.one(1))
      .to.eventually.is.an('object')
      .to.deep.property('id', 1)
  });

  it('should list all the product versions of a product', function() {
    return expect(client.productVersion.ofProduct(1))
      .to.eventually.is.an('array')
      .to.deep.include({id: 1})
      .with.length.be(1)
  });

  it('should get the 2nd page of size 5 with versions that belongs to a product', function() {
    return expect(client.productVersion.ofProduct(1, {pageSize: 5, pageNumber: 2}))
      .to.eventually.is.an('array')
      .to.deep.include({id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10})
      .with.length.be(5)
      .and.not.to.deep.include({id: 5})
  });

  it('should list all the categories', function() {
    return expect(client.category.all())
      .to.eventually.is.an('array')
      .to.deep.include({id: 1, name: 'office'}, {id: 2, name: 'CMS'})
      .with.length.be(2)
  });

  it('should have the authentication headers', function() {
    client.login('peppa', 'pig', 'abc')
    return expect(client.product.customGET('/test/auth/headers'))
      .to.eventually.is.an('object')
      .to.be.empty
  });
})
