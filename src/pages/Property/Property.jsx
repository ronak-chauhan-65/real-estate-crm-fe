import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Drawer from "../../components/Drawer/Drawer";
import useClickOutside from "../../CustomHook/useClickOutside";
import PropertyDrawerContent from "./PropertyDrawerContent";
import { ProprtyAPI } from "../../components/APICalls/PropertyAPI";
import Table from "../../components/Table/Table";
import PropertyTableRow from "./PropertyTableRow";
import NodataFound from "../../components/NoDataFound/NodataFound";

function Property() {
  // State Declarations
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [onEditID, setonEditID] = useState("");
  const [isRefresh, setisRefresh] = useState(false);
  const [showFilter, setshowFilter] = useState(false);
  const [loader, setloader] = useState(false);

  const [formData, setFormData] = useState({
    //  Reference Fields

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
    // Property Information
    propertyForError: false,
    propertyTypeError: false,
    specificPropertyError: false,
    buildingNameError: false,
    configurationError: false,

    // Locality (NEW)
    addressError: false,
    wingError: false,
    unitNoError: false,

    // Combined Input/Dropdown Blocks
    carpetAreaError: false,
    carpetMeasurementError: false,

    superBuiltUpAreaError: false,
    superBuiltUpMeasurementError: false,

    plotAreaError: false,
    plotMeasurementError: false,

    terraceError: false,
    terraceMeasurementError: false,

    // Additional Details
    sourceOfPropertyError: false,

    // Pricing and Remarks
    priceError: false,

    furnishedStatusError: false,

    // Owner Information
    ownerError: false,
  });

  const formValidation = () => {
    // Property Information
    const propertyForError =
      !formData?.propertyFor || formData?.propertyFor === "";

    const furnishedStatusError =
      !formData?.furnishedStatus || formData?.furnishedStatus === "";

    const propertyTypeError =
      !formData?.propertyType || formData?.propertyType === "";

    const specificPropertyError =
      !formData?.specificProperty || formData?.specificProperty === "";

    const buildingNameError =
      !formData?.buildingName || formData?.buildingName.trim().length < 2;

    const configurationError =
      !formData?.configuration || formData?.configuration === "";

    // NEW — Locality Fields
    const addressError =
      !formData?.address || formData?.address.trim().length < 5;

    const wingError = !formData?.wing || formData?.wing.trim().length < 1;

    const unitNoError = !formData?.unitNo || formData?.unitNo.trim().length < 1;

    // Combined Input/Dropdown Blocks
    const carpetAreaError =
      formData?.carpetArea === undefined ||
      formData?.carpetArea === null ||
      formData?.carpetArea === "" ||
      isNaN(Number(formData?.carpetArea));

    const carpetMeasurementError =
      !formData?.carpetMeasurement || formData?.carpetMeasurement === "";

    const superBuiltUpAreaError =
      formData?.superBuiltUpArea === undefined ||
      formData?.superBuiltUpArea === null ||
      formData?.superBuiltUpArea === "" ||
      isNaN(Number(formData?.superBuiltUpArea));

    const superBuiltUpMeasurementError =
      !formData?.superBuiltUpMeasurement ||
      formData?.superBuiltUpMeasurement === "";

    const plotAreaError =
      formData?.plotArea === undefined ||
      formData?.plotArea === null ||
      formData?.plotArea === "" ||
      isNaN(Number(formData?.plotArea));

    const plotMeasurementError =
      !formData?.plotMeasurement || formData?.plotMeasurement === "";

    const terraceError =
      formData?.terrace === undefined ||
      formData?.terrace === null ||
      formData?.terrace === "" ||
      isNaN(Number(formData?.terrace));

    const terraceMeasurementError =
      !formData?.terraceMeasurement || formData?.terraceMeasurement === "";

    // Additional Details
    const sourceOfPropertyError =
      !formData?.sourceOfProperty || formData?.sourceOfProperty === "";

    // Pricing
    const priceError =
      formData?.price === undefined ||
      formData?.price === null ||
      Number(formData?.price) <= 0;

    // Owner
    const ownerError = !formData?.owner || formData?.owner.trim().length < 2;

    // Update state
    setValidationObj({
      propertyForError,
      propertyTypeError,
      specificPropertyError,
      buildingNameError,
      configurationError,

      addressError,
      wingError,
      unitNoError,

      carpetAreaError,
      carpetMeasurementError,

      superBuiltUpAreaError,
      superBuiltUpMeasurementError,

      plotAreaError,
      plotMeasurementError,

      terraceError,
      terraceMeasurementError,

      sourceOfPropertyError,
      priceError,
      ownerError,

      furnishedStatusError,
    });

    // Return overall validity
    return !(
      propertyForError ||
      propertyTypeError ||
      specificPropertyError ||
      buildingNameError ||
      configurationError ||
      addressError ||
      wingError ||
      unitNoError ||
      carpetAreaError ||
      carpetMeasurementError ||
      superBuiltUpAreaError ||
      superBuiltUpMeasurementError ||
      plotAreaError ||
      plotMeasurementError ||
      terraceError ||
      terraceMeasurementError ||
      sourceOfPropertyError ||
      priceError ||
      ownerError ||
      furnishedStatusError
    );
  };

  const [getProperty, setgetProperty] = useState({
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
    searchKey: "",
  });

  // get Area
  const getPropertyRow = async () => {
    setloader(true);
    const response = await ProprtyAPI.getProperty({
      perPage: getApiParams?.perPage,
      currentPage: getApiParams?.currentPage,
      status: getApiParams?.status,
      searchKey: getApiParams?.searchKey,
    });

    const data = response?.data;

    setgetProperty({
      currentPage: data?.currentPage ?? 1,
      perPage: data?.perPage ?? 10,
      success: data?.success ?? false,
      totalCount: data?.totalCount ?? 0,
      totalPages: data?.totalPages ?? 0,
      properties: data?.properties ?? [],
    });

    setloader(false);
  };

  // call get api base on get paraneter  change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // Fetch when user clears search OR types 3+ characters
      if (
        getApiParams.searchKey.length === 0 ||
        getApiParams.searchKey.length >= 3
      ) {
        getPropertyRow();
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

  // handle  parameter change for get api
  const handleApiParams = useCallback((field, value) => {
    setgetApiParams((prev) => ({ ...prev, [field]: value }));
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
    formValidation();
    console.log(formValidation(), "    formValidation();");

    const payload = {
      ...formData,
      buildingName: formData?.buildingName?.id || formData?.buildingName || "",
    };

    const response = await ProprtyAPI?.PostProperty(payload);
  };

  // edit property type
  const handleEdit = useCallback(async (data) => {
    // setFormData({
    //   // Basic Information
    //   buildingName: data?.buildingName || "",
    //   nameOfBuilder: data?.nameOfBuilder || "",
    //   address: data?.address || "",
    //   landMark: data?.landMark || "",
    //   area: { id: data?.area?._id || "", area: data?.area?.area || "" },
    //   city: data?.city || "",
    //   state: data?.state || "",
    //   pincode: data?.pincode || "",
    //   primeBuilding: data?.primeBuilding || false,
    //   status: data?.status ?? true,

    //   // Other Details
    //   yearOfBuildingPossession: data?.yearOfBuildingPossession || 0,
    //   noOfFloor: data?.noOfFloor || 0,
    //   noOfUnit: data?.noOfUnit || 0,
    //   noOfLiftEachBlock: data?.noOfLiftEachBlock || 0,

    //   // Property Settings
    //   propertyType: data?.propertyType || [],
    //   restrictedUser: data?.restrictedUser || [],
    //   buildingStatus: data?.buildingStatus || "",
    //   qualityOfBuilding: data?.qualityOfBuilding || "",

    //   // Amenities
    //   "Swimming Pool": data?.amenities?.swimmingPool || false,
    //   "Club House": data?.amenities?.clubHouse || false,
    //   "Passenger Lift": data?.amenities?.passengerLift || false,
    //   Gym: data?.amenities?.gym || false,
    //   "Garden & Children Play Area": data?.amenities?.gardenPlayArea || false,
    //   "Central AC": data?.amenities?.centralAC || false,
    //   "Service Lift": data?.amenities?.serviceLift || false,
    //   "Stretcher Lift": data?.amenities?.streatureLift || false, // note: spelling in API

    //   // Contact & Security Details
    //   contactDetails: data?.contactDetails?.length
    //     ? data.contactDetails
    //     : [{ name: "", number: "" }],
    //   securityDetails: data?.securityDetails?.length
    //     ? data.securityDetails
    //     : [{ name: "", number: "" }],
    // });

    setIsDrawerOpen(true);
    setonEditID(data?._id);
  }, []);

  // delete base on id
  const handleDelete = useCallback(async (id) => {
    // const response = await BuildingApi.DeleteBuilding(id);
    // if (response.success) {
    //   showToast("success", response?.data?.msg);
    //   setisRefresh((prev) => !prev);
    // } else {
    //   showToast("error", response?.error?.msg);
    // }
  }, []);

  // Table Configuration
  const tableHeaderData = useMemo(
    () => [
      { name: "Building Name", isSort: false },
      { name: "Modified On", isSort: false },
      { name: "Property Information", isSort: false },
      { name: "Wing", isSort: false },
      { name: "Unit No ", isSort: false },
      { name: "Price", isSort: false },
      { name: "Contact", isSort: false, center: true },
      { name: "Action", isSort: false, center: true },
    ],
    []
  );

  // table row
  const rows = useMemo(() => {
    // If no areas, show "No data"
    if (!getProperty?.properties || getProperty?.properties.length === 0) {
      return (
        <tr>
          <td colSpan="100%" className="text-center py-4 text-gray-500 ">
            <NodataFound />
          </td>
        </tr>
      );
    }

    // Otherwise render area rows
    return getProperty.properties.map((item) => (
      <PropertyTableRow
        key={item._id || item.id} // use _id if API gives it
        item={item}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ));
  }, [getProperty, handleEdit, handleDelete]);

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
              placeholder="search Property"
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
            {isDrawerOpen && (
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
              totalData={getProperty?.totalCount}
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
