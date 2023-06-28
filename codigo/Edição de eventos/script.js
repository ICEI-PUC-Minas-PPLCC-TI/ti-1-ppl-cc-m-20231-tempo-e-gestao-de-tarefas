var cartItems = [];

function addToCart(productId) {
  // Aqui você pode adicionar a lógica para adicionar o produto ao carrinho
  cartItems.push(productId);
  updateCart();
}

function updateCart() {
  var cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";

  for (var i = 0; i < cartItems.length; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = "Produto " + cartItems[i];
    cartItemsElement.appendChild(listItem);
  }

  var totalPriceElement = document.getElementById("total-price");
  var totalPrice = calculateTotalPrice();
  totalPriceElement.textContent = "Total: R$ " + totalPrice;
}

function calculateTotalPrice() {
  // Aqui você pode adicionar a lógica para calcular o preço total do carrinho
  var totalPrice = 0;

  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i] === 1) {
      totalPrice += 10;
    } else if (cartItems[i] === 2) {
      totalPrice += 20;
    }
    // Adicione mais condições conforme necessário para outros produtos
  }

  return totalPrice;
}

function checkout() {
  // Aqui você pode adicionar a lógica para o processo de finalização da compra
  alert("Compra finalizada! Obrigado por comprar conosco.");
  cartItems = [];
  updateCart();
}
