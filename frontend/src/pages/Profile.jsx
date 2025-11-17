import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { profileAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

// SVG Icons
const IconUser = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconShoppingBag = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const IconHeart = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const IconShoppingCart = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IconMapPin = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconCreditCard = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const IconBell = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.007 2.007 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const IconShieldCheck = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.002 12.002 0 002.944 12c.047 1.994.496 3.931 1.258 5.728a11.97 11.97 0 006.183 4.288c.376.108.775.108 1.151 0a11.97 11.97 0 006.183-4.288c.762-1.797 1.211-3.734 1.258-5.728a12.002 12.002 0 00-1.742-9.056z" />
  </svg>
);

const IconLogout = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const IconEdit = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const IconAdmin = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.002 12.002 0 002.944 12c.047 1.994.496 3.931 1.258 5.728a11.97 11.97 0 006.183 4.288c.376.108.775.108 1.151 0a11.97 11.97 0 006.183-4.288c.762-1.797 1.211-3.734 1.258-5.728a12.002 12.002 0 00-1.742-9.056z" />
  </svg>
);

const Profile = () => {
  const { user: authUser, isAuthenticated, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Quick actions data
  const quickActions = [
    {
      id: 'orders',
      title: 'My Orders',
      description: 'Track & manage orders',
      icon: IconShoppingBag,
      count: profileData?.orders?.length || 0,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      href: '/orders'
    },
    {
      id: 'wishlist',
      title: 'Wishlist',
      description: 'Saved items',
      icon: IconHeart,
      count: profileData?.wishlist?.products?.length || 0,
      color: 'bg-pink-50 text-pink-600 border-pink-200',
      href: '/wishlist'
    },
    {
      id: 'cart',
      title: 'Shopping Cart',
      description: 'Items to buy',
      icon: IconShoppingCart,
      count: profileData?.cart?.items?.length || 0,
      color: 'bg-green-50 text-green-600 border-green-200',
      href: '/cart'
    },
    {
      id: 'addresses',
      title: 'Addresses',
      description: 'Delivery locations',
      icon: IconMapPin,
      count: profileData?.addresses?.length || 1,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      href: '#addresses'
    }
  ];

  // Menu items
  const menuItems = [
    { id: 'profile', label: 'Profile Information', icon: IconUser },
    { id: 'orders', label: 'Order History', icon: IconShoppingBag },
    { id: 'security', label: 'Security & Privacy', icon: IconShieldCheck },
    { id: 'notifications', label: 'Notifications', icon: IconBell },
    { id: 'payments', label: 'Payment Methods', icon: IconCreditCard },
  ];

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      setProfileData(null);
      setIsLoading(false);
      return;
    }
    loadProfile();
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
    if (searchParams.get('payment') === 'success') {
      setSuccess('Payment successful! Your order has been placed.');
      // Clear the query parameter
      navigate('/profile?tab=orders', { replace: true });
    }
  }, [searchParams, navigate]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const response = await profileAPI.getProfile();
      if (response.success) {
        setProfileData(response.data);
        const user = response.data.user;
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address 
            ? `${user.address.address || ''}, ${user.address.city || ''}, ${user.address.state || ''}, ${user.address.country || 'India'}`.replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ',')
            : '',
        });
      } else {
        setError(response.message || 'Failed to load profile data.');
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile data due to a network error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Parse address string into address object
      let addressObj = null;
      if (formData.address && formData.address.trim()) {
        const parts = formData.address.split(',').map(p => p.trim()).filter(p => p);
        if (parts.length > 0) {
          addressObj = {
            address: parts[0] || '',
            city: parts[1] || '',
            state: parts[2] || '',
            country: parts[3] || 'India',
          };
        }
      }

      const updateData = {
        name: formData.name,
        phone: formData.phone,
      };

      if (addressObj) {
        updateData.address = addressObj;
      }

      const response = await profileAPI.updateProfile(updateData);
      if (response.success) {
        setSuccess('Profile updated successfully!');
        await loadProfile();
      } else {
        setError(response.message || 'Failed to update profile.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile due to a network error.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconUser className="w-8 h-8 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Us</h2>
            <p className="text-gray-600 mb-6">Sign in to access your personalized dashboard</p>
            <div className="space-y-3">
              <Link
                to="/login"
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors block"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors block"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Unable to fetch profile. Try again later.</p>
        </div>
      </div>
    );
  }

  const { user } = profileData;
  const displayName = user?.name || 'User';
  const userInitial = displayName.charAt(0).toUpperCase();
  const isAdmin = authUser?.isAdmin || user?.isAdmin;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <IconLogout className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - User Info & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
                  {userInitial}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{displayName}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="text-sm text-gray-500">Member since {new Date(user?.createdAt).getFullYear()}</p>
                </div>
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                <IconEdit className="w-4 h-4" />
                Edit Profile
              </button>
              
              {isAdmin && (
                <Link
                  to="/admin"
                  className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-3"
                >
                  <IconAdmin className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.id}
                    to={action.href}
                    className="flex items-center gap-4 p-3 rounded-lg border-2 hover:border-current transition-all duration-200 hover:shadow-sm group"
                  >
                    <div className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{action.title}</p>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <div className="bg-gray-100 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                      {action.count}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border">
              {/* Tab Navigation */}
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium whitespace-nowrap transition-colors ${
                        activeTab === item.id
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                    {success}
                  </div>
                )}

                {/* Profile Information Tab */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          disabled
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Member Since
                        </label>
                        <input
                          type="text"
                          value={new Date(user?.createdAt).toLocaleDateString()}
                          disabled
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        placeholder="Enter your complete address"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={loadProfile}
                        className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Order History Tab */}
                {activeTab === 'orders' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
                    {profileData?.orders && profileData.orders.length > 0 ? (
                      <div className="space-y-4">
                        {profileData.orders.map((order) => (
                          <div key={order._id} className="bg-white rounded-xl border p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    Order #{order._id?.slice(-8)?.toUpperCase() || 'N/A'}
                                  </h3>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                      order.status === 'delivered'
                                        ? 'bg-green-100 text-green-700'
                                        : order.status === 'shipped'
                                        ? 'bg-blue-100 text-blue-700'
                                        : order.status === 'processing'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : order.status === 'cancelled'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}
                                  >
                                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                  Placed on {new Date(order.orderDate || order.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {order.items?.length || 0} item(s) · Total: ₹{order.totalAmount?.toLocaleString() || '0'}
                                </p>
                              </div>
                            </div>
                            <div className="border-t pt-4">
                              <h4 className="text-sm font-semibold text-gray-900 mb-3">Items:</h4>
                              <div className="space-y-3">
                                {order.items?.map((item, index) => (
                                  <div key={index} className="flex items-start gap-4">
                                    {item.product?.images?.[0] && (
                                      <img
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                      />
                                    )}
                                    <div className="flex-1">
                                      <p className="font-medium text-gray-900">{item.product?.name || 'Product'}</p>
                                      <p className="text-sm text-gray-600">{item.product?.brand || ''}</p>
                                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                        <span>Qty: {item.quantity}</span>
                                        {item.size && <span>Size: {item.size}</span>}
                                        {item.color && <span>Color: {item.color}</span>}
                                        <span className="font-semibold text-gray-900">
                                          ₹{(item.price * item.quantity).toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {order.shippingAddress && (
                              <div className="border-t pt-4 mt-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Shipping Address:</h4>
                                <p className="text-sm text-gray-600">
                                  {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                                </p>
                                <p className="text-sm text-gray-600">{order.shippingAddress.country}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-xl border p-12 text-center">
                        <IconShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-600 mb-6">Start shopping to see your order history here</p>
                        <Link
                          to="/"
                          className="inline-block px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                        >
                          Start Shopping
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Security & Privacy Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Password</h4>
                      <p className="text-gray-600 mb-4">Last changed 3 months ago</p>
                      <button className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                        Change Password
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h4>
                      <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                      <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    {[
                      { id: 'email', title: 'Email Notifications', description: 'Order updates, promotions, and security alerts' },
                      { id: 'sms', title: 'SMS Alerts', description: 'Delivery updates and important reminders' },
                      { id: 'push', title: 'Push Notifications', description: 'Price drops and personalized recommendations' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Payment Methods Tab */}
                {activeTab === 'payments' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Saved Cards</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-6 bg-blue-500 rounded"></div>
                            <div>
                              <p className="font-semibold">•••• •••• •••• 1824</p>
                              <p className="text-sm text-gray-600">Expires 09/28</p>
                            </div>
                          </div>
                          <button className="text-red-600 hover:text-red-700 font-medium">
                            Remove
                          </button>
                        </div>
                      </div>
                      <button className="mt-4 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                        Add New Card
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;