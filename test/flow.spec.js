'use strict'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import fetch from 'node-fetch'
import fetchMock from 'fetch-mock'
import mockery from 'mockery'

fetchMock.useNonGlobalFetch(fetch);

chai.use(chaiAsPromised)

let expect = chai.expect, server, client

describe('Products API', function() {
  before(function() {
    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false
    })
    mockery.registerMock('node-fetch',
      fetchMock
    		.mock('https://backend.cloudesire.com/api/product', 'GET', [{id: 1}, {id: 2}])
        .mock('https://backend.cloudesire.com/api/product/1', 'GET', {id: 1})
        .mock('https://backend.cloudesire.com/api/productVersion', 'GET', [{id: 1}, {id: 2}])
        .mock('https://backend.cloudesire.com/api/productVersion/1', 'GET', {id: 1})
        .mock('https://backend.cloudesire.com/api/productVersion?product=1', 'GET', [{id: 1}])
        .getMock()
    )

    client = new (require('../lib/client').default)()
  })

  after(function() {
      mockery.deregisterMock('node-fetch')
      mockery.disable()
  })

  it('should list all the products', function() {
    return expect(client.product.retrieve())
      .to.eventually.is.an('array')
      .to.deep.include({id: 1})
      .with.length.be(2)
  });

  it('should get a single product', function() {
    return expect(client.product.retrieve(1))
      .to.eventually.is.an('object')
      .to.deep.property('id', 1)
  });

  it('should list all the product versions', function() {
    return expect(client.productVersion.retrieve())
      .to.eventually.is.an('array')
      .to.deep.include({id: 2})
      .with.length.be(2)
  });

  it('should get a single product version', function() {
    return expect(client.productVersion.retrieve(1))
      .to.eventually.is.an('object')
      .to.deep.property('id', 1)
  });

  it('should list all the product versions of a product', function() {
    return expect(client.productVersion.ofProduct(1))
      .to.eventually.is.an('array')
      .to.deep.include({id: 1})
      .with.length.be(1)
  });
})
