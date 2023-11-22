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

  const handleDraw = async (data: IPlayer[]) => {
    const result = await fetch(`/api/draw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const body = await result.json();
    console.log('body:', body);
  };

  const notEnoughPlayers = selectedPlayers.length < 8;

  return (
    <div className="space-y-8">
      <div className="my-8 flex">
        Oi,
        <div className="mx-1 font-semibold"> {user?.username?.toString()}</div>
        team&apos;s manager. Você deve selecionar ao menos 8 jogadores para
        poder sortear times!
      </div>
      <div>
        <button
          type="button"
          disabled={notEnoughPlayers}
          className={` ${
            notEnoughPlayers ? 'bg-gray-400' : 'bg-purple-800'
          } rounded-md  px-4 py-2 text-white`}
          onClick={async () => {
            await handleDraw(selectedPlayers);
          }}
        >
          Draw team
        </button>
      </div>
      <div className="grid grid-cols-12 space-x-4">
        <div className="col-span-6">
          <TeamCards
            title="Jogadores disponíveis"
            players={availablePlayers}
            onSelect={onSelectAvailablePlayer}
          />
        </div>
        <div className="col-span-6">
          <TeamCards
            title="Jogadores selecionados"
            players={selectedPlayers}
            onSelect={onSelectAlreadySelectedPlayer}
          />
        </div>
      </div>
    </div>
  );
};

export { TeamDraw };
