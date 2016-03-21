[![Build Status](https://travis-ci.org/ClouDesire/cloudesire.js.svg?branch=master)](https://travis-ci.org/ClouDesire/cloudesire.js)
[![Coverage Status](https://coveralls.io/repos/github/ClouDesire/cloudesire.js/badge.svg?branch=master)](https://coveralls.io/github/ClouDesire/cloudesire.js?branch=master)


# cloudesire.js
The official low-level ClouDesire client for Node.js and the browser.

## Features

- a Simple feature

## Use in Node.js

```
npm install elasticsearch
```

[![NPM Stats](https://nodei.co/npm/cloudesire.js.png?downloads=true)](https://npmjs.org/package/cloudesire.js)

## Use in the Browser

Check out the [Browser Builds](http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/browser-builds.html) doc page for help downloading and setting up the client for use in the browser.


# API Usage
# BaseResource

Contains all the commons methods to all resources

## retrieve

Retrieve a single resource by id or a set of resources

**Parameters**

-   `id` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** id of the resource to retrieve (optional, default `undefined`)

**Examples**

```javascript
var client = new cloudesire.Client()
var listOfProducts = client.product.retrieve()
var singleProduct = client.product.retrieve(10)
```

Returns **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)\|[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>)** An array of resources or the single resource retrieved

# PaginatedResponse

An array of objects representing the list of the resources retrieved
