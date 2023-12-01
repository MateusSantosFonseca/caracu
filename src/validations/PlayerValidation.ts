import { z } from 'zod';

import { Position, Stamina } from '@/models/Schema';

export const PlayerSchema = z.object({
  rating: z.number().min(1).max(10),
  position: z.enum([Position.Forward, Position.Defensor, Position.Any]),
  stamina: z.enum([Stamina.High, Stamina.Normal, Stamina.Regular]),
  name: z.string().min(1),
});

export const EditPlayerSchema = z.object({
  isDeleteFlow: z.boolean(),
  id: z.number(),
  rating: z.number().min(1).max(10).optional(),
  position: z
    .enum([Position.Forward, Position.Defensor, Position.Any])
    .optional(),
  stamina: z.enum([Stamina.High, Stamina.Normal, Stamina.Regular]).optional(),
  name: z.string().min(1).optional(),
});
