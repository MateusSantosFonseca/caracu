import { z } from 'zod';

import { Position } from '@/models/Schema';

export const PlayerSchema = z.object({
  rating: z.number().min(1),
  position: z.enum([Position.Pivo, Position.Fixo, Position.Ala]),
  stamina: z.number().min(1),
  name: z.string().min(1),
});

export const EditPlayerSchema = z.object({
  id: z.number(),
  rating: z.number().min(1),
  position: z.enum([Position.Pivo, Position.Fixo, Position.Ala]),
  stamina: z.number().min(1),
  name: z.string().min(1),
});

export const DeletePlayerSchema = z.object({
  id: z.number(),
});
