"use client";

import { BadgeCheck } from "lucide-react";

const certifications = [
  {
    name: "USDA Organic",
    description: "Certified organic by the USDA, ensuring the highest standards for organic farming.",
    icon: <BadgeCheck className="text-green-500" size={32} />,
  },
  {
    name: "Non-GMO Project Verified",
    description: "Products verified to be free from genetically modified organisms.",
    icon: <BadgeCheck className="text-blue-500" size={32} />,
  },
  {
    name: "OMRI Listed",
    description: "Approved for use in organic production by the Organic Materials Review Institute.",
    icon: <BadgeCheck className="text-purple-500" size={32} />,
  },
  {
    name: "EPA Registered",
    description: "Registered with the Environmental Protection Agency for safety and compliance.",
    icon: <BadgeCheck className="text-teal-500" size={32} />,
  },
];

export default function ProductLabelsCertificationsPage() {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#208A84] mb-2">Product Labels & Certifications</h1>
        <p className="text-lg text-gray-600 w-full mb-8">
          This section is for storing and viewing all product certifications and labels. You can upload and manage your certificates here for record-keeping and compliance.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {certifications.map((cert) => (
          <div key={cert.name} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-center text-center transition-transform hover:scale-[1.03] hover:shadow-xl">
            <div className="mb-3">{cert.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">{cert.name}</h2>
            <p className="text-gray-500 text-sm text-center w-full">{cert.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#208A84] rounded-xl p-8 text-white shadow-lg max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-2">Why Certifications Matter</h3>
        <p className="text-lg">
          Certifications ensure our products are safe, effective, and environmentally responsible. We are committed to transparency and excellence in every product we offer.
        </p>
      </div>
    </div>
  );
} 