const express = require('express');
const {
  getBlogs,
  getBlogBySlug,
  getRecentBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

const router = express.Router();

router.get('/', getBlogs);
router.get('/recent', getRecentBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
