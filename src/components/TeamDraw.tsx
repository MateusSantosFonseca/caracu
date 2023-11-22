'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

import type { Position } from '@/models/Schema';

import { TeamCards } from './TeamCards';

type IPlayer = {
  id: number;
  name: string;
  position: Position;
  rating: number;
  stamina: number;
};

const TeamDraw = ({ players }: { players: IPlayer[] }) => {
  const { user } = useUser();
  const [availablePlayers, setAvailablePlayers] = useState<IPlayer[]>(players);
  const [selectedPlayers, setSelectedPlayers] = useState<IPlayer[]>([]);

  const onSelectAvailablePlayer = (player: IPlayer) => {
    setAvailablePlayers((prev) => prev.filter((p) => p.id !== player.id));
    setSelectedPlayers((prev) => [...prev, player]);
  };

  const onSelectAlreadySelectedPlayer = (player: IPlayer) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.id !== player.id));
    setAvailablePlayers((prev) => [...prev, player]);
  };

  const notEnoughPlayers = selectedPlayers.length < 8;

  return (
    <div className="space-y-8">
      <div className="my-8 flex">
        Hello,
        <div className="mx-1 font-semibold"> {user?.username?.toString()}</div>
        team&apos;s manager!
      </div>
      <div className="space-y-8">
        <TeamCards
          title="Selected Players"
          players={selectedPlayers}
          onSelect={onSelectAlreadySelectedPlayer}
        />
        <TeamCards
          title="Available Players"
          players={availablePlayers}
          onSelect={onSelectAvailablePlayer}
        />
      </div>
      <div>
        <button
          type="button"
          disabled={notEnoughPlayers}
          className={` ${
            notEnoughPlayers ? 'bg-gray-400' : 'bg-purple-800'
          } rounded-md  px-4 py-2 text-white`}
          onClick={() => {
            console.log(selectedPlayers);
          }}
        >
          Draw team
        </button>
      </div>
    </div>
  );
};

export { TeamDraw };
