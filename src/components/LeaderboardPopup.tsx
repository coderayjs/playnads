'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { Player, LeaderboardPopupProps } from '@/types';

export default function LeaderboardPopup({ isOpen, onClose }: LeaderboardPopupProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const players: Player[] = [
    { rank: 1, name: "Penguin123", score: 25000, avatar: "/avatars/1.png", change: '+2' },
    { rank: 2, name: "IceKing", score: 23450, avatar: "/avatars/2.png", change: '-1' },
    { rank: 3, name: "CoolPenguin", score: 22100, avatar: "/avatars/3.png", change: '+5' },
    { rank: 4, name: "ArcticPro", score: 21000, avatar: "/avatars/4.png", change: '0' },
    { rank: 5, name: "SnowMaster", score: 20500, avatar: "/avatars/5.png", change: '-2' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-3xl w-full max-w-2xl mx-4 overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {/* Header */}
            <div className="p-6 flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                🏆 Leaderboard
              </h2>
              <div className="flex gap-2">
                {['daily', 'weekly', 'all time'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-1 rounded-full text-sm font-medium transition-all
                      ${selectedPeriod === period 
                        ? 'bg-white text-blue-600' 
                        : 'text-white/80 hover:text-white'}`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
              <button 
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Leaderboard List */}
            <div className="p-6">
              {players.map((player, index) => (
                <motion.div 
                  key={player.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl mb-2
                    bg-gray-50 hover:bg-gray-100 transition-all
                    transform hover:scale-[1.02] hover:shadow-md"
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold
                    ${player.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                      player.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-600 text-white' :
                      player.rank === 3 ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white' :
                      'bg-gray-100 text-gray-600'}`}>
                    {player.rank}
                  </div>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5">
                      <img src={player.avatar} alt={player.name} 
                        className="w-full h-full object-cover rounded-[10px]" />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold
                      ${player.change.startsWith('+') ? 'bg-green-500 text-white' :
                        player.change.startsWith('-') ? 'bg-red-500 text-white' :
                        'bg-gray-200 text-gray-600'}`}>
                      {player.change}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{player.name}</div>
                    <div className="text-gray-500 text-sm">Score: {player.score.toLocaleString()}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    View Profile →
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 