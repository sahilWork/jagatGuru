import React, { ReactNode } from 'react';
import { RxCross1 } from "react-icons/rx";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const AddUserModal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
        >
          <RxCross1 size={30} />
        </button>
        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AddUserModal;
