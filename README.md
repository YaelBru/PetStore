# Pet Store

This app is the final project of the Technion Full Stack course.
Live demo: https://yb-pet-store.herokuapp.com

## Features
Fully responsive web application.
App features include:
 1. Contact options including a form built with ReactiveFormsModule
 2. Pets available for adoption with state management using NgRx
 3. Store Module - 
     * State managed with NgRx
     * Store items:
       - List of items fetched from MongoDB Atlas database
       - Pagination
       - Filter items by categories 
       - Search items list option
     * Shopping carrt modal:
       - Display the current number of items in the cart
       - When opened - displaying the current items in the shopping cart
       - Options to edit cart or continue to checkout 
     * Shopping cart:
       - List of the current items in the shopping cart
       - Cart options include update item quantity, remove item, proceed to checkout
     * User:
       - User information
       - View orders history
     * Authentication:
       - Clients need to register/login to make a purchase
       - Payment available to authenticated users only
       - You can register or login -
     
     
           Email        | Password
           ------------ | -------------
           a@a.com      | 1111


## Tech and Frameworks
  * Angular 8
  * NgRx
  * Node.js
  * Express
  * Mongoose
  * MongoDB
  * Angular Bootstrap 
  * Angular Material

