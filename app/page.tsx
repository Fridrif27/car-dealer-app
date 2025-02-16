"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Make {
  MakeId: number;
  MakeName: string;
}

export default function Home() {
  const [makes, setMakes] = useState<Make[]>([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NHTSA_API_URL}/GetMakesForVehicleType/car?format=json`
        );
        const data = await response.json();
        setMakes(data.Results);
      } catch (error) {
        console.error("Error fetching makes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMakes();
  }, []);

  const isNextDisabled = !selectedMake || !selectedYear;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Find Your Perfect Car
          </h1>
          <p className="text-gray-600 mb-8">
            Select a manufacturer and year to explore available models
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="make"
                className="block text-sm font-medium text-gray-700"
              >
                Manufacturer
              </label>
              <select
                id="make"
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="">Select manufacturer</option>
                {makes.map((make) => (
                  <option key={make.MakeId} value={make.MakeId}>
                    {make.MakeName}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700"
              >
                Model Year
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4">
              <Link
                href={
                  isNextDisabled
                    ? "#"
                    : `/result/${selectedMake}/${selectedYear}`
                }
                className={`inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium rounded-lg ${
                  isNextDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                }`}
                aria-disabled={isNextDisabled}
              >
                View Available Models
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}