import React from "react";

function PopupModal({ isOpen, title, message, onYes, onNo }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center ">
      <div className="bg-white rounded-base p-6 w-full max-w-md shadow-xl relative rounded-[20px] ">
        {/* Close Button */}
        <button
          type="button"
          onClick={onNo}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="flex justify-center">
          <h3 className="font-bold h-[100px] w-[100px] rounded-full flex items-center justify-center bg-info/10">
            <span className="material-symbols-outlined !text-[50px] text-info">
              info
            </span>
          </h3>
        </div>

        {/* Title */}
        <div className="py-4 text-[1.5rem] font-semibold mt-4 text-center">
          {title}
        </div>

        {/* Message */}
        <div className="text-[1rem] text-center text-gray-700 mb-6">
          {message}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onNo}
            className="btn btn-block w-full rounded-[10px]"
          >
            No
          </button>

          <button
            onClick={onYes}
            className="btn btn-block w-full bg-error text-white hover:bg-error  rounded-[10px]"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupModal;
