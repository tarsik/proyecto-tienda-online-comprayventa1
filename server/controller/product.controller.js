import multer from 'multer';
import mongoose from "mongoose";
import { ProductModel } from "../models/Products.js";
import { UserModel } from "../models/Users.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // La carpeta donde se almacenarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  },
});

const upload = multer({ storage: storage });

// Get all products
export const getProducts = async (req, res) => {
  try {
    const result = await ProductModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new product
// export const createProduct = async (req, res) => {
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
//     res.status(500).json(err);
//     console.log(err);
//   }
// };

export const createProduct = async (req, res) => {
  // ...
  try {
    // Aquí utilizamos Multer para cargar la imagen
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          message: 'Error al cargar la imagen',
          error: err,
        });
      }

      // Creación del nuevo producto
      const product = new ProductModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        region: req.body.region,
        comuna: req.body.comuna,
        description: req.body.description,
        contact: req.body.contact,
        cookingTime: req.body.cookingTime,
        userOwner: req.body.userOwner,
        image: req.file ? req.file.path.replace("uploads\\", "") : '', // Guarda la ruta del archivo en el campo image
      });

      try {
        const result = await product.save();
        res.status(201).json({
          createdProduct: {
            name: result.name,
            category: result.category,
            price: result.price,
            region: result.region,
            comuna: result.comuna,
            description: result.description,
            contact: result.contact,
            _id: result._id,
          },
        });
      } catch (err) {
        res.status(500).json(err);
        console.log(err);
      }
    });
  } catch (err) {
    res.status(500).json({
      message: 'No hemos podido crear un nuevo producto',
      error: err,
    });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const result = await ProductModel.findById(req.params.productId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Save a product
export const saveProduct = async (req, res) => {
  const product = await ProductModel.findById(req.body.productID);
  const user = await UserModel.findById(req.body.userID);

  try {
    user.savedProducts.push(product);
    await user.save();
    res.status(201).json({ savedProducts: user.savedProducts });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get IDs of saved products
export const getSavedProductIds = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedProducts: user?.savedProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Get saved products
export const getSavedProducts = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedProducts = await ProductModel.find({
      _id: { $in: user.savedProducts },
    });

    console.log(savedProducts);
    res.status(201).json({ savedProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Update a product
// export const updateProduct = async (req, res) => {
//   const { productId } = req.params;

//   try {
//     const updatedProduct = await ProductModel.findByIdAndUpdate(productId, req.body, { new: true });
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
export const updateProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    // Aquí también utilizamos Multer para cargar la imagen
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          message: 'Error al cargar la imagen',
          error: err,
        });
      }

      try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
          productId,
          {
            ...req.body,
            image: req.file ? req.file.path : '', // Guarda la ruta del archivo en el campo image
          },
          { new: true }
        );
        res.status(200).json(updatedProduct);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  } catch (err) {
    res.status(500).json({
      message: 'No hemos podido actualizar el producto',
      error: err,
    });
  }
};