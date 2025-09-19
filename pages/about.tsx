import Head from 'next/head';
import Navbar from '../components/Navbar';
import TeamMembers from '../components/TeamMembers';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - CareThePlanet</title>
        <meta name="description" content="Learn about our mission, values, and the team behind CareThePlanet's environmental conservation efforts." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-eco-green to-eco-dark section-padding">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About CareThePlanet
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              We are a global environmental organization dedicated to protecting our planet and creating a sustainable future for all.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  To protect and restore the natural environment through innovative conservation projects, community engagement, and sustainable development initiatives.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We believe that every individual has the power to make a difference, and together we can create lasting positive change for our planet.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  A world where humans live in harmony with nature, where ecosystems thrive, and where future generations inherit a healthy, sustainable planet.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We envision communities that are resilient, sustainable, and actively engaged in environmental stewardship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainability</h3>
                <p className="text-gray-600">
                  We prioritize long-term environmental health over short-term gains, ensuring our actions benefit future generations.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Collaboration</h3>
                <p className="text-gray-600">
                  We believe in the power of partnerships and community engagement to achieve meaningful environmental impact.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We embrace creative solutions and cutting-edge technology to address complex environmental challenges.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="text-4xl mb-4">💚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Integrity</h3>
                <p className="text-gray-600">
                  We maintain the highest standards of transparency, accountability, and ethical conduct in all our work.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Global Perspective</h3>
                <p className="text-gray-600">
                  We recognize that environmental issues transcend borders and require international cooperation and solutions.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Impact</h3>
                <p className="text-gray-600">
                  We measure our success by the tangible positive change we create for the environment and communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <TeamMembers />
      </main>
    </>
  );
} 