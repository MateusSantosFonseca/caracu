import { z } from 'zod';

import { DrawType, Position, Stamina } from '@/models/Schema';

export const DrawSchema = z.object({
  players: z.array(
    z.object({
      id: z.number().min(1),
      rating: z.number().min(1).max(10),
      position: z.enum([Position.Forward, Position.Defensor, Position.Any]),
      stamina: z.enum([Stamina.High, Stamina.Normal, Stamina.Regular]),
      name: z.string().min(1),
    }),
  ),
  drawType: z.enum([DrawType.Custom, DrawType.Random, DrawType.Smart]),
});
