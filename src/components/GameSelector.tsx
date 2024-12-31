'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GameSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGame: (gameId: string) => void;
}

export default function GameSelector({ isOpen, onClose, onSelectGame }: GameSelectorProps) {
  const games = [
    {
      id: 'chog-racer',
      title: 'Chog Racer',
      description: 'Race through tracks, collect power-ups, and avoid obstacles!',
      image: '/games/chog-racer.png'
    },
    {
      id: 'treasure-hunter',
      title: 'Treasure Hunter',
      description: 'Search for hidden treasures and earn rewards!',
      image: '/games/treasure-hunter.png'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Select a Game</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {games.map((game) => (
                <motion.button
                  key={game.id}
                  onClick={() => onSelectGame(game.id)}
                  className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{game.title}</h3>
                  <p className="text-sm text-gray-600">{game.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 