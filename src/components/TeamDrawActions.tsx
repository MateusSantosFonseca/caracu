'use client';

import { Spinner, Tooltip } from '@nextui-org/react';

import { DrawType } from '@/models/Schema';

import type { IPlayer } from './TeamDraw';

interface TeamDrawActionsProps {
  isLoading: boolean;
  selectedPlayers: IPlayer[];
  handleDraw: (data: IPlayer[], drawType: DrawType) => Promise<void>;
}

export const TeamDrawActions = ({
  isLoading,
  selectedPlayers,
  handleDraw,
}: TeamDrawActionsProps) => {
  const notEnoughPlayers = selectedPlayers.length < 8;

  return (
    <div className="space-y-2 md:justify-normal">
      {isLoading && <Spinner color="secondary" size="md" />}
      {!isLoading && (
        <>
          <div className="block font-semibold text-gray-800">
            Tipos de sorteio
          </div>
          <div className="space-x-4">
            <Tooltip content="Sorteio com algoritmo customizado" showArrow>
              <button
                type="button"
                disabled={notEnoughPlayers}
                className={` ${
                  notEnoughPlayers ? 'bg-gray-400' : 'bg-purple-800'
                } rounded-md px-4 py-2 text-white`}
                onClick={async () => {
                  await handleDraw(selectedPlayers, DrawType.Custom);
                }}
              >
                Custom
              </button>
            </Tooltip>
            <Tooltip
              content="Sorteio inteligente, pode demorar até 1 minuto"
              showArrow
            >
              <button
                type="button"
                disabled={notEnoughPlayers}
                className={` ${
                  notEnoughPlayers ? 'bg-gray-400' : 'bg-purple-800'
                } rounded-md px-4 py-2 text-white`}
                onClick={async () => {
                  await handleDraw(selectedPlayers, DrawType.Smart);
                }}
              >
                Smart
              </button>
            </Tooltip>
            <Tooltip content="Sorteio randomico" showArrow>
              <button
                type="button"
                disabled={notEnoughPlayers}
                className={` ${
                  notEnoughPlayers ? 'bg-gray-400' : 'bg-purple-800'
                } rounded-md px-4 py-2 text-white`}
                onClick={async () => {
                  await handleDraw(selectedPlayers, DrawType.Random);
                }}
              >
                Random
              </button>
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
};
