import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recycle, User, LogOut, Plus, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Recycle className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">ReWear</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="text-gray-700 hover:text-green-600 transition-colors">
              Browse Items
            </Link>
            {user && (
              <Link to="/add-item" className="text-gray-700 hover:text-green-600 transition-colors">
                List an Item
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-lg">
                  <span className="text-sm font-medium text-green-700">
                    {user.points} points
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {user && (
          <div className="md:hidden pb-4 flex space-x-4">
            <Link to="/" className="flex items-center space-x-1 text-gray-700">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/add-item" className="flex items-center space-x-1 text-gray-700">
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Link>
            <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded">
              <span className="text-sm text-green-700">{user.points} pts</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;