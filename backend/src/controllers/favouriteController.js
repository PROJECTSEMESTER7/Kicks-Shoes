import Favourite from "../models/Favourite.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import logger from "../utils/logger.js";

/**
 * @desc    Add product to favourites
 * @route   POST /api/favourites
 * @access  Private
 */
export const addToFavourites = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // Check if already in favourites
    const existingFavourite = await Favourite.findOne({
      user: userId,
      product: productId,
    });

    if (existingFavourite) {
      return next(new ErrorResponse("Product already in favourites", 400));
    }

    // Add to favourites
    const favourite = await Favourite.create({
      user: userId,
      product: productId,
    });

    // Populate product details
    const populatedFavourite = await Favourite.findById(favourite._id)
      .populate("product", "name price images description")
      .populate("user", "fullName email");

    res.status(201).json({
      success: true,
      data: populatedFavourite,
    });
  } catch (error) {
    logger.error("Error in addToFavourites", {
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};

/**
 * @desc    Remove product from favourites
 * @route   DELETE /api/favourites/:productId
 * @access  Private
 */
export const removeFromFavourites = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const favourite = await Favourite.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!favourite) {
      return next(new ErrorResponse("Favourite not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product removed from favourites",
    });
  } catch (error) {
    logger.error("Error in removeFromFavourites", {
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};

/**
 * @desc    Get user's favourites
 * @route   GET /api/favourites
 * @access  Private
 */
export const getFavourites = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const favourites = await Favourite.find({ user: userId })
      .populate("product", "name price images description")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: favourites.length,
      data: favourites,
    });
  } catch (error) {
    logger.error("Error in getFavourites", {
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};

/**
 * @desc    Check if product is in favourites
 * @route   GET /api/favourites/check/:productId
 * @access  Private
 */
export const checkFavourite = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const favourite = await Favourite.findOne({
      user: userId,
      product: productId,
    });

    res.status(200).json({
      success: true,
      isFavourite: !!favourite,
    });
  } catch (error) {
    logger.error("Error in checkFavourite", {
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};

/**
 * @desc    Get favourites by user ID
 * @route   GET /api/favourites/user/:userId
 * @access  Private/Admin
 */
export const getFavouritesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Check if user is admin or requesting their own favourites
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return next(new ErrorResponse('Not authorized to access other users favourites', 403));
    }

    const favourites = await Favourite.find({ user: userId })
      .populate({
        path: 'product',
        select: 'name price images description brand variants.sizes variants.colors'
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: favourites.length,
      data: favourites
    });
  } catch (error) {
    logger.error("Error in getFavouritesByUserId", {
      error: error.message,
      stack: error.stack
    });
    next(error);
  }
}; 