import React, { forwardRef, useImperativeHandle, useRef } from "react";

const PopupModal = forwardRef(({ title, children, subtitle }, ref) => {
  const dialogRef = useRef(null);

  // Expose open and close functions to parent
  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle ">
      <form method="dialog" className="modal-box  ">
        {title && (
          <div className="flex justify-center">
            <h3 className="font-bold    h-[100px] w-[100px] rounded-full  flex items-center justify-center  bg-info/10">
              <span className="material-symbols-outlined !text-[50px] text-info ">
                logout
              </span>
            </h3>
          </div>
        )}

        <div className="py-4 text-[1.5rem] flex justify-center mt-[1rem] ">
          {children}
        </div>
        <div className="text-[1rem] text-center mb-[1.5rem]">{subtitle}</div>

        <div className=" grid grid-cols-2 gap-4">
          {/* This button will automatically close the modal */}
          <button className="btn btn-block w-full ">No</button>
          <button className="btn btn-block w-full bg-error text-accent hover:bg-error ">
            Yes
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default PopupModal;
