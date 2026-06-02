import React from 'react';
import * as Icons from 'lucide-react';
import { categories } from '../data';
import SectionHeader from './SectionHeader';

const COLOR_THEMES = [
  { bg: 'bg-orange-100', border: 'border-orange-200', hover: 'hover:bg-orange-200', text: 'text-orange-900' },
  { bg: 'bg-pink-100',   border: 'border-pink-200',   hover: 'hover:bg-pink-200',   text: 'text-pink-900'   },
  { bg: 'bg-yellow-100', border: 'border-yellow-200', hover: 'hover:bg-yellow-200', text: 'text-yellow-900' },
  { bg: 'bg-green-100',  border: 'border-green-200',  hover: 'hover:bg-green-200',  text: 'text-green-900'  },
];

export default function Categories() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" id="categories">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Browse Categories"
          subtitle="Explore our wide variety of premium fruits sorted by your favourite types."
          linkLabel="View All"
          linkHref="#"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = (Icons as any)[category.iconName] || Icons.Leaf;
            const theme = COLOR_THEMES[index % COLOR_THEMES.length];

            return (
              <div
                key={category.id}
                className={`flex items-center gap-4 ${theme.bg} p-4 rounded-2xl border-2 ${theme.border} cursor-pointer ${theme.hover} transition-colors`}
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <IconComponent className={`h-6 w-6 ${theme.text}`} />
                </div>
                <span className={`font-black ${theme.text}`}>{category.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
