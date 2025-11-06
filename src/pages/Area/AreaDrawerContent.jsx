import React from "react";
import InputTag from "../../components/Input/InputTag";
import Dropdown from "../../components/Dropdown/Dropdown";

const status = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

// Memoize Drawer children to prevent full re-renders
const AreaDrawerContent = React.memo(function AreaDrawerContent({
  formData,
  handleChange,
  validationObj,
}) {
  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <InputTag
          label="Pincode"
          placeholder="Type your pincode"
          value={formData?.pincode || ""}
          type="number"
          onChange={(e) => {
            handleChange("pincode", e.target.value);
          }}
          required
        />

        {validationObj?.pincodeError && (
          <p className="text-red-500 text-[12px] absolute bottom-[-17px]">
            {!formData?.pincode
              ? "Pincode must be at least 2 characters long"
              : ""}
          </p>
        )}
      </div>
      <div className="relative">
        <InputTag
          label="Area"
          placeholder="Type your area"
          value={formData?.area || ""}
          onChange={(e) => {
            handleChange("area", e.target.value);
          }}
          required
        />

        {validationObj?.areaError && (
          <p className="text-red-500 text-[12px] absolute bottom-[-17px]">
            {!formData?.area ? "Area must be at least 2 characters long" : ""}
          </p>
        )}
      </div>{" "}
      <div className="relative">
        <InputTag
          label="City"
          placeholder="Type your city"
          value={formData?.city || ""}
          onChange={(e) => {
            handleChange("city", e.target.value);
          }}
          required
        />

        {validationObj?.cityError && (
          <p className="text-red-500 text-[12px] absolute bottom-[-17px]">
            {!formData?.city ? "City must be at least 2 characters long" : ""}
          </p>
        )}
      </div>{" "}
      <div className="relative">
        <InputTag
          label="State"
          placeholder="Type your state"
          value={formData?.state || ""}
          onChange={(e) => {
            handleChange("state", e.target.value);
          }}
          required
        />

        {validationObj?.stateError && (
          <p className="text-red-500 text-[12px] absolute bottom-[-17px]">
            {!formData?.state ? "State must be at least 2 characters long" : ""}
          </p>
        )}
      </div>{" "}
      {/* <div className=" relative">
        <Dropdown
          buttonLabel={formData.status || "Select status"}
          items={status}
          value={formData.status}
          onSelect={(item) => handleChange("status", item)}
          btnClass="font-light text-start"
          widthClass="w-80"
          label="Status"
          required
        />
        {validationObj.statusError && (
          <p className="text-red-500 text-[12px]   absolute bottom-[-17px]">
            {!formData.status ? "Please select a status type" : ""}
          </p>
        )}
      </div> */}
      <div className="relative">
        <div className="text-[12px] pb-[8px] font-bold flex gap-2">
          Status
          <legend className="flex gap-2">
            <span className="text-error">*</span>
          </legend>
        </div>
        <input
          type="checkbox"
          checked={formData.status}
          className="toggle border-info bg-accent checked:border-info checked:bg-info  "
          onChange={(e) => handleChange("status", e.target.checked)}
        />
        <span className="ps-2"> {formData.status ? "active" : "inactive"}</span>
      </div>
    </div>
  );
});

export default AreaDrawerContent;
