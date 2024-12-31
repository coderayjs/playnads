'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GameCard from '@/components/GameCard';
import Footer from '@/components/Footer';
import LeaderboardPopup from '@/components/LeaderboardPopup';
import GameSelector from '@/components/GameSelector';
import ChogRacer from '@/components/games/ChogRacer';
import TreasureHunter from '@/components/games/TreasureHunter';

const rainbowAnimation = {
  backgroundSize: '400% 100%',
  animation: 'rainbow 6s linear infinite',
};

export default function Home() {
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isGameSelectorOpen, setIsGameSelectorOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const handleGameSelect = (gameId: string) => {
    setCurrentGame(gameId);
    setIsGameSelectorOpen(false);
  };

  const renderGame = () => {
    switch (currentGame) {
      case 'chog-racer':
        return <ChogRacer onExit={() => setCurrentGame(null)} />;
      case 'treasure-hunter':
        return <TreasureHunter onExit={() => setCurrentGame(null)} />;
      default:
        return null;
    }
  };

  if (currentGame) {
    return renderGame();
  }

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-indigo-50 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button className="relative px-8 py-3 bg-gradient-to-br from-blue-500 to-indigo-600 
            text-white font-bold rounded-lg overflow-hidden hover:scale-105 transition-transform
            shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1">
            <span className="relative z-10">MENU</span>
            <div className="absolute inset-0 bg-white/20 scale-x-0 transition-transform origin-left 
              hover:scale-x-100" />
          </button>
          
          {/* Logo with increased size */}
          <div className="w-24 h-24">
            <Image
              src="/playnads.png"
              alt="Playnads Logo"
              width={96}
              height={96}
              className="object-contain"
              priority
            />
          </div>
          
          <button 
            onClick={() => setIsLeaderboardOpen(true)}
            className="relative px-8 py-3 bg-gradient-to-br from-indigo-500 to-purple-600 
              text-white font-bold rounded-lg overflow-hidden hover:scale-105 transition-transform
              shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Leaderboard
            </span>
            <div className="absolute inset-0 bg-white/20 scale-x-0 transition-transform origin-left 
              hover:scale-x-100" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-7xl md:text-9xl font-bold tracking-wider mb-8"
            style={{
              background: 'linear-gradient(to right, #ff6b6b, #4ecdc4, #45b7d1, #96c93d, #ff6b6b)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '4px 4px 0 rgba(0,0,0,0.05)',
              ...rainbowAnimation
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span className="inline-block">
              PLAYNADS.FUN
            </motion.span>
            <motion.div 
              className="absolute -top-16 right-1/4"
              animate={{
                x: [-10, 10, -10],
                y: [-5, 5, -5],
                rotate: [-5, 5, -5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/chog.png"
                alt="Cartoon"
                width={80}
                height={80}
                className="object-contain"
              />
            </motion.div>
          </motion.h1>
          
          <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-medium">
            PlayNads is a Monad Ecosystem motivated play to earn game for all the chowg family, You can earn XP by playing and 
            completing tasks and milstones.
          </p>

          <div className="flex gap-6 justify-center">
            <button 
              onClick={() => setIsGameSelectorOpen(true)}
              className="group relative px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-600
                text-white text-lg font-bold rounded-lg overflow-hidden hover:scale-105 transition-all
                shadow-[inset_0_-4px_0_rgba(0,0,0,0.2),0_4px_16px_rgba(0,0,0,0.1)]
                active:shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.1)]
                active:translate-y-1">
              <span className="relative z-10 flex items-center gap-2">
                Play Now
                <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>

            <button className="relative px-10 py-4 bg-gray-50
              text-gray-700 text-lg font-bold rounded-lg overflow-hidden hover:scale-105 transition-all
              border-2 border-gray-100 hover:border-gray-200
              shadow-[0_4px_16px_rgba(0,0,0,0.1)] active:shadow-[0_2px_8px_rgba(0,0,0,0.1)]
              active:translate-y-1">
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-white/10 scale-x-0 transition-transform origin-left 
                hover:scale-x-100" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section with updated colors */}
      <section className="relative z-10 pb-32 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '100K+', label: 'Active Players' },
            { number: '$2M+', label: 'Total Rewards' },
            { number: '24/7', label: 'Support' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-8 text-center
              border border-gray-100 hover:border-gray-200 transition-colors
              shadow-lg hover:shadow-xl">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                bg-clip-text text-transparent mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <LeaderboardPopup isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />

      <GameSelector 
        isOpen={isGameSelectorOpen}
        onClose={() => setIsGameSelectorOpen(false)}
        onSelectGame={handleGameSelect}
      />
    </main>
  );
}
