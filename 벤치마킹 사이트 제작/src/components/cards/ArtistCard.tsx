interface ArtistCardProps {
  image: string;
  artistName: string;
  workTitle: string;
  statement: string;
}

export function ArtistCard({
  image,
  artistName,
  workTitle,
  statement,
}: ArtistCardProps) {
  return (
    <article className="group cursor-pointer">
      <div className="relative overflow-hidden mb-4 aspect-[4/3]">
        <img
          src={image}
          alt={artistName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-3">
        <span className="text-xs tracking-widest text-gray-500">ARTIST SPOTLIGHT</span>
        <h3 className="tracking-wide group-hover:text-gray-600 transition-colors">
          {artistName}
        </h3>
        <p className="text-sm italic text-gray-600">{workTitle}</p>
        <p className="text-gray-700 line-clamp-3 leading-relaxed">
          {statement}
        </p>
        <a
          href="#"
          className="inline-block text-sm tracking-wide hover:underline mt-2"
        >
          Discover Artist →
        </a>
      </div>
    </article>
  );
}
