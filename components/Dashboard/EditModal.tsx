// EditModal.tsx
import React, { useState } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newValue: string) => void;
  currentValue: string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, currentValue }) => {
  const [inputValue, setInputValue] = useState(currentValue);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2>Edit</h2>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 w-full"
        />
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2">Cancel</button>
          <button onClick={() => { onSave(inputValue); onClose(); }}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
