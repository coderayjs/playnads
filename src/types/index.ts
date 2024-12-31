export interface Player {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  change: string;
}

export interface LeaderboardPopupProps {
  isOpen: boolean;
  onClose: () => void;
} 