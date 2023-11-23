'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type IDeletePlayerEntryProps = {
  id: number;
  name: string;
};

const DeletePlayerEntry = (props: IDeletePlayerEntryProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(`/api/player`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: props.id,
        isDeleteFlow: true,
      }),
    });

    toast.success(`O jogador ${props.name} foi excluído com sucesso!!`, {
      position: 'top-center',
      autoClose: 4000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });

    router.refresh();
  };

  return (
    <button
      type="button"
      aria-label="delete"
      onClick={() => {
        handleDelete();
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
        <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      </svg>
    </button>
  );
};

export { DeletePlayerEntry };
