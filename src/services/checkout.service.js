const config = require('../config/config');
const productModel = require('../models/product.model');
const ApiError = require('../utils/ApiError');

const VALID_PAYMENT_METHODS = ['cash', 'credit_card'];

function checkout({ items, paymentMethod }) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new ApiError(400, 'items must be a non-empty array');
  }
  if (!VALID_PAYMENT_METHODS.includes(paymentMethod)) {
    throw new ApiError(400, `paymentMethod must be one of: ${VALID_PAYMENT_METHODS.join(', ')}`);
  }

  const orderItems = items.map(({ productId, quantity }) => {
    const product = productModel.findById(productId);
    if (!product) {
      throw new ApiError(404, `Product with id ${productId} not found`);
    }
    const qty = Number(quantity) || 0;
    if (qty <= 0) {
      throw new ApiError(400, `quantity for product ${productId} must be greater than 0`);
    }
    return {
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: qty,
      subtotal: Number((product.price * qty).toFixed(2)),
    };
  });

  const subtotal = Number(
    orderItems.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)
  );

  const discount = paymentMethod === 'cash' ? Number((subtotal * config.cashDiscount).toFixed(2)) : 0;
  const total = Number((subtotal - discount).toFixed(2));

  return {
    paymentMethod,
    items: orderItems,
    subtotal,
    discount,
    total,
  };
}

module.exports = { checkout };
