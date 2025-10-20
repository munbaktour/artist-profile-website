interface NewsCardProps {
  image: string;
  category: string;
  headline: string;
  date: string;
  excerpt: string;
}

export function NewsCard({
  image,
  category,
  headline,
  date,
  excerpt,
}: NewsCardProps) {
  return (
    <article className="group cursor-pointer">
      <div className="relative overflow-hidden mb-4 aspect-[4/3]">
        <img
          src={image}
          alt={headline}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-3">
        <span className="text-xs tracking-widest text-gray-500">{category}</span>
        <h3 className="tracking-wide group-hover:text-gray-600 transition-colors">
          {headline}
        </h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-gray-700 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        <a
          href="#"
          className="inline-block text-sm tracking-wide hover:underline mt-2"
        >
          Read More →
        </a>
      </div>
    </article>
  );
}
