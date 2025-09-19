'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  getBlogPosts, 
  deleteBlogPost, 
  BlogPost,
  isAdminAuthenticated 
} from '../../utils/adminData';

const BlogAdmin = () => {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  // Load blog posts
  useEffect(() => {
    if (isAdminAuthenticated()) {
      setBlogPosts(getBlogPosts());
      setIsLoading(false);
    }
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogPost(id);
      setBlogPosts(getBlogPosts());
    }
  };

  const handleStatusToggle = (post: BlogPost) => {
    const updatedPost: BlogPost = {
      ...post,
      status: post.status === 'published' ? 'draft' : 'published'
    };
    
    // Update the post in localStorage
    const posts = getBlogPosts();
    const index = posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      posts[index] = updatedPost;
      localStorage.setItem('caretheplanet_blog_posts', JSON.stringify(posts));
      setBlogPosts(posts);
    }
  };

  if (!isAdminAuthenticated()) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Blog Posts</h1>
              <p className="text-gray-600">Edit, delete, and organize your blog articles</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/admin"
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back to Admin
              </Link>
              <Link
                href="/admin/blog/new"
                className="bg-eco-green hover:bg-eco-dark text-white px-6 py-2 rounded-lg transition-colors"
              >
                Create New Post
              </Link>
            </div>
          </div>

          {/* Blog Posts List */}
          <div className="space-y-6">
            {blogPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No blog posts found.</p>
                <Link
                  href="/admin/blog/new"
                  className="bg-eco-green hover:bg-eco-dark text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Create Your First Post
                </Link>
              </div>
            ) : (
              blogPosts.map((post) => (
                <div key={post.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                        <span>By {post.author}</span>
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                        <span className="bg-eco-pale px-2 py-1 rounded text-eco-green font-medium">
                          {post.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{post.excerpt}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                        <span>Updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleStatusToggle(post)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          post.status === 'published'
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {post.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="px-3 py-1 text-eco-green hover:text-eco-dark transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 py-1 text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin; 