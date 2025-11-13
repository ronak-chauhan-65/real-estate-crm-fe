import React, { useEffect, useState } from "react";
import InputTag from "../../components/Input/InputTag";
import Dropdown from "../../components/Dropdown/Dropdown";
import MultiSelectDropdown from "../../components/Dropdown/MultiSelectDropdown";
import SearchableDropdown from "../../components/Dropdown/SearchableDropdown";
import { AreaApiList } from "../../components/APICalls/areaApi";
import { getMasterConfigg } from "../../components/APICalls/masterConfig";
import TextareaTag from "../../components/Input/TextareaTag";

const PropertyDrawerContent = React.memo(function PropertyDrawerContent({
  formData,
  handleChange,
  validationObj,
  handleCaretakerChange,
  handleOwnerContactChange,
  addOwnerContactSection,
  removeOwnerContactSection,
  setFormData,
}) {
  const [areas, setAreas] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [restrictedUser, setRestrictedUser] = useState([]);
  const [buildingStatus, setBuildingStatus] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [initialLoaded, setInitialLoaded] = useState(false);

  // --- Fetch area list ---
  const getArea = async (searchKey = "") => {
    const response = await AreaApiList.getAllArea({
      status: "active",
      searchKey,
    });
    setAreas(response?.data?.areas || []);
  };

  const params = {
    key: [
      "BUILDING_ARCHITECTURE_TYPE",
      "BUILDING_RESTRICTION",
      "BUILDING_PROGRESS",
    ].join(","),
  };

  const getPropertyTypes = async () => {
    const response = await getMasterConfigg(params);

    const formatted =
      response?.data?.data?.BUILDING_ARCHITECTURE_TYPE?.map((pt) => ({
        label: pt.name,
        value: pt._id,
      })) || [];

    const restrictedFormat =
      response?.data?.data?.BUILDING_RESTRICTION?.map((br) => ({
        label: br.name,
        value: br._id,
      })) || [];

    const buildingStatusFormat =
      response?.data?.data?.BUILDING_PROGRESS?.map((bs) => ({
        label: bs.name,
        value: bs._id,
      })) || [];

    setPropertyType(formatted);
    setRestrictedUser(restrictedFormat);
    setBuildingStatus(buildingStatusFormat);
  };

  // --- Effects ---
  useEffect(() => {
    if (!initialLoaded) {
      getArea("");
      setInitialLoaded(true);
    }
  }, [initialLoaded]);

  useEffect(() => {
    getPropertyTypes();
  }, []);

  useEffect(() => {
    if (searchValue.length >= 3 || searchValue === "") {
      getArea(searchValue);
    }
  }, [searchValue]);

  const sections = [
    {
      title: "Property Information",
      fields: [
        {
          type: "searchdropdown",
          name: "area", // Ref → Area
          label: "Area",
          placeholder: "Search area",
          required: true,
          items: areas,
        },
        {
          type: "dropdown",
          name: "propertyFor", // Ref → MasterConfig (PROPERTY_FOR)
          label: "Property For",
          placeholder: "Select property purpose",
          required: true,
        },
        {
          type: "dropdown",
          name: "propertyType", // Ref → MasterConfig (PROPERTY_CONSTRUCTION_TYPE)
          label: "Property Type",
          placeholder: "Select property type",
          required: true,
          items: propertyType,
        },
        {
          type: "dropdown",
          name: "specificProperty", // Ref → MasterConfig (PROPERTY_SPECIFIC_TYPE)
          label: "Specific Property",
          placeholder: "Select specific property type",
          required: true,
        },
        {
          type: "searchdropdown",
          name: "buildingName", // Ref → Building
          label: "Building Name",
          placeholder: "Search building",
          required: true,
          items: [],
        },
        {
          type: "text",
          name: "address",
          label: "Address",
          placeholder: "Enter full address",
        },
        {
          type: "text",
          name: "wing",
          label: "Wing",
          placeholder: "Enter wing name",
        },
        {
          type: "text",
          name: "unitNo",
          label: "Unit Number",
          placeholder: "Enter unit number",
        },
        {
          type: "dropdown",
          name: "configuration", // Ref → MasterConfig (PROPERTY_PLAN_TYPE)
          label: "Configuration",
          placeholder: "Select configuration type",
          required: true,
        },
        {
          type: "dropdown",
          name: "status",
          label: "Status",
          placeholder: "Select status",
          items: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
            { label: "Rent Out", value: "Rent out" },
            { label: "Sold Out", value: "Sold out" },
            { label: "Hold", value: "Hold" },
          ],
        },
        {
          type: "text",
          name: "carpetArea",
          label: "Carpet Area",
          placeholder: "Enter carpet area",
        },
        {
          type: "dropdown",
          name: "carpetMeasurement", // Ref → MasterConfig (PROPERTY_MEASUREMENT_TYPE)
          label: "Carpet Measurement Unit",
          placeholder: "Select unit (sqft, sqm, etc.)",
        },

        {
          type: "text",
          name: "superBuiltUpArea",
          label: "Super Built-up Area (Saleable)",
          placeholder: "Enter super built-up area",
          required: true,
        },
        {
          type: "dropdown",
          name: "superBuiltUpMeasurement",
          label: "Super Built-up Measurement Unit",
          placeholder: "Select unit (sqft, sqm, etc.)",
          required: true,
        },
        {
          type: "text",
          name: "plotArea",
          label: "Plot Area",
          placeholder: "Enter plot area",
          required: true,
        },
        {
          type: "dropdown",
          name: "plotMeasurement",
          label: "Plot Measurement Unit",
          placeholder: "Select unit (sqft, sqm, etc.)",
          required: true,
        },
        {
          type: "text",
          name: "terrace",
          label: "Terrace Area",
          placeholder: "Enter terrace area",
        },
        {
          type: "dropdown",
          name: "terraceMeasurement",
          label: "Terrace Measurement Unit",
          placeholder: "Select unit (sqft, sqm, etc.)",
        },

        {
          type: "checkbox",
          name: "hotProperty",
          label: "Hot Property",
        },
        {
          type: "checkbox",
          name: "shareToOtherBrokers",
          label: "Share With Other Brokers",
        },
      ],
    },

    {
      title: "Additional Details",
      fields: [
        {
          type: "dropdown",
          name: "furnishedStatus", // Ref → MasterConfig (PROPERTY_FURNITURE_TYPE)
          label: "Furnished Status",
          placeholder: "Select furnished status",
        },
        {
          type: "text",
          name: "fourWheelerParking",
          label: "Four-Wheeler Parking",
          placeholder: "Enter parking details",
        },
        {
          type: "text",
          name: "twoWheelerParking",
          label: "Two-Wheeler Parking",
          placeholder: "Enter parking details",
        },
        {
          type: "dropdown",
          name: "priority", // Ref → MasterConfig (PROPERTY_PRIORITY_TYPE)
          label: "Priority",
          placeholder: "Select priority level",
        },

        {
          type: "textarea",
          name: "commission",
          label: "Commission",
          placeholder: "Enter commission details",
        },
        {
          type: "dropdown",
          name: "sourceOfProperty",
          label: "Source of Property",
          placeholder: "Select source of property",
          required: true,
        },
        {
          type: "text",
          name: "reference",
          label: "Reference",
          placeholder: "Enter reference details (if any)",
        },
      ],
    },

    {
      title: "Pre-Leased Property",
      fields: [
        {
          type: "checkbox",
          name: "preLeased",
          label: "Pre-Leased Property",
        },
        {
          type: "textarea",
          name: "preLeasedRemarks",
          label: "Pre-Leased Remarks",
          placeholder: "Enter remarks for pre-leased property",
        },
      ],
    },

    {
      title: "Pricing and Remarks",
      fields: [
        {
          type: "text",
          name: "price",
          label: "Price",
          placeholder: "Enter property price",
          required: true,
        },
        {
          type: "text",
          name: "priceRemarks",
          label: "Price Remarks",
          placeholder: "Enter price remarks",
        },
        {
          type: "textarea",
          name: "remarks",
          label: "General Remarks",
          placeholder: "Enter remarks",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-10 w-full text-primary mb-[80px]">
      {sections.map((section, sIdx) => (
        <div
          key={sIdx}
          className="border border-accent rounded-[16px] p-4 bg-base-100 shadow-md"
        >
          {section.title && (
            <h3 className="text-lg font-semibold text-info mb-3 border-b border-info pb-3">
              {section.title}
            </h3>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field, idx) => (
              <div key={idx} className="relative">
                {["text", "number", "email"].includes(field.type) && (
                  <InputTag
                    label={field.label}
                    placeholder={field.placeholder}
                    type={field.type}
                    value={formData?.[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                  />
                )}

                {field.type === "dropdown" && (
                  <Dropdown
                    label={field.label}
                    required={field.required}
                    items={field.items}
                    buttonLabel={formData?.[field.name] || field.placeholder}
                    value={formData?.[field.name]}
                    onSelect={(item) => handleChange(field.name, item)}
                    widthClass="w-full"
                  />
                )}

                {field.type === "searchdropdown" && (
                  <SearchableDropdown
                    label={field.label}
                    required={field.required}
                    items={field.items}
                    buttonLabel={
                      formData?.[field.name]?.area || field.placeholder
                    }
                    value={formData?.[field.name]}
                    isplaceholder="Search area"
                    onSelect={(selectedItem, rawItem) => {
                      handleChange(field.name, selectedItem);
                      setFormData((prev) => ({
                        ...prev,
                        city: rawItem.city || prev.city,
                        state: rawItem.state || prev.state,
                        pincode: rawItem.pincode || prev.pincode,
                      }));
                    }}
                    widthClass="w-full"
                    minCharsToOpen={3}
                    onSearchChange={setSearchValue}
                  />
                )}

                {field.type === "checkbox" && (
                  <label className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      checked={formData[field.name] || false}
                      onChange={(e) =>
                        handleChange(field.name, e.target.checked)
                      }
                      className="toggle border-info bg-accent checked:border-info checked:bg-info"
                    />
                    <span>{field.label}</span>
                  </label>
                )}

                {field.type === "textarea" && (
                  <TextareaTag
                    label={field.label}
                    placeholder={field.placeholder}
                    value={formData?.[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    disabled={field.disabled}
                    rows={field.rows}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Owner Contact Details */}
      <div className="border border-accent rounded-[16px] p-4 bg-base-100 shadow-md">
        <div className="flex justify-between items-center mb-3 border-b border-info pb-3">
          <h3 className="text-lg font-semibold text-info  w-full">
            Owner Contact Details
          </h3>
          {formData?.ownerContactDetails?.length < 2 && (
            <button
              className="btn btn-sm btn-outline btn-info hover:text-accent"
              onClick={addOwnerContactSection}
            >
              + Add
            </button>
          )}
        </div>

        {formData?.ownerContactDetails?.map((owner, index) => (
          <div
            key={index}
            className="relative border border-base-200 rounded-lg p-4 mb-4"
          >
            {index !== 0 && (
              <button
                onClick={() => removeOwnerContactSection(index)}
                className="absolute top-2 right-2 text-error hover:text-red-600"
              >
                ✕
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputTag
                label="Owner Name"
                placeholder="Enter owner name"
                value={owner.name}
                onChange={(e) =>
                  handleOwnerContactChange(index, "name", e.target.value)
                }
              />
              <InputTag
                label="Owner Contact Number"
                placeholder="Enter contact number"
                type="number"
                value={owner.number}
                onChange={(e) =>
                  handleOwnerContactChange(index, "number", e.target.value)
                }
              />
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={owner.isPrimary || false}
                  onChange={(e) =>
                    handleOwnerContactChange(
                      index,
                      "isPrimary",
                      e.target.checked
                    )
                  }
                  className="toggle border-info bg-accent checked:border-info checked:bg-info"
                />
                <span>Primary Owner</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Caretaker Section */}
      <div className="border border-accent rounded-[16px] p-4 bg-base-100 shadow-md">
        <h3 className=" text-lg font-semibold text-info mb-3 border-b border-info pb-3 w-full">
          Caretaker / Key Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputTag
            label="Caretaker Name"
            placeholder="Enter caretaker name"
            value={formData.caretakerName}
            onChange={(e) =>
              handleCaretakerChange("caretakerName", e.target.value)
            }
          />
          <InputTag
            label="Caretaker Contact"
            placeholder="Enter caretaker number"
            value={formData.caretakerContact}
            onChange={(e) =>
              handleCaretakerChange("caretakerContact", e.target.value)
            }
          />
          <InputTag
            label="Key Arrangement"
            placeholder="Enter key arrangement"
            value={formData.keyArrangement}
            onChange={(e) =>
              handleCaretakerChange("keyArrangement", e.target.value)
            }
          />
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={formData.keyInOffice || false}
              onChange={(e) =>
                handleCaretakerChange("keyInOffice", e.target.checked)
              }
              className="toggle border-info bg-accent checked:border-info checked:bg-info"
            />
            <span>Key Available in Office</span>
          </label>
        </div>
      </div>
    </div>
  );
});

export default PropertyDrawerContent;
