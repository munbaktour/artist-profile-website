export function Hero() {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1574367157590-3454fe866961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwNjAzNzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Gallery Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center text-white px-6">
        <div className="max-w-4xl">
          <h1 className="mb-6 tracking-wider">
            CONTEMPORARY ART GALLERY
          </h1>
          <p className="text-xl mb-8 tracking-wide">
            Connecting Eastern and Western contemporary art since 1993
          </p>
          <a
            href="#exhibitions"
            className="inline-block px-8 py-3 border-2 border-white hover:bg-white hover:text-black transition-all tracking-wider"
          >
            EXPLORE EXHIBITIONS
          </a>
        </div>
      </div>
    </section>
  );
}
