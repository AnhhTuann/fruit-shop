import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { GET_USER_PROFILE } from '../graphql/queries';
import { useAuthStore } from '../store/authStore';
import { User, Package, ArrowLeft } from 'lucide-react';
import { Product } from '../types';

interface OrderResponse {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  products: Product[];
}

interface UserProfileResponse {
  me: {
    id: string;
    name: string;
    email: string;
    orders: OrderResponse[];
  };
}

export default function Profile() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery<UserProfileResponse>(GET_USER_PROFILE, {
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Return null while redirecting
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        to="/"
        className="flex items-center text-emerald-600 font-bold hover:text-emerald-700 transition-colors mb-8 group w-max"
      >
        <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Shop
      </Link>

      {/* User Info Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-lime-200 flex items-center gap-6 mb-12">
        <div className="h-24 w-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="h-12 w-12" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-emerald-900">{user.name || 'Valued Customer'}</h1>
          <p className="text-emerald-600 mt-1 font-medium">{user.email}</p>
        </div>
      </div>

      <h2 className="text-2xl font-black text-emerald-900 mb-6 flex items-center gap-3">
        <Package className="text-emerald-500" />
        Order History
      </h2>

      {/* Order History */}
      {loading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-lime-100 shadow-sm animate-pulse">
              <div className="h-6 bg-lime-100 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-lime-100 rounded w-1/3 mb-6"></div>
              <div className="flex gap-4">
                <div className="h-16 w-16 bg-lime-100 rounded-xl"></div>
                <div className="h-16 w-16 bg-lime-100 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-3xl border border-red-100 font-bold">
          Error loading profile data: {error.message}
        </div>
      ) : data?.me?.orders?.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-lime-200">
          <Package className="h-16 w-16 text-lime-200 mx-auto mb-4" />
          <p className="text-emerald-600 font-bold text-lg">You haven't placed any orders yet.</p>
          <Link 
            to="/"
            className="mt-6 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-md active:scale-95 inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {data?.me?.orders?.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-lime-200 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                      Order #{order.id}
                    </span>
                    <span className="text-sm font-bold text-emerald-800">
                      {new Date(Number(order.createdAt)).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase ${
                    order.status === 'COMPLETED' || order.status === 'PENDING' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {order.status || 'PENDING'}
                  </span>
                </div>
                
                <p className="text-2xl font-black text-emerald-900 mb-6">
                  ${order.total.toFixed(2)}
                </p>

                <div className="flex flex-wrap gap-3">
                  {order.products.slice(0, 5).map((product, idx) => (
                    <div key={`${product.id}-${idx}`} className="group relative">
                      <img 
                        src={product.imageUrl || `https://picsum.photos/seed/${product.id}/200`} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-xl border-2 border-lime-50 bg-lime-50"
                      />
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-emerald-900 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {product.name}
                      </div>
                    </div>
                  ))}
                  {order.products.length > 5 && (
                    <div className="w-16 h-16 rounded-xl border-2 border-lime-100 bg-lime-50 flex items-center justify-center text-emerald-600 font-black text-sm">
                      +{order.products.length - 5}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
