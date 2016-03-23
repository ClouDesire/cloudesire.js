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

Older [browsers](http://caniuse.com/) may need the polyfill of both [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
A simple example of usage in an old browser is in the [browser tests](https://github.com/ClouDesire/cloudesire.js/tree/master/test/flow.spec.html).
```
npm install es6-promise
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
var products = client.product.all(options);
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

-   `args` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Configuration object, possible properties are `username`, `password` and `token`

**Examples**

```javascript
var client = new cloudesire.Client({
  username: 'myUser',
  password: 'thePassword',
  token: 'insteadOfThePasswordICanPassAToken'
})
```

# Category

**Extends BaseResource**

**Examples**

```javascript
var client = new cloudesire.Client()
var categories = client.category.all()
var categoryWithID2 = client.category.one(2)
```

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
var productOfCategory2 = client.product.allByCategory(2, {pageSize: 5, pageNumber: 1})
```

Returns **PaginatedResponse** the list of products retrieved

## allByCategoryAndFeatured

Retrieve featured products filtered by category

**Parameters**

-   `category` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** id of the category
-   `options` **Options=** the options to pass to the request (optional, default `{}`)

**Examples**

```javascript
var client = new cloudesire.Client()
var featuredProductsOfCategory5 = client.product.allByCategoryAndFeatured(5)
```

Returns **PaginatedResponse** the list of products retrieved

## allByNameOrVendorName

Retrieve all the products filtered by name or by vendor name

**Parameters**

-   `name` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the name of the product or the vendor
-   `options` **Options=** the options to pass to the request (optional, default `{}`)

**Examples**

```javascript
var client = new cloudesire.Client()
var productsByCloudesire = client.product.allByNameOrVendorName('cloudesire')
var wordpressProducts = client.product.allByNameOrVendorName('wordpress')
```

Returns **PaginatedResponse** the list of products retrieved

## allFeatured

Retrieve all the featured products

**Parameters**

-   `options` **Options=** the options to pass to the request (optional, default `{}`)

**Examples**

```javascript
var client = new cloudesire.Client()
var featuredProducts = client.product.allFeatured({pageSize: 50, pageNumber: 2})
```

Returns **PaginatedResponse** the list of products retrieved

## allOwned

Retrieve all the owned products

**Parameters**

-   `options` **Options=** the options to pass to the request (optional, default `{}`)

**Examples**

```javascript
var client = new cloudesire.Client()
var mineProducts = client.product.allOwned()
```

Returns **PaginatedResponse** the list of products retrieved

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
var productsThatContainsGAME = client.product.searchAndSort('game')
var productsThatContainsGAMEInCategory10 = client.product.searchAndSort('game', 10)
var productsInCategory5TaggedWithOPEN_SOURCE = client.product.searchAndSort(null, 10, 'OPEN_SOURCE')
var secondPageOfAllProductsOrderedByTopTried = client.product.searchAndSort(null, null, null, 'TOPTRIED', {pageNumber: 2})
```

Returns **PaginatedResponse** The result of the search

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
var productVersions = client.productVersion.ofProduct(5)
```

Returns **PaginatedResponse** the list of product versions retrieved

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
var products = client.product.all({pageSize: 5, pageNumber: 1})
var currentPage = products.pageNumber
var totalPages = products.totalPages
var categories = client.category.all()
```

Returns **PaginatedResponse** the list of JSON repesentation of the objects retrieved

## one

Retrieve a single resource

**Parameters**

-   `id` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** id the resource
-   `queryParams` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=** query parameters object (optional, default `{}`)

**Examples**

```javascript
var client = new cloudesire.Client()
var product = client.product.one(10, {featured: true})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** the JSON repesentation of the object retrieved
