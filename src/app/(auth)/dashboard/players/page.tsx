import { auth } from '@clerk/nextjs';
import { sql } from 'drizzle-orm';
import type { Metadata } from 'next';

import { DeletePlayerEntry } from '@/components/DeletePlayerEntry';
import { EditablePlayerEntry } from '@/components/EditablePlayerEntry';
import { PlayerForm } from '@/components/PlayerForm';
import { db } from '@/libs/DB';
import { playerTable } from '@/models/Schema';

export const metadata: Metadata = {
  title: 'Jogadores',
  description: 'Gerencie os jogadores do seu time',
};

const Player = async () => {
  const { userId } = auth();

  const players = await db
    .select()
    .from(playerTable)
    .where(
      (player) => sql`${player.teamId} = ${userId} AND ${player.active} = true`,
    )
    .all();

  return (
    <div className="p-4">
      <PlayerForm />

      <div className="mt-6">
        <div className="mb-3 text-lg font-semibold text-gray-700">
          Lista de jogadores
        </div>
        {players.length === 0 && (
          <div className="border border-gray-300 px-2 py-5 text-center text-gray-700">
            Nenhum jogador cadastrado. Cadastre-os acima.
            <span className="ml-1 font-semibold">Jogadores</span>.
          </div>
        )}
        {players.map((player) => (
          <div
            key={player.id}
            className="mb-1 flex items-center space-x-1 py-1.5 md:py-1"
          >
            <DeletePlayerEntry id={player.id} name={player.name} />
            <EditablePlayerEntry
              id={player.id}
              name={player.name}
              position={player.position}
              rating={player.rating}
              stamina={player.stamina}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default Player;
