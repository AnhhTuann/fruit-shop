import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-emerald-100 pt-16 pb-8" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-xl filter drop-shadow-sm text-white">🍋</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Fruit<span className="text-orange-400">Shop</span>
              </span>
            </div>
            <p className="text-emerald-200/80 text-sm leading-relaxed mb-6">
              Bringing the freshest, highest-quality organic fruits directly from local farms to your doorstep. Taste the difference of truly fresh produce.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-800 hover:bg-emerald-700 transition-colors pointer cursor-pointer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-800 hover:bg-emerald-700 transition-colors pointer cursor-pointer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-800 hover:bg-emerald-700 transition-colors pointer cursor-pointer">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['About Us', 'Shop Policy', 'Farmer Partners', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-emerald-200/80 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <span className="h-1 w-1 bg-emerald-500 rounded-full"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-sm text-emerald-200/80">
                <MapPin className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>123 Orchard Way, <br/>Fresh Valley, CA 90210</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-emerald-200/80">
                <Phone className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-emerald-200/80">
                <Mail className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <a href="mailto:hello@fruitshop.com" className="hover:text-white transition-colors">hello@fruitshop.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Newsletter</h3>
            <p className="text-emerald-200/80 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-emerald-800 border-none rounded-full py-3 px-5 text-sm text-white placeholder-emerald-400 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1 bottom-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-4 text-sm font-semibold transition-colors"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-emerald-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-emerald-200/80 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Fruit Shop. All rights reserved.
          </p>
          <div className="flex gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-opacity" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-opacity" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
}
