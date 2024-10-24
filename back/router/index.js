const express = require("express");

const { addToCart } = require("../controller/product/cartController");
const { registerUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../controller/user/userController");
const { loginUser } = require("../controller/user/authController");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controller/product/productController");
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require("../controller/product/categoryController");
const router = express.Router();


// Routes d'accueil
router.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// Routes pour l'authentification des utilisateurs
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// Routes pour les catégories
router.get("/categories", getAllCategories);
router.get("/category/:id", getCategoryById);
router.post("/category", createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

// Routes pour les produits
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

// Route pour le panier
router.post('/add-to-cart', addToCart);

module.exports = router;
