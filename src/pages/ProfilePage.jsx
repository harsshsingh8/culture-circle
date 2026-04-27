import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Edit3, Save, X, LogOut, ChevronLeft, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const { cart } = useCart();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-2">Please sign in</h2>
          <p className="text-gray-500 mb-6">You need to be logged in to view your profile</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    await updateProfile({ name, email });
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in-up">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-8 border-b border-gray-100">
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Member since {memberSince}
              </p>
            </div>
            <button
              onClick={() => {
                setName(user.name);
                setEmail(user.email);
                setIsEditing(!isEditing);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {/* Profile Info */}
          {isEditing ? (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
                <p className="text-base font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                <p className="text-base font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Account ID</p>
                <p className="text-base font-mono text-sm">#{user.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Member Since</p>
                <p className="text-base font-medium">{memberSince}</p>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-black">{cart.length}</p>
            <p className="text-xs text-gray-500 mt-1">Items in Cart</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-black">0</p>
            <p className="text-xs text-gray-500 mt-1">Orders Placed</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-black">0</p>
            <p className="text-xs text-gray-500 mt-1">Wishlist Items</p>
          </div>
        </div>
      </div>
    </div>
  );
}
