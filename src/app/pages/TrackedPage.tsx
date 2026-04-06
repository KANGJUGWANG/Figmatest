import React from 'react';
import { mockFlights } from '../data';
import { FlightCard } from '../components/FlightCard';
import { Activity, BellRing, Settings2 } from 'lucide-react';

export const TrackedPage = () => {
  const trackedFlights = mockFlights.filter(f => f.trackedAt);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-lg overflow-hidden relative">
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl font-bold">추적 중인 항공권</h1>
          </div>
          <p className="text-slate-400 text-sm">총 {trackedFlights.length}개의 항공권 가격 변동을 주시하고 있습니다.</p>
        </div>
        
        <div className="relative z-10 hidden md:flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
            <BellRing className="w-4 h-4" />
            알림 설정
          </button>
          <button className="p-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-colors backdrop-blur-sm">
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-6">
        {trackedFlights.length > 0 ? (
          trackedFlights.map(flight => (
            <div key={flight.id} className="relative group">
              <FlightCard flight={flight} isTracking={true} />
              
              <button className="absolute -right-3 -top-3 w-8 h-8 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 hover:shadow-md">
                <span className="sr-only">삭제</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
            <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 mb-2">추적 중인 항공권이 없습니다.</h3>
            <p className="text-slate-500 mb-6 text-sm">검색 결과에서 관심 있는 항공권을 추적해보세요.</p>
            <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              항공권 검색하러 가기
            </a>
          </div>
        )}
      </div>

    </div>
  );
};
