import { z } from 'zod';

import { Position, Stamina } from '@/models/Schema';

export const DrawSchema = z.object({
  players: z.array(
    z.object({
      rating: z.number().min(1).max(10),
      position: z.enum([Position.Atacante, Position.Defensor]),
      stamina: z.enum([Stamina.Alto, Stamina.Medio, Stamina.Regular]),
      name: z.string().min(1),
    }),
  ),
  isSmartDraw: z.boolean(),
});
