const dogs = [
  { src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop', name: 'Luna' },
  { src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&h=300&fit=crop', name: 'Buddy' },
  { src: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=300&fit=crop', name: 'Bella' },
  { src: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop', name: 'Max' },
  { src: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop', name: 'Charlie' },
  { src: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=300&fit=crop', name: 'Nala' },
  { src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=300&h=300&fit=crop', name: 'Biscuit' },
  { src: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=300&h=300&fit=crop', name: 'Thor' },
  { src: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=300&h=300&fit=crop', name: 'Rocky' },
  { src: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=300&h=300&fit=crop', name: 'Simba' },
]

export function PhotoStrip() {
  const doubled = [...dogs, ...dogs]

  return (
    <div className="relative overflow-hidden py-10">
      <div className="absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-dark to-transparent" />
      <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-dark to-transparent" />
      <div className="flex gap-3 animate-strip">
        {doubled.map((dog, i) => (
          <div
            key={i}
            className="w-44 h-44 rounded-2xl overflow-hidden flex-shrink-0 border border-glass-border group"
          >
            <img
              src={dog.src}
              alt={dog.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
