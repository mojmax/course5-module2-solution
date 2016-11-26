(function () {
'use strict';
var items  =
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService)
;

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var dom = this;
  var numItem = 0;
  dom.toBuyItems = ShoppingListCheckOffService.getItemsToBuy();
   dom.buyItem = function (itemIndex) {
     ShoppingListCheckOffService.buyItem(itemIndex);
     if ( dom.toBuyItems.length == 0 ) {
           dom.errorMessage = "Everything is bought!" ;
     }
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var dom = this;
  dom.boughtItems = ShoppingListCheckOffService.getItemsBought();
  dom.boughtItems.boghtErrorMessage = "Nothing bought yet ";
}

function ShoppingListCheckOffService() {
  var service = this;
  var toBuyItems =  [
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
      name: "PepperMint",
      quantity: "4"
    },
    {
      name: "IceCream",
      quantity: "3"
    }
  ];
  var boughtItems = [];
  service.buyItem = function (itemIndex) {
     var name = service.getItem(itemIndex).name;
     var quantity = service.getItem(itemIndex).quantity;
     toBuyItems.splice(itemIndex, 1);
     var item = {
          name: name,
          quantity: quantity
      };
      boughtItems.boghtErrorMessage = "";
      boughtItems.push(item);
  };
  service.getItem = function (itemIndex) {
     return toBuyItems[itemIndex];
  };
  service.getItemsToBuy = function () {
      return toBuyItems;
  };
  service.getItemsBought = function () {
      return boughtItems;
  };
}


})();
