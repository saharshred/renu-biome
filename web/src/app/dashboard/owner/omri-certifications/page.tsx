"use client";

import Image from "next/image";

const omriProducts = [
  {
    name: "SUN SKREEN O",
    subtitle: "Protects from Sunburn",
    description: "Sun Skreen reduces the harmful effects of the sun while improving photosynthesis, reducing heat & water stress.",
    image: "/sunskreen.png",
    bg: "bg-[#B94B4B]", // Red theme
  },
  {
    name: "SEA BIOLIFE",
    subtitle: "100% Cold Pressed Seaweed",
    description: "Rich source of antioxidants & natural polyphenols.",
    image: "/seabiolife.png",
    bg: "bg-[#0B4C3A]", // Deep green/teal theme
  },
  {
    name: "SIRI NEEM",
    subtitle: "100% Pure Cold Pressed",
    description: "Cold pressed pure neem oil, rich in vitamins, essential fatty acids & antioxidants.",
    image: "/sirineem.png",
    bg: "bg-[#1B5E20]", // Green theme
  },
  {
    name: "KARANJA BOTANICALS",
    subtitle: "Nature's Shield",
    description: "Soil Erosion Control: It helps to reduce soil erosion by improving soil structure and water retention. Also acts as a nature's shield.",
    image: "/karanjaoil.png",
    bg: "bg-[#8E2677]", // Purple theme
  },
];

export default function OmriCertificationsPage() {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#208A84] mb-2">OMRI Certifications</h1>
        <p className="text-lg text-gray-600 w-full mb-8">
          This section is for storing and viewing all OMRI certifications and related products. You can upload and manage your OMRI certificates here for compliance and record-keeping.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-[#208A84] mb-4">What is OMRI?</h2>
        <p className="text-gray-700 text-lg mb-2">
          OMRI is a nonprofit organization that evaluates products for compliance with organic standards. Products with the OMRI Listed® seal are approved for use in certified organic operations under the USDA National Organic Program.
        </p>
        <a href="https://www.omri.org/" target="_blank" rel="noopener noreferrer" className="text-[#208A84] font-semibold hover:underline">Learn more at OMRI.org</a>
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#208A84] mb-6">Our OMRI-Listed Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {omriProducts.map((prod) => (
            <div
              key={prod.name}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-0 flex flex-col justify-center h-[340px] sm:h-[360px] overflow-hidden transition-transform hover:scale-[1.03] hover:shadow-2xl"
            >
              <div className="flex flex-col h-full items-stretch sm:flex-row">
                <div className={`flex-1 flex flex-col justify-center px-6 py-4 sm:py-0`}>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-1 tracking-tight">{prod.name}</h3>
                  {prod.subtitle && <div className="text-lg sm:text-xl font-semibold text-[#208A84] mb-2">{prod.subtitle}</div>}
                  <p className="text-gray-600 text-md sm:text-lg mb-2 leading-relaxed">{prod.description}</p>
                </div>
                <div className={`flex-shrink-0 flex items-center justify-center sm:w-2/5 h-48 sm:h-full ${prod.bg}`}>
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    width={220}
                    height={220}
                    className="object-contain rounded-lg max-h-48 sm:max-h-72 w-auto drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#208A84] rounded-xl p-8 text-white shadow-lg max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-2">Committed to Organic Excellence</h3>
        <p className="text-lg">
          We are dedicated to providing products that support organic and sustainable agriculture. Look for the OMRI Listed® seal on our products for assurance of quality and compliance.
        </p>
      </div>
    </div>
  );
} 