const Category = require('../models/Category');

const getCategories = async (_req, res, next) => {
  try {
    const data = await Category.find({}).sort({ name: 1 }).lean();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories };
