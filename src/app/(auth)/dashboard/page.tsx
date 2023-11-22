import { auth } from '@clerk/nextjs';
import { sql } from 'drizzle-orm';
import type { Metadata } from 'next';

import { TeamDraw } from '@/components/TeamDraw';
import { db } from '@/libs/DB';
import { playerTable } from '@/models/Schema';

export const metadata: Metadata = {
  title: 'Team Draw',
  description: 'Team Draw',
};

const Dashboard = async () => {
  const { userId } = auth();
  const players = await db
    .select()
    .from(playerTable)
    .where((aliases) => sql`${aliases.teamId} = ${userId}`)
    .all();

  return (
    <div className="content">
      <TeamDraw players={players} />
    </div>
  );
};

export default Dashboard;
