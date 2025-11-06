import React from "react";

function NodataFound() {
  return (
    <div className="w-full items-center justify-center flex flex-col py-[3rem]">
      <div className="">
        <iframe
          src="https://lottie.host/embed/b957963d-a3e9-47fc-8198-7505eb12b237/FEiDM8uncA.json"
          title="Thank you from daily"
          className="w-[15rem] h-[15rem]"
        />
      </div>
      <div className="">
        <h3 className="font-medium leading-7 !text-[1.5rem] mt-4">
          No Records Found
        </h3>
      </div>
    </div>
  );
}

export default NodataFound;
