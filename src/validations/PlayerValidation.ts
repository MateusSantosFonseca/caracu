import { z } from 'zod';

import { Position, Stamina } from '@/models/Schema';

export const PlayerSchema = z.object({
  rating: z.number().min(1).max(10),
  position: z.enum([Position.Atacante, Position.Defensor]),
  stamina: z.enum([Stamina.Alto, Stamina.Medio, Stamina.Regular]),
  name: z.string().min(1),
});

export const EditPlayerSchema = z.object({
  isDeleteFlow: z.boolean(),
  id: z.number(),
  rating: z.number().min(1).max(10).optional(),
  position: z.enum([Position.Atacante, Position.Defensor]).optional(),
  stamina: z.enum([Stamina.Alto, Stamina.Medio, Stamina.Regular]).optional(),
  name: z.string().min(1).optional(),
});
