'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React from 'react';
import Reactmarkdown from 'react-markdown';
import { toast } from 'react-toastify';

interface DrawedTeamModalProps {
  markdownResult: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

export const DrawedTeamModal = ({
  markdownResult,
  isOpen,
  onOpenChange,
}: DrawedTeamModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      className="max-h-[90%] overflow-y-auto"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Times sorteados
            </ModalHeader>
            <ModalBody>
              <Reactmarkdown>{markdownResult}</Reactmarkdown>
              <button
                type="button"
                className="mt-4 rounded bg-purple-700 px-10 py-2 font-semibold text-white hover:bg-purple-600"
                onClick={() => {
                  navigator.clipboard.writeText(markdownResult);

                  toast.success('Os times foram copiados para seu clipboard!', {
                    position: 'top-center',
                    autoClose: 4000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                  });
                }}
              >
                Copiar para o clipboard
              </button>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="light"
                className="font-semibold"
                onPress={onClose}
              >
                Fechar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
