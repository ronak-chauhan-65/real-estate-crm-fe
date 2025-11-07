import React, { useCallback, useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import BuildingDrawerContent from "./BuildingDrawerContent";
import { BuildingApi } from "../../components/APICalls/BuildingApi";

function Building() {
  // State Declarations
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [onEditID, setonEditID] = useState("");

  const [formData, setFormData] = useState({
    // Basic Information
    buildingName: "",
    nameofBuilder: "",
    address: "",
    landmark: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    primebuilding: false,

    // Other Details
    year: "",
    floors: "",
    units: "",
    lifts: "",

    // Property Settings
    propertyTypes: [],
    restrictedUsers: [],
    buildingStatus: "",
    qualityOfBuilding: "",

    // Amenities (checkboxes)
    "Prime Building": false,
    "Swimming Pool": false,
    "Club House": false,
    "Passenger Lift": false,
    Gym: false,
    "Garden & Children Play Area": false,
    "Central AC": false,
    "Service Lift": false,
    "Stretcher Lift": false,

    // Contact Details (if exists in child)
    contactDetails: [{ name: "", number: "" }],

    // Security Details (if exists in child)
    securityDetails: [{ name: "", number: "" }],
  });

  const [validationObj, setvalidationObj] = useState({
    buildingNameError: false,
    qualityofBuildingError: false,
    areaError: false,
  });

  const formValidation = () => {
    // check validation conditions
    const buildingNameError =
      !formData?.buildingName || formData?.buildingName.trim().length < 2;

    const qualityofBuildingError =
      !formData?.buildingQuality || formData?.buildingQuality === "";

    const areaError = !formData?.area || formData?.area.trim().length < 2;

    // update validation state (for UI errors)
    setvalidationObj({
      buildingNameError,
      qualityofBuildingError,
      areaError,
    });

    // return overall form validity
    return !buildingNameError && !qualityofBuildingError && !areaError;
  };

  // Update drawer  field values
  const handleChange = useCallback((field, value) => {
    console.log(value, "value");

    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setFormData({
      buildingName: "",
      nameofBuilder: "",
      address: "",
      landmark: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      primebuilding: false,
      year: "",
      floors: "",
      units: "",
      lifts: "",
      propertyTypes: [],
      restrictedUsers: [],
      buildingStatus: "",
      qualityOfBuilding: "",
      "Prime Building": false,
      "Swimming Pool": false,
      "Club House": false,
      "Passenger Lift": false,
      Gym: false,
      "Garden & Children Play Area": false,
      "Central AC": false,
      "Service Lift": false,
      "Stretcher Lift": false,
      contactDetails: [{ name: "", number: "" }],
      securityDetails: [{ name: "", number: "" }],
    });
  };

  // save the area using drawer
  const handleSave = async () => {
    console.log(formData, "formDataformData");
    const repsonse = await BuildingApi.PostBuiling(
      formData,
    );
    if (repsonse.success) {
      showToast("success", repsonse?.data?.msg);
      handleCloseDrawer();
      setisRefresh((prev) => !prev);
    } else {
      showToast("error", repsonse?.error?.msg);
    }
  };

  const addContactSection = () => {
    setFormData((prev) => {
      if (prev.contactDetails.length >= 2) return prev;
      return {
        ...prev,
        contactDetails: [...prev.contactDetails, { name: "", number: "" }],
      };
    });
  };
  // Remove contact section (except first)
  const removeContactSection = (index) => {
    setFormData((prev) => {
      const updated = prev.contactDetails.filter((_, i) => i !== index);
      return { ...prev, contactDetails: updated };
    });
  };

  // Add security section (max 2)
  const addSecuritySection = () => {
    setFormData((prev) => {
      if (prev.securityDetails.length >= 2) return prev;
      return {
        ...prev,
        securityDetails: [...prev.securityDetails, { name: "", number: "" }],
      };
    });
  };

  // Remove security section (except first)
  const removeSecuritySection = (index) => {
    setFormData((prev) => {
      const updated = prev.securityDetails.filter((_, i) => i !== index);
      return { ...prev, securityDetails: updated };
    });
  };

  const handleContactChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.contactDetails];
      updated[index][field] = value;
      return { ...prev, contactDetails: updated };
    });
  };

  const handleSecurityChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.securityDetails];
      updated[index][field] = value;
      return { ...prev, securityDetails: updated };
    });
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
      {/* Header Section */}
      <div className="flex-wrap sticky  top-0 z-[9] lg:flex   bg-base-100  items-center justify-between w-full  ">
        <div className="pb-4">
          <h3 className="text-2xl font-semibold text-info">
            Building Management
          </h3>
          <h5 className="text-sm opacity-50 font-normal text-primary   ">
            Efficiently add, edit, and organize all building records from one
            place.
          </h5>
        </div>

        <div className="flex gap-3 ">
          {/* <div className=" ">
            <input
              type="text"
              placeholder="search area"
              value={getApiParams?.searchKey}
              onChange={handleParamsChange}
              className="!w-full !block h-full border rounded px-3 rounded-[15px]  "
            />
          </div> */}
          {/* <div ref={ref} className="">
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
          </div> */}

          <button
            className="btn btn-info text-accent rounded-[15px]"
            onClick={() => setIsDrawerOpen(true)}
          >
            <span class="material-symbols-outlined">add</span> Add Building
          </button>

          <Drawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            header="Add Building"
            position="end"
            footer={drawerFooter}
            onEditID={onEditID}
            widthClass=" lg:w-1/2 w-full   "
          >
            {isDrawerOpen && (
              <BuildingDrawerContent
                formData={formData}
                validationObj={validationObj}
                handleChange={handleChange}
                addContactSection={addContactSection}
                removeContactSection={removeContactSection}
                addSecuritySection={addSecuritySection}
                removeSecuritySection={removeSecuritySection}
                handleContactChange={handleContactChange}
                handleSecurityChange={handleSecurityChange}
                setFormData={setFormData}
              />
            )}
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default Building;

// building name
// name of nuilding
// area  api
// address
// land mark
// state    disable on edit
// city     disable on edit
//  pincode  disable on edit
// prime buildig    toggle
// status   radio
// email id
// send email while adding site visit   toggle  nathi rakhvanu

//  other information

//  year of builing possession
// no of floor
// no on unit
// no of lift each block
//  property type   mulitiselectdropdown   builing arcticature type
// restricted user    mulitiselectdropdown  building restriction
//  building status  dropdown building progress
// quality of builing  dropdown  hardcoded 4 options

// builing  despc

//  builing amentitits

//  swimming pool   toggle
// club house   toggle
// pasenger lift   toggle
// gym   toggle
// garden & childer play area   toggle
// central ac  toggle
// service lift  toggle
// streature lift  toggle

// contact details

// contact person name
// contact person number

// securty details

// name
// conatct
