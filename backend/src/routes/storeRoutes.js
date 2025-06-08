/**
 * @fileoverview Store Routes
 * @created 2025-06-04
 * @file storeRoutes.js
 * @description This file defines all store-related routes for the Kicks Shoes application.
 * It maps HTTP endpoints to their corresponding controller functions and applies necessary middleware.
 */

import express from "express";
import {
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
  createStore,
} from "../controllers/storeController.js";

const router = express.Router();

router.route("/").get(getStores);// Get all stores

router.route("/:id").get(getStoreById).put(updateStore);// Get store by id and update store

router.route("/:id/delete").delete(deleteStore);// Delete store

router.route("/create").post(createStore);// Create store

export default router;
