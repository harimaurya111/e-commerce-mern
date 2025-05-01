const express = require('express');
const { createProduct, getAllProduct, getSingleProducts, updateProduct, deleteProduct, relatedProduct } = require('../controllers/productController');
const router = express.Router()


router.post("/create-product",createProduct)
router.get("/",getAllProduct)
router.get("/:id",getSingleProducts)
router.patch("/product-update/:id",updateProduct)
router.delete("/:id",deleteProduct)
router.patch("/related/:id",relatedProduct)





module.exports = router