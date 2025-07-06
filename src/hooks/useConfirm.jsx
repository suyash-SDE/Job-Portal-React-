import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom"; // For creating modal

const ConfirmDialog = ({ message, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
        <p className="text-lg font-semibold text-gray-800 mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body 
  );
};

function useConfirm() {
  const [resolve, setResolve] = useState(null);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const confirm = useCallback((msg) => {
    return new Promise((res) => {
      setMessage(msg);
      setIsOpen(true);
      setResolve(() => res);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (resolve) {
      resolve(true);
      setIsOpen(false);
    }
  }, [resolve]);

  const handleCancel = useCallback(() => {
    if (resolve) {
      resolve(false);
      setIsOpen(false);
    }
  }, [resolve]);

  const ConfirmComponent = useCallback(
    () => (
      <ConfirmDialog
        message={message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isOpen={isOpen}
      />
    ),
    [message, handleConfirm, handleCancel, isOpen]
  );

  return { confirm, ConfirmComponent };
}

export default useConfirm;
