import { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { vehicles } from '@/data/mockData';

interface Props {
    onClose?: () => void;
}

export default function TripCostEstimator({ onClose }: Props = {}) {
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(1);
    const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0].id);

    const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];

    const rentPerDay = selectedVehicle.tariff.dayRent;
    const fuelRate = selectedVehicle.tariff.fuelPerKm;
    const kmRate = selectedVehicle.tariff.perKmRate;
    const driverBeta = selectedVehicle.tariff.driverBeta;

    const dayRentTotal = (duration * rentPerDay) + (distance * fuelRate);
    const perKmTotal = (distance * kmRate) + (duration * driverBeta);

    const isDayRentCheaper = dayRentTotal <= perKmTotal;
    const isPerKmCheaper = perKmTotal < dayRentTotal;

    return (
        <div className="mx-auto w-full max-w-4xl rounded-2xl bg-[#111317] p-6 lg:p-8 text-white shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3 text-gold-400">
                    <Calculator className="h-6 w-6" />
                    <h2 className="text-xl font-bold">Trip Cost Estimator</h2>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-400 whitespace-nowrap hidden sm:block">Vehicle:</span>
                    <select
                        value={selectedVehicleId}
                        onChange={(e) => setSelectedVehicleId(e.target.value)}
                        className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-bold text-white outline-none transition-all focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                    >
                        {vehicles.map(v => (
                            <option key={v.id} value={v.id}>{v.name} ({v.type})</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
                {/* Slider Section */}
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-300">Estimated Distance</span>
                        <span className="text-lg font-bold text-gold-400">{distance} KM</span>
                    </div>

                    <div className="relative py-2">
                        <input
                            type="range"
                            min="0"
                            max="1200"
                            step="50"
                            value={distance}
                            onChange={(e) => setDistance(Number(e.target.value))}
                            className="absolute top-1.5 z-20 w-full cursor-pointer opacity-0 h-4"
                        />
                        {/* Custom slider track */}
                        <div className="relative h-1.5 w-full rounded-full bg-gray-700">
                            <div
                                className="absolute left-0 top-0 h-full rounded-full bg-gold-400"
                                style={{ width: `${(distance / 1200) * 100}%` }}
                            />
                            <div
                                className="absolute top-1/2 -mt-2.5 h-5 w-5 rounded-full border-4 border-[#111317] bg-gold-400 shadow"
                                style={{ left: `calc(${(distance / 1200) * 100}% - 10px)` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Duration Section */}
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-300">Trip Duration</span>
                        <span className="text-lg font-bold text-gold-400">{duration} Day{duration > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((d) => (
                            <button
                                key={d}
                                onClick={() => setDuration(d)}
                                className={`flex h-10 w-12 items-center justify-center rounded-lg text-sm font-bold transition-all ${duration === d ? 'bg-gold-400 text-navy-900 pointer-events-none' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                            >
                                {d}d
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {/* Day Rent Plan Card */}
                <div className={`relative flex flex-col justify-center rounded-xl border p-6 transition-colors ${isDayRentCheaper ? 'border-gold-500 bg-gold-500/5' : 'border-gray-700 bg-gray-800/30'}`}>
                    {isDayRentCheaper && (
                        <span className="absolute right-4 top-4 rounded bg-[#332A15] px-2.5 py-1 text-xs font-semibold text-gold-400">
                            Cheaper for this trip
                        </span>
                    )}
                    <h3 className="mb-2 text-sm text-gray-300">Day Rent Plan Estimate</h3>
                    <div className="mb-1 text-4xl font-bold text-white">
                        <span className="text-gold-400">₹</span>{dayRentTotal.toLocaleString('en-IN')}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1">{selectedVehicle.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Rent (₹{rentPerDay}) + Fuel ({distance}km @ ₹{fuelRate})</p>
                </div>

                {/* Per KM Plan Card */}
                <div className={`relative flex flex-col justify-center rounded-xl border p-6 transition-colors ${isPerKmCheaper ? 'border-gold-500 bg-gold-500/5' : 'border-gray-700 bg-gray-800/30'}`}>
                    {isPerKmCheaper && (
                        <span className="absolute right-4 top-4 rounded bg-[#332A15] px-2.5 py-1 text-xs font-semibold text-gold-400">
                            Cheaper for this trip
                        </span>
                    )}
                    <div className="mb-4">
                        <span className="inline-flex rounded-lg bg-[#1a1d24] px-3 py-1.5 text-xs font-bold tracking-widest text-white border border-gray-800">
                            PER KM PLAN
                        </span>
                    </div>
                    <div className="mb-1 text-5xl font-extrabold text-white tracking-tight flex items-baseline">
                        ₹{kmRate}<span className="text-xl font-medium text-gray-400 ml-1">/km</span>
                    </div>
                    <p className="text-base text-white mt-1">+ ₹{driverBeta} Driver beta</p>
                </div>
            </div>

            <div className="mt-8">
                <Link
                    to={`/vehicles/${selectedVehicleId}#quick-reservation`}
                    onClick={onClose}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 py-4 text-base font-bold text-navy-900 shadow-md transition-all hover:scale-[1.01] hover:shadow-lg active:scale-95"
                >
                    <span>Proceed to Book & Reserve</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div >
    );
}
