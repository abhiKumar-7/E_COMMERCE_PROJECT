document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 50.99 },
        { id: 3, name: "Product 3", price: 80.99 },
    ];
    const cart = []; // we will push that object in this array

    // now access all the  element
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");


// now we have to render the product in container.
// run a loop in products
products.forEach(product=>{
    const productDiv= document.createElement("div");// this div is created for each product
    productDiv.classList.add('product');// add a css to product
    productDiv.innerHTML=`<span>${product.name} -$${product.price.toFixed(2)}</span> 
    <button data-id="${product.id}">Add to cart</button>`;//add a inner text in div & toFixed(2) mean decimal point is upto 2 digit only

    productList.appendChild(productDiv);//this will add div in product list
    // till here the element will only display in container
});

productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        // console.log(typeof e.target.getAttribute("data-id"));
      const productId = parseInt(e.target.getAttribute("data-id"));// this attribuute was in string so we conver in into integer becouse id is in integer
      const product = products.find((p) => p.id === productId); //.find() return the first element of the array if the given conditions is true
      addToCart(product);// it is a method use in e-commerce app to directly add the product in shopping cart
    }
});

function addToCart(product) {
    cart.push(product);
    renderCart();
  }

 function renderCart() {
  cartItems.innerText = "";
  let totalPrice = 0;

  if (cart.length > 0) {
    emptyCartMessage.classList.add("hidden");
    cartTotalMessage.classList.remove("hidden");

    cart.forEach((item, index) => {
      totalPrice += item.price;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;

      cartItems.appendChild(cartItem);
    });

    totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
  } else {
    emptyCartMessage.classList.remove("hidden");
    cartTotalMessage.classList.add("hidden");
    totalPriceDisplay.textContent = `$0.00`;
  }

  // Attach remove button event handlers
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const indexToRemove = parseInt(e.target.getAttribute("data-index"));
      cart.splice(indexToRemove, 1);
      renderCart();
    });
  });
}

  

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout successfully");
    renderCart();
  });
});
