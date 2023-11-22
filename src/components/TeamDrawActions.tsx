'use client';

import { Spinner, Tooltip } from '@nextui-org/react';

import type { IPlayer } from './TeamDraw';

interface TeamDrawActionsProps {
  isLoading: boolean;
  selectedPlayers: IPlayer[];
  handleDraw: (data: IPlayer[], isSmartDraw: boolean) => Promise<void>;
}

export const TeamDrawActions = ({
  isLoading,
  selectedPlayers,
  handleDraw,
}: TeamDrawActionsProps) => {
  const notEnoughPlayers = selectedPlayers.length < 8;

  return (
    <div className="space-x-4">
      {isLoading && <Spinner color="secondary" size="md" />}
      {!isLoading && (
        <>
          <Tooltip
            content="Sorteio inteligente, pode demorar até 1 minuto."
            showArrow
          >
            <button
              type="button"
              disabled={notEnoughPlayers}
              className={` ${
                notEnoughPlayers ? 'bg-gray-400' : 'bg-purple-800'
              } rounded-md  px-4 py-2 text-white`}
              onClick={async () => {
                await handleDraw(selectedPlayers, true);
              }}
            >
              Sorteio Smart
            </button>
          </Tooltip>
          <Tooltip content="Sorteio normal." showArrow>
            <button
              type="button"
              disabled={notEnoughPlayers}
              className={` ${
                notEnoughPlayers ? 'bg-gray-400' : 'bg-purple-800'
              } rounded-md  px-4 py-2 text-white`}
              onClick={async () => {
                await handleDraw(selectedPlayers, false);
              }}
            >
              Sorteio normal
            </button>
          </Tooltip>
        </>
      )}
    </div>
  );
};
