import React, { useState } from 'react';
import { mockFlights } from '../data';
import { FlightCard } from '../components/FlightCard';
import { SlidersHorizontal, ArrowUpDown, Info, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export const ResultsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('ALL');
  
  const filteredFlights = filter === 'ALL' 
    ? mockFlights 
    : mockFlights.filter(f => f.status === filter);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Header Summary */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span>서울 (ICN)</span>
            <span className="text-slate-400 text-sm">→</span>
            <span>도쿄 (NRT)</span>
          </div>
          <div className="text-sm text-slate-500 mt-1 font-medium">
            2026.05.01 - 2026.05.05 • 성인 1명 • 일반석
          </div>
        </div>
        <button className="text-sm font-semibold text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
          검색 변경
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-blue-900 text-sm mb-1">현재 도쿄행 항공권은 평균가보다 15% 저렴합니다.</h4>
          <p className="text-xs text-blue-700 leading-relaxed">
            최근 2주간 가격이 꾸준히 하락하는 추세입니다. 가장 저렴한 표가 마감되기 전에 '지금 구매 추천' 항공권을 예매하는 것을 권장합니다.
          </p>
        </div>
      </div>

      {/* Filters & Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-2">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <button 
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
              filter === 'ALL' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            전체 결과 ({mockFlights.length})
          </button>
          <button 
            onClick={() => setFilter('RECOMMEND')}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              filter === 'RECOMMEND' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${filter === 'RECOMMEND' ? 'bg-emerald-600' : 'bg-emerald-400'}`}></div>
            지금 구매 추천
          </button>
          <button 
            onClick={() => setFilter('WAIT')}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              filter === 'WAIT' ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${filter === 'WAIT' ? 'bg-amber-600' : 'bg-amber-400'}`}></div>
            조금 더 기다리기
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            필터
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <ArrowUpDown className="w-4 h-4 text-slate-500" />
            추천순
          </button>
        </div>
      </div>

      {/* Flight List */}
      <div className="space-y-4">
        {filteredFlights.map(flight => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
        {filteredFlights.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
            <div className="text-slate-400 mb-2">해당 조건에 맞는 항공권이 없습니다.</div>
            <button onClick={() => setFilter('ALL')} className="text-indigo-600 font-semibold hover:underline">
              전체 보기로 돌아가기
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
