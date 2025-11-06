import React, { useRef } from "react";
import PopupModal from "../components/PopupModal";

function UserProfile({ fullName = "", userType = "", openPopup }) {
  const modalRef = useRef();
  const getInitial = () => {
    if (!fullName) return "NA";
    return fullName
      .split(" ")
      .map((name = "") => name[0])
      .join("")
      .slice(0, 1)
      .toUpperCase();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      title="Logout"
      className="cursor-pointer flex gap-[0.5rem] items-center"
      onClick={() => modalRef.current?.open()}
      onKeyPress={(e) => e.key === "Enter" && modalRef.current?.open()}
    >
      {/* Avatar circle */}
      <div className="w-[2.2975rem] h-[2.2975rem] flex items-center justify-center bg-primary text-accent rounded-full">
        <h5 className="text-accent font-[500]">{getInitial()}</h5>
      </div>

      {/* Name & user type */}
      <div className="hidden lg:block">
        <h5 className="!text-[1rem] !font-[600]">{fullName || "MNV"}</h5>
        <h6 className="!text-[0.875rem] text-primary/50 !font-[400]">
          {userType}
        </h6>
      </div>
      <PopupModal
        ref={modalRef}
        title="Hello!"
        subtitle="This action cannot be undone. Are you sure you want to logout ?"
      >
        Are you sure want to logout?
      </PopupModal>
    </div>
  );
}

export default UserProfile;
