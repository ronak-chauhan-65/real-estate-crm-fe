import React from "react";

const Drawer = ({
  isOpen,
  onClose,
  position = "end", // "start" or "end"
  header = "Drawer Header",
  widthClass = "lg:w-96 sm:w-90 w-full",
  children,
  footer, // new prop
  onEditID = "",
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 !z-[30]"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 ${
          position === "end" ? "right-0" : "left-0"
        } h-full bg-base-200 z-[40] transition-transform duration-300 ease-in-out ${widthClass} ${
          isOpen
            ? "translate-x-0"
            : position === "end"
            ? "translate-x-full"
            : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="text-[2rem] text-accent bg-info px-[1.5rem] py-[0.7rem] flex items-center justify-between font-medium">
          <span>{onEditID ? "Edit Property" : header}</span>
          <button onClick={onClose} className="btn btn-sm text-info text-xl">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto h-[calc(100%-3rem)]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="fixed bottom-0 px-[1.5rem] py-[0.7rem] w-full bg-base-200">
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(Drawer);
