/**
 * @fileoverview Order Service
 * @created 2025-06-08
 * @file order.service.js
 * @description This service handles all order-related business logic for the Kicks Shoes application.
 * It provides methods for creating, updating, and deleting orders.
 */

import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import mongoose from "mongoose";
import logger from "../utils/logger.js";

/**
 * Service class for handling order operations
 */
class OrderService {
  /**
   * Create a new order
   * @param {Object} orderData - Order data
   * @returns {Promise<Order>} The created order
   */
  static async createOrder(orderData) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      logger.info("Creating order:", { orderData });
      const { user, products, totalAmount, paymentMethod, shippingAddress } =
        orderData;

      if (
        !user ||
        !products ||
        !totalAmount ||
        !paymentMethod ||
        !shippingAddress
      ) {
        throw new Error("Missing required fields");
      }

      if (!Array.isArray(products) || products.length === 0) {
        throw new Error("Products must be a non-empty array");
      }

      if (typeof totalAmount !== "number" || totalAmount <= 0) {
        throw new Error("Invalid total amount");
      }

      const orderItems = await Promise.all(
        products.map(async (product) => {
          const orderItem = new OrderItem({
            product: product.id,
            quantity: product.quantity,
            price: product.price,
            size: product.size,
            color: product.color,
            subtotal: product.price * product.quantity,
          });
          await orderItem.save({ session });
          return orderItem._id;
        })
      );

      const order = new Order({
        user,
        items: orderItems,
        totalPrice: totalAmount,
        paymentMethod,
        shippingAddress,
        status: "pending",
        paymentStatus: "pending",
      });

      await order.save({ session });
      await session.commitTransaction();

      logger.info("Order created successfully", { orderId: order._id });
      return order;
    } catch (error) {
      await session.abortTransaction();
      logger.error("Error creating order:", {
        error: error.message,
        stack: error.stack,
      });
      throw new Error(`Failed to create order: ${error.message}`);
    } finally {
      session.endSession();
    }
  }

  /**
   * Get all orders
   * @returns {Promise<Order[]>} The list of orders
   */
  static async getOrders() {
    try {
      logger.info("Getting all orders");
      const orders = await Order.find();
      return orders;
    } catch (error) {
      logger.error("Error getting orders:", {
        error: error.message,
        stack: error.stack,
      });
    }
  }

  /**
   * Get all orders by order ID
   * @param {string} orderId - The ID of the order
   * @returns {Promise<Order>} The order
   */
  static async getOrderByOrderId(orderId) {
    try {
      logger.info("Getting order by order ID:", { orderId });
      if (!orderId) {
        logger.error("Order ID is required");
        throw new Error("Order ID is required");
      }

      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        logger.error("Invalid order ID");
        throw new Error("Invalid order ID");
      }

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const order = await Order.findById(orderId);
        await session.commitTransaction();
        return order;
      } catch (error) {
        await session.abortTransaction();
        logger.error("Error getting order by order ID:", {
          error: error.message,
          stack: error.stack,
        });
        throw new Error(`Failed to get order by order ID: ${error.message}`);
      } finally {
        session.endSession();
      }
    } catch (error) {
      logger.error("Error getting order by order ID:", {
        error: error.message,
        stack: error.stack,
      });
      throw new Error(`Failed to get order by order ID: ${error.message}`);
    }
  }

  /**
   * Get all order by user ID
   * @param {string} userId - The ID of the user
   * @returns {Promise<Order>} The order
   */
  static async getOrderByUserId(userId) {
    try {
      logger.info("Getting all orders by user ID:", { userId });
      if (!userId) {
        logger.error("User ID is required");
        throw new Error("User ID is required");
      }

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        logger.error("Invalid user ID");
        throw new Error("Invalid user ID");
      }

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const orders = await Order.find({ user: userId });
        await session.commitTransaction();
        return orders;
      } catch (error) {
        await session.abortTransaction();
        logger.error("Error getting orders by user ID:", {
          error: error.message,
          stack: error.stack,
        });
        throw new Error(`Failed to get orders by user ID: ${error.message}`);
      } finally {
        session.endSession();
      }
    } catch (error) {
      logger.error("Error getting orders by user ID:", {
        error: error.message,
        stack: error.stack,
      });
      throw new Error(`Failed to get orders by user ID: ${error.message}`);
    }
  }

  /**
   * Update an order
   * @param {string} orderId - The ID of the order
   * @param {Object} updateData - The data to update
   * @returns {Promise<Order>} The updated order
   */
  static async updateOrder(orderId, updateData) {
    try {
      logger.info("Updating order:", { orderId, updateData });
      if (!orderId) {
        logger.error("Order ID is required");
        throw new Error("Order ID is required");
      }

      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        logger.error("Invalid order ID");
        throw new Error("Invalid order ID");
      }
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const order = await Order.findByIdAndUpdate(orderId, updateData, {
          new: true,
        });
        await session.commitTransaction();
        return order;
      } catch (error) {
        await session.abortTransaction();
        logger.error("Error updating order:", {
          error: error.message,
          stack: error.stack,
        });
        throw new Error(`Failed to update order: ${error.message}`);
      } finally {
        session.endSession();
      }
    } catch (error) {
      logger.error("Error updating order:", {
        error: error.message,
        stack: error.stack,
      });
      throw new Error(`Failed to update order: ${error.message}`);
    }
  }

  /**
   * Cancel an order
   * @param {string} orderId - The ID of the order
   * @returns {Promise<Order>} The cancelled order
   */
  static async cancelOrder(orderId) {
    try {
      logger.info("Cancelling order:", { orderId });
      if (!orderId) {
        logger.error("Order ID is required");
        throw new Error("Order ID is required");
      }

      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        logger.error("Invalid order ID");
        throw new Error("Invalid order ID");
      }

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const order = await Order.findByIdAndUpdate(orderId, {
          status: "cancelled",
        });
        await session.commitTransaction();
        return order;
      } catch (error) {
        await session.abortTransaction();
        logger.error("Error cancelling order:", {
          error: error.message,
          stack: error.stack,
        });
        throw new Error(`Failed to cancel order: ${error.message}`);
      } finally {
        session.endSession();
      }
    } catch (error) {
      logger.error("Error cancelling order:", {
        error: error.message,
        stack: error.stack,
      });
      throw new Error(`Failed to cancel order: ${error.message}`);
    }
  }

  /**
   * Refund an order
   * @param {string} orderId - The ID of the order
   * @returns {Promise<Order>} The refunded order
   */
  static async refundOrder(orderId) {
    try {
      logger.info("Refunding order:", { orderId });
      if (!orderId) {
        logger.error("Order ID is required");
        throw new Error("Order ID is required");
      }
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        logger.error("Invalid order ID");
        throw new Error("Invalid order ID");
      }

      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const order = await Order.findByIdAndUpdate(orderId, {
          status: "refunded",
        });
        await session.commitTransaction();
        return order;
      } catch (error) {
        await session.abortTransaction();
        logger.error("Error refunding order:", {
          error: error.message,
          stack: error.stack,
        });
        throw new Error(`Failed to refund order: ${error.message}`);
      } finally {
        session.endSession();
      }
    } catch (error) {
      logger.error("Error refunding order:", {
        error: error.message,
        stack: error.stack,
      });
      throw new Error(`Failed to refund order: ${error.message}`);
    }
  }
}

export { OrderService };
