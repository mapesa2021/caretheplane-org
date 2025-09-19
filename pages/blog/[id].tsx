import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import AnimatedSection from '../../components/AnimatedSection';
import { getBlogPosts, BlogPost } from '../../utils/adminData';

const BlogPostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (id) {
      const posts = getBlogPosts();
      const foundPost = posts.find(p => p.id === Number(id));
      
      if (foundPost && foundPost.status === 'published') {
        setPost(foundPost);
        
        // Get related posts (same category, excluding current post)
        const related = posts
          .filter(p => p.id !== Number(id) && p.status === 'published' && p.category === foundPost.category)
          .slice(0, 3);
        setRelatedPosts(related);
      } else {
        // Post not found or not published
        router.push('/blog');
      }
      setIsLoading(false);
    }
  }, [id, router]);

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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/blog" className="bg-eco-green hover:bg-eco-dark text-white px-6 py-3 rounded-lg transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - CareThePlanet Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.category}, environmental blog, conservation, sustainability`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        
        {/* Blog Post Content */}
        <AnimatedSection delay={0.1}>
          <article className="bg-white">
            {/* Hero Image */}
            <div className="h-64 md:h-96 bg-gradient-to-br from-eco-green to-eco-light flex items-center justify-center">
              <span className="text-8xl md:text-9xl">{post.image}</span>
            </div>
            
            {/* Article Content */}
            <div className="container-custom py-12">
              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                  <div className="mb-4">
                    <span className="inline-block bg-eco-pale text-eco-green text-sm font-semibold px-4 py-2 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                    <div className="flex items-center">
                      <span className="text-eco-green mr-2">👤</span>
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-eco-green mr-2">📅</span>
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-eco-green mr-2">⏱️</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="w-24 h-1 bg-eco-green rounded-full"></div>
                </header>
                
                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                    {post.content}
                  </div>
                </div>
                
                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600">
                      <span>Published on {post.date}</span>
                    </div>
                    <Link 
                      href="/blog"
                      className="bg-eco-green hover:bg-eco-dark text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      ← Back to Blog
                    </Link>
                  </div>
                </footer>
              </div>
            </div>
          </article>
        </AnimatedSection>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <AnimatedSection delay={0.3}>
            <section className="bg-gray-50 py-16">
              <div className="container-custom">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Related Articles
                  </h2>
                  <p className="text-gray-600">
                    More stories about {post.category}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                      <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                        {/* Blog Image */}
                        <div className="h-48 bg-gradient-to-br from-eco-green to-eco-light flex items-center justify-center">
                          <span className="text-6xl">{relatedPost.image}</span>
                        </div>
                        
                        {/* Blog Content */}
                        <div className="p-6">
                          <div className="mb-3">
                            <span className="inline-block bg-eco-pale text-eco-green text-sm font-semibold px-3 py-1 rounded-full">
                              {relatedPost.category}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-eco-green transition-colors duration-200">
                            {relatedPost.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                            {relatedPost.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{relatedPost.author}</span>
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>
        )}

        {/* Newsletter Signup */}
        <AnimatedSection delay={0.5}>
          <section className="section-padding bg-gradient-to-r from-eco-green to-eco-light">
            <div className="container-custom text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest environmental news, tips, and stories delivered to your inbox.
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
                  />
                  <button className="bg-white text-eco-green font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom text-center">
          <p>&copy; 2024 CareThePlanet. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default BlogPostPage; 