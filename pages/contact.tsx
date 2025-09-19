import Head from 'next/head';
import Navbar from '../components/Navbar';
import NewsletterForm from '../components/NewsletterForm';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us - CareThePlanet</title>
        <meta name="description" content="Get in touch with CareThePlanet. We'd love to hear from you about collaboration, donations, or any questions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-eco-green to-eco-dark section-padding">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Have questions, want to collaborate, or ready to make a difference? We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-eco-pale rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Address</h3>
                      <p className="text-gray-600">
                        123 Environmental Way<br />
                        Green City, GC 12345<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-eco-pale rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@caretheplanet.org" className="text-eco-green hover:text-eco-dark transition-colors duration-200">
                          info@caretheplanet.org
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <a href="mailto:donations@caretheplanet.org" className="text-eco-green hover:text-eco-dark transition-colors duration-200">
                          donations@caretheplanet.org
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-eco-pale rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📞</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                      <p className="text-gray-600">
                        <a href="tel:+1-555-123-4567" className="text-eco-green hover:text-eco-dark transition-colors duration-200">
                          +1 (555) 123-4567
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">Monday - Friday, 9:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-eco-pale rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🌐</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Media</h3>
                      <div className="flex space-x-4">
                        <a href="#" className="text-eco-green hover:text-eco-dark transition-colors duration-200">
                          Twitter
                        </a>
                        <a href="#" className="text-eco-green hover:text-eco-dark transition-colors duration-200">
                          Facebook
                        </a>
                        <a href="#" className="text-eco-green hover:text-eco-dark transition-colors duration-200">
                          Instagram
                        </a>
                        <a href="#" className="text-eco-green hover:text-eco-dark transition-colors duration-200">
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How can I donate to CareThePlanet?
                </h3>
                <p className="text-gray-600">
                  You can donate through our secure online donation form, by phone, or by mail. We accept credit cards, bank transfers, and checks. All donations are tax-deductible.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I volunteer with your organization?
                </h3>
                <p className="text-gray-600">
                  Yes! We welcome volunteers for various projects and events. Please contact us to learn about current volunteer opportunities in your area.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How do you ensure my donation is used effectively?
                </h3>
                <p className="text-gray-600">
                  We maintain strict financial transparency and accountability. 85% of all donations go directly to our environmental programs, with detailed reports available on our website.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Do you work internationally?
                </h3>
                <p className="text-gray-600">
                  Yes, we have projects in over 25 countries worldwide. Our work focuses on global environmental challenges that require international cooperation and solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="section-padding bg-eco-green">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Stay Connected
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest environmental news, project updates, and ways to get involved.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 