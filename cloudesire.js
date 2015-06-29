/* 
    Created on : 24-jun-2015, 15.08.00
    Author     : ClouDesire
*/

function ClouDesireAPIclient(){
    
    //restful.js initialization params
    this.api_client = null;
    this.api_protocol = '';
    this.api_endpoint = '';
    this.api_port = '';
    this.api_prefix = '';
    
    //cloudesire marketplace URL
    this.marketplace_URL = '';
    
    this.providers_list = new Array();
    this.categories_list = new Array();
    
    /*
    * @desc PUBLIC METHOD: API client initialization
    * @param {string} api_protocol (eg. "https")
    * @param {string} api_endpoint (eg. "backend.cloudesire.com")
    * @param {string} api_port (optional, eg. "80", default null)
    * @param {string} api_prefix (eg. "api")
    * @param {string} marketplace_URL (eg. "http://marketplace.cloudesire.com")
    */
    this.init = function(api_protocol, api_endpoint, api_port, api_prefix, marketplace_URL) {
        this.api_protocol = api_protocol;
        this.api_endpoint = api_endpoint;
        this.api_port = api_port;
        this.api_prefix = api_prefix;
        this.marketplace_URL = marketplace_URL;

        if (this.api_endpoint && this.api_protocol) {
            //resful.js initialization
            this.api_client = restful(this.api_endpoint);
            
            if (this.api_client) {
                //optional parameters
                if (this.api_port) this.api_client.port(this.api_port);
                if (this.api_protocol) this.api_client.protocol(this.api_protocol);
                if (this.api_prefix) this.api_client.prefixUrl(this.api_prefix);

                //load active providers list
                this.get_providers();

                //load active product categories
                this.get_categories();
            }
        }
    }
    
    
    /*
    * @desc PUBLIC METHOD: prints the current API version
    * @param {string} html_container (the div identifier that will contain the generated HTML
    */
    this.print_api_version = function(html_container) {
        
        if (!this.api_client) {
            console.log('API client not initialized');
            return;
        }
        
        var version = this.api_client.all('version').getAll().then(function(response){

            var responseObject = response.body().data();

            var versionHTML = 
                    "branch: " + responseObject.branch +
                    "<br/>commitIdAbbrev: " + responseObject.commitIdAbbrev +
                    "<br/>buildUserName: " + responseObject.buildUserName +
                    "<br/>buildUserEmail: " + responseObject.buildUserEmail +
                    "<br/>buildTime: " + responseObject.buildTime +
                    "<br/>commitUserName: " + responseObject.commitUserName +
                    "<br/>commitMessageShort: " + responseObject.commitMessageShort +
                    "<br/>commitTime: " + responseObject.commitTime +
                    "<br/>pomVersion: " + responseObject.pomVersion;
            
            jQuery(html_container).html(versionHTML);

        }.bind(this));
        
    }


    /*
    * @desc PUBLIC METHOD: prints a product details, given its unique identifier
    * @param {integer} productId (the product unique identifier)
    * @param {type} {string} html_container (the div identifier that will contain the generated HTML
    */
    this.print_product = function(productId, html_container) {
        
        if (!this.api_client) {
            console.log('API client not initialized');
            return;
        }
        
        var productMember = this.api_client.one('product', productId);
        productMember.get().then(function(response) {
            var product = response.body().data();

            var productHTML = 
                    "<h1 class=\"cloudesire_product_name\">" + product.name + "</h1>" +
                    "<div class=\"cloudesire_product_icon\" id=\"cloudesire_icon_placeholder_" + productId + "\"></div>" +
                    "<div class=\"cloudesire_product_description\" id=\"cloudesire_product_description_" + productId + "\">" + product.shortDescription + "</div>";

            jQuery(html_container).html(productHTML);

            var productVersions =  product.productVersion;
            var productFiles =  product.files;
            var productCategory = product.category;
            var productSKU =  product.sku;
            var productIsSyndicated = product.isSyndicated;

            //print product icon
            this.print_product_icon(productId, productFiles);

            //print product versions
            this.print_product_versions(productId, productIsSyndicated, productCategory, productSKU, productVersions);
        }.bind(this));
    }
    
    /*
     * 
     * PRIVATE METHODS BELOW!
     * 
     * 
     */
    
    
    /*
    * inserts the product icon in the related div
    */
    this.print_product_icon = function(productId, productFiles) {
        
        productFiles.forEach(function(productFile) {
            
            //awful, we know....
            var productFileUrl = productFile.url;
            var productFileUrlArray = productFileUrl.split("/");
            var productFileNumber = productFileUrlArray[1];
            
            var productFileMember = this.api_client.one('productImageFile', productFileNumber);
            productFileMember.get().then(function(response) {
                
        
                var productFile = response.body().data();
                var productFileURL = productFile.objectUrl;  
                var productFileTag = productFile.tag; 

                if (productFileTag == 'LOGO') {

                    //append the product versions info to the product div
                    var productLogoHTML = 
                        "<img id=\"cloudesire_product_logo_" + productId + "\" src=\"" + productFileURL + "\" />"
                    
                    
                    jQuery("#cloudesire_icon_placeholder_" + productId).html(productLogoHTML);
                }
            }.bind(this));
        }.bind(this))
    }

    /*
     * appends to the product div all the available versions
     */
    this.print_product_versions = function(productId, productIsSyndicated, productCategory, productSKU, productVersions) {
        
        productVersions.forEach(function(productVersion) {
            
            //awful, we know....
            var productVersionUrl = productVersion.url;
            var productVersionUrlArray = productVersionUrl.split("/");
            var versionNumber = productVersionUrlArray[1];
            
            //awful, we know....
            var productCategoryUrl = productCategory.url;
            var productCategoryUrlArray = productCategoryUrl.split("/");
            var categoryNumber = productCategoryUrlArray[1];
            var categoryName = this.categories_list[categoryNumber];


            var productVersionMember = this.api_client.one('productVersion', versionNumber);
            productVersionMember.get().then(function(response) {
                
                var productVersion = response.body().data();
                var productVersionId = productVersion.id;  
                var productVersionBillingPeriod = productVersion.billingPeriod;
                var productVersionPrice = productVersion.price;

                //append the product versions info to the product div
                var productVersionHTML = 
                    "<div class=\"cloudesire_product_version_container\" id=\"cloudesire_product_version_" + productVersionId + "\">" + 
                    "<h2 class=\"cloudesire_product_version_name\">" + productVersion.name + "</h2>"
                    "</div>";

                jQuery("#cloudesire_product_" + productId).append(productVersionHTML);
                
                //calculate instance prices only if app is not syndicated
                if (!Boolean(productIsSyndicated)) {
                    //for each provider, calculate the price and append it to the related product version div
                    this.providers_list.forEach(function(provider) {
                        var providerId = provider.id;
                        var providerAlias = provider.alias;
                        
                        var buyNowHTML = this.build_buy_now_link(categoryNumber, categoryName, productId, productSKU, versionNumber, providerId);
                        
                        //append the provider info to the product version div
                        var providerHTML = "<div class=\"cloudesire_provider_container\" id=\"cloudesire_provider_" + providerId + "\">" + 
                            buyNowHTML +
                            " on <span class=\"cloudesire_provider_name\">" + providerAlias + "</span></span>"
                            "</div>";

                        jQuery("#cloudesire_product_version_"+ productVersionId).append(providerHTML);

                        //append to the product version div the estimations for each provider 
                        this.print_budget_estimate(productVersionId, providerId, productVersionBillingPeriod);

                    }.bind(this));
                }
                //syndicated apps
                else {
                    var priceHTML = this.format_price(productVersionPrice, productVersionBillingPeriod);
                    var buyNowHTML = this.build_buy_now_link(categoryNumber, categoryName, productId, productSKU, versionNumber, 0);
                    
                    jQuery("#cloudesire_product_" + productId).append(buyNowHTML + priceHTML);
                }
            }.bind(this));
        }.bind(this))
    }

    /*
     * appends to the product version div all the providers and related prices
     */
    this.print_budget_estimate = function(productVersionId, providerId, productVersionBillingPeriod) {
        
        var fullUrl = "";

        //build the API URL
        if (this.api_endpoint && this.api_protocol) {
            fullUrl = this.api_protocol + "://" + this.api_endpoint;

            if (this.api_port) fullUrl += ":" + this.api_port;
            if (this.api_prefix) fullUrl += "/" + this.api_prefix;

            fullUrl += "/budgetEstimate?type=NORMAL";
            fullUrl += "&idProductVersion=" + productVersionId;
            fullUrl += "&idProvider=" + providerId;
        }


        //call the estimate API
        var estimateMember = this.api_client.oneUrl('budgetEstimate', fullUrl);

        estimateMember.get().then(function(response) {
            var estimate = response.body().data();
            var totalPrice = estimate.totalPrice;

            var providerPriceHTML = this.format_price(totalPrice, productVersionBillingPeriod);

            jQuery("#cloudesire_provider_" + providerId).append(providerPriceHTML);

        }.bind(this));

    }
    
    /*
    * format prices 
    */
    this.build_buy_now_link = function(categoryNumber, categoryName, productId, productSKU, versionNumber, providerId) {
        var marketplaceProductURL = this.marketplace_URL + 
            "/marketplace/category/" + categoryNumber + "/" + categoryName + "/product/" + productId + "/" + productSKU + "/order" +
            "?version=" + versionNumber;
        
        if (providerId) marketplaceProductURL += "&amp;provider=" + providerId;
        
        marketplaceProductURL += "&amp;&period=1&amp;type=NORMAL";
        
        var buyNowHTML = "<a class=\"cloudesire_marketplace_url\" href=\"" + marketplaceProductURL + "\">buy now</a>";
            
        return buyNowHTML;
    }
    
    /*
    * format prices 
    */
    this.format_price = function(price, billingPeriod) {
        var billingFrequencyLabel = " per month";
        if (billingPeriod > 1)
             billingFrequencyLabel = " each " + billingPeriod + " months";
        
        var priceHTML = " for <span class=\"cloudesire_provider_price\">" + price + " EUR" +
                    "</span>" + billingFrequencyLabel;
            
        return priceHTML;
    }
    
    
    /*
    * gets all the active providers and store them in a (global...) array
    */
    this.get_providers = function() {
        
        var providersCollection = this.api_client.all('cloudProvider');
        providersCollection.getAll().then(function(response) {
            var providerEntities = response.body();

            providerEntities.forEach(function(providerEntity) {
                var provider = providerEntity.data();
                this.providers_list.push(provider);
                
            }.bind(this))
        }.bind(this));
    }

    /*
    * gets all the active product categories and store them in a (global...) array
    */
    this.get_categories = function() {
        
        var categoriesCollection = this.api_client.all('category');
        categoriesCollection.getAll().then(function(response) {
            var categoriesEntities = response.body();

            categoriesEntities.forEach(function(categoryEntity) {
                var category = categoryEntity.data();
                this.categories_list[category.id] = category.name;
                
            }.bind(this))
        }.bind(this));
        
    }
}
