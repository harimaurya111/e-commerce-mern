const Products = require("../models/productModel");
const Review = require("../models/reviewModel");

const createProduct = async (req, res) => {
  try {
    const newProduct = new Products({
      ...req.body,
    });

    const savedProduct = await newProduct.save();
    const reviews = await Review.find({ productId: savedProduct._id });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );

      const averageRating = totalRating / reviews.length;
      savedProduct.rating = averageRating;
      await savedProduct.save();
    }
    res.status(201).send(savedProduct);
  } catch (error) {
    console.error("Error creating new product", error);
    res.status(500).send({ MessageChannel: "Fail to create new Product" });
  }
};

// get All products

const getAllProduct = async (req, res) => {
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;
    let filter = {};
    if (category && category !== "all") {
      filter.category = category;
    }
    if (color && color !== "all") {
      filter.color = color;
    }
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));
    const products = await Products.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "email")
      .sort({ createdAt: -1 });
    res.status(200).send({ products, totalPages, totalProducts });
  } catch (error) {
    console.error("Error Fetching product", error);
    res.status(500).send({ message: "Error fetching products" });
  }
};

// Get single Products

const getSingleProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const product = await Products.findById(productId).populate(
      "author",
      "email username"
    );
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    const reviews = await Review.find({ productId }).populate(
      "userId",
      "username email"
    );
    res.status(200).send({ product, reviews });
  } catch (error) {
    console.error("Error Fetching product", error);
    res.status(500).send({ message: "Error fetching products" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id; // URL se productId nikal rahe hain
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { ...req.body }, // jo naye data aaye hain (body me), unse update karenge
      { new: true } // update hone ke baad ka latest document return kare
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating the product", error);
    res.status(500).send({ message: "Failed to update the product" });
  }
};

const deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await Products.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).send({ message: "Product not found" });
      }
  
      // Delete reviews related to the product
      await Review.deleteMany({ productId: productId });
  
      res.status(200).send({
        message: "Product deleted successfully"
      });
  
    } catch (error) {
      console.error("Error deleting the product", error);
      res.status(500).send({ message: "Failed to delete the product" });
    }
  };
  

  const relatedProduct = async ()=>{
    try {
        const {id} =req.params
        if(!id){
            return res.status(400).send({message:"Product Id is required"})
        }
        const product = await Products.findById(id);
        if(!product){
            return res.status(400).send({message:"Product not found"})
        }

        const titleRegex = newExp(
            product.name.split(" ").filter((word)=>word.length>1).join("|"), "i"
        )

        const relatedProducts = await Products.find({
            _id:{$ne:id},
            $or:[
                {name:{$regex:titleRegex}},
                {category:product.category},
            ],
        })
   
        res.status(200).send(relatedProducts)
    } catch (error) {
        
    }
  }

module.exports = { createProduct, getAllProduct, getSingleProducts,updateProduct,deleteProduct,relatedProduct };
