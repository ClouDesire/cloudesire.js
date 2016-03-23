[![Build Status](https://travis-ci.org/ClouDesire/cloudesire.js.svg?branch=master)](https://travis-ci.org/ClouDesire/cloudesire.js)
[![Coverage Status](https://coveralls.io/repos/github/ClouDesire/cloudesire.js/badge.svg?branch=master)](https://coveralls.io/github/ClouDesire/cloudesire.js?branch=master)


# cloudesire.js
The official low-level ClouDesire client for Node.js and the browser.


## Use in Node.js

Install via npm
```
npm install cloudesire.js --save
```

and use it
```
var CDClient = require('cloudesire.js')
var client = new CDClient()

var products = client.product.all()
```


## Use in the Browser

Install via npm or bower
```
npm install cloudesire.js --save
bower install cloudesire.js --save
```

Older [browsers](http://caniuse.com/) may need the polyfill of both [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) apis.
A simple example of usage in an old browser can be found in the [browser tests](https://github.com/ClouDesire/cloudesire.js/tree/master/test/flow.spec.html).
```
#promise polyfill
npm install es6-promise
#fetch polyfill
npm install whatwg-fetch
```

Include the library in your application
```
<script src="bower_components/cloudesire.js/lib/client.web.js"></script>
```

and use it
```
var client = new cloudesire.Client()
var products = client.product.all()
```

# API Usage
# Options

Options that can be passed to the api methods

**Properties**

-   `pageSize` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Size of the page to retrieve.
-   `pageNumber` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Number of the page to retrieve.

**Examples**

```javascript
// Retrieve the second page of the results
var options = {
  pageSize: 6,
  pageNumber 2
};
var client = new cloudesire.Client()
var productsPromise = client.product.all(options);
```

# PaginatedResponse

An array object that contains the current pagination informations

**Properties**

-   `The` **totalPages** on the server
-   `The` **pageSize** of the current page
-   `The` **totalItems** number of the total pages
-   `The` **pageNumber** of the current page

**Examples**

```javascript
var client = new cloudesire.Client()
var productsArray = client.product.all() // This returns a PaginatedResponse array object
var totalPages = productsArray.totalPages
var pageSize = productsArray.pageSize
var totalItems = productsArray.totalItems
var pageNumber = productsArray.pageNumber
```

# Client

Contains all the instantiated resources classes

**Parameters**

-   `baseUrl` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** override the server base url

**Examples**

```javascript
var client = new cloudesire.Client('https://staging-cr.cloudesire.com/api')
```

## login

Login with the given username, password or token

**Parameters**

-   `username` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** the username
-   `password` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** the password
-   `token` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** the token
-   `args` **...** 

**Examples**

```javascript
var client = new cloudesire.Client()
var helloStatement = client
	.login('peppa', 'pig')
	.then(client.user.me)
	.then(function(user) {
  	return 'It\'s me! ' + user.name
})
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolved with a true value

## logout

Logout the current user

**Examples**

```javascript
var client = new cloudesire.Client()
client
	.logout()
	.then(function() {
	  console.log('Logged out!!!')
	})
})
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolved with a true value

# Category

**Extends BaseResource**

**Examples**

```javascript
var client = new cloudesire.Client()
var categoriesPromise = client.category.all()
var categoryWithID2Promise = client.category.one(2)
```

## me

Retrieve the current user

**Examples**

```javascript
var client = new cloudesire.Client({username: 'peppa', password: 'pig'})
client.product.me().then(function(user) {
	console.log(user) // prints {id: 1, username: 'peppa', ...}
})
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).&lt;[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** a promise resolved with current user

# Product

**Extends BaseResource**

Methods to retrieve and filter products

## allByCategory

Retrieve products filtered by category

**Parameters**

-   `category` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** id of the category
-   `options` **Options=** the options to pass to the request (optional, default `{}`)

**Examples**

```javascript
var client = new cloudesire.Client()
var productOfCategory2Promise = client.product.allByCategory(2, {pageSize: 5, pageNumber: 1})
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).&lt;PaginatedResponse>** a promise resolved with the paginated response array object

## allByCategoryAndFeatured

Retrieve featured products filtered by category

**Parameters**

-   `category` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** id of the category
-   `options` **Options=** the options to pass to the request (optional, default `{}`)

**Examples**

```javascript
var client = new cloudesire.Client()
var featuredProductsOfCategory5Promise = client.product.allByCategoryAndFeatured(5)
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).&lt;PaginatedResponse>** a promise resolved with the paginated response array object

## allByNameOrVendorName

Retrieve all the products filtered by name or by vendor name

**Parameters**

-   `name` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the name of the product or the vendor
-   `options` **Options=** the options to pass to the request (optional, default `{}`)

**Examples**

```javascript
var client = new cloudesire.Client()
var productsByCloudesirePromise = client.product.allByNameOrVendorName('cloudesire')
var wordpressProductsPromise = client.product.allByNameOrVendorName('wordpress')
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).&lt;PaginatedResponse>** a promise resolved with the paginated response array object

## allFeatured

Retrieve all the featured products

**Parameters**

-   `options` **Options=** the options to pass to the request (optional, default `{}`)

**Examples**

```javascript
var client = new cloudesire.Client()
var featuredProductsPromise = client.product.allFeatured({pageSize: 50, pageNumber: 2})
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).&lt;PaginatedResponse>** a promise resolved with the paginated response array object

## allOwned

Retrieve all the owned products

**Parameters**

-   `options` **Options=** the options to pass to the request (optional, default `{}`)

**Examples**

```javascript
var client = new cloudesire.Client()
var mineProductsPromise = client.product.allOwned()
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).&lt;PaginatedResponse>** a promise resolved with the paginated response array object

## searchAndSort

Search products by parts of the name, category, tags and sort results by top sold or top tried

**Parameters**

-   `name` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** the part of the name of the product (optional, default `'%'`)
-   `category` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** id of the category (optional, default `undefined`)
-   `tag` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** tag of the product (optional, default `undefined`)
-   `ordering` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** can be `TOPTRIED` or `TOPSOLD` (optional, default `undefined`)
-   `options` **Options=** the options to pass to the request

**Examples**

```javascript
var client = new cloudesire.Client()
var productsThatContainsGAMEPromise = client.product.searchAndSort('game')
var productsThatContainsGAMEInCategory10Promise = client.product.searchAndSort('game', 10)
var productsInCategory5TaggedWithOPEN_SOURCEPromise = client.product.searchAndSort(null, 10, 'OPEN_SOURCE')
var secondPageOfAllProductsOrderedByTopTriedPromise = client.product.searchAndSort(null, null, null, 'TOPTRIED', {pageNumber: 2})
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).&lt;PaginatedResponse>** a promise resolved with the paginated response array object

# ProductVersion

**Extends BaseResource**

Methods to retrieve and filter products versions

## ofProduct

Retrieve all the versions that belongs to a product

**Parameters**

-   `id` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=(default this.mandatory('id'))** the id the product
-   `options` **Options=**  (optional, default `{}`)

**Examples**

```javascript
var client = new cloudesire.Client()
var productVersionsPromise = client.productVersion.ofProduct(5)
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).&lt;PaginatedResponse>** a promise resolved with the paginated response array object

# BaseResource

Commons methods to all the resources

## all

Retrieve a list of resources

**Parameters**

-   `options` **Options=**  (optional, default `{}`)
-   `queryParams` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=** query parameters object (optional, default `{}`)

**Examples**

```javascript
var client = new cloudesire.Client()
var productsPromise = client.product.all({pageSize: 5, pageNumber: 1})
productsPromise.then(function(products) {
  var currentPage = products.pageNumber
  var totalPages = products.totalPages
  var categories = client.category.all()
})
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).&lt;PaginatedResponse>** a promise resolved with the paginated response array object

## one

Retrieve a single resource

**Parameters**

-   `id` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** id the resource
-   `queryParams` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=** query parameters object (optional, default `{}`)

**Examples**

```javascript
var client = new cloudesire.Client()
var productPromise = client.product.one(10, {featured: true})
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).&lt;[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** a promise resolved with the resource retrieved

# User

**Extends BaseResource**

**Examples**

```javascript
var client = new cloudesire.Client()
var usersPromise = client.user.all()
var aUserPromise = client.user.one(2)
```
