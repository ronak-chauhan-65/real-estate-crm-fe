import React, { useEffect, useState } from "react";
import InputTag from "../../components/Input/InputTag";
import Dropdown from "../../components/Dropdown/Dropdown";
import MultiSelectDropdown from "../../components/Dropdown/MultiSelectDropdown";
import SearchableDropdown from "../../components/Dropdown/SearchableDropdown";
import { AreaApiList } from "../../components/APICalls/areaApi";
import { getMasterConfigg } from "../../components/APICalls/masterConfig";
import TextareaTag from "../../components/Input/TextareaTag";
import { BuildingApi } from "../../components/APICalls/BuildingApi";
import CombinedInputWithDropdown from "../../components/Dropdown/CombinedInputWithDropdown";

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
  console.log(validationObj, "validationobjjjj");
  const [areas, setAreas] = useState([]);
  const [propertyFor, setPropertyFor] = useState([]);
  const [propertySpecificType, setpropertySpecificType] = useState([]);
  const [filteredSpecificType, setfilteredSpecificType] = useState([]);
  const [propertyConstruction, setpropertyConstruction] = useState([]);
  const [configuration, setconfiguration] = useState([]);
  const [superBuiltUp, setsuperBuiltUp] = useState([]);
  const [furnitureType, setFurnitureType] = useState([]);
  const [ownerType, setOwnerType] = useState([]);
  const [priority, setPriority] = useState([]);
  const [propertySource, setPropertySource] = useState([]);

  const [allSpecificTypes, setAllSpecificTypes] = useState([]);
  const [allConfigurations, setAllConfigurations] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [searchBuilding, setSearchBuilding] = useState("");

  const [initialLoaded, setInitialLoaded] = useState(false);
  const [buildingName, setbuildingName] = useState([]);

  // --- Fetch area list ---

  const getbuilgingName = async (searchKey = "") => {
    const response = await BuildingApi.getBuilding({
      status: "active",
      searchKey: searchKey,
    });

    setbuildingName(response?.data?.buildings);
  };

  useEffect(() => {
    if (searchBuilding.length >= 3 || searchBuilding == "") {
      getbuilgingName(searchBuilding);
    }
  }, [searchBuilding]);

  const params = {
    key: [
      "PROPERTY_FOR",
      "PROPERTY_PLAN_TYPE",
      "PROPERTY_SPECIFIC_TYPE",
      "PROPERTY_CONSTRUCTION_TYPE",
      "PROPERTY_MEASUREMENT_TYPE",
      "PROPERTY_FURNITURE_TYPE",
      "PROPERTY_OWNER_TYPE",
      "PROPERTY_PRIORITY_TYPE",
      "PROPERTY_SOURCE",
    ].join(","),
  };

  const getPropertyTypes = async () => {
    const response = await getMasterConfigg(params);
    console.log(response, "responseresponse");

    const specificTypeFormat = response?.data?.data?.PROPERTY_SPECIFIC_TYPE;
    const configurationFormat = response?.data?.data?.PROPERTY_PLAN_TYPE;

    setAllSpecificTypes(specificTypeFormat);
    setAllConfigurations(configurationFormat);

    setpropertySpecificType(specificTypeFormat);
    setconfiguration(configurationFormat);
    //   ?
    // .map(
    //   (cg) => ({ label: cg.name, value: cg._id })
    // );

    const propertyForFormat = response?.data?.data?.PROPERTY_FOR?.map((pf) => ({
      label: pf.name,
      value: pf._id,
    }));

    const propertyConstructionFormat =
      response?.data?.data?.PROPERTY_CONSTRUCTION_TYPE?.map((pc) => ({
        label: pc.name,
        value: pc._id,
      }));

    const superBuiltUpFormat =
      response?.data?.data?.PROPERTY_MEASUREMENT_TYPE?.map((sb) => ({
        label: sb.name,
        value: sb._id,
      }));

    const furnitureFormat = response?.data?.data?.PROPERTY_FURNITURE_TYPE?.map(
      (ft) => ({ label: ft.name, value: ft._id })
    );

    const ownerTypeFormat = response?.data?.data?.PROPERTY_OWNER_TYPE?.map(
      (ot) => ({ label: ot.name, value: ot._id })
    );

    const priorityFormat = response?.data?.data?.PROPERTY_PRIORITY_TYPE?.map(
      (pt) => ({ label: pt.name, value: pt._id })
    );

    const propertySourceFormat = response?.data?.data?.PROPERTY_SOURCE?.map(
      (ps) => ({ label: ps.name, value: ps._id })
    );

    setPropertyFor(propertyForFormat);
    setpropertySpecificType(specificTypeFormat);
    setconfiguration(configurationFormat);
    setpropertyConstruction(propertyConstructionFormat);
    setsuperBuiltUp(superBuiltUpFormat);
    setFurnitureType(furnitureFormat);
    setOwnerType(ownerTypeFormat);
    setPriority(priorityFormat);
    setPropertySource(propertySourceFormat);
  };
  useEffect(() => {
    if (!formData.propertyType) {
      // Show ALL
      setfilteredSpecificType(
        allSpecificTypes?.map((i) => ({ label: i.name, value: i._id }))
      );

      setconfiguration(
        allConfigurations?.map((i) => ({ label: i.name, value: i._id }))
      );
    }
  }, [formData.propertyType, allSpecificTypes, allConfigurations]);

  useEffect(() => {
    getPropertyTypes();
  }, []);

  const sections = [
    {
      title: "Property Information",
      fields: [
        // {
        //   type: "searchdropdown",
        //   name: "area", // Ref → Area
        //   label: "Area",
        //   placeholder: "Search area",
        //   required: true,
        //   items: areas,
        //   labelKey: "area",
        // },
        {
          type: "dropdown",
          name: "propertyFor", // Ref → MasterConfig (PROPERTY_FOR)
          label: "Property For",
          placeholder: "Select property purpose",
          items: propertyFor,
          required: true,
        },
        {
          type: "dropdown",
          name: "propertyType", // Ref → MasterConfig (PROPERTY_CONSTRUCTION_TYPE)
          label: "Property Type",
          placeholder: "Select property type",
          required: true,
          items: propertyConstruction,
        },
        {
          type: "dropdown",
          name: "specificProperty", // Ref → MasterConfig (PROPERTY_SPECIFIC_TYPE)
          label: "Specific Property",
          placeholder: "Select specific property type",
          required: true,
          items: filteredSpecificType,
        },
        {
          type: "searchdropdown",
          name: "buildingName", // Ref → Building
          label: "Building Name",
          placeholder: "Search building",
          required: true,
          items: buildingName,
          onSearchChange: setSearchBuilding,
          labelKey: "buildingName",
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
          name: "wing",
          label: "Wing",
          placeholder: "Enter wing name",
          required: true,
        },
        {
          type: "text",
          name: "unitNo",
          label: "Unit Number",
          placeholder: "Enter unit number",
          required: true,
        },
        {
          type: "dropdown",
          name: "configuration", // Ref → MasterConfig (PROPERTY_PLAN_TYPE)
          label: "Configuration",
          placeholder: "Select configuration type",
          required: true,
          items: configuration,
        },
        {
          type: "dropdown",
          name: "status",
          label: "Status",
          placeholder: "Select status",
          required: true,
          items: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
            { label: "Rent Out", value: "Rent out" },
            { label: "Sold Out", value: "Sold out" },
            { label: "Hold", value: "Hold" },
          ],
        },
        {
          type: "combineInputDropdown",
          name: "carpetArea",
          label: "Carpet Area",
          placeholder: "Enter carpet area",
          inputName: "carpetArea",
          dropdownName: "carpetMeasurement",
          items: superBuiltUp,
          required: true,
        },

        {
          type: "combineInputDropdown",
          name: "superBuiltUpArea",
          label: "Super Built-up Area (Saleable)",
          placeholder: "Enter super built-up area",
          inputName: "superBuiltUpArea",
          dropdownName: "superBuiltUpMeasurement",
          items: superBuiltUp,
          required: true,
        },
        {
          type: "combineInputDropdown",
          name: "plotArea",
          label: "Plot Area",
          placeholder: "Enter plot area",
          inputName: "plotArea",
          dropdownName: "plotMeasurement",
          items: superBuiltUp,
          required: true,
        },
        {
          type: "combineInputDropdown",
          name: "terraceBlock",
          label: "Terrace Area",
          placeholder: "Enter terrace area",
          inputName: "terrace",
          dropdownName: "terraceMeasurement",
          items: superBuiltUp,
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
          items: furnitureType,
          placeholder: "Select furnished status",
          required: true,
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
          items: priority,
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
          items: propertySource,
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
    {
      title: "Property Owner  information",
      fields: [
        {
          type: "dropdown",
          name: "owner",
          label: "Property owner is",
          placeholder: "Select property owner",
          items: ownerType,
          required: true,
        },
        {
          type: "text",
          name: "email",
          label: "Email",
          placeholder: "Enter price remarks",
        },

        {
          type: "checkbox",
          name: "nri",
          label: "NRI",
          placeholder: "Enter remarks",
        },
        {
          type: "number",
          name: "ownerContactSpecificNo",
          label: "Owner contact specific number",
          placeholder: "Enter number",
        },
      ],
    },
  ];

  const plotUnits = [
    { label: "Sq Ft", value: "sqft" },
    { label: "Sq Yard", value: "sqyard" },
    { label: "Sq Meter", value: "sqm" },
    { label: "Acre", value: "acre" },
    { label: "Hectare", value: "hectare" },
  ];

  return (
    <div className="flex flex-col gap-10 w-full text-primary mb-[80px]">
      {sections.map((section, sIdx) => (
        <div
          key={sIdx}
          className="border border-accent rounded-[16px] p-4 bg-base-100 shadow-md "
        >
          {section.title && (
            <h3 className="text-lg font-semibold text-info mb-3 border-b border-info pb-3">
              {section.title}
            </h3>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field, idx) => (
              <div key={idx} className="relative ">
                <div>
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
                </div>

                {field.type === "dropdown" && (
                  <Dropdown
                    label={field.label}
                    required={field.required}
                    items={field.items}
                    buttonLabel={formData?.[field.name] || field.placeholder}
                    value={formData?.[field.name]}
                    onSelect={(item) => {
                      // Update propertyType
                      handleChange(field.name, item);

                      if (field.name === "propertyType") {
                        // Filter Specific Property Types
                        const newSpecificTypes = propertySpecificType
                          .filter(
                            (v) => v.propertyConstructionType?._id === item
                          )
                          .map((i) => ({ label: i.name, value: i._id }));

                        setfilteredSpecificType(newSpecificTypes);

                        // Filter Configuration
                        const newConfigs = allConfigurations
                          .filter(
                            (v) => v.propertyConstructionType?._id === item
                          )
                          .map((i) => ({ label: i.name, value: i._id }));

                        setconfiguration(newConfigs);

                        handleChange("specificProperty", "");
                        handleChange("configuration", "");
                      }
                    }}
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
                    isplaceholder={field.placeholder}
                    onSelect={(selectedItem, rawItem) => {
                      handleChange(field.name, selectedItem);

                      // Only apply area auto-fill for Area dropdown
                    }}
                    labelKey={field?.labelKey}
                    widthClass="w-full"
                    minCharsToOpen={3}
                    onSearchChange={
                      field.name === "area" ? setSearchValue : setSearchBuilding
                    }
                  />
                )}

                {field.type === "checkbox" && (
                  <div className=" w-full h-full flex items-end pb-3">
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
                  </div>
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

                {field.type === "combineInputDropdown" && (
                  <CombinedInputWithDropdown
                    label={field.label}
                    required={field.required}
                    placeholder={field.placeholder}
                    inputValue={formData[field.inputName]}
                    dropdownValue={formData[field.dropdownName]}
                    dropdownItems={field.items}
                    onInputChange={(value) =>
                      handleChange(field.inputName, value)
                    }
                    onDropdownChange={(value) =>
                      handleChange(field.dropdownName, value)
                    }
                  />
                )}
                {console.log(
                  field.required,
                  validationObj?.[`${field.name}Error`],
                  !formData?.[field.name]
                )}
                {field.required &&
                  validationObj?.[`${field.name}Error`] &&
                  (!formData?.[field.name] ||
                    (typeof formData[field.name] === "string" &&
                      formData[field.name].trim() === "")) && (
                    <p className="text-red-500 text-[12px] absolute bottom-[-17px]">
                      {field.label} is required
                    </p>
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
