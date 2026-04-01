const slugify = require('slugify');
const Blog = require('../models/Blog');

const buildBlogQuery = ({ search, category, featured }) => {
  const query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } }
    ];
  }
  if (category) {
    query.category = category;
  }
  if (featured === 'true') {
    query.isFeatured = true;
  }
  if (featured === 'false') {
    query.isFeatured = false;
  }
  return query;
};

const getBlogs = async (req, res, next) => {
  try {
    const { search = '', category = '', sort = 'latest', featured } = req.query;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 6, 1);

    const filter = buildBlogQuery({ search, category, featured });
    const sortOption = sort === 'oldest' ? { publishedAt: 1 } : { publishedAt: -1 };

    const total = await Blog.countDocuments(filter);
    const pages = Math.max(Math.ceil(total / limit), 1);
    const safePage = Math.min(page, pages);
    const skip = (safePage - 1) * limit;

    const data = await Blog.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      data,
      pagination: {
        total,
        page: safePage,
        pages,
        limit
      }
    });
  } catch (error) {
    next(error);
  }
};

const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).lean();
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    return next(error);
  }
};

const getRecentBlogs = async (_req, res, next) => {
  try {
    const data = await Blog.find({})
      .sort({ publishedAt: -1 })
      .limit(5)
      .select('title slug thumbnail publishedAt')
      .lean();

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    Object.assign(blog, req.body);

    if (req.body.title && !req.body.slug) {
      blog.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    const updatedBlog = await blog.save();
    return res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    return next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    return res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  getRecentBlogs,
  createBlog,
  updateBlog,
  deleteBlog
};
