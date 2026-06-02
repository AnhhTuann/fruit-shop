import React from 'react';

interface AlertMessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
}

const styles = {
  success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  error: 'bg-red-50 text-red-600 border-red-100',
  info: 'bg-blue-50 text-blue-600 border-blue-100',
};

// Tái sử dụng cho CartDrawer, LoginModal, và bất kỳ form nào cần thông báo
export default function AlertMessage({ type, message }: AlertMessageProps) {
  return (
    <div className={`p-3 rounded-xl text-sm font-bold text-center border ${styles[type]}`}>
      {message}
    </div>
  );
}
