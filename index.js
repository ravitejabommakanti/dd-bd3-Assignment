const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const cart = require('./mockdata');

const app = express();
const port = 3010;

app.use(cors());
app.use(express.json());

app.use(express.static('static'));

// Endpoint 1: Add an Item to the Cart
// http://localhost:3000/cart/add?productId=3&name=Tablet&price=15000&quantity=1
function addCartItem(productId, name, price, quantity) {
  const obj = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart.push(obj);
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseFloat(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseFloat(req.query.quantity);
  let cartItems = addCartItem(productId, name, price, quantity);
  res.status(200).json({ cartItems });
});

// Endpoint 2: Edit Quantity of an Item in the Cart
// http://localhost:3000/cart/edit?productId=2&quantity=3

function updateCartItmes(productId, quantity) {
  let index = cart.findIndex((obj) => obj.productId === productId);
  if (index != -1) {
    cart[index].quantity = quantity;
    return cart;
  } else {
    return [];
  }
}

app.get('/cart/edit', (req, res) => {
  let productId = parseFloat(req.query.productId);
  let quantity = parseFloat(req.query.quantity);
  let cartItems = updateCartItmes(productId, quantity);
  res.status(200).json({ cartItems });
});

// Endpoint 3: Delete an Item from the Cart
// http://localhost:3000/cart/delete?productId=1

function deleteCartItmes(productId) {
  let index = cart.findIndex((obj) => obj.productId === productId);
  if (index != -1) {
    cart.splice(index, 1);
    return cart;
  } else {
    return cart;
  }
}

app.get('/cart/delete', (req, res) => {
  let productId = parseFloat(req.query.productId);
  let cartItems = deleteCartItmes(productId);
  res.status(200).json({ cartItems });
});

// Endpoint 4: Read Items in the Cart
// http://localhost:3000/cart
function getAllCartItems() {
  return cart;
}

app.get('/cart', (req, res) => {
  let cartItems = getAllCartItems();
  res.status(200).json({ cartItems });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart
// http://localhost:3000/cart/total-quantity

function getAllCartItemsQuantity() {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = getAllCartItemsQuantity();
  res.status(200).json({ totalQuantity });
});

// Endpoint 6: Calculate Total Price of Items in the Cart
// http://localhost:3000/cart/total-price

function getAllCartItemsPrice() {
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let totalPrice = getAllCartItemsPrice();
  res.status(200).json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
