import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import { getBlogPosts, BlogPost } from '../utils/adminData';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load blog posts from admin data
    const posts = getBlogPosts().filter(post => post.status === 'published');
    setBlogPosts(posts);
  }, []);

  return (
    <>
      <Head>
        <title>Blog - CareThePlanet | Environmental Insights & Stories</title>
        <meta name="description" content="Read the latest environmental news, conservation stories, and sustainability tips from CareThePlanet." />
        <meta name="keywords" content="environmental blog, conservation, sustainability, climate change, tree planting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        
        {/* Hero Section */}
        <AnimatedSection delay={0.1}>
          <section className="bg-gradient-to-br from-eco-green via-eco-light to-eco-pale section-padding">
            <div className="container-custom text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Our Blog
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
                Stay informed with the latest environmental insights, conservation stories, and sustainability tips from our team of experts.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Blog Posts Grid */}
        <AnimatedSection delay={0.2}>
          <section className="section-padding bg-gray-50">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Latest Articles
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Discover insights, tips, and inspiring stories about environmental conservation and sustainability.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <AnimatedCard key={post.id} delay={0.1 + index * 0.1}>
                    <Link href={`/blog/${post.id}`}>
                      <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                      {/* Blog Image */}
                      <div className="h-48 bg-gradient-to-br from-eco-green to-eco-light flex items-center justify-center">
                        <span className="text-6xl">{post.image}</span>
                      </div>
                      
                      {/* Blog Content */}
                      <div className="p-6">
                        {/* Category */}
                        <div className="mb-3">
                          <span className="inline-block bg-eco-pale text-eco-green text-sm font-semibold px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-eco-green transition-colors duration-200">
                          {post.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{post.author}</span>
                          <span>{post.readTime}</span>
                        </div>
                        
                        {/* Date */}
                        <div className="text-sm text-gray-400 mb-4">
                          {post.date}
                        </div>
                        
                        {/* Read More Button */}
                        <button className="w-full bg-eco-green hover:bg-eco-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                          Read More
                        </button>
                      </div>
                    </article>
                    </Link>
                  </AnimatedCard>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <button className="bg-white border-2 border-eco-green text-eco-green hover:bg-eco-green hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200">
                  Load More Articles
                </button>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Newsletter Signup */}
        <AnimatedSection delay={0.8}>
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

export default Blog; 