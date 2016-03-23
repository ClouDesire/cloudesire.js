(function() {
  var client
  describe('Works in the browser ?', function() {
    before(function() {
      fetchMock.mock(function() { return true }, 'GET', [{id: 1}, {id: 2}])
      client = new cloudesire.Client({username: 'peppa', password: 'pig'})
    })

    it('should list all the products', function() {
      return expect(client.product.all())
        .to.eventually.is.an('array')
        .with.length.be(2)
    });
  })
}())
