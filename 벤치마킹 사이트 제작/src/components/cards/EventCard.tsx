interface EventCardProps {
  image: string;
  title: string;
  dateTime: string;
  location: string;
}

export function EventCard({
  image,
  title,
  dateTime,
  location,
}: EventCardProps) {
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
        <span className="text-xs tracking-widest text-gray-500">UPCOMING EVENT</span>
        <h3 className="tracking-wide group-hover:text-gray-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{dateTime}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <button
          className="inline-block px-6 py-2 border border-black hover:bg-black hover:text-white transition-all text-sm tracking-wide mt-2"
        >
          RSVP
        </button>
      </div>
    </article>
  );
}
