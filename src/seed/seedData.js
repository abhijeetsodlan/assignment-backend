const dotenv = require('dotenv');
const slugify = require('slugify');
const connectDB = require('../config/db');
const Blog = require('../models/Blog');
const Category = require('../models/Category');

dotenv.config();

const categories = ['Technology', 'Travel', 'Health', 'Lifestyle', 'Finance'];

const blogSeeds = [
  {
    title: 'AI Co-Pilots Are Reshaping Developer Workflows in 2026',
    excerpt:
      'A practical look at where AI pair programmers save time, where they still fail, and how senior engineers are adapting review habits.',
    thumbnail:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Nina Patel', avatar: 'https://i.pravatar.cc/80?img=12' },
    category: 'Technology',
    tags: ['AI', 'Engineering', 'Productivity'],
    readTime: 8,
    commentsCount: 18,
    publishedAt: new Date('2026-03-20'),
    isFeatured: true
  },
  {
    title: 'Designing Fast APIs with Caching Patterns That Actually Hold Up',
    excerpt:
      'From Redis invalidation to stale-while-revalidate, this guide covers battle-tested caching approaches for modern backend services.',
    thumbnail:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Arjun Mehta', avatar: 'https://i.pravatar.cc/80?img=24' },
    category: 'Technology',
    tags: ['Backend', 'Caching', 'Node.js'],
    readTime: 10,
    commentsCount: 11,
    publishedAt: new Date('2026-03-10'),
    isFeatured: false
  },
  {
    title: 'Remote Mountain Towns in Himachal Worth Visiting This Summer',
    excerpt:
      'Skip the overcrowded spots and explore quieter Himalayan villages with reliable stays, internet, and unforgettable views.',
    thumbnail:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Reema Das', avatar: 'https://i.pravatar.cc/80?img=45' },
    category: 'Travel',
    tags: ['India', 'Mountains', 'Itinerary'],
    readTime: 7,
    commentsCount: 9,
    publishedAt: new Date('2026-02-28'),
    isFeatured: true
  },
  {
    title: 'A 5-Day Kyoto Itinerary for First-Time Visitors',
    excerpt:
      'Temples, tea houses, local trains, and neighborhood food spots: a realistic Kyoto plan with pacing that avoids burnout.',
    thumbnail:
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Lena Brooks', avatar: 'https://i.pravatar.cc/80?img=31' },
    category: 'Travel',
    tags: ['Japan', 'City Guide', 'Planning'],
    readTime: 9,
    commentsCount: 14,
    publishedAt: new Date('2026-02-19'),
    isFeatured: false
  },
  {
    title: 'How to Build a Sustainable Morning Routine in 20 Minutes',
    excerpt:
      'A no-hype framework for energy, focus, and better consistency using simple routines you can keep even on busy weekdays.',
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Maya Singh', avatar: 'https://i.pravatar.cc/80?img=10' },
    category: 'Health',
    tags: ['Habits', 'Wellness', 'Routine'],
    readTime: 6,
    commentsCount: 21,
    publishedAt: new Date('2026-03-08'),
    isFeatured: false
  },
  {
    title: 'Strength Training Basics for Desk-Bound Professionals',
    excerpt:
      'A beginner-friendly plan to improve posture and reduce lower back pain with short weekly strength sessions.',
    thumbnail:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Chris Raymond', avatar: 'https://i.pravatar.cc/80?img=53' },
    category: 'Health',
    tags: ['Fitness', 'Mobility', 'Beginner'],
    readTime: 8,
    commentsCount: 7,
    publishedAt: new Date('2026-01-30'),
    isFeatured: false
  },
  {
    title: 'Minimalist Home Offices That Improve Focus',
    excerpt:
      'Lighting, ergonomics, and furniture choices that create a calm workspace without spending on unnecessary upgrades.',
    thumbnail:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Tara Gill', avatar: 'https://i.pravatar.cc/80?img=37' },
    category: 'Lifestyle',
    tags: ['Interior', 'Focus', 'Productivity'],
    readTime: 5,
    commentsCount: 5,
    publishedAt: new Date('2026-01-21'),
    isFeatured: false
  },
  {
    title: 'Digital Declutter: A Weekend Reset Plan',
    excerpt:
      'Use this two-day checklist to reduce digital noise, tame notifications, and reclaim attention for meaningful work.',
    thumbnail:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Ivy Morales', avatar: 'https://i.pravatar.cc/80?img=58' },
    category: 'Lifestyle',
    tags: ['Mindfulness', 'Tech-Life', 'Focus'],
    readTime: 7,
    commentsCount: 16,
    publishedAt: new Date('2026-03-01'),
    isFeatured: true
  },
  {
    title: 'ETF Investing for Beginners: A Plain-English Guide',
    excerpt:
      'Understand expense ratios, diversification, and risk so you can start long-term investing with clear expectations.',
    thumbnail:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/80?img=61' },
    category: 'Finance',
    tags: ['Investing', 'ETF', 'Money'],
    readTime: 11,
    commentsCount: 22,
    publishedAt: new Date('2026-02-11'),
    isFeatured: true
  },
  {
    title: 'Emergency Funds: How Much Is Enough in 2026?',
    excerpt:
      'A practical framework to estimate your emergency target, where to park cash, and when to revisit your buffer.',
    thumbnail:
      'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Dana Cole', avatar: 'https://i.pravatar.cc/80?img=49' },
    category: 'Finance',
    tags: ['Savings', 'Risk', 'Planning'],
    readTime: 6,
    commentsCount: 13,
    publishedAt: new Date('2026-01-12'),
    isFeatured: false
  },
  {
    title: 'Server Components vs Client Components: Making the Right Tradeoff',
    excerpt:
      'A clear decision framework for when interactivity belongs on the client and when rendering should stay on the server.',
    thumbnail:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Karan Shah', avatar: 'https://i.pravatar.cc/80?img=62' },
    category: 'Technology',
    tags: ['Next.js', 'Performance', 'Architecture'],
    readTime: 9,
    commentsCount: 10,
    publishedAt: new Date('2026-02-25'),
    isFeatured: false
  },
  {
    title: 'Slow Travel in Portugal: Coastline, Cafes, and Local Trains',
    excerpt:
      'How to spend two weeks in Portugal with fewer flights, better neighborhood stays, and lower overall costs.',
    thumbnail:
      'https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Noah Rivera', avatar: 'https://i.pravatar.cc/80?img=15' },
    category: 'Travel',
    tags: ['Europe', 'Budget', 'Culture'],
    readTime: 8,
    commentsCount: 6,
    publishedAt: new Date('2026-01-27'),
    isFeatured: false
  },
  {
    title: 'Meal Prep for Busy Weeks Without Eating the Same Thing Daily',
    excerpt:
      'A rotating prep strategy that balances protein, vegetables, and variety while keeping total prep time under two hours.',
    thumbnail:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Priya Menon', avatar: 'https://i.pravatar.cc/80?img=46' },
    category: 'Health',
    tags: ['Nutrition', 'Meal Prep', 'Planning'],
    readTime: 7,
    commentsCount: 8,
    publishedAt: new Date('2026-03-05'),
    isFeatured: false
  },
  {
    title: 'Financial Habits That Help Freelancers Handle Income Swings',
    excerpt:
      'Systems for taxes, quarterly planning, and variable cash flow so freelance income does not derail long-term goals.',
    thumbnail:
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Sofia Khan', avatar: 'https://i.pravatar.cc/80?img=66' },
    category: 'Finance',
    tags: ['Freelance', 'Budgeting', 'Cash Flow'],
    readTime: 10,
    commentsCount: 4,
    publishedAt: new Date('2026-02-03'),
    isFeatured: false
  },
  {
    title: 'Weekend Rituals That Reduce Monday Anxiety',
    excerpt:
      'Small reset rituals for sleep, planning, and social time that make your workweek start calmer and more intentional.',
    thumbnail:
      'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Ayesha Roy', avatar: 'https://i.pravatar.cc/80?img=28' },
    category: 'Lifestyle',
    tags: ['Mental Health', 'Work-Life', 'Habits'],
    readTime: 6,
    commentsCount: 12,
    publishedAt: new Date('2026-03-14'),
    isFeatured: true
  },
  {
    title: 'Building a Personal Finance Dashboard in 30 Minutes',
    excerpt:
      'Track spending, investments, and goals using a simple dashboard setup that stays useful beyond the first week.',
    thumbnail:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    author: { name: 'Dev Iyer', avatar: 'https://i.pravatar.cc/80?img=69' },
    category: 'Finance',
    tags: ['Dashboard', 'Money Management', 'Tools'],
    readTime: 8,
    commentsCount: 17,
    publishedAt: new Date('2026-03-22'),
    isFeatured: false
  }
];

const buildContent = (title) => `
<p>${title} is not about theory. It is about decisions you can apply immediately in real scenarios.</p>
<p>This article breaks down patterns, tradeoffs, and practical examples so you can move from ideas to execution faster.</p>
<p>Use the checklist sections to adapt the recommendations to your own context and constraints.</p>
`;

const seedData = async () => {
  try {
    await connectDB();

    await Promise.all([Blog.deleteMany({}), Category.deleteMany({})]);

    await Category.insertMany(categories.map((name) => ({ name })));

    const blogs = blogSeeds.map((item) => ({
      ...item,
      slug: slugify(item.title, { lower: true, strict: true }),
      content: buildContent(item.title)
    }));

    await Blog.insertMany(blogs);

    console.log(`Seed complete: ${blogs.length} blogs, ${categories.length} categories`);
    process.exit(0);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
