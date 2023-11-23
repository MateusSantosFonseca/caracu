import { auth } from '@clerk/nextjs';
import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/libs/DB';
import { playerTable } from '@/models/Schema';
import { EditPlayerSchema, PlayerSchema } from '@/validations/PlayerValidation';

export const POST = async (request: Request) => {
  try {
    const { userId } = auth();
    const json = await request.json();
    const body = PlayerSchema.parse(json);

    const player = await db
      .insert(playerTable)
      .values({ ...body, active: true, teamId: userId ?? 'NoTeamId' })
      .returning();

    return NextResponse.json({
      id: player[0]?.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.format(), { status: 422 });
    }

    console.log('Error while adding player', error);
    return NextResponse.json({}, { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  try {
    const { userId } = auth();
    const json = await request.json();

    const { isDeleteFlow, ...body } = EditPlayerSchema.parse(json);

    const params = {
      ...body,
      teamId: userId ?? 'NoTeamId',
      updatedAt: sql`(strftime('%s', 'now'))`,
    };

    if (isDeleteFlow) {
      await db
        .update(playerTable)
        .set({
          ...params,
          active: false,
        })
        .where(eq(playerTable.id, body.id))
        .run();

      return NextResponse.json({});
    }

    await db
      .update(playerTable)
      .set({
        ...params,
        active: true,
      })
      .where(eq(playerTable.id, body.id))
      .run();

    return NextResponse.json({});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.format(), { status: 422 });
    }

    console.log('Error while editing player', error);
    return NextResponse.json({}, { status: 500 });
  }
};
