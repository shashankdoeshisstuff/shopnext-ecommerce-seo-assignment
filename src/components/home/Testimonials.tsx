export default function Testimonials() {
  const testimonials = [
    { name: "Alice Johnson", rating: 5, text: "Amazing products and super-fast delivery! Highly recommend.", avatar: "https://i.pravatar.cc/100?img=1" },
    { name: "Mark Smith", rating: 5, text: "The quality is outstanding. Will definitely shop again.", avatar: "https://i.pravatar.cc/100?img=2" },
    { name: "Sarah Lee", rating: 4, text: "Great customer service and easy returns. Love it!", avatar: "https://i.pravatar.cc/100?img=3" },
  ];

  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-medium text-black text-start mb-10 font-serif">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white border border-neutral-200 p-6 shadow-none text-center">
              <img src={t.avatar} alt={t.name} className="w-16 h-16 mx-auto mb-4 rounded-full" />
              <div className="text-yellow-500 mb-2">
                {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
              </div>
              <p className="text-neutral-600 italic">"{t.text}"</p>
              <p className="mt-4 font-semibold text-neutral-800">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}