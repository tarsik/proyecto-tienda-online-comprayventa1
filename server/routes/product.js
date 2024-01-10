// import express from "express";
// import mongoose from "mongoose";
// import { ProductModel } from "../models/Recipes.js";
// import { UserModel } from "../models/Users.js";
// import { verifyToken } from "./user.js";

// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const result = await ProductModel.find({});
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Create a new recipe
// router.post("/", verifyToken, async (req, res) => {
//   const product = new ProductModel({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     category: req.body.category,
//     price: req.body.price,
//     region: req.body.region,
//     comuna: req.body.comuna,
//     description: req.body.description,
//     contact: req.body.contact,
//     cookingTime: req.body.cookingTime,
//     userOwner: req.body.userOwner,
//   });
//   console.log(product);

//   try {
//     const result = await product.save();
//     res.status(201).json({
//       createdProduct: {
//         name: result.name,
//         category: result.category,
//         price: result.price,
//         region: result.region,
//         comuna: result.comuna,
//         description: result.description,
//         contact: result.contact,
//         _id: result._id,
//       },
//     });
//   } catch (err) {
//       res.status(500).json(err);
//       console.log(err);
//   }
// });

// // Get a recipe by ID
// router.get("/:productId", async (req, res) => {
//   try {
//     const result = await ProductModel.findById(req.params.productId);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Save a Recipe
// router.put("/", async (req, res) => {
//   const product = await ProductModel.findById(req.body.productID);
//   const user = await UserModel.findById(req.body.userID);
//   try {
//     user.savedProducts.push(product);
//     await user.save();
//     res.status(201).json({ savedProducts: user.savedProducts });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get id of saved recipes
// router.get("/savedProducts/ids/:userId", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.userId);
//     res.status(201).json({ savedProducts: user?.savedProducts });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // Get saved recipes
// router.get("/savedProducts/:userId", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.userId);
//     const savedProducts = await ProductModel.find({
//       _id: { $in: user.savedProducts },
//     });

//     console.log(savedProducts);
//     res.status(201).json({ savedProducts });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// export { router as productsRouter };

import express from "express";
import { getProducts, createProduct, getProductById, saveProduct, getSavedProductIds, getSavedProducts, updateProduct } from '../controller/product.controller.js'
import { verifyToken } from "./user.js";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);
productsRouter.post("/", verifyToken, createProduct);
productsRouter.get("/:productId", getProductById);
productsRouter.put("/", saveProduct);
productsRouter.get("/savedProducts/ids/:userId", getSavedProductIds);
productsRouter.get("/savedProducts/:userId", getSavedProducts);
productsRouter.put("/:productId", updateProduct);

export default productsRouter;
