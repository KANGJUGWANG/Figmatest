import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { Plane, Activity } from 'lucide-react';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col items-center">
      {/* Top Navigation */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="w-6 h-6 text-indigo-700" />
            <span className="font-semibold text-lg tracking-tight">에어로트랙</span>
          </div>
          <nav className="flex gap-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-slate-100 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              항공권 검색
            </NavLink>
            <NavLink
              to="/tracked"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive ? 'bg-slate-100 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <Activity className="w-4 h-4" />
              추적 항공권
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl mx-auto px-4 py-8 flex-1">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-slate-100 py-6 text-center text-slate-500 text-sm mt-auto">
        &copy; 2026 에어로트랙 (AeroTrack). 항공권 가격 판단 보조 서비스.
      </footer>
    </div>
  );
};
