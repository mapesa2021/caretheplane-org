import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import AnimatedButton from '../components/AnimatedButton';
import Testimonials from '../components/Testimonials';
import TreePackages from '../components/TreePackages';
import DynamicButton from '../components/DynamicButton';
import ProjectButton from '../components/ProjectButton';
import NewsletterButton from '../components/NewsletterButton';
import NewsletterForm from '../components/NewsletterForm';
import Link from 'next/link';


export default function Home() {
  return (
    <>
      <Head>
        <title>CareThePlanet - Save Our Planet Together</title>
        <meta name="description" content="Join our mission to protect the environment, combat climate change, and create a sustainable future for generations to come." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        
        {/* Stats Section */}
        <AnimatedSection delay={0.1}>
          <section className="section-padding bg-gradient-to-br from-eco-green via-eco-light to-eco-pale">
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/30 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2">50+</div>
                  <div className="text-eco-pale">Active Projects</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/30 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2">100K+</div>
                  <div className="text-eco-pale">Trees Planted</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/30 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2">25+</div>
                  <div className="text-eco-pale">Countries Reached</div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        {/* Join Our Mission Section */}
        <AnimatedSection delay={0.15}>
          <section className="section-padding bg-white">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-eco-green to-eco-dark rounded-2xl p-8 md:p-12 shadow-xl">
                  <div className="text-6xl mb-6">🌱</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Join Our Mission
                  </h2>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Plant trees, save the planet. Every contribution makes a difference in our fight against climate change.
                  </p>
                  <DynamicButton section="mission" className="justify-center" />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        {/* Donate Trees Section */}
        <AnimatedSection delay={0.2}>
          <TreePackages />
        </AnimatedSection>
        
        {/* About Section */}
        <AnimatedSection delay={0.4}>
          <section className="section-padding bg-gray-50">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Our Mission
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    We are dedicated to environmental conservation and sustainability. Our team works tirelessly to implement innovative solutions that address the most pressing environmental challenges of our time.
                  </p>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    From reforestation projects to renewable energy initiatives, we&apos;re committed to creating lasting positive impact on our planet and inspiring others to join the movement.
                  </p>
                  <DynamicButton section="about" />
                </div>
                <div 
                  className="bg-eco-pale rounded-2xl p-8 text-center"
                >
                  <div className="text-6xl mb-4">🌍</div>
                  <h3 className="text-2xl font-bold text-eco-green mb-4">Environmental Impact</h3>
                  <p className="text-gray-700">
                    Every project we undertake is designed to maximize positive environmental impact while engaging local communities.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Projects Preview Section */}
        <AnimatedSection delay={0.6}>
          <section className="section-padding">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Our Key Projects
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Discover how we&apos;re making a difference across the globe through innovative environmental initiatives.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Project Card 1 */}
                <AnimatedCard delay={0.1}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div 
                      className="h-48 bg-gradient-to-br from-eco-green to-eco-dark flex items-center justify-center"
                    >
                      <span className="text-4xl">🌱</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Tree Planting Initiative</h3>
                      <p className="text-gray-600 mb-4">
                        Planting millions of trees worldwide to combat deforestation and restore natural habitats.
                      </p>
                      <ProjectButton projectId="tree-planting" />
                    </div>
                  </div>
                </AnimatedCard>

                {/* Project Card 2 */}
                <AnimatedCard delay={0.2}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div 
                      className="h-48 bg-gradient-to-br from-eco-light to-eco-green flex items-center justify-center"
                    >
                      <span className="text-4xl">☀️</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Renewable Energy</h3>
                      <p className="text-gray-600 mb-4">
                        Promoting clean energy solutions and helping communities transition to sustainable power sources.
                      </p>
                      <ProjectButton projectId="renewable-energy" />
                    </div>
                  </div>
                </AnimatedCard>

                {/* Project Card 3 */}
                <AnimatedCard delay={0.3}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div 
                      className="h-48 bg-gradient-to-br from-eco-pale to-eco-light flex items-center justify-center"
                    >
                      <span className="text-4xl">🌊</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Ocean Conservation</h3>
                      <p className="text-gray-600 mb-4">
                        Protecting marine ecosystems and cleaning up ocean pollution through community-driven initiatives.
                      </p>
                      <ProjectButton projectId="ocean-conservation" />
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection delay={0.8}>
          <section className="section-padding bg-eco-green">
            <div className="container-custom text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Your support enables us to continue our vital work protecting the environment and building a sustainable future.
              </p>
              <DynamicButton section="cta" className="justify-center" />
            </div>
          </section>
        </AnimatedSection>

        {/* Testimonials Section */}
        <AnimatedSection delay={0.9}>
          <Testimonials />
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection delay={1.0}>
          <section className="section-padding bg-white">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Find answers to common questions about our environmental initiatives and how you can get involved.
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto space-y-4">
                {/* FAQ Item 1 */}
                <div className="bg-gray-50 rounded-lg border border-gray-200">
                  <button 
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => {
                      const content = document.getElementById('faq-1');
                      if (content) {
                        content.classList.toggle('hidden');
                      }
                    }}
                  >
                    <span className="font-semibold text-gray-900">How do I know my donation is being used effectively?</span>
                    <span className="text-[#1abc9c] text-xl">+</span>
                  </button>
                  <div id="faq-1" className="hidden px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      We maintain complete transparency in all our projects. Every donation is tracked and reported through our quarterly impact reports. You can see exactly where your money goes, from tree planting locations to community education programs. We also provide GPS coordinates and photos of reforestation sites.
                    </p>
                  </div>
                </div>

                {/* FAQ Item 2 */}
                <div className="bg-gray-50 rounded-lg border border-gray-200">
                  <button 
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => {
                      const content = document.getElementById('faq-2');
                      if (content) {
                        content.classList.toggle('hidden');
                      }
                    }}
                  >
                    <span className="font-semibold text-gray-900">Can I volunteer with your organization?</span>
                    <span className="text-[#1abc9c] text-xl">+</span>
                  </button>
                  <div id="faq-2" className="hidden px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      Absolutely! We welcome volunteers from all backgrounds. Whether you want to participate in tree planting events, help with community outreach, or contribute your professional skills, there are many ways to get involved. Visit our volunteer page to see current opportunities in your area.
                    </p>
                  </div>
                </div>

                {/* FAQ Item 3 */}
                <div className="bg-gray-50 rounded-lg border border-gray-200">
                  <button 
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => {
                      const content = document.getElementById('faq-3');
                      if (content) {
                        content.classList.toggle('hidden');
                      }
                    }}
                  >
                    <span className="font-semibold text-gray-900">What types of trees do you plant?</span>
                    <span className="text-[#1abc9c] text-xl">+</span>
                  </button>
                  <div id="faq-3" className="hidden px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      We plant native species that are best suited for each local ecosystem. Our team of environmental scientists carefully selects tree species based on climate, soil conditions, and biodiversity needs. This ensures maximum survival rates and ecological benefits for each region.
                    </p>
                  </div>
                </div>

                {/* FAQ Item 4 */}
                <div className="bg-gray-50 rounded-lg border border-gray-200">
                  <button 
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => {
                      const content = document.getElementById('faq-4');
                      if (content) {
                        content.classList.toggle('hidden');
                      }
                    }}
                  >
                    <span className="font-semibold text-gray-900">How can I track the impact of my contribution?</span>
                    <span className="text-[#1abc9c] text-xl">+</span>
                  </button>
                  <div id="faq-4" className="hidden px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      Every donor receives a personalized dashboard where you can track your environmental impact in real-time. See the number of trees planted, CO2 offset, and community projects supported through your contributions. We also send regular updates with photos and progress reports.
                    </p>
                  </div>
                </div>

                {/* FAQ Item 5 */}
                <div className="bg-gray-50 rounded-lg border border-gray-200">
                  <button 
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => {
                      const content = document.getElementById('faq-5');
                      if (content) {
                        content.classList.toggle('hidden');
                      }
                    }}
                  >
                    <span className="font-semibold text-gray-900">Do you work with local communities?</span>
                    <span className="text-[#1abc9c] text-xl">+</span>
                  </button>
                  <div id="faq-5" className="hidden px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      Yes! Community involvement is at the heart of our mission. We partner with local communities to ensure our projects meet their needs and create lasting benefits. This includes providing training, creating jobs, and supporting sustainable development initiatives that benefit both people and the planet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Join Our Community Section */}
        <AnimatedSection delay={1.1}>
          <section className="section-padding bg-gradient-to-br from-[#1abc9c] to-[#16a085] text-white">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Join Our Community
                </h2>
                <p className="text-xl max-w-2xl mx-auto opacity-90">
                  Connect with us on social media and stay updated with our latest environmental initiatives and impact stories.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Social Media Section */}
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
                  <p className="text-lg mb-8 opacity-90">
                    Join thousands of environmental advocates and stay connected with our mission to protect the planet.
                  </p>
                  
                  <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                    {/* Facebook */}
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
                      aria-label="Follow us on Facebook"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    
                    {/* Instagram */}
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
                      aria-label="Follow us on Instagram"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-7.83 9.781c-2.026 0-3.708-1.682-3.708-3.708s1.682-3.708 3.708-3.708 3.708 1.682 3.708 3.708-1.682 3.708-3.708 3.708z"/>
                      </svg>
                    </a>
                    
                    {/* Twitter/X */}
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
                      aria-label="Follow us on Twitter/X"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    
                    {/* YouTube */}
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
                      aria-label="Follow us on YouTube"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    
                    {/* LinkedIn */}
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
                      aria-label="Follow us on LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Newsletter Section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Subscribe to our newsletter for the latest environmental news, project updates, and ways to get involved.
                  </p>
                  
                  <NewsletterForm />
                  
                  <p className="text-sm opacity-75 mt-4">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <AnimatedSection delay={1.0}>
        <footer className="bg-gray-900 text-white py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div 
                    className="w-8 h-8 bg-eco-green rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <span className="text-white font-bold text-sm">🌱</span>
                  </div>
                  <span className="text-xl font-bold">CareThePlanet</span>
                </div>
                <p className="text-gray-300 mb-4 max-w-md">
                  Dedicated to environmental conservation and creating a sustainable future for all living beings on Earth.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link href="/" className="hover:text-white transition-colors duration-200">Home</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors duration-200">About</Link></li>
                  <li><Link href="/projects" className="hover:text-white transition-colors duration-200">Projects</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors duration-200">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Get Involved</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/donate" className="hover:text-white transition-colors duration-200">Donate</a></li>
                  <li><a href="/volunteer" className="hover:text-white transition-colors duration-200">Volunteer</a></li>
                  <li><a href="/newsletter" className="hover:text-white transition-colors duration-200">Newsletter</a></li>
                  <li><a href="/events" className="hover:text-white transition-colors duration-200">Events</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 CareThePlanet. All rights reserved. Together we can save our planet.</p>
            </div>
          </div>
        </footer>
      </AnimatedSection>
    </>
  );
} 