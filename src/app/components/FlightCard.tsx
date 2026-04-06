import React from 'react';
import { Flight, getStatusText, getStatusColors } from '../data';
import { Check, Clock, ShieldAlert, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

interface FlightCardProps {
  flight: Flight;
  isTracking?: boolean;
}

export const Badge = ({ status }: { status: Flight['status'] }) => {
  const text = getStatusText(status);
  const colors = getStatusColors(status);
  
  let Icon = ShieldAlert;
  if (status === 'RECOMMEND') Icon = Check;
  if (status === 'WAIT') Icon = Clock;
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colors}`}>
      <Icon className="w-3.5 h-3.5" />
      {text}
    </span>
  );
};

export const FlightCard = ({ flight, isTracking = false }: FlightCardProps) => {
  const priceChange = flight.trackedPrice ? flight.currentPrice - flight.trackedPrice : 0;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow relative">
      
      {/* Flight Info */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-bold">{flight.airlineCode}</span>
            <span className="text-sm font-medium text-slate-800">{flight.airline}</span>
          </div>
          <Badge status={flight.status} />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-xl font-bold text-slate-900">{flight.departureTime.split(' ')[1]}</div>
            <div className="text-xs text-slate-500 mt-1">{flight.origin}</div>
          </div>
          
          <div className="flex flex-col items-center px-4 flex-1">
            <div className="text-xs text-slate-400 mb-1">{flight.duration}</div>
            <div className="w-full relative flex items-center">
              <div className="h-px bg-slate-300 w-full"></div>
              <ArrowRight className="w-4 h-4 text-slate-400 absolute right-0 -mr-1 bg-white" />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              {flight.stops === 0 ? '직항' : `${flight.stops}회 경유`}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-slate-900">{flight.arrivalTime.split(' ')[1]}</div>
            <div className="text-xs text-slate-500 mt-1">{flight.destination}</div>
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="hidden sm:block w-px bg-slate-100"></div>
      
      {/* Action / Price Area */}
      <div className="sm:w-48 flex flex-col justify-between items-end gap-4">
        <div className="text-right w-full">
          {isTracking && flight.trackedPrice && (
            <div className="mb-2">
              <div className="text-xs text-slate-500">저장 시점 대비</div>
              <div className={`text-sm font-semibold flex items-center justify-end gap-1 ${priceChange > 0 ? 'text-red-500' : priceChange < 0 ? 'text-blue-500' : 'text-slate-500'}`}>
                {priceChange > 0 ? '▲' : priceChange < 0 ? '▼' : '-'}
                {Math.abs(priceChange).toLocaleString()}원
              </div>
            </div>
          )}
          <div className="text-xs text-slate-500">현재 예상가</div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 flex items-end justify-end gap-1">
            {flight.currentPrice.toLocaleString()}
            <span className="text-sm font-normal text-slate-600 mb-0.5">원</span>
          </div>
        </div>
        
        <div className="flex gap-2 w-full">
          <Link
            to={`/details/${flight.id}`}
            className="flex-1 inline-flex justify-center items-center py-2 px-3 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            상세 보기
          </Link>
          {!isTracking && (
            <button className="flex-1 inline-flex justify-center items-center py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
              추적
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
