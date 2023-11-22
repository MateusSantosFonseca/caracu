'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import Reactmarkdown from 'react-markdown';

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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Times sorteados
            </ModalHeader>
            <ModalBody>
              <Reactmarkdown>{markdownResult}</Reactmarkdown>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
