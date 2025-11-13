import React, { useCallback, useRef, useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import useClickOutside from "../../CustomHook/useClickOutside";
import PropertyDrawerContent from "./PropertyDrawerContent";
import { ProprtyAPI } from "../../components/APICalls/PropertyAPI";

function Property() {
  // State Declarations
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [onEditID, setonEditID] = useState("");
  const [isRefresh, setisRefresh] = useState(false);
  const [showFilter, setshowFilter] = useState(false);
  const [loader, setloader] = useState(false);

  const [formData, setFormData] = useState({
    //  Reference Fields
    area: "", // Ref → Area collection
    buildingName: "", // Ref → Building collection

    //  Basic Property Info
    propertyFor: "", // Ref → MasterConfig (PROPERTY_FOR)
    propertyType: "", // Ref → MasterConfig (PROPERTY_CONSTRUCTION_TYPE)
    specificProperty: "", // Ref → MasterConfig (PROPERTY_SPECIFIC_TYPE)
    configuration: "", // Ref → MasterConfig (PROPERTY_PLAN_TYPE)

    address: "",
    landmark: "", //  Added Landmark field
    wing: "",
    unitNo: "",
    status: "Active", // Active / Inactive / Rent out / Sold out / Hold

    //  Area Measurements
    carpetArea: "",
    carpetMeasurement: "", // PROPERTY_MEASUREMENT_TYPE
    superBuiltUpArea: "",
    superBuiltUpMeasurement: "",
    plotArea: "",
    plotMeasurement: "",
    terrace: "",
    terraceMeasurement: "",

    //  Highlights
    hotProperty: false,
    shareToOtherBrokers: false,

    //  Additional Details
    furnishedStatus: "", // PROPERTY_FURNITURE_TYPE
    fourWheelerParking: "",
    twoWheelerParking: "",
    priority: "", // PROPERTY_PRIORITY_TYPE
    commission: "",
    sourceOfProperty: "",
    reference: "",

    //  Pre-Leased Info
    preLeased: false,
    preLeasedRemarks: "",

    //  Pricing and Remarks
    price: "",
    priceRemarks: "",
    remarks: "",

    //  Owner Info
    owner: "", // PROPERTY_OWNER_TYPE
    email: "",
    nri: false,
    ownerContactSpecificNo: "",

    //  Owner Contact Details
    ownerContactDetails: [
      {
        name: "",
        contactNo: "",
        status: "Contactable", // Default
      },
    ],

    //  Unit Details
    unitDetails: [
      {
        unitNo: "",
        status: "", // Available / Rent Out / Sold Out
      },
    ],

    //  Other Contacts
    careTakerName: "",
    careTakerContactNo: "",
    keyArrangement: "",
    keyInOffice: false,

    //  Status
    activeStatus: true,
  });

  const [validationObj, setValidationObj] = useState({
    //  Property Information
    areaError: false,
    propertyForError: false,
    propertyTypeError: false,
    specificPropertyError: false,
    statusError: false,
    carpetAreaError: false,
    carpetMeasurementError: false,
    superBuiltupAreaError: false,
    superBuiltupMeasurementError: false,
    plotAreaError: false,
    plotMeasurementError: false,
    terraceAreaError: false,
    terraceMeasurementError: false,

    //  Additional Details
    furnishedStatusError: false,
    priorityError: false,
    sourceOfPropertyError: false,

    // Pricing and Remarks
    priceTextError: false,

    //  Owner Information
    ownerTypeError: false,
    ownerEmailError: false,
    ownerContactNumberError: false,

    //  Other Contact Information
    caretakerNameError: false,
    caretakerContactError: false,
  });

  const [getAreas, setgetAreas] = useState({
    currentPage: 1,
    perPage: 10,
    success: true,
    totalCount: 0,
    totalPages: 0,
    areas: [],
  });

  const [getApiParams, setgetApiParams] = useState({
    perPage: 10,
    currentPage: 1,
    status: "active",
    searchKey: "",
  });

  // Add Owner Contact Section (max 2)
  const addOwnerContactSection = () => {
    setFormData((prev) => {
      if (prev.ownerContactDetails?.length >= 2) return prev;
      return {
        ...prev,
        ownerContactDetails: [
          ...(prev.ownerContactDetails || []),
          { name: "", number: "" },
        ],
      };
    });
  };

  // Remove Owner Contact Section (except first)
  const removeOwnerContactSection = (index) => {
    setFormData((prev) => {
      const updated = prev.ownerContactDetails.filter((_, i) => i !== index);
      return { ...prev, ownerContactDetails: updated };
    });
  };

  // Handle Owner Contact Field Change
  const handleOwnerContactChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.ownerContactDetails];
      updated[index][field] = value;
      return { ...prev, ownerContactDetails: updated };
    });
  };

  const handleCaretakerChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update drawer  field values
  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const ref = useRef();

  useClickOutside(ref, () => setshowFilter(false));

  // handle search parameter change for get api
  const handleParamsChange = (e) => {
    const value = e.target.value.trimStart();
    handleApiParams("searchKey", value);
  };

  // close drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setonEditID("");
    // setFormData({ pincode: "", area: "", city: "", state: "", status: true });
    // setvalidationObj({
    //   pincodeError: false,
    //   areaError: false,
    //   cityError: false,
    //   stateError: false,
    //   statusError: false,
    // });
  };

  // save the area using drawer
  const handleSave = async () => {
    const response = await ProprtyAPI?.PostProperty(formData);

    console.log(response, formData, "formdata000000000000000000");
  };

  // Drawer Footer
  const drawerFooter = (
    <div className="flex gap-3 w-full">
      <button
        className="btn btn-accent border-info w-1/2"
        onClick={handleCloseDrawer}
      >
        Close
      </button>
      <button className="btn btn-info text-accent w-1/2" onClick={handleSave}>
        Save
      </button>
    </div>
  );

  return (
    <div className=" mx-[1rem] lg:mx-[2rem]    ">
      {" "}
      {/* Header Section */}
      <div className="flex-wrap sticky  top-0 z-[9] lg:flex   bg-base-100  items-center justify-between w-full  ">
        <div className="pb-4">
          <h3 className="text-2xl font-semibold text-info">Property List</h3>
          <h5 className="text-sm opacity-50 font-normal text-primary">
            Add, edit, and manage all property records efficiently from one
            place.
          </h5>
        </div>

        <div className="flex gap-3 ">
          <div className=" ">
            <input
              type="text"
              placeholder="search area"
              value={getApiParams?.searchKey}
              onChange={handleParamsChange}
              className="!w-full !block h-full border rounded px-3 rounded-[15px]  "
            />
          </div>
          <div ref={ref} className="">
            <button
              onClick={() => setshowFilter((prev) => !prev)}
              className="btn btn-info text-accent rounded-[15px]  w-[100px] capitalize"
            >
              {getApiParams?.status == "" ? "All" : getApiParams?.status}
            </button>

            {showFilter && (
              <ul className="menu absolute border border-info mt-1 w-[100px]  bg-base-100 rounded-box    shadow-sm">
                <li
                  className=" flex h-[30px]  hover:bg-info hover:text-accent hover:rounded  items-center justify-center  border-info border-b-1"
                  onClick={() => handleApiParams("status", "active")}
                >
                  active
                </li>
                <li
                  className="flex h-[30px]  items-center justify-center border-info border-b-1 hover:bg-info hover:text-accent hover:rounded"
                  onClick={() => handleApiParams("status", "inactive")}
                >
                  inactive
                </li>
                <li
                  className="flex h-[30px]  items-center justify-center hover:bg-info hover:text-accent hover:rounded "
                  onClick={() => handleApiParams("status", "")}
                >
                  All
                </li>
              </ul>
            )}
          </div>

          <button
            className="btn btn-info text-accent rounded-[15px]"
            onClick={() => setIsDrawerOpen(true)}
          >
            <span className="material-symbols-outlined">add</span> Add Area
          </button>

          <Drawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            header="Add Property"
            position="end"
            footer={drawerFooter}
            onEditID={onEditID}
            widthClass=" lg:w-1/2 w-full   "
          >
            <PropertyDrawerContent
              formData={formData}
              validationObj={validationObj}
              handleChange={handleChange}
              addOwnerContactSection={addOwnerContactSection}
              removeOwnerContactSection={removeOwnerContactSection}
              handleOwnerContactChange={handleOwnerContactChange}
              handleCaretakerChange={handleCaretakerChange}
              setFormData={setFormData}
            />
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default Property;

// wing  requried
// unit Number  requried
// configuration  drop down requried
//  status   drop down requried
// carper area  text  requried
// carpet mesurment drop down requried
//  super buildup (saleble area)  text requried
// super buildup measurement dropd down   requried
//  plot area text  requried
// plot measurment  drop down
// terrace text
// teraace measurment drop down
// Hot property checkbox
// share to other brokers  checkbox
//

//  property other details

// furnished status drop down  requried
// fourwheeler parking  text
// two wheeler parking  text
// priority drop down
//  commision text area
// source of proerty text
// if any refrence text
//

// pre leased checkbox
// pre leased remarks text

// Propery price and remarks

// price text   requried
// price remarks text
// remarks text

// Property owner information

// owner is  dropdown
// email text
// nri checkbox
// specific number check box
//  owner contact specific number text

// owner contact details  requried

// name text
// conatact number text
// status dropdown

// Unit details

// unit number text area
// status dropdown

//  property other contact information

// care take name text
//  care take contact number  text
// key arrangement text
// key in office checkbox
