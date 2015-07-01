cloudesire.js
=======

A simple Javascript library for ClouDesire API.
It uses RESTful HTTP client for JavaScript http://cujojs.com/


How to install:
---------------

* Install it with Bower `bower install cloudesire.js`


Usage
-----

Using cloudesire.js is easy. 
Just include the library in your page, call the init method, and then use the print_product method to print in a certain div the product information.

### Making a basic request: ###

```javascript

//create api client instance
cloudesire_api_client = new ClouDesireAPIclient();

/*
* @desc PUBLIC METHOD: API client initialization
* @param {string} api_protocol (eg. "https")
* @param {string} api_endpoint (eg. "backend.cloudesire.com")
* @param {string} api_port (optional, eg. "80", default null)
* @param {string} api_prefix (eg. "api")
* @param {string} marketplace_URL (eg. "http://marketplace.cloudesire.com")
*/
cloudesire_api_client.init('https', 'backend.cloudesire.com', '', 'api', 'https://marketplace.cloudesire.com');


//print current API version information
cloudesire_api_client.print_api_version('#api_version_div_identifier');

//print product info
cloudesire_api_client.print_product(product_identifier, '#cloudesire_product_div_identifier');

```

Contributors
------------

- Andrea Vecchi <andrea.vecchi@cloudesire.com>
- Giovanni Toraldo <giovanni.toraldo@cloudesire.com>


Copyright
---------

Copyright 2015 the original author or authors

cloudesire.js is made available under the MIT license.  See LICENSE.txt for details.
