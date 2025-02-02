import React from "react";
import { Modal, ModalBody, Button } from "reactstrap";

interface DeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  headContent: string;
  bodyContent: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  headContent = "Delete Item",
  bodyContent = "Are you sure you want to delete this item ?",
}) => (
  <Modal isOpen={isOpen} toggle={onCancel}>
    <ModalBody>
      <div className="modal-toggle-wrapper">
        <h4 className="mb-2">{headContent}</h4>
        <p className="">{bodyContent}</p>
        <div className="text-end">
          <Button color="danger" onClick={onConfirm}>
            Delete
          </Button>
          <Button color="secondary" className="ms-2" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </ModalBody>
  </Modal>
);

export default DeleteModal;
