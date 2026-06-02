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
import LoginModal from './components/LoginModal';
import Profile from './components/Profile';
import { Routes, Route } from 'react-router-dom';

export default function App() {

  return (
    <div className="min-h-screen bg-lime-50 font-sans text-emerald-900 antialiased">
      <Header />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Categories />
              <FeaturedProducts />
            </>
          } />
          <Route path="/login" element={<LoginModal />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
