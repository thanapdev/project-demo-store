//add fruits to items
const fruits = [
    { id: 1, name: "Apple", category: "Citrus", price: 2.99, image: "https://placehold.co/300x200?text=Apple " },
    { id: 2, name: "Banana", category: "Tropical", price: 1.49, image: "https://placehold.co/300x200?text=Banana " },
    { id: 3, name: "Orange", category: "Citrus", price: 3.29, image: "https://placehold.co/300x200?text=Orange " },
    { id: 4, name: "Mango", category: "Tropical", price: 4.99, image: "https://placehold.co/300x200?text=Mango " },
    { id: 5, name: "Strawberry", category: "Berries", price: 5.99, image: "https://placehold.co/300x200?text=Strawberry " },
    { id: 6, name: "Blueberry", category: "Berries", price: 6.49, image: "https://placehold.co/300x200?text=Blueberry " },
    { id: 7, name: "Pineapple", category: "Tropical", price: 3.99, image: "https://placehold.co/300x200?text=Pineapple " },
    { id: 8, name: "Lemon", category: "Citrus", price: 2.49, image: "https://placehold.co/300x200?text=Lemon " },
    { id: 9, name: "Grapes", category: "Berries", price: 4.29, image: "https://placehold.co/300x200?text=Grapes " },
  ];
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }