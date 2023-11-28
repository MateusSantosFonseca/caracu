'use client';

import { useUser } from '@clerk/nextjs';
import { useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import type { DrawType, Position, Stamina } from '@/models/Schema';

import { DrawedTeamModal } from './DrawedTeamModal';
import { TeamCards } from './TeamCards';
import { TeamDrawActions } from './TeamDrawActions';

export type IPlayer = {
  id: number;
  name: string;
  rating: number;
  position: Position;
  stamina: Stamina;
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

  const handleDraw = async (data: IPlayer[], drawType: DrawType) => {
    setIsLoading(true);
    const result = await fetch(`/api/draw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ players: data, drawType }),
    });

    if (!result.ok) {
      toast.error('Ocorreu um erro ao sortear os times, tente novamente.', {
        position: 'top-center',
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      setIsLoading(false);
      return;
    }

    const { response } = await result.json();

    onOpen();
    setMarkdownResult(response);
    setIsLoading(false);
  };

  return (
    <>
      <DrawedTeamModal
        isOpen={isOpen}
        markdownResult={markdownResult}
        onOpenChange={onOpenChange}
      />
      <div className="space-y-8">
        <div className="mb-4 mt-2 block">
          Olá, organizador do time
          <span className="mx-1 font-semibold">
            {user?.username?.toString()}.
          </span>
          Selecione ao menos 8 jogadores para realizar o sorteio.
        </div>
        <TeamDrawActions
          handleDraw={handleDraw}
          isLoading={isLoading}
          selectedPlayers={selectedPlayers}
        />
        <div className="grid grid-cols-12 space-x-2 md:space-x-4">
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
