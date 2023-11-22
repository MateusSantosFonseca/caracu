'use client';

import { useState } from 'react';

import type { Position } from '@/models/Schema';
import { capitalizeFirstLetter } from '@/utils/string';

import { PlayerForm } from './PlayerForm';

type IEditablePlayerEntryProps = {
  id: number;
  name: string;
  position: Position;
  rating: number;
  stamina: number;
};

const EditablePlayerEntry = (props: IEditablePlayerEntryProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((value) => !value);
  };

  const handleStopEditing = () => {
    setIsEditing(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="edit"
        onClick={() => {
          handleEdit();
        }}
      >
        <svg
          className="h-6 w-6 stroke-current"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M4 20h4L18.5 9.5a1.5 1.5 0 0 0-4-4L4 16v4M13.5 6.5l4 4" />
        </svg>
      </button>

      <div className="ml-4 grow">
        {isEditing ? (
          <PlayerForm
            edit
            id={props.id}
            defaultValues={{
              name: props.name,
              position: props.position,
              rating: props.rating,
              stamina: props.stamina,
            }}
            handleStopEditing={handleStopEditing}
          />
        ) : (
          <>
            <div id="mobile" className="ml-4 grid grid-cols-12 md:hidden">
              <div className="col-span-12">
                <span className="font-semibold text-gray-700">Nome: </span>
                <span className="text-gray-600">{props.name}</span>
              </div>
              <div className="col-span-12 grid grid-cols-12">
                <div className="col-span-4">
                  <span className="font-semibold text-gray-700">Rating: </span>
                  <span className="text-gray-600">{props.rating}</span>
                </div>
                <div className="col-span-4">
                  <span className="font-semibold text-gray-700">Ritmo: </span>
                  <span className="text-gray-600">{props.stamina}</span>
                </div>
                <div className="col-span-4">
                  <span className="font-semibold text-gray-700">Pos: </span>
                  <span className="text-gray-600">
                    {capitalizeFirstLetter(props.position)}
                  </span>
                </div>
              </div>
            </div>
            <div id="desktop" className="hidden space-x-2 sm:flex md:flex">
              <div>
                <span className="font-semibold text-gray-700">Nome: </span>
                <span className="text-gray-600">{props.name} - </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Rating: </span>
                <span className="text-gray-600">{props.rating} - </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Ritmo: </span>
                <span className="text-gray-600">{props.stamina} - </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Posição: </span>
                <span className="text-gray-600">
                  {capitalizeFirstLetter(props.position)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export { EditablePlayerEntry };
