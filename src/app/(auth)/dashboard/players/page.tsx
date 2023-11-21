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
    .where((aliases) => {
      return sql`${aliases.teamId} = ${userId}`;
    })
    .all();

  return (
    <div className="mt-4">
      <PlayerForm />

      <div className="mt-5">
        {players.map((elt) => (
          <div key={elt.id} className="mb-1 flex items-center gap-x-1">
            <DeletePlayerEntry id={elt.id} />

            <EditablePlayerEntry
              id={elt.id}
              name={elt.name}
              position={elt.position}
              rating={elt.rating}
              stamina={elt.stamina}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default Player;
