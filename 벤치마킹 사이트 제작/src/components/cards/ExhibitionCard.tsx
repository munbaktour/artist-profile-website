interface ExhibitionCardProps {
  image: string;
  title: string;
  dateRange: string;
  location: string;
  description: string;
}

export function ExhibitionCard({
  image,
  title,
  dateRange,
  location,
  description,
}: ExhibitionCardProps) {
  return (
    <article className="group cursor-pointer">
      <div className="relative overflow-hidden mb-4 aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-3">
        <span className="text-xs tracking-widest text-gray-500">EXHIBITION</span>
        <h3 className="tracking-wide group-hover:text-gray-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{dateRange}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-gray-700 line-clamp-3 leading-relaxed">
          {description}
        </p>
        <a
          href="#"
          className="inline-block text-sm tracking-wide hover:underline mt-2"
        >
          View Exhibition →
        </a>
      </div>
    </article>
  );
}
