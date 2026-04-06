export type FlightStatus = 'RECOMMEND' | 'WAIT' | 'HOLD';

export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  currentPrice: number;
  status: FlightStatus;
  baggageIncluded: boolean;
  refundable: boolean;
  history: { date: string; price: number }[];
  trackedAt?: string;
  trackedPrice?: number;
}

export const mockFlights: Flight[] = [
  {
    id: "f1",
    airline: "대한항공",
    airlineCode: "KE",
    origin: "ICN",
    destination: "NRT",
    departureTime: "2026-05-01 09:00",
    arrivalTime: "2026-05-01 11:30",
    duration: "2h 30m",
    stops: 0,
    currentPrice: 285000,
    status: 'RECOMMEND',
    baggageIncluded: true,
    refundable: true,
    history: [
      { date: "04-01", price: 350000 },
      { date: "04-02", price: 345000 },
      { date: "04-03", price: 320000 },
      { date: "04-04", price: 310000 },
      { date: "04-05", price: 285000 },
      { date: "04-06", price: 285000 },
    ],
    trackedAt: "2026-04-01",
    trackedPrice: 350000,
  },
  {
    id: "f2",
    airline: "아시아나항공",
    airlineCode: "OZ",
    origin: "ICN",
    destination: "NRT",
    departureTime: "2026-05-01 10:15",
    arrivalTime: "2026-05-01 12:45",
    duration: "2h 30m",
    stops: 0,
    currentPrice: 315000,
    status: 'WAIT',
    baggageIncluded: true,
    refundable: false,
    history: [
      { date: "04-01", price: 290000 },
      { date: "04-02", price: 295000 },
      { date: "04-03", price: 310000 },
      { date: "04-04", price: 320000 },
      { date: "04-05", price: 315000 },
      { date: "04-06", price: 315000 },
    ],
  },
  {
    id: "f3",
    airline: "제주항공",
    airlineCode: "7C",
    origin: "ICN",
    destination: "NRT",
    departureTime: "2026-05-01 07:30",
    arrivalTime: "2026-05-01 10:00",
    duration: "2h 30m",
    stops: 0,
    currentPrice: 220000,
    status: 'HOLD',
    baggageIncluded: false,
    refundable: false,
    history: [
      { date: "04-01", price: 230000 },
      { date: "04-02", price: 225000 },
      { date: "04-03", price: 220000 },
      { date: "04-04", price: 220000 },
      { date: "04-05", price: 220000 },
      { date: "04-06", price: 220000 },
    ],
  },
  {
    id: "f4",
    airline: "싱가포르항공",
    airlineCode: "SQ",
    origin: "ICN",
    destination: "SIN",
    departureTime: "2026-06-15 16:40",
    arrivalTime: "2026-06-15 22:15",
    duration: "6h 35m",
    stops: 0,
    currentPrice: 650000,
    status: 'WAIT',
    baggageIncluded: true,
    refundable: true,
    history: [
      { date: "04-01", price: 580000 },
      { date: "04-02", price: 590000 },
      { date: "04-03", price: 620000 },
      { date: "04-04", price: 635000 },
      { date: "04-05", price: 645000 },
      { date: "04-06", price: 650000 },
    ],
    trackedAt: "2026-04-01",
    trackedPrice: 580000,
  }
];

export const getStatusText = (status: FlightStatus) => {
  switch (status) {
    case 'RECOMMEND': return '지금 구매 추천';
    case 'WAIT': return '조금 더 기다리기';
    case 'HOLD': return '판단 유보';
  }
};

export const getStatusColors = (status: FlightStatus) => {
  switch (status) {
    case 'RECOMMEND': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'WAIT': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'HOLD': return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};
