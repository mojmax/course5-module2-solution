(function () {
'use strict';
var items  =
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('BuyListService', BuyListService)
.service('BoughtListService', BoughtListService);

ToBuyController.$inject = ['BuyListService','BoughtListService'];

function ToBuyController(BuyListService, BoughtListService) {
  var list = this;
  var numItem = 0;
  list.items = BuyListService.getItems();
  list.itemName = "";
  list.itemQuantity = "";
  list.buyItem = function (itemIndex) {
    var name = BuyListService.getItem(itemIndex).name;
    var quantity = BuyListService.getItem(itemIndex).quantity;
    BoughtListService.addItem(name , quantity);
    BuyListService.buyItem(itemIndex);
    if ( list.items.length == 0 ) {
        list.errorMessage = "Everything is bought!";
    }
  }
}

AlreadyBoughtController.$inject = ['BoughtListService'];
function AlreadyBoughtController(BoughtListService) {
  var list = this;
  list.errorMessage = "";
  list.items = BoughtListService.getItems();
}

function BuyListService() {
  var service = this;
  var items =  [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "3"
    },
    {
      name: "pepperMint",
      quantity: "4"
    }
  ];
  service.buyItem = function (itemIndex) {
      items.splice(itemIndex, 1);
  };
  service.getItem = function (itemIndex) {
    return items[itemIndex];
  };
  service.getItems = function () {
    // if (items.length > 0) {
      return items;
    // } else {
    //   console.log("Buy Item vuota");
    //   throw new Error("Vuota");
    // }
  };
}

function BoughtListService() {
  var service = this;
  items = [];
  items.errorMessage = "Nothing bought yet.";
  service.getItems = function () {
      return items;
  };
  service.numItems = function () {
    console.log(items.length);
    return items.length;
  }
  service.addItem = function(itemName, itemQuantity) {
    var item = {
      name: itemName,
      quantity: itemQuantity
    };
    items.errorMessage = "";
    items.push(item)
  };

}
})();
