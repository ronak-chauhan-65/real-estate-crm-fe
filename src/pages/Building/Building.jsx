import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Drawer from "../../components/Drawer/Drawer";
import BuildingDrawerContent from "./BuildingDrawerContent";
import { BuildingApi } from "../../components/APICalls/BuildingApi";
import { showToast } from "../../utils/toastUtils";
import useClickOutside from "../../CustomHook/useClickOutside";
import Table from "../../components/Table/Table";
import NodataFound from "../../components/NoDataFound/NodataFound";
import BuilidingTableRow from "./BuilidingTableRow";
import Inquiry from "../Inquiry/Inquiry";

function Building() {
  // State Declarations
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [onEditID, setonEditID] = useState("");
  const [showFilter, setshowFilter] = useState(false);
  const [loader, setloader] = useState(false);
  const [isRefresh, setisRefresh] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Information
    buildingName: "",
    nameOfBuilder: "",
    address: "",
    landMark: "",
    area: { id: "", area: "" },
    city: "",
    state: "",
    pincode: "",
    primeBuilding: false,
    status: true,

    // Other Details
    yearOfBuildingPossession: 0,
    noOfFloor: 0,
    noOfUnit: 0,
    noOfLiftEachBlock: 0,

    // Property Settings
    propertyType: [],
    restrictedUser: [],
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

  const [getBuilding, setgetBuilding] = useState({
    currentPage: 1,
    perPage: 10,
    success: true,
    totalCount: 0,
    totalPages: 0,
    buildings: [],
  });

  const [getApiParams, setgetApiParams] = useState({
    perPage: 10,
    currentPage: 1,
    status: "active",
    searchKey: "",
  });

  const [validationObj, setvalidationObj] = useState({
    buildingNameError: false,
    qualityofBuildingError: false,
    areaError: false,
  });

  const ref = useRef();

  useClickOutside(ref, () => setshowFilter(false));

  // Table Configuration
  const tableHeaderData = useMemo(
    () => [
      { name: "Building Name", isSort: false },
      { name: "Adress", isSort: false },
      { name: "Name of builder", isSort: false },
      { name: "Property Type", isSort: false },
      { name: "createdAt", isSort: false },
      { name: "Action", isSort: false, center: true },
    ],
    []
  );

  const formValidation = () => {
    // check validation conditions
    const buildingNameError =
      !formData?.buildingName || formData?.buildingName.trim().length < 2;

    const qualityofBuildingError =
      !formData?.qualityOfBuilding || formData?.qualityOfBuilding === "";

    const areaError = !formData?.area;

    // update validation state (for UI errors)
    setvalidationObj({
      buildingNameError,
      qualityofBuildingError,
      areaError,
    });

    // return overall form validity
    return !buildingNameError && !qualityofBuildingError && !areaError;
  };

  // get Area
  const getBuildingRow = async () => {
    setloader(true);
    const response = await BuildingApi.getBuilding({
      perPage: getApiParams?.perPage,
      currentPage: getApiParams?.currentPage,
      status: getApiParams?.status,
      searchKey: getApiParams?.searchKey,
    });

    const data = response?.data;

    setgetBuilding({
      currentPage: data?.currentPage ?? 1,
      perPage: data?.perPage ?? 10,
      success: data?.success ?? false,
      totalCount: data?.totalCount ?? 0,
      totalPages: data?.totalPages ?? 0,
      buildings: data?.buildings ?? [],
    });

    setloader(false);
  };

  // handle  parameter change for get api
  const handleApiParams = useCallback((field, value) => {
    setgetApiParams((prev) => ({ ...prev, [field]: value }));
  }, []);

  // handle search parameter change for get api
  const handleParamsChange = (e) => {
    const value = e.target.value.trimStart();
    handleApiParams("searchKey", value);
  };

  // Update drawer  field values
  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setonEditID("");
    setvalidationObj({
      buildingNameError: false,
      qualityofBuildingError: false,
      areaError: false,
    });

    setFormData({
      buildingName: "",
      nameOfBuilder: "",
      address: "",
      landMark: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      primeBuilding: false,
      yearOfBuildingPossession: 0,
      noOfFloor: 0,
      noOfUnit: 0,
      noOfLiftEachBlock: 0,
      propertyType: [],
      restrictedUser: [],
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

  // save the area using drawer
  const handleSave = async () => {
    if (!formValidation()) return;

    const payload = {
      ...formData,

      // send only area ID, not object
      area: formData?.area?.id || formData?.area || "",

      // send only property type IDs
      propertyType: formData?.propertyType?.map((pt) => pt._id || pt) || [],

      // send only restricted user IDs
      restrictedUser: formData?.restrictedUser?.map((u) => u._id || u) || [],

      // normalize amenities to match backend keys
      amenities: {
        swimmingPool: formData["Swimming Pool"] || false,
        passengerLift: formData["Passenger Lift"] || false,
        gardenPlayArea: formData["Garden & Children Play Area"] || false,
        serviceLift: formData["Service Lift"] || false,
        clubHouse: formData["Club House"] || false,
        gym: formData["Gym"] || false,
        centralAC: formData["Central AC"] || false,
        streatureLift: formData["Stretcher Lift"] || false,
      },
    };
    try {
      let response;
      if (!onEditID) {
        response = await BuildingApi.PostBuilding(payload);
      } else if (onEditID) {
        response = await BuildingApi.UpdateBuilding(onEditID, payload);
      }

      if (response?.success) {
        showToast("success", response?.data?.msg);
        handleCloseDrawer();
        setisRefresh((prev) => !prev);
      } else {
        showToast("error", response?.error?.msg || "Something went wrong");
      }
    } catch (err) {
      console.error("Error saving building:", err);
      showToast("error", "Server error while saving building");
    }
  };

  // edit property type
  const handleEdit = useCallback(async (data) => {
    setFormData({
      // Basic Information
      buildingName: data?.buildingName || "",
      nameOfBuilder: data?.nameOfBuilder || "",
      address: data?.address || "",
      landMark: data?.landMark || "",
      area: { id: data?.area?._id || "", area: data?.area?.area || "" },
      city: data?.city || "",
      state: data?.state || "",
      pincode: data?.pincode || "",
      primeBuilding: data?.primeBuilding || false,
      status: data?.status ?? true,

      // Other Details
      yearOfBuildingPossession: data?.yearOfBuildingPossession || 0,
      noOfFloor: data?.noOfFloor || 0,
      noOfUnit: data?.noOfUnit || 0,
      noOfLiftEachBlock: data?.noOfLiftEachBlock || 0,

      // Property Settings
      propertyType: data?.propertyType || [],
      restrictedUser: data?.restrictedUser || [],
      buildingStatus: data?.buildingStatus || "",
      qualityOfBuilding: data?.qualityOfBuilding || "",

      // Amenities
      "Swimming Pool": data?.amenities?.swimmingPool || false,
      "Club House": data?.amenities?.clubHouse || false,
      "Passenger Lift": data?.amenities?.passengerLift || false,
      Gym: data?.amenities?.gym || false,
      "Garden & Children Play Area": data?.amenities?.gardenPlayArea || false,
      "Central AC": data?.amenities?.centralAC || false,
      "Service Lift": data?.amenities?.serviceLift || false,
      "Stretcher Lift": data?.amenities?.streatureLift || false, // note: spelling in API

      // Contact & Security Details
      contactDetails: data?.contactDetails?.length
        ? data.contactDetails
        : [{ name: "", number: "" }],
      securityDetails: data?.securityDetails?.length
        ? data.securityDetails
        : [{ name: "", number: "" }],
    });

    setIsDrawerOpen(true);
    setonEditID(data?._id);
  }, []);

  // delete base on id
  const handleDelete = useCallback(async (id) => {
    const response = await BuildingApi.DeleteBuilding(id);
    if (response.success) {
      showToast("success", response?.data?.msg);
      setisRefresh((prev) => !prev);
    } else {
      showToast("error", response?.error?.msg);
    }
  }, []);

  // table row
  const rows = useMemo(() => {
    // If no areas, show "No data"
    if (!getBuilding?.buildings || getBuilding?.buildings.length === 0) {
      return (
        <tr>
          <td colSpan="100%" className="text-center py-4 text-gray-500 ">
            <NodataFound />
          </td>
        </tr>
      );
    }

    // Otherwise render area rows
    return getBuilding.buildings.map((item) => (
      <BuilidingTableRow
        key={item._id || item.id} // use _id if API gives it
        item={item}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ));
  }, [getBuilding, handleEdit, handleDelete]);

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

  // call get api base on get paraneter  change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // Fetch when user clears search OR types 3+ characters
      if (
        getApiParams.searchKey.length === 0 ||
        getApiParams.searchKey.length >= 3
      ) {
        getBuildingRow();
      }
    }, 200); // 400ms debounce to prevent spam API calls

    return () => clearTimeout(delayDebounce);
  }, [
    isRefresh,
    getApiParams.currentPage,
    getApiParams.perPage,
    getApiParams.status,
    getApiParams.searchKey,
  ]);

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
            <span className="material-symbols-outlined">add</span> Add Building
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

      <div className="w-full">
        {loader ? (
          <div className="flex flex-col items-center justify-center py-10  w-full h-full ">
            <span className="loading loading-spinner loading-lg text-info"></span>
            <p className="text-sm text-gray-400 mt-2">Loading areas...</p>
          </div>
        ) : (
          <div className="text-secondary  pb-0  bg-accent rounded-[25px]  overflow-x-scroll ">
            <Table
              tableHeaderData={tableHeaderData}
              showPagination={true}
              totalData={getBuilding?.totalCount}
              scrollToTop={true}
              currentPage={getApiParams?.currentPage}
              perPage={getApiParams?.perPage}
              onPageChange={(v) => handleApiParams("currentPage", v)}
              onPerPageChange={(v) => {
                setgetApiParams({
                  ...getApiParams,
                  perPage: v,
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {rows}
            </Table>
          </div>
        )}
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
