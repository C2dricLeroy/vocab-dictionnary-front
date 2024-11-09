import * as React from "react";

interface AddDictionnaryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddDictionnaryModal: React.FC<AddDictionnaryModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full">
                <h2 className="text-lg font-semibold">Add Dictionary</h2>
                <p>This is a placeholder for the Add Dictionary modal.</p>
                <button
                    onClick={onClose}
                    className="mt-4 text-sm text-blue-600 hover:underline"
                >
                    Close
                </button>
            </div>
        </div>
    );
};
