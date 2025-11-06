import React, { useState } from "react";
import InputTag from "../../components/Input/InputTag";
import Dropdown from "../../components/Dropdown/Dropdown";
import MultiSelectDropdown from "../../components/Dropdown/MultiSelectDropdown";
import { PropertyTypes } from "../../components/CommonFunctions/PropertyType";

const BuildingDrawerContent = React.memo(function BuildingDrawerContent({
  formData,
  handleChange,
  validationObj,
  addContactSection,
  addSecuritySection,
  handleContactChange,
  handleSecurityChange,
  removeSecuritySection,
  removeContactSection,
}) {
  const [contactSections, setContactSections] = useState([0]);
  const [securitySections, setSecuritySections] = useState([0]);
  // --- HANDLERS FOR ADD / REMOVE ---

  // --- SECTIONS CONFIGS ---
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
          name: "nameofBuilder",
          label: "Name of Builder",
          placeholder: "Enter building name",
        },
        {
          type: "text",
          name: "address",
          label: "Address",
          placeholder: "Enter full address",
        },
        {
          type: "text",
          name: "landmark",
          label: "Landmark",
          placeholder: "Enter nearby landmark",
        },
        {
          type: "dropdown",
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
        },
        {
          type: "text",
          name: "state",
          label: "State",
          placeholder: "Enter state",
        },
        {
          type: "number",
          name: "pincode",
          label: "Pincode",
          placeholder: "Enter pincode",
        },
        {
          type: "checkbox",
          name: "primebuilding",
          label: "Prime building",
          placeholder: "Enter building name",
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
  ];

  return (
    <div className="flex flex-col gap-10 w-full text-primary mb-[80px]">
      {/* Render Basic/Other/Property/Amenities */}
      {sections.map((section, sIdx) => (
        <div
          key={sIdx}
          className="border border-accent rounded-[16px] p-4 bg-base-100 shadow-md "
        >
          <h3 className="text-lg font-semibold text-info mb-3">
            {section.title}
          </h3>

          {/* Input Fields */}
          {section.fields && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              {section.fields.map((field, idx) => (
                <div key={idx} className="relative border border-red-500 ">
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
                      onSelect={(item) => handleChange(field.name, item)}
                      widthClass="w-full"
                    />
                  ) : field.type === "checkbox" ? (
                    <label key={idx} className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        checked={formData[field.name] || false}
                        onChange={(e) =>
                          handleChange(field.name, e.target.checked)
                        }
                        className="toggle border-info bg-accent checked:border-info checked:bg-info"
                      />
                      <span className="capitalize">{field.name}</span>
                    </label>
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

      {/* Contact Details Section */}
      <div className="border border-accent rounded-[16px] p-4 bg-base-100 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-info">Contact Details</h3>
          {formData.contactDetails.length < 2 && (
            <button
              className="btn btn-sm btn-outline btn-info hover:text-accent"
              onClick={addContactSection}
            >
              + Add
            </button>
          )}
        </div>

        {formData.contactDetails.map((contact, index) => (
          <div
            key={index}
            className="relative border border-base-200 rounded-lg p-4 mb-4"
          >
            {index !== 0 && (
              <button
                onClick={() => removeContactSection(index)}
                className="absolute top-2 right-2 text-error hover:text-red-600"
              >
                ✕
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputTag
                label="Contact Person Name"
                placeholder="Enter name"
                value={contact.name}
                onChange={(e) =>
                  handleContactChange(index, "name", e.target.value)
                }
              />
              <InputTag
                label="Contact Number"
                placeholder="Enter phone number"
                type="number"
                value={contact.number}
                onChange={(e) =>
                  handleContactChange(index, "number", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* Security Details Section */}
      <div className="border border-accent rounded-[16px] p-4 bg-base-100 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-info">Security Details</h3>
          {formData.securityDetails.length < 2 && (
            <button
              className="btn btn-sm btn-outline btn-info hover:text-accent"
              onClick={addSecuritySection}
            >
              + Add
            </button>
          )}
        </div>

        {formData.securityDetails.map((security, index) => (
          <div
            key={index}
            className="relative border border-base-200 rounded-lg p-4 mb-4"
          >
            {index !== 0 && (
              <button
                onClick={() => removeSecuritySection(index)}
                className="absolute top-2 right-2 text-error hover:text-red-600"
              >
                ✕
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputTag
                label="Security Person Name"
                placeholder="Enter name"
                value={security.name}
                onChange={(e) =>
                  handleSecurityChange(index, "name", e.target.value)
                }
              />
              <InputTag
                label="Security Contact Number"
                placeholder="Enter contact number"
                type="number"
                value={security.number}
                onChange={(e) =>
                  handleSecurityChange(index, "number", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default BuildingDrawerContent;
