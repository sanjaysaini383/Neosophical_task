// Product and Category Types
export var ProductCategory;
(function (ProductCategory) {
    ProductCategory["VEGETABLES"] = "vegetables";
    ProductCategory["FRUITS"] = "fruits";
    ProductCategory["MEAT"] = "meat";
    ProductCategory["FISH"] = "fish";
    ProductCategory["BAKERY"] = "bakery";
    ProductCategory["BEVERAGES"] = "beverages";
    ProductCategory["DAIRY"] = "dairy";
    ProductCategory["GRAINS"] = "grains";
})(ProductCategory || (ProductCategory = {}));
export var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["CONFIRMED"] = "confirmed";
    OrderStatus["PROCESSING"] = "processing";
    OrderStatus["READY"] = "ready";
    OrderStatus["DELIVERED"] = "delivered";
    OrderStatus["CANCELLED"] = "cancelled";
    OrderStatus["FAILED"] = "failed";
})(OrderStatus || (OrderStatus = {}));
