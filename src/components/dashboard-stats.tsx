const stats = [
    { title: '$85,320', sub: 'Total Revenue' },
    { title: '12', sub: 'Active Listings' },
    { title: '78%', sub: 'Avg. Occupancy' },
    { title: '$25', sub: 'Starting / night' },
  ]
  
  export default function DashboardStats() {
    return (
      <section className="p-4 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.title} className="bg-white rounded-lg card-shadow p-4 text-center">
            <p className="text-2xl font-bold text-slate-800">{s.title}</p>
            <p className="text-sm text-slate-600">{s.sub}</p>
          </div>
        ))}
      </section>
    )
  }