import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { mockFlights, getStatusColors, getStatusText } from '../data';
import { Badge } from '../components/FlightCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ArrowLeft, Bell, PlaneTakeoff, ShieldCheck, BaggageClaim, Banknote } from 'lucide-react';
import { toast } from 'sonner';

export const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isTracked, setIsTracked] = useState(false);
  
  const flight = mockFlights.find(f => f.id === id);

  if (!flight) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-bold text-slate-800 mb-4">항공편을 찾을 수 없습니다.</h2>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">돌아가기</button>
      </div>
    );
  }

  const handleTrack = () => {
    setIsTracked(true);
    toast.success('이 항공권을 추적 목록에 추가했습니다.', {
      description: '가격이 변동될 때 알림을 받을 수 있습니다.'
    });
  };

  const statusColor = getStatusColors(flight.status);
  const isRecommend = flight.status === 'RECOMMEND';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Top Nav */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-4 transition-colors w-fit">
        <ArrowLeft className="w-5 h-5" />
        결과 목록으로 돌아가기
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Flight Info Box */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 opacity-50"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-sm font-bold tracking-wider">{flight.airlineCode}</span>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">{flight.airline}</h1>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="text-center">
                <div className="text-sm font-medium text-slate-500 mb-1">{flight.origin}</div>
                <div className="text-3xl md:text-4xl font-black text-slate-900">{flight.departureTime.split(' ')[1]}</div>
                <div className="text-sm text-slate-500 mt-2">{flight.departureTime.split(' ')[0]}</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center px-4 md:px-8">
                <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full mb-3">
                  {flight.duration}
                </div>
                <div className="w-full relative flex items-center justify-center">
                  <div className="h-0.5 bg-slate-200 w-full"></div>
                  <PlaneTakeoff className="w-6 h-6 text-indigo-400 absolute bg-white p-1 rounded-full border border-indigo-100" />
                </div>
                <div className="text-xs font-medium text-slate-500 mt-3">
                  {flight.stops === 0 ? '직항' : `${flight.stops}회 경유`}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm font-medium text-slate-500 mb-1">{flight.destination}</div>
                <div className="text-3xl md:text-4xl font-black text-slate-900">{flight.arrivalTime.split(' ')[1]}</div>
                <div className="text-sm text-slate-500 mt-2">{flight.arrivalTime.split(' ')[0]}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                기내식 포함
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <BaggageClaim className={`w-4 h-4 ${flight.baggageIncluded ? 'text-emerald-500' : 'text-slate-400'}`} />
                {flight.baggageIncluded ? '위탁 수하물 15kg' : '수하물 미포함'}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Banknote className={`w-4 h-4 ${flight.refundable ? 'text-emerald-500' : 'text-slate-400'}`} />
                {flight.refundable ? '환불 가능 (수수료 O)' : '환불 불가'}
              </div>
            </div>
          </div>

          {/* Price Graph */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">최근 가격 추이</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={flight.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis key="xaxis" dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis 
                    key="yaxis"
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`}
                  />
                  <Tooltip 
                    key="tooltip"
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`${value.toLocaleString()}원`, '가격']}
                    labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                  />
                  <ReferenceLine key="refline" y={flight.currentPrice} stroke={isRecommend ? '#10b981' : '#f59e0b'} strokeDasharray="3 3" />
                  <Line 
                    key="line"
                    type="monotone" 
                    dataKey="price" 
                    stroke="#4f46e5" 
                    strokeWidth={3} 
                    dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4, stroke: '#fff' }} 
                    activeDot={{ r: 6, strokeWidth: 0 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
            
            <div className={`w-full p-4 rounded-xl border flex flex-col items-center justify-center gap-2 mb-6 ${statusColor}`}>
              <div className="text-xs font-bold uppercase tracking-wider opacity-80">AI 구매 판단</div>
              <div className="text-xl font-black">{getStatusText(flight.status)}</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-sm font-medium text-slate-500">현재 예상가</span>
                <span className="text-2xl font-black text-slate-900">{flight.currentPrice.toLocaleString()}<span className="text-base font-normal ml-1">원</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">최근 일주일 대비</span>
                <span className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                  ▼ 15% (약 45,000원)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">출발일 임박 여부</span>
                <span className="text-sm font-bold text-amber-600">3주 남음 (여유)</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleTrack}
                disabled={isTracked}
                className={`w-full py-4 px-4 rounded-xl text-base font-bold shadow-sm transition-all flex items-center justify-center gap-2 ${
                  isTracked 
                    ? 'bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-200'
                    : 'bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-50 hover:shadow-md'
                }`}
              >
                <Bell className="w-5 h-5" />
                {isTracked ? '추적 중인 항공권' : '이 가격 변동 추적하기'}
              </button>
              
              <button className="w-full py-4 px-4 rounded-xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all">
                항공사에서 예매하기
              </button>
              <div className="text-center text-xs text-slate-400 mt-2">
                실제 결제는 해당 항공사 또는 여행사 사이트에서 진행됩니다.
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
