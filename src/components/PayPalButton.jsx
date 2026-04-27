import { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CreditCard, X } from 'lucide-react';

export default function PayPalCheckout({ product, onClose }) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [paidFor, setPaidFor] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Require login before checkout
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in-up">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Login Required</h3>
            <p className="text-gray-500 text-sm">Please sign in to complete your purchase</p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => {
                onClose();
                navigate('/login', { state: { from: '/cart' } });
              }}
              className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                onClose();
                navigate('/signup', { state: { from: '/cart' } });
              }}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Account
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
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
