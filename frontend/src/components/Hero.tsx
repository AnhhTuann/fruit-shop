export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-emerald-400 to-lime-400">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="absolute top-0 left-0 w-48 h-48 -translate-x-12 -translate-y-12" viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="40"/></svg>
        <svg className="absolute bottom-0 right-0 w-64 h-64 translate-x-10 translate-y-10" viewBox="0 0 100 100" fill="currentColor"><path d="M50 0 L100 50 L50 100 L0 50 Z"/></svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          <div className="text-center lg:text-left z-10">
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mb-4 uppercase tracking-tighter">
              100% Organic & Local
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6">
              Fresh Organic Fruits <br className="hidden lg:block"/> 
              <span className="text-white">Delivered to Your Door</span>
            </h1>
            <p className="text-lg sm:text-xl text-emerald-50 mb-8 max-w-2xl mx-auto lg:mx-0">
              Experience the taste of nature with our hand-picked, farm-fresh fruits. Packed with nutrients and flavor, straight from local farms to your table.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-white text-emerald-600 font-black rounded-xl shadow-lg hover:bg-orange-50 transition-colors uppercase tracking-widest text-sm">
                Shop Now
              </button>
              <button className="px-8 py-4 bg-white/20 text-white border border-white/30 font-black rounded-xl shadow-sm hover:bg-white/30 transition-colors uppercase tracking-widest text-sm">
                View Offers
              </button>
            </div>
          </div>

          <div className="relative z-10 hidden md:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/20 aspect-square lg:aspect-auto lg:h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80" 
                alt="Mix of fresh organic fruits" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-3xl flex flex-col items-center justify-center animate-bounce-slow h-32 w-32 shadow-xl">
               <div className="text-3xl mb-1">⚡️</div>
               <div className="font-bold text-sm text-center leading-tight">Fast<br/>Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
