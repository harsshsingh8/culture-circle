import { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CreditCard, X, Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react';

export default function PayPalCheckout({ product, onClose }) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [paidFor, setPaidFor] = useState(false);
  const { isAuthenticated, login, signup } = useAuth();
  const navigate = useNavigate();

  // Login form state
  const [showLogin, setShowLogin] = useState(!isAuthenticated);
  const [isSignup, setIsSignup] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If showing login form
  if (showLogin && !isAuthenticated) {
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoginError('');
      setIsLoading(true);

      try {
        let result;
        if (isSignup) {
          result = await signup(signupName, loginEmail, loginPassword);
        } else {
          result = await login(loginEmail, loginPassword);
        }

        if (result.success) {
          setShowLogin(false);
        } else {
          setLoginError(result.error);
        }
      } catch (error) {
        setLoginError('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in-up">
        <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              {isSignup ? 'Create Account' : 'Sign In'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Login required message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-700">
              🔒 Please sign in to complete your purchase of <span className="font-semibold">{product.name}</span>
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
              {loginError}
            </div>
          )}

          {/* Login/Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  placeholder={isSignup ? 'Min. 6 characters' : 'Enter your password'}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  {isSignup ? 'Creating Account...' : 'Signing In...'}
                </>
              ) : (
                isSignup ? 'Create Account & Continue' : 'Sign In & Continue'
              )}
            </button>
          </form>

          {/* Toggle between login and signup */}
          <div className="mt-6 text-center text-sm text-gray-500">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setIsSignup(false);
                    setLoginError('');
                  }}
                  className="text-black font-medium hover:underline"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setIsSignup(true);
                    setLoginError('');
                  }}
                  className="text-black font-medium hover:underline"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Demo account */}
          {!isSignup && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 font-medium mb-1">Demo Account:</p>
              <p className="text-xs text-gray-500">Email: demo@luxecart.com</p>
              <p className="text-xs text-gray-500">Password: demo123</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  const [error, setError] = useState(null);

  const handleApprove = (orderID) => {
    setPaidFor(true);
    console.log('Order approved:', orderID);
  };

  if (paidFor) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
          <p className="text-gray-500 text-sm mb-4">
            Thank you for your purchase of <span className="font-semibold">{product.name}</span>.
          </p>
          <p className="text-lg font-bold text-green-600 mb-6">${product.price}</p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-fade-in-up relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Secure Checkout</h3>
            <p className="text-sm text-gray-500">Pay with PayPal</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="text-sm font-medium line-clamp-2">{product.name}</h4>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-lg font-bold text-red-600">${product.price}</span>
                <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {isPending ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
        ) : (
          <PayPalButtons
            style={{
              layout: 'vertical',
              shape: 'rect',
              label: 'paypal',
            }}
            createOrder={(_data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: product.name,
                    amount: {
                      value: product.price.toString(),
                      currency_code: 'USD',
                    },
                  },
                ],
              });
            }}
            onApprove={async (_data, actions) => {
              const order = await actions.order.capture();
              handleApprove(order.id);
            }}
            onError={(err) => {
              setError('Something went wrong with your payment. Please try again.');
              console.error('PayPal error:', err);
            }}
            onCancel={() => {
              console.log('Payment cancelled');
            }}
          />
        )}

        <div className="flex items-center justify-center gap-2 mt-4">
          <svg className="w-6 h-4" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#003087"/>
            <path d="M18.6 8H13l-3.2 16h3.8l1-5h2.8c3.2 0 5.4-1.6 6-5.2.3-1.8-.2-3.2-1.4-4.2C21.2 8.6 20 8 18.6 8zm-.8 5.6c-.2 1.2-1.2 1.2-2.2 1.2h-1.4l.8-4h1.4c1 0 2 .2 1.8 1.4.1.6 0 1-.4 1.4z" fill="#FFFFFF"/>
            <path d="M34.6 8H29l-3.2 16h3.8l1-5h2.8c3.2 0 5.4-1.6 6-5.2.3-1.8-.2-3.2-1.4-4.2C37.2 8.6 36 8 34.6 8zm-.8 5.6c-.2 1.2-1.2 1.2-2.2 1.2h-1.4l.8-4h1.4c1 0 2 .2 1.8 1.4.1.6 0 1-.4 1.4z" fill="#FFFFFF"/>
          </svg>
          <span className="text-xs text-gray-400">Protected by PayPal Buyer Protection</span>
        </div>
      </div>
    </div>
  );
}
