const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    thumbnail: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      avatar: { type: String, required: true }
    },
    category: { type: String, required: true, index: true },
    tags: [{ type: String }],
    readTime: { type: Number, required: true },
    commentsCount: { type: Number, default: 0 },
    publishedAt: { type: Date, default: Date.now, index: true },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

blogSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
