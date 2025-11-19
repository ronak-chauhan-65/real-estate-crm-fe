import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useClickOutside from "../../CustomHook/useClickOutside";
import Drawer from "../../components/Drawer/Drawer";
import Table from "../../components/Table/Table";
import InquiryDrawer from "./InquiryDrawer";
import { showToast } from "../../utils/toastUtils";
import { InquiryAPI } from "../../components/APICalls/inquiryAPI";

function Inquiry() {
  const [showFilter, setshowFilter] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [onEditID, setonEditID] = useState("");
  const [loader, setloader] = useState(false);
  const [getApiParams, setgetApiParams] = useState({
    perPage: 10,
    currentPage: 1,
    status: "active",
    searchKey: "",
  });

  const [getAreas, setgetAreas] = useState({
    currentPage: 1,
    perPage: 10,
    success: true,
    totalCount: 0,
    totalPages: 0,
    areas: [],
  });
  const [validationObj, setvalidationObj] = useState({});

  const [formData, setFormData] = useState({
    clientName: "",
    mobile: "",
    email: "",
    isNri: false,
    enquiryFor: "",
    requirementType: "",
    propertyType: [],
    configuration: [],
    areaSizeFrom: "",
    areaSizeTo: "",
    areaMeasurementUnit: "",
    enquirySource: "",
    furnishedStatus: "",
    budgetFrom: "",
    budgetTo: "",
    budgetUnit: "",
    purpose: "",
    building: "",
    status: "Active",
    projectStatus: "",
    area: "",
    isPreLeased: false,
    noCareCustomer: false,
    otherContacts: [
      {
        name: "",
        nri: false,
        contactNo: "",
        status: "",
      },
    ],
    remarksTelephonicDiscussion: "",
    highlights: "",
    city: "",
    branch: "",
    employee: "",
  });

  const ref = useRef();

  useClickOutside(ref, () => setshowFilter(false));

  // Update drawer  field values
  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // handle search parameter change for get api
  const handleParamsChange = (e) => {
    const value = e.target.value.trimStart();
    handleApiParams("searchKey", value);
  };

  // handle  parameter change for get api
  const handleApiParams = useCallback((field, value) => {
    setgetApiParams((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Table Configuration
  const tableHeaderData = useMemo(
    () => [
      { name: "Area", isSort: false },
      { name: "Pincode", isSort: false },
      { name: "City", isSort: false },
      { name: "State", isSort: false },

      { name: "Updated At", isSort: false },
      { name: "Action", isSort: false, center: true },
    ],
    []
  );

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
    const payload = {
      ...formData,
      budgetFrom: formData.budgetFrom + formData.budgetUnit,
      budgetTo: formData.budgetTo + formData.budgetUnit,
    };

    try {
      let response;
      if (!onEditID) {
        response = await InquiryAPI.PostInquiry(payload);
      } else if (onEditID) {
        response = await InquiryAPI.UpdateBuilding(onEditID, payload);
      }
    } catch (error) {
      console.error("Error saving building:", err);
      showToast("error", "Server error while saving building");
    }
  };

  // ADD Contact Section
  const addContactSection = () => {
    setFormData((prev) => {
      if (prev.otherContacts?.length >= 2) return prev;
      return {
        ...prev,
        otherContacts: [
          ...(prev.otherContacts || []),
          { name: "", number: "" },
        ],
      };
    });
  };

  // REMOVE Contact Section
  const removeContactSection = (index) => {
    setFormData((prev) => {
      const updated = prev.otherContacts.filter((_, i) => i !== index);
      return { ...prev, otherContacts: updated };
    });
  };

  // HANDLE Contact Field Change
  const handleContactChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.otherContacts];
      updated[index][field] = value;
      return { ...prev, otherContacts: updated };
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
    <div className="mx-[1rem] lg:mx-[2rem]  ">
      {/* Header Section */}
      <div className="flex-wrap sticky  top-0 z-[9] lg:flex   bg-base-100  items-center justify-between w-full  ">
        <div className="pb-4">
          <h3 className="text-2xl font-semibold text-info">Inquiry List</h3>
          <h5 className="text-sm opacity-50 font-normal text-primary   ">
            View, track, and manage all customer inquiries in one place.
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
            <span class="material-symbols-outlined">add</span> Add Inquiry
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
            {/* <AreaDrawerContent
              formData={formData}
              validationObj={validationObj}
              handleChange={handleChange}
            /> */}
            {isDrawerOpen && (
              <InquiryDrawer
                formData={formData}
                handleChange={handleChange}
                validationObj={validationObj}
                setFormData={setFormData}
                addContactSection={addContactSection}
                removeContactSection={removeContactSection}
                handleContactChange={handleContactChange}
              />
            )}
          </Drawer>
        </div>
      </div>

      {/* Table Section */}

      <div className="w-full">
        {loader ? (
          <div className="flex flex-col items-center justify-center py-10  w-full h-full ">
            <span className="loading loading-spinner loading-lg text-info"></span>
            <p className="text-sm text-gray-400 mt-2">Loading Inquiry...</p>
          </div>
        ) : (
          <div className="text-secondary  pb-0  bg-accent rounded-[25px]  overflow-x-scroll ">
            <Table
              tableHeaderData={tableHeaderData}
              showPagination={true}
              totalData={getAreas?.totalCount}
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
              {/* {rows} */}
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inquiry;
