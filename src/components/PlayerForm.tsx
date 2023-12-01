'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { z } from 'zod';

import { Position, Stamina } from '@/models/Schema';
import { PlayerSchema } from '@/validations/PlayerValidation';

type IPlayerFormProps =
  | {
      edit: true;
      id: number;
      defaultValues: z.infer<typeof PlayerSchema>;
      handleStopEditing: () => void;
    }
  | { edit?: false };

const PlayerForm = (props: IPlayerFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<z.infer<typeof PlayerSchema>>({
    resolver: zodResolver(PlayerSchema),
    defaultValues: props.edit ? props.defaultValues : undefined,
  });
  const router = useRouter();

  const handleCreate = handleSubmit(async (data) => {
    if (props.edit) {
      await fetch(`/api/player`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: props.id,
          isDeleteFlow: false,
          ...data,
        }),
      });

      toast.success(`O jogador ${data.name} foi editado com sucesso!`, {
        position: 'top-center',
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      props.handleStopEditing();
    } else {
      await fetch(`/api/player`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      toast.success(`O jogador ${data.name} foi adicionado com sucesso!`, {
        position: 'top-center',
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      setFocus('name');
      reset();
    }

    router.refresh();
  });

  return (
    <form onSubmit={handleCreate}>
      <div className="space-y-4">
        <div className="text-lg font-semibold text-gray-700">
          Adicionar novo jogador
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700" htmlFor="name">
            Name
            <input
              id="name"
              placeholder="Digite o nome do jogador"
              className="mt-1.5 w-full appearance-none rounded border border-gray-400 px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring focus:ring-blue-300/50"
              {...register('name')}
            />
          </label>
          {errors.name?.message && (
            <div className="my-2 text-xs italic text-red-500">
              {errors.name?.message}
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700" htmlFor="rating">
            Rating
            <input
              id="rating"
              type="number"
              min={1}
              max={10}
              placeholder="Insira o rating do jogador (1 a 10)"
              className="mt-1.5 w-full appearance-none rounded border border-gray-400 px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring focus:ring-blue-300/50"
              {...register('rating', {
                valueAsNumber: true,
              })}
            />
          </label>
          {errors.rating?.message && (
            <div className="my-2 text-xs italic text-red-500">
              {errors.rating?.message}
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700" htmlFor="position">
            Position
            <select
              id="position"
              className="mt-1.5 w-full appearance-none rounded border border-gray-400 px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring focus:ring-blue-300/50"
              {...register('position')}
            >
              <option value={Position.Forward}>Atacante</option>
              <option value={Position.Defensor}>Defensor</option>
              <option value={Position.Any}>Qualquer</option>
            </select>
          </label>
          {errors.position?.message && (
            <div className="my-2 text-xs italic text-red-500">
              {errors.position?.message}
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700" htmlFor="ritmo">
            Ritmo
            <select
              id="ritmo"
              className="mt-1.5 w-full appearance-none rounded border border-gray-400 px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring focus:ring-blue-300/50"
              {...register('stamina')}
            >
              <option value={Stamina.Regular}>Regular</option>
              <option value={Stamina.Normal}>Medio</option>
              <option value={Stamina.High}>Alto</option>
            </select>
          </label>
          {errors.stamina?.message && (
            <div className="my-2 text-xs italic text-red-500">
              {errors.stamina?.message}
            </div>
          )}
        </div>
      </div>

      <div className="my-8 space-y-4">
        <button
          className="rounded bg-blue-500 px-5 py-1 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300/50"
          type="submit"
        >
          {props.edit ? 'Editar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
};

export { PlayerForm };
