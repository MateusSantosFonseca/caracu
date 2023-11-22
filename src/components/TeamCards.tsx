'use client';

import type { Position } from '@/models/Schema';
import { capitalizeFirstLetter } from '@/utils/string';

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
          props.players.map((player) => (
            <div
              key={player.id}
              className="border border-gray-300 px-3 py-2 md:py-1.5"
              role="button"
              tabIndex={0}
              onClick={() => props.onSelect(player)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') props.onSelect(player);
              }}
            >
              <div className="space-y-1">
                <div className="space-y-2">
                  <span className="font-semibold text-gray-700">Nome: </span>
                  <span className="text-gray-700">{player.name}</span>
                </div>
                <div className="flex justify-between space-x-2">
                  <div className="md:flex">
                    <div className="font-semibold text-gray-700">Posição</div>
                    <div className="hidden md:block">
                      <span className="text-gray-700">:</span>
                    </div>
                    <div className="text-gray-700 md:ml-1">
                      {capitalizeFirstLetter(player.position)}
                    </div>
                  </div>
                  <div className="md:flex">
                    <div className="font-semibold text-gray-700">Rating</div>
                    <div className="hidden md:block">
                      <span className="text-gray-700">:</span>
                    </div>
                    <div className="text-gray-700 md:ml-1">{player.rating}</div>
                  </div>
                  <div className="md:flex">
                    <div className="font-semibold text-gray-700">Ritmo</div>
                    <div className="hidden md:block">
                      <span className="text-gray-700">:</span>
                    </div>
                    <div className="text-gray-700 md:ml-1">
                      {player.stamina}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="border border-gray-300 px-2 py-5 text-center text-gray-700">
            Sem jogadores nessa lista
          </div>
        )}
      </div>
    </div>
  );
};

export { TeamCards };
