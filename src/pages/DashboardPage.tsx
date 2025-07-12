import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Star, Package, ArrowUpDown, Plus, Settings, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockItems, mockSwapRequests } from '../data/mockData';
import ItemCard from '../components/ItemCard';

const DashboardPage: React.FC = () => {
  const { user, updatePoints } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return null;

  const userItems = mockItems.filter(item => item.uploaderId === user.id);
  const userSwapRequests = mockSwapRequests.filter(request => 
    request.fromUserId === user.id || request.toUserId === user.id
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'items', label: 'My Items', icon: Package },
    { id: 'swaps', label: 'Swaps', icon: ArrowUpDown },
    { id: 'profile', label: 'Profile', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                <p className="text-gray-600">Member since January 2024</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg">
                <Star className="h-5 w-5 text-green-600 fill-current" />
                <span className="text-xl font-bold text-green-600">{user.points}</span>
                <span className="text-green-600">points</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 text-sm font-medium">Items Listed</p>
                        <p className="text-2xl font-bold text-blue-900">{userItems.length}</p>
                      </div>
                      <Package className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 text-sm font-medium">Active Swaps</p>
                        <p className="text-2xl font-bold text-green-900">{userSwapRequests.length}</p>
                      </div>
                      <ArrowUpDown className="h-8 w-8 text-green-600" />
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-600 text-sm font-medium">Points Balance</p>
                        <p className="text-2xl font-bold text-purple-900">{user.points}</p>
                      </div>
                      <Star className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
                  <p className="mb-4 opacity-90">Ready to add more items or browse the community?</p>
                  <div className="flex space-x-4">
                    <Link
                      to="/add-item"
                      className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      List New Item
                    </Link>
                    <Link
                      to="/browse"
                      className="border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors"
                    >
                      Browse Items
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* My Items Tab */}
            {activeTab === 'items' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">My Items ({userItems.length})</h2>
                  <Link
                    to="/add-item"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Item</span>
                  </Link>
                </div>

                {userItems.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userItems.map(item => (
                      <ItemCard key={item.id} item={item} showActions={false} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No items listed yet</h3>
                    <p className="text-gray-600 mb-4">Start by listing your first item to the community</p>
                    <Link
                      to="/add-item"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      List Your First Item
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Swaps Tab */}
            {activeTab === 'swaps' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Swap Requests</h2>
                
                {userSwapRequests.length > 0 ? (
                  <div className="space-y-4">
                    {userSwapRequests.map(request => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                              <span className="text-gray-500 text-sm flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(request.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Item Offered</h4>
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={request.itemOffered.images[0]}
                                    alt={request.itemOffered.title}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                  <div>
                                    <p className="font-medium">{request.itemOffered.title}</p>
                                    <p className="text-sm text-gray-600">{request.itemOffered.pointValue} points</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Item Requested</h4>
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={request.itemRequested.images[0]}
                                    alt={request.itemRequested.title}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                  <div>
                                    <p className="font-medium">{request.itemRequested.title}</p>
                                    <p className="text-sm text-gray-600">{request.itemRequested.pointValue} points</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {request.message && (
                              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-700">"{request.message}"</p>
                              </div>
                            )}
                          </div>

                          {request.status === 'pending' && request.toUserId === user.id && (
                            <div className="flex space-x-2 ml-4">
                              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                                Accept
                              </button>
                              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                                Decline
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ArrowUpDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No swap requests yet</h3>
                    <p className="text-gray-600">Your swap requests will appear here</p>
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Points Balance
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={`${user.points} points`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        readOnly
                      />
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Earn More
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Account Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Items Listed</p>
                        <p className="text-2xl font-bold text-gray-900">{userItems.length}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Successful Swaps</p>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;