// ./frontend/src/components/PageWrapper.tsx
import React from "react";
import MiniSystemMeters from "./MiniSystemMeters";

interface PageWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PageWrapper({ title, subtitle, children }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                <MiniSystemMeters />
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </header>
        <div className="bg-gray-50 rounded-2xl shadow-md p-6">{children}</div>
      </div>
    </div>
  );
}