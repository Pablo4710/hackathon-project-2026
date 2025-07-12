import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Users, Leaf, Star } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import { mockItems } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const featuredItems = mockItems.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-teal-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Swap. Share. <span className="text-green-200">Sustain.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Join the community clothing exchange that turns your closet into a sustainable fashion paradise. 
              Trade, earn points, and help reduce textile waste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/browse"
                  className="bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Start Swapping</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Join ReWear</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              )}
              <Link
                to="/browse"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-700 transition-colors"
              >
                Browse Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How ReWear Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple ways to participate in sustainable fashion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Swaps</h3>
              <p className="text-gray-600">
                Browse items and propose direct trades with other community members. 
                Perfect for finding exactly what you want.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Point System</h3>
              <p className="text-gray-600">
                Earn points by listing items and use them to claim pieces you love. 
                No direct trade required - just points and picks.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Connect with like-minded fashion lovers in your area. 
                Share style tips and sustainable fashion practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Items
            </h2>
            <p className="text-xl text-gray-600">
              Discover amazing pieces from our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/browse"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <span>View All Items</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-green-200">Items Exchanged</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-green-200">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">850kg</div>
              <div className="text-green-200">Textile Waste Saved</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Leaf className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Making a Difference Together
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every swap and trade on ReWear contributes to a more sustainable future. 
              Join us in reducing fashion waste and promoting circular economy principles.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Sustainable Fashion Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of fashion-conscious individuals making a positive impact
            </p>
            {!user && (
              <Link
                to="/signup"
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <span>Get Started Today</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;