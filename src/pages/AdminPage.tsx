import React, { useState } from 'react';
import { Shield, Package, Users, AlertTriangle, Check, X, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockItems } from '../data/mockData';

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have admin privileges.</p>
        </div>
      </div>
    );
  }

  // Mock pending items (in real app, these would come from API)
  const pendingItems = mockItems.filter(item => !item.approved).concat([
    {
      id: 'pending-1',
      title: 'Brand New Designer Handbag',
      description: 'Authentic designer handbag, never used. Comes with original packaging.',
      category: 'Accessories',
      type: 'Handbag',
      size: 'One Size',
      condition: 'New' as const,
      tags: ['designer', 'luxury', 'handbag'],
      images: ['https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg'],
      uploaderId: '8',
      uploaderName: 'Lisa Wang',
      pointValue: 120,
      status: 'available' as const,
      createdAt: '2024-01-17',
      approved: false
    },
    {
      id: 'pending-2',
      title: 'Vintage Band T-Shirt',
      description: 'Rare vintage concert t-shirt from the 90s. Some fading but authentic.',
      category: 'Tops',
      type: 'T-Shirt',
      size: 'M',
      condition: 'Good' as const,
      tags: ['vintage', 'band', 'concert', '90s'],
      images: ['https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg'],
      uploaderId: '9',
      uploaderName: 'Dave Miller',
      pointValue: 45,
      status: 'available' as const,
      createdAt: '2024-01-16',
      approved: false
    }
  ]);

  const reportedItems = [
    {
      id: 'report-1',
      item: mockItems[0],
      reason: 'Misleading condition description',
      reportedBy: 'user123',
      createdAt: '2024-01-15'
    }
  ];

  const stats = {
    totalItems: mockItems.length + pendingItems.length,
    pendingReview: pendingItems.length,
    activeUsers: 1250,
    reportedItems: reportedItems.length
  };

  const tabs = [
    { id: 'pending', label: 'Pending Review', icon: Package, count: pendingItems.length },
    { id: 'reported', label: 'Reported Items', icon: AlertTriangle, count: reportedItems.length },
    { id: 'users', label: 'User Management', icon: Users, count: 0 },
    { id: 'overview', label: 'Overview', icon: Shield, count: 0 }
  ];

  const handleApproveItem = (itemId: string) => {
    if (confirm('Approve this item for listing?')) {
      alert('Item approved successfully!');
      // In real app, make API call to approve item
    }
  };

  const handleRejectItem = (itemId: string) => {
    const reason = prompt('Reason for rejection:');
    if (reason) {
      alert('Item rejected and user notified.');
      // In real app, make API call to reject item
    }
  };

  const handleResolveReport = (reportId: string, action: 'resolved' | 'removed') => {
    if (confirm(`${action === 'resolved' ? 'Mark report as resolved' : 'Remove reported item'}?`)) {
      alert(`Report ${action} successfully!`);
      // In real app, make API call
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage platform content and users</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingReview}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reports</p>
                <p className="text-2xl font-bold text-red-600">{stats.reportedItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
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
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 text-xs rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Pending Review Tab */}
            {activeTab === 'pending' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Pending Items ({pendingItems.length})
                </h2>
                
                {pendingItems.length > 0 ? (
                  <div className="space-y-6">
                    {pendingItems.map(item => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex space-x-6">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {item.title}
                                </h3>
                                <p className="text-gray-600 mb-2">
                                  by {item.uploaderName} • {item.category} • Size {item.size}
                                </p>
                                <p className="text-gray-700 mb-3">{item.description}</p>
                                
                                <div className="flex items-center space-x-4">
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                    {item.pointValue} points
                                  </span>
                                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                    {item.condition}
                                  </span>
                                  <span className="text-gray-500 text-sm">
                                    Submitted {new Date(item.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleApproveItem(item.id)}
                                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                                >
                                  <Check className="h-4 w-4" />
                                  <span>Approve</span>
                                </button>
                                <button
                                  onClick={() => handleRejectItem(item.id)}
                                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1"
                                >
                                  <X className="h-4 w-4" />
                                  <span>Reject</span>
                                </button>
                                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-1">
                                  <Eye className="h-4 w-4" />
                                  <span>View</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No pending items</h3>
                    <p className="text-gray-600">All items have been reviewed</p>
                  </div>
                )}
              </div>
            )}

            {/* Reported Items Tab */}
            {activeTab === 'reported' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Reported Items ({reportedItems.length})
                </h2>
                
                {reportedItems.length > 0 ? (
                  <div className="space-y-6">
                    {reportedItems.map(report => (
                      <div key={report.id} className="border border-red-200 bg-red-50 rounded-lg p-6">
                        <div className="flex space-x-6">
                          <img
                            src={report.item.images[0]}
                            alt={report.item.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {report.item.title}
                                </h3>
                                <p className="text-gray-600 mb-2">
                                  by {report.item.uploaderName}
                                </p>
                                <div className="bg-white border border-red-200 rounded-lg p-3 mb-3">
                                  <p className="text-sm text-gray-700">
                                    <strong>Report reason:</strong> {report.reason}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Reported by {report.reportedBy} on {new Date(report.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleResolveReport(report.id, 'resolved')}
                                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                  Resolve
                                </button>
                                <button
                                  onClick={() => handleResolveReport(report.id, 'removed')}
                                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                  Remove Item
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No reported items</h3>
                    <p className="text-gray-600">All reports have been resolved</p>
                  </div>
                )}
              </div>
            )}

            {/* User Management Tab */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">User Management</h2>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
                  <p className="text-gray-600">Advanced user management features coming soon</p>
                </div>
              </div>
            )}

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Platform Overview</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-blue-800">2 new items submitted for review</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-green-800">5 items approved today</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        <span className="text-orange-800">1 item reported</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 text-green-800 hover:bg-green-200 rounded transition-colors">
                        Review pending items
                      </button>
                      <button className="w-full text-left px-3 py-2 text-green-800 hover:bg-green-200 rounded transition-colors">
                        Check reported content
                      </button>
                      <button className="w-full text-left px-3 py-2 text-green-800 hover:bg-green-200 rounded transition-colors">
                        Generate reports
                      </button>
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

export default AdminPage;