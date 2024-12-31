'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundMusic from './sounds/BackgroundMusic';

interface Player {
  position: { x: number; y: number };
  score: number;
}

interface FallingItem {
  id: number;
  type: 'fly' | 'stone';
  position: { x: number; y: number };
}

interface ChogRacerProps {
  onExit: () => void;
}

// Add new interface for score indicators
interface ScoreIndicator {
  id: string;
  value: number;
  position: { x: number; y: number };
}

export default function ChogRacer({ onExit }: ChogRacerProps) {
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [player, setPlayer] = useState<Player>({
    position: { x: 50, y: 80 },
    score: 0
  });
  const [items, setItems] = useState<FallingItem[]>([]);
  const gameLoopRef = useRef<number>();
  const [scoreIndicators, setScoreIndicators] = useState<ScoreIndicator[]>([]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;

      setPlayer(prev => {
        const newPos = { ...prev.position };
        const moveSpeed = 5;
        
        switch(e.key) {
          case 'ArrowLeft':
            newPos.x = Math.max(0, newPos.x - moveSpeed);
            break;
          case 'ArrowRight':
            newPos.x = Math.min(100, newPos.x + moveSpeed);
            break;
        }

        return { ...prev, position: newPos };
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = () => {
      // Move items down (reduced speed from 2 to 0.8)
      setItems(prev => {
        const updatedItems = prev.map(item => ({
          ...item,
          position: { ...item.position, y: item.position.y + 0.8 }
        }));

        // Check collisions
        updatedItems.forEach(item => {
          const dx = Math.abs(item.position.x - player.position.x);
          const dy = Math.abs(item.position.y - player.position.y);
          
          if (dx < 5 && dy < 5) {
            const points = item.type === 'fly' ? 50 : -50;
            const indicatorId = `${Date.now()}-${Math.random()}`;
            
            setPlayer(prev => ({
              ...prev,
              score: prev.score + points
            }));
            
            // Add score indicator with unique key
            setScoreIndicators(prev => [...prev, {
              id: indicatorId,
              value: points,
              position: { x: item.position.x, y: item.position.y }
            }]);

            // Remove collected item
            const index = updatedItems.indexOf(item);
            if (index > -1) {
              updatedItems.splice(index, 1);
            }

            // Remove score indicator after animation
            setTimeout(() => {
              setScoreIndicators(prev => 
                prev.filter(indicator => indicator.id !== indicatorId)
              );
            }, 1000);
          }
        });

        // Remove items that fell off screen
        return updatedItems.filter(item => item.position.y < 100);
      });

      // Spawn new items (reduced spawn rate from 0.05 to 0.02)
      if (Math.random() < 0.02) {
        setItems(prev => [...prev, {
          id: Date.now(),
          type: Math.random() < 0.7 ? 'fly' : 'stone',
          position: { x: Math.random() * 100, y: -10 }
        }]);
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, player.position]);

  const startGame = () => {
    setShowInstructions(false);
    setGameStarted(true);
  };

  return (
    <div className="h-screen w-full bg-white relative overflow-hidden">
      <BackgroundMusic />
      
      {/* Instructions Popup */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
              <h2 className="text-2xl font-bold text-green-600 mb-4">How to Play</h2>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-2xl">🐸</span>
                  <span>Move Chog left and right with arrow keys</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">🪰</span>
                  <span>Catch flies for +50 points</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">🪨</span>
                  <span>Avoid stones! -50 points if hit</span>
                </li>
              </ul>
              <motion.button
                onClick={startGame}
                className="w-full px-8 py-4 bg-green-500 text-white rounded-lg text-xl font-bold hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Game
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game UI */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <button
          onClick={onExit}
          className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors"
        >
          Exit Game
        </button>
        <div className="text-green-600 text-2xl font-bold">Score: {player.score}</div>
      </div>

      {/* Player (Chog) */}
      <motion.div
        className="absolute w-12 h-12 text-4xl"
        style={{
          left: `${player.position.x}%`,
          top: `${player.position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        🐸
      </motion.div>

      {/* Falling Items */}
      {items.map(item => (
        <motion.div
          key={item.id}
          className="absolute w-8 h-8 text-2xl"
          style={{
            left: `${item.position.x}%`,
            top: `${item.position.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {item.type === 'fly' ? '🪰' : '🪨'}
        </motion.div>
      ))}

      {/* Score Indicators */}
      <AnimatePresence>
        {scoreIndicators.map(indicator => (
          <motion.div
            key={indicator.id}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute text-2xl font-bold ${
              indicator.value > 0 ? 'text-green-300' : 'text-red-300'
            }`}
            style={{
              left: `${indicator.position.x}%`,
              top: `${indicator.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {indicator.value > 0 ? `+${indicator.value}` : indicator.value}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
