import Discount from '../models/Discount.js';

// Get all discounts
const getAllDiscounts = async (req, res) => {
  try {
    const { isActive, page = 1, limit = 10, category, product } = req.query;
    const query = {};
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (category) {
      query.applicableCategories = category;
    }

    if (product) {
      query.applicableProducts = product;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const discounts = await Discount.find(query)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .sort(options.sort)
      .populate('applicableProducts', 'name price')
      .populate('applicableCategories', 'name');

    const total = await Discount.countDocuments(query);

    res.status(200).json({
      success: true,
      data: discounts,
      pagination: {
        currentPage: options.page,
        totalPages: Math.ceil(total / options.limit),
        totalItems: total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching discounts',
      error: error.message
    });
  }
};

// Get single discount by ID
const getDiscountById = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id)
      .populate('applicableProducts', 'name price')
      .populate('applicableCategories', 'name');

    if (!discount) {
      return res.status(404).json({
        success: false,
        message: 'Discount not found'
      });
    }

    res.status(200).json({
      success: true,
      data: discount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching discount',
      error: error.message
    });
  }
};

// Create new discount
const createDiscount = async (req, res) => {
  try {
    const {
      code,
      description,
      discountType,
      value,
      maxDiscount,
      startDate,
      endDate,
      minPurchaseAmount,
      usageLimit,
      applicableProducts,
      applicableCategories
    } = req.body;

    // Check if discount code already exists
    const existingDiscount = await Discount.findOne({ code: code.toUpperCase() });
    if (existingDiscount) {
      return res.status(400).json({
        success: false,
        message: 'Discount code already exists'
      });
    }

    // Validate dates
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    const discount = await Discount.create({
      code: code.toUpperCase(),
      description,
      discountType,
      value,
      maxDiscount,
      startDate,
      endDate,
      minPurchaseAmount,
      usageLimit,
      usedCount: 0,
      isActive: true,
      applicableProducts,
      applicableCategories
    });

    // Populate references for response
    await discount.populate('applicableProducts', 'name price');
    await discount.populate('applicableCategories', 'name');

    res.status(201).json({
      success: true,
      data: discount,
      message: 'Discount created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating discount',
      error: error.message
    });
  }
};

// Update discount
const updateDiscount = async (req, res) => {
  try {
    const {
      description,
      discountType,
      value,
      maxDiscount,
      startDate,
      endDate,
      minPurchaseAmount,
      usageLimit,
      isActive,
      applicableProducts,
      applicableCategories
    } = req.body;

    const discount = await Discount.findById(req.params.id);
    if (!discount) {
      return res.status(404).json({
        success: false,
        message: 'Discount not found'
      });
    }

    // Update fields
    if (description) discount.description = description;
    if (discountType) discount.discountType = discountType;
    if (value !== undefined) discount.value = value;
    if (maxDiscount !== undefined) discount.maxDiscount = maxDiscount;
    if (startDate) discount.startDate = startDate;
    if (endDate) discount.endDate = endDate;
    if (minPurchaseAmount !== undefined) discount.minPurchaseAmount = minPurchaseAmount;
    if (usageLimit !== undefined) discount.usageLimit = usageLimit;
    if (isActive !== undefined) discount.isActive = isActive;
    if (applicableProducts) discount.applicableProducts = applicableProducts;
    if (applicableCategories) discount.applicableCategories = applicableCategories;

    const updatedDiscount = await discount.save();
    await updatedDiscount.populate('applicableProducts', 'name price');
    await updatedDiscount.populate('applicableCategories', 'name');

    res.status(200).json({
      success: true,
      data: updatedDiscount,
      message: 'Discount updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating discount',
      error: error.message
    });
  }
};

// Delete discount
const deleteDiscount = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);
    if (!discount) {
      return res.status(404).json({
        success: false,
        message: 'Discount not found'
      });
    }

    await discount.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Discount deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting discount',
      error: error.message
    });
  }
};

// Check if discount is valid
const validateDiscount = async (req, res) => {
  try {
    const { code } = req.params;
    const discount = await Discount.findOne({ code: code.toUpperCase() });

    if (!discount) {
      return res.status(404).json({
        success: false,
        message: 'Discount not found'
      });
    }

    const isValid = discount.isValid();

    res.status(200).json({
      success: true,
      data: {
        isValid,
        discount: isValid ? discount : null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error validating discount',
      error: error.message
    });
  }
};

export {
  getAllDiscounts,
  getDiscountById,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  validateDiscount
}; 