import React from 'react';

interface SkeletonCardProps {
  count?: number;
}

// Tái sử dụng cho FeaturedProducts và bất kỳ danh sách sản phẩm nào
export default function SkeletonCard({ count = 4 }: SkeletonCardProps) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-lime-200 flex flex-col animate-pulse">
          <div className="aspect-[4/3] bg-lime-100 rounded-2xl mb-4"></div>
          <div className="h-3 bg-lime-100 rounded w-1/4 mb-3"></div>
          <div className="h-5 bg-lime-100 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-lime-100 rounded w-full mb-4"></div>
          <div className="mt-auto flex items-center justify-between">
            <div className="h-6 bg-lime-100 rounded w-1/4"></div>
            <div className="w-10 h-10 bg-lime-100 rounded-full"></div>
          </div>
        </div>
      ))}
    </>
  );
}
