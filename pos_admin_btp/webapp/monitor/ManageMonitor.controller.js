sap.ui.define([
    "com/posadminbtp/initial/BaseController",
    "sap/ui/model/json/JSONModel"
], function (
    BaseController,
    JSONModel
) {
    "use strict";

    return BaseController.extend("com.posadminbtp.monitor.ManageMonitor", {
        onInit: function () {
            this.oOwnerComponent = this.getOwnerComponent();

            this.oRouter = this.oOwnerComponent.getRouter();
            this.oModel = this.oOwnerComponent.getModel();

            //	this.oRouter.getRoute("manage_monitor").attachPatternMatched(this._onRouteMatched, this);
            //	this.oRouter.getRoute("monitor_detail").attachPatternMatched(this._onRouteMatched, this);

            var oProductsModel = new JSONModel(this.productData());
            oProductsModel.setSizeLimit(1000);
            this.getView().setModel(oProductsModel, "products");
        },
        _onRouteMatched: function (oEvent) {
            //
        },

        onExit: function () {
            this.oRouter.getRoute("manage_monitor").detachPatternMatched(this._onRouteMatched, this);
            this.oRouter.getRoute("monitor_detail").detachPatternMatched(this._onRouteMatched, this);
        },
        onListItemPress(oEvent) {
            let product = oEvent.getSource().getSelectedItem().getBindingContext("products").getObject();

            this.oRouter.navTo("monitor_detail", { layout: "TwoColumnsMidExpanded", id: product.ProductID });
        },
        productData() {
            return [
                {
                    "ProductID": 1,
                    "ProductName": "Chai",
                    "UnitsInStock": 39,
                    "UnitsOnOrder": 10,
                    "UnitPrice": 8,
                    "SupplierID": 1,
                    "Discontinued": false,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(1)/Supplier"
                        }
                    }
                },
                {
                    "ProductID": 2,
                    "ProductName": "Chang",
                    "UnitsInStock": 81,
                    "UnitsOnOrder": 7,
                    "UnitPrice": 6,
                    "SupplierID": 1,
                    "Discontinued": true,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(2)/Supplier"
                        }
                    }
                },
                {
                    "ProductID": 3,
                    "ProductName": "Aniseed Syrup",
                    "UnitsInStock": 100,
                    "UnitsOnOrder": 6,
                    "UnitPrice": 3,
                    "SupplierID": 3,
                    "Discontinued": false,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(3)/Supplier"
                        }
                    }
                },
                {
                    "ProductID": 4,
                    "ProductName": "Schwarzwälder Kirschtorte",
                    "UnitsInStock": 2,
                    "UnitsOnOrder": 3,
                    "UnitPrice": 19,
                    "SupplierID": 3,
                    "Discontinued": false,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(4)/Supplier"
                        }
                    }
                },
                {
                    "ProductID": 5,
                    "ProductName": "Chef Anton's Cajun Seasoning",
                    "UnitsInStock": 11,
                    "UnitsOnOrder": 9,
                    "UnitPrice": 108,
                    "SupplierID": 3,
                    "Discontinued": false,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(5)/Supplier"
                        }
                    }
                },
                {
                    "ProductID": 6,
                    "ProductName": "Chef Anton's Gumbo Mix",
                    "UnitsInStock": 21,
                    "UnitsOnOrder": 12,
                    "UnitPrice": 18,
                    "SupplierID": 4,
                    "Discontinued": false,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(6)/Supplier"
                        }
                    }
                },
                {
                    "ProductID": 7,
                    "ProductName": "Grandma's Boysenberry Spread",
                    "UnitsInStock": 25,
                    "UnitsOnOrder": 25,
                    "UnitPrice": 18,
                    "SupplierID": 5,
                    "Discontinued": false,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(7)/Supplier"
                        }
                    }
                },
                {
                    "ProductID": 8,
                    "ProductName": "Uncle Bob's Organic Dried Pears",
                    "UnitsInStock": 29,
                    "UnitsOnOrder": 7,
                    "UnitPrice": 35,
                    "SupplierID": 6,
                    "Discontinued": false,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(8)/Supplier"
                        }
                    }
                },
                {
                    "ProductID": 9,
                    "ProductName": "Northwoods Cranberry Sauce",
                    "UnitsInStock": 4,
                    "UnitsOnOrder": 32,
                    "UnitPrice": 35,
                    "SupplierID": 6,
                    "Discontinued": false,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(9)/Supplier"
                        }
                    }
                },
                {
                    "ProductID": 10,
                    "ProductName": "Mishi Kobe Niku",
                    "UnitsInStock": 40,
                    "UnitsOnOrder": 5,
                    "UnitPrice": 130,
                    "SupplierID": 5,
                    "Discontinued": false,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(10)/Supplier"
                        }
                    }
                },
                {
                    "ProductID": 11,
                    "ProductName": "Ikura",
                    "UnitsInStock": 4,
                    "UnitsOnOrder": 10,
                    "UnitPrice": 13,
                    "SupplierID": 4,
                    "Discontinued": false,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(11)/Supplier"
                        }
                    }
                },
                {
                    "ProductID": 13,
                    "ProductName": "Carnarvon Tigers",
                    "UnitsInStock": 36,
                    "UnitsOnOrder": 40,
                    "UnitPrice": 56,
                    "SupplierID": 3,
                    "Discontinued": false,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(13)/Supplier"
                        }
                    }
                },
                {
                    "ProductID": 14,
                    "ProductName": "Teatime Chocolate Biscuits",
                    "UnitsInStock": 21,
                    "UnitsOnOrder": 40,
                    "UnitPrice": 7,
                    "SupplierID": 2,
                    "Discontinued": false,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(14)/Supplier"
                        }
                    }
                },
                {
                    "ProductID": 15,
                    "ProductName": "Alice Mutton",
                    "UnitsInStock": 90,
                    "UnitsOnOrder": 20,
                    "UnitPrice": 75,
                    "SupplierID": 2,
                    "Discontinued": true,
                    "Supplier": {
                        "__deferred": {
                            "uri": "/destinations/northwind/V2/Northwind/Northwind.svc/Products(15)/Supplier"
                        }
                    }
                }
            ]
        }
    });
});
