'use client';

import type { Position } from '@/models/Schema';

type IPlayer = {
  id: number;
  name: string;
  position: Position;
  rating: number;
  stamina: number;
};

type TeamCardsProps = {
  players: IPlayer[];
  onSelect: (player: IPlayer) => void;
  title: string;
};

const TeamCards = (props: TeamCardsProps) => {
  return (
    <div className="space-y-3">
      <div className="font-semibold text-gray-800">{props.title}</div>
      <div className="space-y-2.5">
        {props.players.length > 0 ? (
          props.players.map((availablePlayer) => (
            <div
              key={availablePlayer.id}
              className="border border-gray-300 px-4 py-2"
              role="button"
              tabIndex={0}
              onClick={() => props.onSelect(availablePlayer)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') props.onSelect(availablePlayer);
              }}
            >
              <div className="flex space-x-2">
                <div>
                  <span className="font-semibold text-gray-700">Nome: </span>
                  <span className="text-gray-700">{availablePlayer.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Rating: </span>
                  <span className="text-gray-700">
                    {availablePlayer.rating}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Ritmo: </span>
                  <span className="text-gray-700">
                    {availablePlayer.stamina}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Posição: </span>
                  <span className="text-gray-700">
                    {availablePlayer.position}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="border p-4 text-gray-700">
            No players in this list.
          </div>
        )}
      </div>
    </div>
  );
};

export { TeamCards };
