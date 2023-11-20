import type { Metadata } from 'next';

import { DeleteGuestbookEntry } from '@/components/DeleteGuestbookEntry';
import { EditableGuestbookEntry } from '@/components/EditableGuestbookEntry';
import { GuestbookForm } from '@/components/GuestbookForm';
import { db } from '@/libs/DB';
import { guestbookTable } from '@/models/Schema';

export const metadata: Metadata = {
  title: 'Jogadores',
  description: 'Gerencie os jogadores do seu time',
};

const Guestbook = async () => {
  const guestbook = await db.select().from(guestbookTable).all();

  return (
    <div className="mt-4">
      <GuestbookForm />

      <div className="mt-5">
        {guestbook.map((elt) => (
          <div key={elt.id} className="mb-1 flex items-center gap-x-1">
            <DeleteGuestbookEntry id={elt.id} />

            <EditableGuestbookEntry
              id={elt.id}
              username={elt.username}
              body={elt.body}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default Guestbook;
