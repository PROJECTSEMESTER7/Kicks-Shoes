/**
 * @fileoverview Shop Controller
 * @created 2025-06-04
 * @file storeController.js
 * @description This controller handles all shop-related HTTP requests for the Kicks Shoes application.
 * It processes incoming requests, validates input data, and coordinates with the shop service
 * to perform shop operations. The controller is responsible for request/response handling
 * and error management.
 */

import e from "express";
import Product from "../models/Product.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import logger from "../utils/logger.js";
import Store from "../models/Store.js";

// Get shop products
export const getStoreProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("brand", "name");

    res.status(200).json(products);
  } catch (error) {
    logger.error("Error in getStoreProducts", {
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};

// Add shop product
export const addStoreProduct = async (req, res, next) => {
  try {
    const productData = {
      ...req.body,
      images: req.files ? req.files.map((file) => file.path) : [],
    };

    const product = await Product.create(productData);
    await product.populate("category", "name");
    await product.populate("brand", "name");

    res.status(201).json(product);
  } catch (error) {
    logger.error("Error in addStoreProduct", {
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};

// Update shop product
export const updateStoreProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    const updates = { ...req.body };
    if (req.files && req.files.length > 0) {
      updates.images = req.files.map((file) => file.path);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      updates,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("category", "name")
      .populate("brand", "name");

    res.status(200).json(updatedProduct);
  } catch (error) {
    logger.error("Error in updateStoreProduct", {
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};

// Delete shop product
export const deleteStoreProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    await product.remove();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    logger.error("Error in deleteStoreProduct", {
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};

// Delete store
export const deleteStore = async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create new store
export const createStore = async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();
    res.status(201).json(store);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateStore = async (req, res) => {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    });
    if (!store) {
    return res.status(404).json({ message: "Store not found" });
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}