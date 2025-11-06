import React from "react";
import InputTag from "../../components/Input/InputTag";
import Dropdown from "../../components/Dropdown/Dropdown";
import MultiSelectDropdown from "../../components/Dropdown/MultiSelectDropdown";
import { PropertyTypes } from "../../components/CommonFunctions/PropertyType";

const BuildingDrawerContent = React.memo(function BuildingDrawerContent({
  formData,
  handleChange,
  validationObj,
}) {
  // --- SECTION CONFIGS ---
  const sections = [
    {
      title: "Basic Information",
      fields: [
        {
          type: "text",
          name: "buildingName",
          label: "Building Name",
          placeholder: "Enter building name",
          required: true,
        },
        {
          type: "text",
          name: "address",
          label: "Address",
          placeholder: "Enter full address",
          required: true,
        },
        {
          type: "text",
          name: "landmark",
          label: "Landmark",
          placeholder: "Enter nearby landmark",
        },
        {
          type: "text",
          name: "area",
          label: "Area",
          placeholder: "Enter area",
          required: true,
        },
        {
          type: "text",
          name: "city",
          label: "City",
          placeholder: "Enter city",
          required: true,
        },
        {
          type: "text",
          name: "state",
          label: "State",
          placeholder: "Enter state",
          required: true,
        },
        {
          type: "number",
          name: "pincode",
          label: "Pincode",
          placeholder: "Enter pincode",
          required: true,
        },
      ],
    },
    {
      title: "Other Details",
      fields: [
        {
          type: "number",
          name: "year",
          label: "Year of Building Possession",
          placeholder: "Enter year",
          required: true,
        },
        {
          type: "number",
          name: "floors",
          label: "Number of Floors",
          placeholder: "Enter floor count",
        },
        {
          type: "number",
          name: "units",
          label: "Number of Units",
          placeholder: "Enter unit count",
        },
        {
          type: "number",
          name: "lifts",
          label: "Lifts per Block",
          placeholder: "Enter number of lifts",
        },
      ],
    },
    {
      title: "Property Settings",
      fields: [
        {
          type: "multi",
          name: "propertyTypes",
          label: "Property Type",
          placeholder: "Select property type",
          items: PropertyTypes(),
          required: true,
        },
        {
          type: "multi",
          name: "restrictedUsers",
          label: "Restricted Users",
          placeholder: "Select restricted users",
          items: PropertyTypes(),
        },
        {
          type: "dropdown",
          name: "buildingStatus",
          label: "Building Status",
          placeholder: "Select status",
          items: PropertyTypes(),
          required: true,
        },
        {
          type: "dropdown",
          name: "buildingQuality",
          label: "Quality of Building",
          placeholder: "Select quality",
          items: PropertyTypes(),
          required: true,
        },
      ],
    },
    {
      title: "Amenities",
      checkboxes: [
        "Prime Building",
        "Swimming Pool",
        "Club House",
        "Passenger Lift",
        "Gym",
        "Garden & Children Play Area",
        "Central AC",
        "Service Lift",
        "Stretcher Lift",
      ],
    },
    {
      title: "Contact Details",
      fields: [
        {
          type: "text",
          name: "contactName",
          label: "Contact Person Name",
          placeholder: "Enter name",
          required: true,
        },
        {
          type: "number",
          name: "contactNumber",
          label: "Contact Number",
          placeholder: "Enter phone number",
          required: true,
        },
        {
          type: "email",
          name: "email",
          label: "Email",
          placeholder: "Enter email address",
        },
      ],
    },
    {
      title: "Security Details",
      fields: [
        {
          type: "text",
          name: "securityName",
          label: "Security Person Name",
          placeholder: "Enter name",
        },
        {
          type: "number",
          name: "securityNumber",
          label: "Security Contact Number",
          placeholder: "Enter contact number",
        },
      ],
    },
  ];
    
    

  return (
    <div className="flex flex-col gap-10 w-full text-primary border border-red-500 mb-[80px]">
      {sections.map((section, sIdx) => (
        <div
          key={sIdx}
          className="border border-accent rounded-[16px] p-4 bg-base-100 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-info mb-3">
            {section.title}
          </h3>

          {/* Input Fields */}
          {section.fields && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field, idx) => (
                <div key={idx} className="relative">
                  {field.type === "text" ||
                  field.type === "number" ||
                  field.type === "email" ? (
                    <InputTag
                      label={field.label}
                      placeholder={field.placeholder}
                      type={field.type}
                      value={formData?.[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                    />
                  ) : field.type === "dropdown" ? (
                    <Dropdown
                      label={field.label}
                      required={field.required}
                      items={field.items}
                      buttonLabel={formData?.[field.name] || field.placeholder}
                      value={formData?.[field.name]}
                      onSelect={(item) => handleChange(field.name, item.value)}
                      widthClass="w-full"
                    />
                  ) : field.type === "multi" ? (
                    <MultiSelectDropdown
                      label={field.label}
                      required={field.required}
                      items={field.items}
                      buttonLabel={field.placeholder}
                      widthClass="w-full"
                      value={formData?.[field.name] || []}
                      onChange={(values) => handleChange(field.name, values)}
                    />
                  ) : null}

                  {validationObj?.[`${field.name}Error`] && (
                    <p className="text-error text-[12px] absolute bottom-[-18px]">
                      {validationObj[`${field.name}Error`]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Checkboxes */}
          {section.checkboxes && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {section.checkboxes.map((label, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData[label] || false}
                    onChange={(e) => handleChange(label, e.target.checked)}
                    className="toggle border-info bg-accent checked:border-info checked:bg-info"
                  />
                  <span className="capitalize">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default BuildingDrawerContent;
