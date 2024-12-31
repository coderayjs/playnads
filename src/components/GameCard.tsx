import Image from 'next/image';

interface Game {
  title: string;
  description: string;
  imageUrl: string;
}

export default function GameCard() {
  const games: Game[] = [
    {
      title: "Quick",
      description: "Fast-paced penguin action",
      imageUrl: "/game-quick.png"
    },
    {
      title: "Spin Wheel",
      description: "Try your luck with the wheel",
      imageUrl: "/wheel.png"
    },
    {
      title: "Nadbird",
      description: "Flap your way to victory",
      imageUrl: "/nadbird.png"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 relative z-10">
      <h2 className="text-4xl font-bold text-white mb-12 text-center" style={{
        textShadow: '2px 2px 0 #000',
        WebkitTextStroke: '1px black'
      }}>
        Available Games
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {games.map((game) => (
          <div 
            key={game.title}
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 
                     transform hover:-translate-y-2 transition-all duration-300
                     border-2 border-white/20
                     hover:border-white/30
                     shadow-xl"
          >
            <div className="h-48 rounded-lg mb-4 overflow-hidden bg-blue-400/20">
              <div className="relative w-full h-full">
                <Image
                  src={game.imageUrl}
                  alt={game.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
            <p className="text-blue-100 mb-6">{game.description}</p>
            <button className="mt-auto w-full bg-blue-300 text-white px-6 py-2 rounded-md font-bold 
                             transform active:translate-y-2 transition-all duration-150
                             border-b-[6px] border-blue-600 hover:bg-blue-400 hover:border-blue-700
                             shadow-lg active:border-b-[2px] active:shadow-sm">
              Play Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
} 