import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  linkLabel?: string;
  linkHref?: string;
}

// Tái sử dụng cho FeaturedProducts, Categories và các section khác
export default function SectionHeader({ title, subtitle, linkLabel, linkHref }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-end mb-10">
      <div>
        <h2 className="text-2xl font-black text-emerald-800 mb-2">{title}</h2>
        {subtitle && <p className="text-emerald-600 max-w-xl">{subtitle}</p>}
      </div>
      {linkLabel && linkHref && (
        <a
          href={linkHref}
          className="hidden sm:inline-block text-sm font-bold text-orange-600 underline decoration-2 hover:text-orange-500 transition-colors"
        >
          {linkLabel} →
        </a>
      )}
    </div>
  );
}
