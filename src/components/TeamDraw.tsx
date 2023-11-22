'use client';

import { useUser } from '@clerk/nextjs';
import { Tooltip, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';

import type { Position } from '@/models/Schema';

import { DrawedTeamModal } from './DrawedTeamModal';
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
  const [isLoading, setIsLoading] = useState(false);
  const [markdownResult, setMarkdownResult] = useState('');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSelectAvailablePlayer = (player: IPlayer) => {
    setAvailablePlayers((prev) => prev.filter((p) => p.id !== player.id));
    setSelectedPlayers((prev) => [...prev, player]);
  };

  const onSelectAlreadySelectedPlayer = (player: IPlayer) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.id !== player.id));
    setAvailablePlayers((prev) => [...prev, player]);
  };

  const handleDraw = async (data: IPlayer[]) => {
    setIsLoading(true);
    const result = await fetch(`/api/draw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const { response } = await result.json();

    onOpen();
    setMarkdownResult(response);
    setIsLoading(false);
  };

  const notEnoughPlayers = selectedPlayers.length < 8;

  return (
    <>
      <DrawedTeamModal
        isOpen={isOpen}
        markdownResult={markdownResult}
        onOpenChange={onOpenChange}
      />
      <div className="space-y-8">
        <div className="my-8 flex">
          Olá, organizador do time
          <div className="mx-1 font-semibold">
            {user?.username?.toString()}.
          </div>
          Selecione ao menos 8 jogadores para realizar o sorteio.
        </div>
        <div>
          <Tooltip
            content="Sorteio inteligente, pode demorar até 1 minuto."
            showArrow
          >
            <button
              type="button"
              disabled={notEnoughPlayers || isLoading}
              className={` ${
                notEnoughPlayers || isLoading ? 'bg-gray-400' : 'bg-purple-800'
              } rounded-md  px-4 py-2 text-white`}
              onClick={async () => {
                await handleDraw(selectedPlayers);
              }}
            >
              {isLoading ? 'Sorteando...' : 'Sortear times'}
            </button>
          </Tooltip>
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
    </>
  );
};

export { TeamDraw };
