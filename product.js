// Products Data
var products = [
  { name: "Party Decorations", price: 29.99 },
  { name: "Celebration Package", price: 99.99 },
  { name: "Event Supplies Kit", price: 49.99 },
];

// Render Products
function renderProducts() {
  var productList = document.getElementById("productList");
  // var productHTML =
  //   '<div class="coming-soon">' +
  //   "<h2>Coming Soon</h2>" +
  //   "<p>Get ready for exciting new products!</p>" +
  //   "</div>";

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    productHTML +=
      '<div class="product-item">' +
      "<div>" +
      "<h3>" +
      product.name +
      "</h3>" +
      "<p>$" +
      product.price.toFixed(2) +
      "</p>" +
      "</div>" +
      '<button class="add-to-cart">Add to Cart</button>' +
      "</div>";
  }

  productList.innerHTML = productHTML;
}

// Initialize
renderProducts();
