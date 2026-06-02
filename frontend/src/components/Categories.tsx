import { categories } from '../data';
import * as Icons from 'lucide-react';

export default function Categories() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" id="categories">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-black text-emerald-800">Browse Categories</h2>
          <p className="hidden md:block text-emerald-600 max-w-2xl mx-auto">Explore our wide variety of premium fruits sorted by your favorite types.</p>
          <a href="#" className="text-sm font-bold text-orange-600 underline decoration-2">View All</a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            // Dynamically get the Lucide component based on iconName
            const IconComponent = (Icons as any)[category.iconName] || Icons.Leaf;
            
            const colorThemes = [
              { bg: "bg-orange-100", border: "border-orange-200", hover: "hover:bg-orange-200", text: "text-orange-900" },
              { bg: "bg-pink-100", border: "border-pink-200", hover: "hover:bg-pink-200", text: "text-pink-900" },
              { bg: "bg-yellow-100", border: "border-yellow-200", hover: "hover:bg-yellow-200", text: "text-yellow-900" },
              { bg: "bg-green-100", border: "border-green-200", hover: "hover:bg-green-200", text: "text-green-900" },
            ];
            
            const theme = colorThemes[index % colorThemes.length];
            
            return (
              <div 
                key={category.id} 
                className={`flex items-center gap-4 ${theme.bg} p-4 rounded-2xl border-2 ${theme.border} cursor-pointer ${theme.hover} transition-colors`}
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <IconComponent className={`h-6 w-6 ${theme.text}`} />
                </div>
                <span className={`font-black ${theme.text}`}>
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
