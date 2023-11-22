import { z } from 'zod';

import { Position } from '@/models/Schema';

export const DrawSchema = z.object({
  players: z.array(
    z.object({
      rating: z.number().min(1),
      position: z.enum([Position.Pivo, Position.Fixo, Position.Ala]),
      stamina: z.number().min(1),
      name: z.string().min(1),
    }),
  ),
  isSmartDraw: z.boolean(),
});
