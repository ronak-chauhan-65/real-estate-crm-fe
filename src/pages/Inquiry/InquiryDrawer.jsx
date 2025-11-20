import React, { useEffect, useState } from "react";
import InputTag from "../../components/Input/InputTag";
import Dropdown from "../../components/Dropdown/Dropdown";
import MultiSelectDropdown from "../../components/Dropdown/MultiSelectDropdown";
import SearchableDropdown from "../../components/Dropdown/SearchableDropdown";
import { AreaApiList } from "../../components/APICalls/areaApi";
import { getMasterConfigg } from "../../components/APICalls/masterConfig";
import RangeSelector from "../../components/Input/RangeSelector";
import { BuildingApi } from "../../components/APICalls/BuildingApi";
import { UserApiList } from "../../components/APICalls/userApi";
import TextareaTag from "../../components/Input/TextareaTag";
import MobileInputWithCode from "../../components/Input/MobileInputWithCode";

const InquiryDrawer = React.memo(function InquiryDrawer({
  formData,
  handleChange,
  validationObj,
  addContactSection,
  handleContactChange,
  removeContactSection,
  setFormData,
}) {
  const [requirementType, SetrequirementType] = useState([]);

  const [AllpropertyType, SetAllpropertyType] = useState([]);
  const [allconfiguration, setAllconfiguration] = useState([]);

  const [searchValue, setsearchValue] = useState("");

  const [filterPropertyType, setfilterPropertyType] = useState([]);
  const [filterConfiguration, setfilterConfiguration] = useState([]);

  const [unitmesurment, setUnitmesurment] = useState([]);
  const [inquirySource, setinquirySource] = useState([]);

  const [furnitureType, setfurnitureType] = useState([]);

  const [buildingName, setbuildingName] = useState([]);
  const [searchBuilding, setSearchBuilding] = useState("");

  const [propertyStatus, setPropertyStatus] = useState([]);

  const [areas, setAreas] = useState([]);

  const [users, setUsers] = useState([]);

  // Fetch building list once
  const getbuilgingName = async (searchKey = "") => {
    const response = await BuildingApi.getBuilding({
      status: "active",
      searchKey: searchKey,
    });

    setbuildingName(response?.data?.buildings);
  };

  const getUser = async () => {
    const response = await UserApiList.getUser();

    const userFormat = response?.data?.map((v) => ({
      label: v.name,
      value: v._id,
    }));

    setUsers(userFormat);
  };

  // Fetch area list once
  const getArea = async (searchKey = "") => {
    const response = await AreaApiList.getAllArea({
      status: "active",
      searchKey: searchKey,
    });
    console.log(response, "response");

    setAreas(response?.data?.areas || []);
  };

  useEffect(() => {
    if (searchBuilding.length >= 3 || searchBuilding == "") {
      getbuilgingName(searchBuilding);
    }
  }, [searchBuilding]);

  // Call API when user types 3+ letters
  useEffect(() => {
    if (searchValue.length >= 3 || searchValue == "") {
      getArea(searchValue);
    }
  }, [searchValue]);

  const params = {
    key: [
      "PROPERTY_CONSTRUCTION_TYPE",
      "PROPERTY_SPECIFIC_TYPE",
      "BUILDING_PROGRESS",
      "PROPERTY_PLAN_TYPE",
      "PROPERTY_MEASUREMENT_TYPE",
      "PROPERTY_SOURCE",
      "PROPERTY_FURNITURE_TYPE",
    ].join(","),
  };

  const getPropertyTypes = async () => {
    const response = await getMasterConfigg(params);

    const requirementTypeformatted =
      response?.data?.data?.PROPERTY_CONSTRUCTION_TYPE?.map((pt) => ({
        label: pt.name,
        value: pt._id,
      })) || [];

    const propertyTypeFormat = response?.data?.data?.PROPERTY_SPECIFIC_TYPE;
    const configurationFormat = response?.data?.data?.PROPERTY_PLAN_TYPE;

    const mesurment = response?.data?.data?.PROPERTY_MEASUREMENT_TYPE?.map(
      (sb) => ({
        label: sb.name,
        value: sb._id,
      })
    );

    const inquirySource = response?.data?.data?.PROPERTY_SOURCE?.map((sb) => ({
      label: sb.name,
      value: sb._id,
    }));

    const furnitureType = response?.data?.data?.PROPERTY_FURNITURE_TYPE?.map(
      (sb) => ({
        label: sb.name,
        value: sb._id,
      })
    );

    const propertyStatus = response?.data?.data?.BUILDING_PROGRESS?.map(
      (sb) => ({
        label: sb.name,
        value: sb._id,
      })
    );

    SetrequirementType(requirementTypeformatted);
    SetAllpropertyType(propertyTypeFormat);
    setAllconfiguration(configurationFormat);
    setUnitmesurment(mesurment);
    setinquirySource(inquirySource);
    setfurnitureType(furnitureType);
    setPropertyStatus(propertyStatus);
  };

  useEffect(() => {
    getPropertyTypes();
    getUser();
  }, []);

  // --- SECTIONS CONFIGS FOR ENQUIRY ---
  const enquirySections = [
    {
      title: "Customer Information",
      fields: [
        {
          type: "text",
          name: "clientName",
          label: "Client Name",
          placeholder: "Enter client name",
          required: true,
        },
        {
          type: "MobileInputWithCode",
          name: "mobile",
          label: "Mobile Number",
          placeholder: "Enter mobile number",
          required: true,
        },
        {
          type: "text",
          name: "email",
          label: "Email",
          placeholder: "Enter email",
        },
        {
          type: "checkbox",
          name: "isNri",
          label: "Is NRI",
        },
      ],
    },
    {
      title: "Customer Requirement",
      fields: [
        {
          type: "dropdown",
          name: "enquiryFor",
          label: "Enquiry For",
          placeholder: "Select enquiry type",
          required: true,
          items: [
            { label: "Rent", value: "Rent" },
            { label: "Buy", value: "Buy" },
            { label: "Sell & Rent", value: "Sell & Rent" },
          ],
        },
        {
          type: "dropdown",
          name: "requirementType",
          label: "Requirement Type",
          placeholder: "Select requirement type",
          required: true,
          items: requirementType, // populate from MasterConfig
        },
        {
          type: "multi",
          name: "propertyType",
          label: "Property Type",
          placeholder: "Select property types",
          required: true,
          items: filterPropertyType, // populate from MasterConfig
        },
        {
          type: "multi",
          name: "configuration",
          label: "Configuration",
          placeholder: "Select configuration",
          required: true,
          items: filterConfiguration, // populate from MasterConfig
        },

        {
          type: "RangeSelector",
          label: "Area Size",
          required: false,
          fromKey: "areaSizeFrom",
          toKey: "areaSizeTo",
          placeholderFrom: "From area",
          placeholderTo: "To area",
          unitKey: "areaMeasurementUnit",
          unitItems: unitmesurment,
          required: true,
          errorKey: "areaSizeError",
        },

        {
          type: "dropdown",
          name: "enquirySource",
          label: "Enquiry Source",
          items: inquirySource, // MasterConfig
        },
        {
          type: "dropdown",
          name: "furnishedStatus",
          label: "Furnished Status",
          items: furnitureType, // MasterConfig
        },

        {
          type: "RangeSelector",
          label: "Budget ",
          required: false,
          fromKey: "budgetFrom",
          toKey: "budgetTo",
          placeholderFrom: "budget from",
          placeholderTo: "budget to",
          unitKey: "budgetUnit",
          unitItems: [
            { value: "Thousand", label: "Thousand" },
            { value: "Lakh", label: "Lakh" },
            { value: "Crore", label: "Crore" },
          ],
          required: true,
          errorKey: "budgetError",
        },
        {
          type: "dropdown",
          name: "purpose",
          label: "Purpose",
          items: [
            { label: "Own Use", value: "Own Use" },
            { label: "Investment", value: "Investment" },
          ],
        },
        {
          type: "searchdropdown",
          name: "building",
          label: "Building",
          placeholder: "Select building",
          items: buildingName, // fetched from API
          onSearchChange: setSearchBuilding,
          labelKey: "buildingName",
        },

        {
          type: "dropdown",
          name: "projectStatus",
          label: "Project Status",
          items: propertyStatus, // MasterConfig
        },
        {
          type: "searchdropdown",
          name: "area",
          label: "Area",
          placeholder: "Select area",
          items: areas,
          labelKey: "area", // 👈 correct key for Area API
          onSearchChange: setsearchValue,
        },
        {
          type: "checkbox",
          name: "status",
          label: "Status",
          items: ["Active", "Inactive"],
          required: true,
        },
        {
          type: "checkbox",
          name: "isPreLeased",
          label: "Pre-Leased",
        },
      ],
    },
    {
      title: "Other Information",
      fields: [
        {
          type: "checkbox",
          name: "noCareCustomer",
          label: "No Care Customer",
        },
      ],
    },

    {
      title: "Remarks & Highlights",
      fields: [
        {
          type: "textarea",
          name: "remarksTelephonicDiscussion",
          label: "Telephonic Discussion",
          placeholder: "Add telephonic Discussion",
        },
        {
          type: "textarea",
          name: "highlights",
          label: "Highlights",
          placeholder: "Add highlights ",
        },
      ],
    },
    {
      title: "Enquiry Allocation",
      fields: [
        {
          type: "dropdown",
          name: "employee",
          label: "Employee",
          placeholder: "Select employee",
          required: true,
          items: users,
        },
      ],
    },
  ];

  useEffect(() => {
    if (!formData.requirementType) {
      const newPropertyType = AllpropertyType.map((pt) => ({
        label: pt.name,
        value: pt._id,
      }));

      const newConfiguration = allconfiguration.map((cp) => ({
        label: cp.name,
        value: cp._id,
      }));

      setfilterPropertyType(newPropertyType);
      setfilterConfiguration(newConfiguration);
    }
  }, [formData.requirementType, AllpropertyType, allconfiguration]);

  return (
    <div className="flex flex-col gap-10 w-full text-primary mb-[80px]">
      {/* Render Basic/Other/Property/Amenities */}
      {enquirySections.map((section, sIdx) => (
        <div
          key={sIdx}
          className="border border-accent rounded-[16px] p-4 bg-base-100 shadow-md "
        >
          {section.title && (
            <h3 className="text-lg font-semibold text-info mb-3 border-b border-info pb-3">
              {section.title}
            </h3>
          )}

          {/* Input Fields */}
          {section.fields && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              {section.fields.map((field, idx) => (
                <div key={idx} className="relative ">
                  {field.type === "text" ||
                  field.type === "number" ||
                  field.type === "email" ? (
                    <div className="relative">
                      <InputTag
                        label={field.label}
                        placeholder={field.placeholder}
                        type={field.type}
                        value={formData?.[field.name] || ""}
                        onChange={(e) =>
                          handleChange(field.name, e.target.value)
                        }
                        required={field.required}
                      />
                      {field.required &&
                        validationObj?.buildingNameError &&
                        !formData.buildingName && (
                          <p className="text-red-500 text-[12px] absolute bottom-[-17px]">
                            Building name must be at least 2 characters long
                          </p>
                        )}{" "}
                    </div>
                  ) : field.type === "dropdown" ? (
                    <div className="relative">
                      <Dropdown
                        label={field.label}
                        required={field.required}
                        items={field.items}
                        buttonLabel={
                          formData?.[field.name] || field.placeholder
                        }
                        value={formData?.[field.name]}
                        onSelect={(item) => {
                          if (field.name == "requirementType") {
                            const newPropertyType = AllpropertyType.filter(
                              (v) => v.propertyConstructionType?._id === item
                            ).map((i) => ({ label: i.name, value: i._id }));

                            const newConfiguration = allconfiguration
                              .filter(
                                (v) => v.propertyConstructionType?._id === item
                              )
                              .map((i) => ({ label: i.name, value: i._id }));
                            console.log(
                              newConfiguration,
                              item,
                              "newConfigurationnewConfiguration"
                            );

                            setfilterPropertyType(newPropertyType);
                            setfilterConfiguration(newConfiguration);
                          }
                          handleChange(field.name, item);
                        }}
                        widthClass="w-[46%]"
                      />
                      {field.required &&
                        validationObj?.qualityofBuildingError &&
                        !formData.qualityOfBuilding && (
                          <p className="text-red-500 text-[12px] absolute bottom-[-17px]">
                            Quality of Building must be at required
                          </p>
                        )}{" "}
                    </div>
                  ) : field.type === "searchdropdown" ? (
                    <div className="relative">
                      <SearchableDropdown
                        label={field.label}
                        required={field.required}
                        items={field.items}
                        buttonLabel={
                          formData?.[field.name] || field.placeholder
                        } //  show area name
                        value={formData?.[field.name]} //  expects { id, area }
                        isplaceholder="Search building"
                        onSelect={(selectedItem, rawItem) => {
                          //  'selectedItem' is { id, area }

                          handleChange(field.name, selectedItem); //  store { id, area } in formData
                        }}
                        labelKey={field?.labelKey}
                        widthClass="w-full"
                        minCharsToOpen={3}
                        onSearchChange={
                          field.name === "building"
                            ? setSearchBuilding
                            : setsearchValue
                        } //  triggers API search
                      />
                      {/* {field.required &&
                        validationObj?.areaError &&
                        !formData.area && (
                          <p className="text-red-500 text-[12px] absolute bottom-[-17px]">
                            Area must be at required
                          </p>
                        )}{" "} */}
                    </div>
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
                      <span className="capitalize">{field.label}</span>
                    </label>
                  ) : field.type === "multi" ? (
                    <MultiSelectDropdown
                      label={field.label}
                      required={field.required}
                      items={field.items}
                      buttonLabel={field.placeholder}
                      widthClass="w-[46%]"
                      value={formData?.[field.name] || []}
                      onChange={(values) => handleChange(field.name, values)}
                    />
                  ) : field.type === "RangeSelector" ? (
                    <RangeSelector
                      label={field.label}
                      required={field.required}
                      placeholderFrom={field.placeholderFrom}
                      placeholderTo={field.placeholderTo}
                      unitItems={field.unitItems}
                      fromValue={formData?.[field.fromKey]}
                      toValue={formData?.[field.toKey]}
                      unitValue={formData?.[field.unitKey]}
                      onFromChange={(val) => handleChange(field.fromKey, val)}
                      onToChange={(val) => handleChange(field.toKey, val)}
                      onUnitChange={(val) => handleChange(field.unitKey, val)}
                    />
                  ) : field.type === "MobileInputWithCode" ? (
                    <MobileInputWithCode
                      required={true}
                      codeValue={formData.mobileCode}
                      numberValue={formData.mobile}
                      onCodeChange={(item) => {
                        console.log(item, "item item"),
                          handleChange("mobileCode", item);
                      }}
                      onNumberChange={(val) => handleChange("mobile", val)}
                    />
                  ) : field.type === "textarea" ? (
                    <TextareaTag
                      label={field.label}
                      placeholder={field.placeholder}
                      value={formData?.[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                      disabled={field.disabled}
                      rows={field.rows}
                    />
                  ) : null}

                  {field.required &&
                    field.type !== "RangeSelector" &&
                    validationObj?.[`${field.name}Error`] && (
                      <p className="text-red-500 text-[12px] absolute bottom-[-17px]">
                        {field.name === "address"
                          ? `${field.label} must be at least 5 characters`
                          : field.name === "mobile"
                          ? `${field.label} must be exactly 10 digits`
                          : `${field.label} must be at least 2 characters`}
                      </p>
                    )}

                  {/* RangeSelector error */}
                  {field.type === "RangeSelector" &&
                    field.required &&
                    validationObj?.[field.errorKey] && (
                      <p className="text-red-500 text-[12px] absolute bottom-[-17px]">
                        {field.label} is required
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
          {formData?.otherContacts?.length < 2 && (
            <button
              className="btn btn-sm btn-outline btn-info hover:text-accent"
              onClick={addContactSection}
            >
              + Add
            </button>
          )}
        </div>

        {formData?.otherContacts?.map((contact, index) => (
          <div
            key={index}
            className="relative border border-base-200 rounded-lg p-1 "
          >
            {index !== 0 && (
              <button
                onClick={() => removeContactSection(index)}
                className="absolute top-2 right-2 text-error hover:text-red-600"
              >
                ✕
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center ">
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
                value={contact.contactNo}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.length <= 10) {
                    handleContactChange(index, "contactNo", e.target.value);
                  }
                }}
              />
              <div className="  flex items-center">
                <label className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={contact.nri}
                    onChange={(e) =>
                      handleContactChange(index, "nri", e.target.checked)
                    }
                    className="toggle border-info bg-accent checked:border-info checked:bg-info"
                  />
                  <span>NRI</span>
                </label>{" "}
              </div>
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={contact.status === "Contactable"}
                  onChange={(e) =>
                    handleContactChange(
                      index,
                      "status",
                      e.target.checked ? "Contactable" : "Not Contactable"
                    )
                  }
                  className="toggle border-info bg-accent checked:border-info checked:bg-info"
                />
                <span>Status</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default InquiryDrawer;
