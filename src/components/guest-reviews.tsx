const reviews = [
    { name: 'Ram K.', rating: 5, text: 'Absolutely loved my stay...' },
    { name: 'Maro', rating: 4.5, text: 'Fantastic location and vibe...' },
  ]
  
  export default function GuestReviews() {
    return (
      <section className="p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-4">Guest Reviews</h2>
        {reviews.map((r) => (
          <div key={r.name} className="bg-white rounded-lg card-shadow p-4 mb-4">
            <p className="font-semibold">★ {r.rating} – {r.name}</p>
            <p className="text-sm mt-2">{r.text}</p>
          </div>
        ))}
      </section>
    )
  }