/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Login from './components/Login';

export default function App() {
  return (
    <div className="min-h-screen bg-lime-50 font-sans text-emerald-900 antialiased">
      <Header />
      <CartDrawer />
      <main>
        <Login />
        <Hero />
        <Categories />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}
