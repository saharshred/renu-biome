"use client";

const epaProducts = [
  {
    name: "ReNu BioGuard",
    description: "EPA registered for safe use in crop protection and pest management.",
    image: null, // Placeholder for certificate image
  },
  {
    name: "ReNu CleanSpray",
    description: "Meets EPA standards for environmental safety and efficacy.",
    image: null,
  },
  {
    name: "ReNu GreenShield",
    description: "Certified by the EPA for use in sustainable agriculture.",
    image: null,
  },
];

export default function EpaPage() {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#208A84] mb-2">EPA Registration</h1>
        <p className="text-lg text-gray-600 w-full mb-8">
          This section is for storing and viewing all EPA registrations and related products. You can upload and manage your EPA certificates here for compliance and record-keeping.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-[#208A84] mb-4">What is EPA Registration?</h2>
        <p className="text-gray-700 text-lg mb-2">
          EPA registration is required for products used in pest management and crop protection. It verifies that products are safe for use and do not pose unreasonable risks to human health or the environment.
        </p>
        <a href="https://www.epa.gov/pesticide-registration" target="_blank" rel="noopener noreferrer" className="text-[#208A84] font-semibold hover:underline">Learn more at EPA.gov</a>
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#208A84] mb-6">Our EPA-Registered Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {epaProducts.map((prod) => (
            <div key={prod.name} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col transition-transform hover:scale-[1.03] hover:shadow-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{prod.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{prod.description}</p>
              {/* Certificate image placeholder */}
              <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs border border-dashed border-gray-300 mb-2">
                Certificate Image<br/>(Upload or display here)
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#208A84] rounded-xl p-8 text-white shadow-lg max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-2">Compliance & Safety</h3>
        <p className="text-lg">
          We are committed to providing products that are safe for people and the planet. Our EPA-registered products undergo rigorous testing and review to ensure compliance with all regulations.
        </p>
      </div>
    </div>
  );
} 