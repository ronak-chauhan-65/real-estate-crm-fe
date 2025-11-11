import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Drawer from "../../components/Drawer/Drawer";
import InputTag from "../../components/Input/InputTag";
import Table from "../../components/Table/Table";
import AreaTableRow from "./AreaTableRow";
import NodataFound from "../../components/NoDataFound/NodataFound";
import AreaDrawerContent from "./AreaDrawerContent";
import { AreaApiList } from "../../components/APICalls/areaApi";
import { showToast } from "../../utils/toastUtils";
import useClickOutside from "../../CustomHook/useClickOutside";
import PopoverDropdown from "../../components/Dropdown/Dropdown";

function Area() {
  // State Declarations
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [onEditID, setonEditID] = useState("");
  const [isRefresh, setisRefresh] = useState(false);
  const [showFilter, setshowFilter] = useState(false);
  const [loader, setloader] = useState(false);
  const [formData, setFormData] = useState({
    pincode: "",
    area: "",
    city: "",
    state: "",
    status: true,
  });

  const [validationObj, setvalidationObj] = useState({
    pincodeError: false,
    areaError: false,
    cityError: false,
    stateError: false,
    statusError: false,
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

  const ref = useRef();

  useClickOutside(ref, () => setshowFilter(false));

  // form validation
  const formValidation = () => {
    const pincodeError = !formData?.pincode || formData?.pincode.length < 2;
    const areaError = !formData?.area || formData?.area.length < 2;
    const cityError = !formData?.city || formData?.city.length < 2;
    const stateError = !formData?.state || formData?.state.length < 2;
    const statusError = typeof formData?.status !== "boolean";

    // update state (for showing UI errors)
    setvalidationObj({
      pincodeError,
      statusError,
      areaError,
      cityError,
      stateError,
    });

    // use local variables for logic
    return (
      !pincodeError && !statusError && !areaError && !cityError && !stateError
    );
  };

  // get Area
  const getArea = async () => {
    setloader(true);
    const response = await AreaApiList.getAllArea({
      perPage: getApiParams?.perPage,
      currentPage: getApiParams?.currentPage,
      status: getApiParams?.status,
      searchKey: getApiParams?.searchKey,
    });

    const data = response?.data;

    setgetAreas({
      currentPage: data?.currentPage ?? 1,
      perPage: data?.perPage ?? 10,
      success: data?.success ?? false,
      totalCount: data?.totalCount ?? 0,
      totalPages: data?.totalPages ?? 0,
      areas: data?.areas ?? [],
    });

    setloader(false);
  };

  // save the area using drawer
  const handleSave = async () => {
    console.log(formValidation(), onEditID);
    if (formValidation() && !onEditID) {
      const repsonse = await AreaApiList.postArea({
        pincode: formData?.pincode,
        area: formData?.area,
        city: formData?.city,
        state: formData?.state,
        status: formData?.status,
      });

      if (repsonse.success) {
        showToast("success", repsonse?.data?.msg);
        handleCloseDrawer();
        setisRefresh((prev) => !prev);
      } else {
        showToast("error", repsonse?.error?.msg);
      }
    } else if (formValidation() && onEditID) {
      const response = await AreaApiList.UpdateArea(onEditID, {
        pincode: formData?.pincode,
        area: formData?.area,
        city: formData?.city,
        state: formData?.state,
        status: formData?.status,
      });
      if (response.success) {
        showToast("success", response?.data?.msg);
        handleCloseDrawer();
        setisRefresh((prev) => !prev);
      } else {
        showToast("error", response?.error?.msg);
      }
    }
  };

  // delete base on id
  const handleDelete = useCallback(async (id) => {
    const response = await AreaApiList.deleteArea(id);

    if (response.success) {
      showToast("success", response?.data?.msg);
      setisRefresh((prev) => !prev);
    } else {
      showToast("error", response?.error?.msg);
    }
  }, []);

  // edit property type
  const handleEdit = useCallback(async (user) => {
    console.log(user, "useruser");

    // const response = await AreaApiList.UpdateArea(id);
    setFormData({
      pincode: user?.pincode,
      area: user?.area,
      city: user?.city,
      state: user?.state,
      status: user?.status,
    });

    setIsDrawerOpen(true);
    setonEditID(user?._id);
  }, []);

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

  // close drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setonEditID("");
    setFormData({ pincode: "", area: "", city: "", state: "", status: true });
    setvalidationObj({
      pincodeError: false,
      areaError: false,
      cityError: false,
      stateError: false,
      statusError: false,
    });
  };

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

  // table row
  const rows = useMemo(() => {
    // If no areas, show "No data"
    if (!getAreas?.areas || getAreas?.areas.length === 0) {
      return (
        <tr>
          <td colSpan="100%" className="text-center py-4 text-gray-500 ">
            <NodataFound />
          </td>
        </tr>
      );
    }

    // Otherwise render area rows
    return getAreas.areas.map((item) => (
      <AreaTableRow
        key={item._id || item.id} // use _id if API gives it
        item={item}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ));
  }, [getAreas, handleEdit, handleDelete]);

  // call get api base on get paraneter  change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // Fetch when user clears search OR types 3+ characters
      if (
        getApiParams.searchKey.length === 0 ||
        getApiParams.searchKey.length >= 3
      ) {
        getArea();
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
          <h3 className="text-2xl font-semibold text-info">Area List</h3>
          <h5 className="text-sm opacity-50 font-normal text-primary   ">
            Add, edit, and manage all area records from one place.
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
            <span class="material-symbols-outlined">add</span> Add Area
          </button>

          <Drawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            header="Add Property"
            position="end"
            footer={drawerFooter}
            onEditID={onEditID}
          >
            <AreaDrawerContent
              formData={formData}
              validationObj={validationObj}
              handleChange={handleChange}
            />
          </Drawer>
        </div>
      </div>

      {/* Table Section */}

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
              {rows}
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Area;
