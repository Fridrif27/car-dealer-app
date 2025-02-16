async function getVehicleModels(makeId: string, year: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NHTSA_API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch vehicle models");
  }

  const data = await response.json();
  return data.Results;
}

export default async function VehicleResults({
  makeId,
  year,
}: {
  makeId: string;
  year: string;
}) {
  const models = await getVehicleModels(makeId, year);

  if (!models || models.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          No Models Found
        </h2>
        <p className="text-gray-600">
          No vehicle models were found for the selected manufacturer and year.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model: any) => (
        <div
          key={model.Model_ID}
          className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {model.Model_Name}
          </h3>
          <p className="text-gray-600">Make: {model.Make_Name}</p>
          <p className="text-gray-600">Year: {year}</p>
        </div>
      ))}
    </div>
  );
}