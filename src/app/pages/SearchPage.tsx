import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Briefcase, Activity } from 'lucide-react';
import { useNavigate } from 'react-router';

export const SearchPage = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('round');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/results');
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10 py-6">
      
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">최적의 구매 시점을<br />찾아드립니다</h1>
        <p className="text-lg text-slate-500">항공권 가격 추이를 분석하고 지금 사야 할지, 기다려야 할지 알려드립니다.</p>
      </div>

      {/* Search Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex gap-4 mb-8">
          <button 
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              tripType === 'round' ? 'bg-indigo-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            onClick={() => setTripType('round')}
          >
            왕복
          </button>
          <button 
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              tripType === 'one' ? 'bg-indigo-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            onClick={() => setTripType('one')}
          >
            편도
          </button>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Origin */}
            <div className="relative group">
              <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">출발지</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                <div className="pl-4 pr-3 text-slate-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  defaultValue="서울 (ICN)" 
                  className="w-full bg-transparent py-3.5 pr-4 text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none"
                  placeholder="도시 또는 공항"
                />
              </div>
            </div>

            {/* Destination */}
            <div className="relative group">
              <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">도착지</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                <div className="pl-4 pr-3 text-slate-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  defaultValue="도쿄 (NRT)" 
                  className="w-full bg-transparent py-3.5 pr-4 text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none"
                  placeholder="도시 또는 공항"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="relative group">
              <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">탑승일</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                <div className="pl-4 pr-3 text-slate-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  defaultValue="2026.05.01 - 2026.05.05" 
                  className="w-full bg-transparent py-3.5 pr-4 text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none text-sm"
                  placeholder="날짜 선택"
                />
              </div>
            </div>

            {/* Passengers & Class */}
            <div className="relative group">
              <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">인원 및 좌석</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all cursor-pointer">
                <div className="pl-4 pr-3 text-slate-400">
                  <Users className="w-5 h-5" />
                </div>
                <div className="w-full bg-transparent py-3.5 pr-4 text-slate-900 font-medium text-sm flex justify-between items-center">
                  <span>성인 1명</span>
                  <span className="text-slate-400 text-xs">일반석</span>
                </div>
              </div>
            </div>
            
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              항공권 및 가격 동향 검색
            </button>
          </div>
        </form>
      </div>

      {/* Quick Links / Suggestions */}
      <div className="mt-12">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 text-center">지금 가격 변동이 심한 인기 노선</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['오사카 (KIX)', '방콕 (BKK)', '후쿠오카 (FUK)', '파리 (CDG)'].map((dest) => (
            <button key={dest} onClick={handleSearch} className="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-indigo-300 hover:shadow-md transition-all group">
              <div className="text-xs text-slate-400 mb-1">서울 (ICN) 출발</div>
              <div className="font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{dest}</div>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 inline-flex px-2 py-1 rounded-md">
                <Activity className="w-3 h-3" />
                변동 주의
              </div>
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
};
