"use client";

const presentations = [
  {
    title: "2024 Product Launch Webinar",
    date: "2024-03-15",
    summary: "A deep dive into our latest product line, featuring live Q&A and expert insights.",
    link: "#",
    image: null, // Placeholder for presentation image
  },
  {
    title: "Sustainable Farming Practices",
    date: "2023-11-02",
    summary: "Best practices for sustainable agriculture and how our products support eco-friendly farming.",
    link: "#",
    image: null,
  },
  {
    title: "Certification Process Explained",
    date: "2023-08-20",
    summary: "An overview of the steps and requirements for obtaining key agricultural certifications.",
    link: "#",
    image: null,
  },
  {
    title: "Innovations in Crop Nutrition",
    date: "2023-05-10",
    summary: "Showcasing the latest research and innovations in crop nutrition and soil health.",
    link: "#",
    image: null,
  },
];

export default function PresentationsPage() {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#208A84] mb-2">Presentations</h1>
        <p className="text-lg text-gray-600 w-full mb-8">
          This section is for storing and viewing all presentations, webinars, and educational sessions. You can upload and manage your presentation files or slides here for record-keeping and compliance.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
        {presentations.map((pres) => (
          <a
            key={pres.title}
            href={pres.link}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col transition-transform hover:scale-[1.03] hover:shadow-xl group"
          >
            <div className="mb-2 text-xs text-gray-400">{new Date(pres.date).toLocaleDateString()}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#208A84]">{pres.title}</h2>
            <p className="text-gray-500 text-sm mb-4">{pres.summary}</p>
            {/* Presentation image placeholder */}
            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs border border-dashed border-gray-300 mb-2">
              Presentation Image<br/>(Upload or display here)
            </div>
            <span className="mt-auto text-[#208A84] font-semibold text-sm group-hover:underline">View Details</span>
          </a>
        ))}
      </div>
      <div className="bg-[#208A84] rounded-xl p-8 text-white shadow-lg max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-2">Want to see more?</h3>
        <p className="text-lg mb-4">
          Contact us to request a custom presentation or schedule a live session with our experts.
        </p>
        <a href="#" className="inline-block bg-white text-[#208A84] font-bold px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition">Contact Us</a>
      </div>
    </div>
  );
} 