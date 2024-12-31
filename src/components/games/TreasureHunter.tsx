'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Treasure {
  id: number;
  x: number;
  y: number;
  value: number;
  isFound: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface PlayerStats {
  energy: number;
  maxEnergy: number;
  tokens: number;
  tools: string[];
}

interface TreasureHunterProps {
  onExit: () => void;
}

export default function TreasureHunter({ onExit }: TreasureHunterProps) {
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    energy: 100,
    maxEnergy: 100,
    tokens: 0,
    tools: ['Basic Compass']
  });

  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [selectedTool, setSelectedTool] = useState('Basic Compass');
  const [gameMessage, setGameMessage] = useState('');

  // Add new state for hints
  const [hints, setHints] = useState<{[key: number]: string}>({});

  // Generate random treasures
  useEffect(() => {
    const newTreasures = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
      value: Math.floor(Math.random() * 1000) + 100,
      isFound: false,
      rarity: getRarity()
    }));
    setTreasures(newTreasures);
  }, []);

  // Energy regeneration
  useEffect(() => {
    const timer = setInterval(() => {
      setPlayerStats(prev => ({
        ...prev,
        energy: Math.min(prev.energy + 5, prev.maxEnergy)
      }));
    }, 30000); // Regenerate 5 energy every 30 seconds

    return () => clearInterval(timer);
  }, []);

  function getRarity(): 'common' | 'rare' | 'epic' | 'legendary' {
    const rand = Math.random();
    if (rand < 0.5) return 'common';
    if (rand < 0.8) return 'rare';
    if (rand < 0.95) return 'epic';
    return 'legendary';
  }

  function getHintColor(distance: number): string {
    if (distance <= 1) return 'bg-red-500';
    if (distance <= 3) return 'bg-orange-400';
    if (distance <= 5) return 'bg-yellow-300';
    return 'bg-blue-200';
  }

  function searchForTreasure(x: number, y: number) {
    if (playerStats.energy < 10) {
      setGameMessage('Not enough energy!');
      return;
    }

    setPlayerStats(prev => ({
      ...prev,
      energy: prev.energy - 10
    }));

    // Find closest treasure and calculate distance
    let closestDistance = Infinity;
    let foundTreasure: Treasure | null = null;

    treasures.forEach(t => {
      if (!t.isFound) {
        const distance = Math.sqrt(Math.pow(t.x - x, 2) + Math.pow(t.y - y, 2));
        if (distance < closestDistance) {
          closestDistance = distance;
          foundTreasure = t;
        }
      }
    });

    // Update hints for this cell
    const cellIndex = y * 20 + x;
    setHints(prev => ({
      ...prev,
      [cellIndex]: getHintColor(closestDistance)
    }));

    if (closestDistance <= 1 && foundTreasure) {
      setTreasures(prev => prev.map(t => 
        t.id === foundTreasure.id ? { ...t, isFound: true } : t
      ));
      setPlayerStats(prev => ({
        ...prev,
        tokens: prev.tokens + foundTreasure.value
      }));
      setGameMessage(`Found ${foundTreasure.rarity} treasure worth ${foundTreasure.value} tokens!`);
    } else {
      setGameMessage(
        closestDistance <= 3 ? "Very hot!" :
        closestDistance <= 5 ? "Warm..." :
        "Cold."
      );
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Game Header */}
      <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Treasure Hunter</h2>
          <button
            onClick={onExit}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Exit Game
          </button>
        </div>
        
        {/* Player Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="text-sm text-blue-600">Energy</div>
            <div className="text-xl font-bold text-blue-800">
              {playerStats.energy}/{playerStats.maxEnergy}
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <div className="text-sm text-green-600">Tokens</div>
            <div className="text-xl font-bold text-green-800">{playerStats.tokens}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl">
            <div className="text-sm text-purple-600">Tools</div>
            <div className="text-xl font-bold text-purple-800">{playerStats.tools.length}</div>
          </div>
        </div>

        {/* Game Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mb-4"
        >
          {gameMessage}
        </motion.div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-20 gap-0.5 bg-blue-50 p-4 rounded-2xl w-full aspect-square max-w-[600px] mx-auto">
        {Array.from({ length: 400 }).map((_, i) => {
          const x = Math.floor(i / 20);
          const y = i % 20;
          const hintColor = hints[i];
          
          return (
            <motion.button
              key={i}
              className={`w-full aspect-square rounded-sm transition-all duration-300 flex items-center justify-center
                ${hintColor || 'bg-white hover:bg-blue-100'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => searchForTreasure(x, y)}
            >
              {treasures.find(t => t.isFound && t.x === x && t.y === y) && (
                <span className="text-xs">💎</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex gap-4 items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-md" />
          <span className="text-sm">Very Hot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-400 rounded-md" />
          <span className="text-sm">Hot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-300 rounded-md" />
          <span className="text-sm">Warm</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-200 rounded-md" />
          <span className="text-sm">Cold</span>
        </div>
      </div>

      {/* Tools Selection */}
      <div className="mt-6 bg-white rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Tools</h3>
        <div className="flex gap-4">
          {playerStats.tools.map(tool => (
            <button
              key={tool}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedTool === tool 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedTool(tool)}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 