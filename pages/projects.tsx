import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Projects() {
  return (
    <>
      <Head>
        <title>Our Projects - CareThePlanet</title>
        <meta name="description" content="Explore our environmental conservation projects and initiatives around the world." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-eco-green to-eco-dark section-padding">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Projects
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Discover how we&apos;re making a difference across the globe through innovative environmental initiatives.
            </p>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
              Featured Initiatives
            </h2>
            
            <div className="space-y-16">
              {/* Project 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Global Reforestation Program
                  </h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Our flagship initiative aims to plant 100 million trees across 25 countries by 2030. We work with local communities to restore degraded forests and create sustainable livelihoods.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-eco-pale rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-eco-green">2.5M</div>
                      <div className="text-sm text-gray-600">Trees Planted</div>
                    </div>
                    <div className="bg-eco-pale rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-eco-green">15</div>
                      <div className="text-sm text-gray-600">Countries</div>
                    </div>
                  </div>
                  <button className="btn-primary">Learn More</button>
                </div>
                <div className="bg-gradient-to-br from-eco-green to-eco-dark rounded-2xl p-12 text-center text-white">
                  <div className="text-6xl mb-4">🌱</div>
                  <h4 className="text-xl font-semibold mb-2">Active Since 2020</h4>
                  <p className="text-eco-pale">Creating lasting environmental impact</p>
                </div>
              </div>

              {/* Project 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 bg-gradient-to-br from-eco-light to-eco-green rounded-2xl p-12 text-center text-white">
                  <div className="text-6xl mb-4">☀️</div>
                  <h4 className="text-xl font-semibold mb-2">Renewable Energy</h4>
                  <p className="text-eco-pale">Powering communities sustainably</p>
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Solar Energy for Rural Communities
                  </h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    We&apos;re bringing clean, affordable solar energy to rural communities in developing countries, reducing reliance on fossil fuels and improving quality of life.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-eco-pale rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-eco-green">50+</div>
                      <div className="text-sm text-gray-600">Communities</div>
                    </div>
                    <div className="bg-eco-pale rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-eco-green">2.5MW</div>
                      <div className="text-sm text-gray-600">Solar Capacity</div>
                    </div>
                  </div>
                  <button className="btn-primary">Learn More</button>
                </div>
              </div>

              {/* Project 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Ocean Cleanup Initiative
                  </h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Our marine conservation program focuses on removing plastic pollution from oceans, protecting marine life, and educating communities about ocean health.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-eco-pale rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-eco-green">500+</div>
                      <div className="text-sm text-gray-600">Tons Removed</div>
                    </div>
                    <div className="bg-eco-pale rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-eco-green">8</div>
                      <div className="text-sm text-gray-600">Coastal Areas</div>
                    </div>
                  </div>
                  <button className="btn-primary">Learn More</button>
                </div>
                <div className="bg-gradient-to-br from-eco-pale to-eco-light rounded-2xl p-12 text-center">
                  <div className="text-6xl mb-4">🌊</div>
                  <h4 className="text-xl font-semibold mb-2 text-eco-green">Marine Protection</h4>
                  <p className="text-gray-700">Safeguarding ocean ecosystems</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Categories */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
              Project Categories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🌿</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Conservation</h3>
                <p className="text-gray-600 mb-4">
                  Protecting endangered species and their habitats through strategic conservation efforts.
                </p>
                <div className="text-eco-green font-semibold">12 Active Projects</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🏗️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Infrastructure</h3>
                <p className="text-gray-600 mb-4">
                  Building sustainable infrastructure for communities and environmental monitoring.
                </p>
                <div className="text-eco-green font-semibold">8 Active Projects</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Education</h3>
                <p className="text-gray-600 mb-4">
                  Environmental education programs for schools and community groups worldwide.
                </p>
                <div className="text-eco-green font-semibold">15 Active Projects</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Research</h3>
                <p className="text-gray-600 mb-4">
                  Scientific research on climate change, biodiversity, and environmental solutions.
                </p>
                <div className="text-eco-green font-semibold">10 Active Projects</div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="section-padding bg-eco-green">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Support Our Projects
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Your contribution helps us continue our vital work protecting the environment and building a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-eco-green hover:bg-eco-pale font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
                Donate to Projects
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-eco-green font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
                Volunteer
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 