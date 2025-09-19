'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  getBlogPosts, 
  updateBlogPost, 
  BlogPost,
  isAdminAuthenticated 
} from '../../../../utils/adminData';

const EditBlogPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Climate Action',
    image: '🌳',
    status: 'draft' as 'draft' | 'published'
  });

  // Check authentication
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  // Load blog post data
  useEffect(() => {
    if (id && isAdminAuthenticated()) {
      const posts = getBlogPosts();
      const foundPost = posts.find(p => p.id === Number(id));
      
      if (foundPost) {
        setPost(foundPost);
        setFormData({
          title: foundPost.title,
          excerpt: foundPost.excerpt,
          content: foundPost.content,
          author: foundPost.author,
          category: foundPost.category,
          image: foundPost.image,
          status: foundPost.status
        });
      } else {
        alert('Blog post not found');
        router.push('/admin/blog');
      }
      setIsLoading(false);
    }
  }, [id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    setIsSubmitting(true);

    try {
      // Calculate read time (rough estimate: 200 words per minute)
      const wordCount = formData.content.split(' ').length;
      const readTime = Math.ceil(wordCount / 200);

      const updatedPost: BlogPost = {
        ...post,
        ...formData,
        readTime: `${readTime} min read`,
        updatedAt: new Date().toISOString()
      };

      updateBlogPost(post.id, updatedPost);
      
      // Redirect to blog management page
      router.push('/admin/blog');
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert('Error updating blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = [
    'Climate Action',
    'Sustainability',
    'Community',
    'Conservation',
    'Renewable Energy',
    'Education',
    'Research',
    'Events'
  ];

  const imageOptions = [
    '🌳', '🌱', '🌍', '🌊', '☀️', '🌿', '🍃', '🌲', '🌴', '🌵',
    '♻️', '💚', '🌱', '🌿', '🌺', '🌸', '🌼', '🌻', '🌷', '🌹'
  ];

  if (!isAdminAuthenticated()) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Blog post not found</p>
          <Link href="/admin/blog" className="text-eco-green hover:text-eco-dark">
            Back to Blog Management
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Blog Post</h1>
              <p className="text-gray-600">Update your blog article</p>
            </div>
            <Link
              href="/admin/blog"
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Blog Management
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                  placeholder="Enter blog post title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                  placeholder="Enter author name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                placeholder="Brief summary of the blog post..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                placeholder="Write your blog post content here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                >
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image Emoji
                </label>
                <div className="flex flex-wrap gap-2">
                  {imageOptions.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: emoji }))}
                      className={`w-10 h-10 text-xl rounded-lg border-2 transition-colors ${
                        formData.image === emoji 
                          ? 'border-eco-green bg-eco-green text-white' 
                          : 'border-gray-300 hover:border-eco-green'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-eco-green hover:bg-eco-dark text-white px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Updating...' : 'Update Blog Post'}
              </button>
              <Link
                href="/admin/blog"
                className="px-8 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlogPost; 