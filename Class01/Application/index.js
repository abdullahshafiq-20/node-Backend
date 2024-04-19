// console.log ("hello");

import express from 'express';
const app = express();
const port = 5000;




//api
// to see changee we need to restart the server
app.get('/', (req, res) => {
    res.send("Hello World this is again");
});

const products = [
    {
      "id": 1,
      "name": "Smartphone",
      "description": "A high-quality smartphone with advanced features.",
      "price": 599.99,
      "category": "Electronics"
    },
    {
      "id": 2,
      "name": "Laptop",
      "description": "A powerful laptop for work and entertainment.",
      "price": 999.99,
      "category": "Electronics"
    },
    {
      "id": 3,
      "name": "Headphones",
      "description": "Premium noise-canceling headphones for immersive audio experience.",
      "price": 199.99,
      "category": "Electronics"
    },
    {
      "id": 4,
      "name": "Smartwatch",
      "description": "A sleek smartwatch with fitness tracking and notification features.",
      "price": 149.99,
      "category": "Electronics"
    },
    {
      "id": 5,
      "name": "Running Shoes",
      "description": "Comfortable running shoes with advanced cushioning technology.",
      "price": 79.99,
      "category": "Sporting Goods"
    }
  ];

    app.get('/api/products', (req, res) => {
        res.json(products);
      });
  


// http://localhost:5000/

app.listen(port, () => console.log("server rinnung on port 5000"));

