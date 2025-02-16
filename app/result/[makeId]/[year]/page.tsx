import { Suspense } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import VehicleResults from "./vehicle-results";

export async function generateStaticParams() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, i) => currentYear - i
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NHTSA_API_URL}/GetMakesForVehicleType/car?format=json`
  );
  const data = await response.json();
  const makes = data.Results;

  const params = [];
  for (const make of makes) {
    for (const year of years) {
      params.push({
        makeId: make.MakeId.toString(),
        year: year.toString(),
      });
    }
  }

  return params;
}

export default function ResultPage({
  params,
}: {
  params: { makeId: string; year: string };
}) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Search
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Available Models for {params.year}
          </h1>

          <Suspense
            fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            }
          >
            <VehicleResults makeId={params.makeId} year={params.year} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}