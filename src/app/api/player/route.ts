import { auth } from '@clerk/nextjs';
import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/libs/DB';
import { playerTable } from '@/models/Schema';
import {
  DeletePlayerSchema,
  EditPlayerSchema,
  PlayerSchema,
} from '@/validations/PlayerValidation';

export const POST = async (request: Request) => {
  try {
    const { userId } = auth();
    const json = await request.json();
    const body = PlayerSchema.parse(json);

    const player = await db
      .insert(playerTable)
      .values({ ...body, teamId: userId ?? 'NoTeamId' })
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
    const body = {
      ...EditPlayerSchema.parse(json),
      teamId: userId ?? 'NoTeamId',
    };

    await db
      .update(playerTable)
      .set({
        ...body,
        updatedAt: sql`(strftime('%s', 'now'))`,
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

export const DELETE = async (request: Request) => {
  try {
    console.log('request', request);
    const requestBodyText = await request.text();
    console.log('RequestText', requestBodyText);

    const parsedData = JSON.parse(requestBodyText);
    console.log('ParsedData', parsedData);
    const { id } = DeletePlayerSchema.parse(parsedData);
    console.log('id', id);
    await db.delete(playerTable).where(eq(playerTable.id, id)).run();
    return NextResponse.json({});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.format(), { status: 422 });
    }

    console.log('Error while deleting player', error);
    return NextResponse.json({}, { status: 500 });
  }
};
