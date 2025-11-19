import React, { useState } from "react";
import PopupModal from "../components/PopupModal";
import { useNavigate } from "react-router-dom";

function UserProfile({ fullName = "", userType = "" }) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

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
    <>
      <div
        role="button"
        tabIndex={0}
        title="Logout"
        className="cursor-pointer flex gap-[0.5rem] items-center"
        onClick={() => setOpenModal(true)}
      >
        <div className="w-[2.2975rem] h-[2.2975rem] flex items-center justify-center bg-primary text-accent rounded-full">
          <h5 className="text-accent font-[500]">{getInitial()}</h5>
        </div>

        <div className="hidden lg:block">
          <h5 className="!text-[1rem] !font-[600]">{fullName || "MNV"}</h5>
          <h6 className="!text-[0.875rem] text-primary/50 !font-[400]">
            {userType}
          </h6>
        </div>
      </div>

      <PopupModal
        isOpen={openModal}
        title="Delete Product"
        message="Are you sure you want to delete this product from your account?"
        onYes={() => {
          localStorage.removeItem("user");
          navigate("/login");
          setOpenModal(false);
        }}
        onNo={() => {
          setOpenModal(false);
        }}
      />
    </>
  );
}

export default UserProfile;
