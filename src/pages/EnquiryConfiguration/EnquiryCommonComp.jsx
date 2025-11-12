import React, { useCallback, useMemo, useRef, useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import useClickOutside from "../../CustomHook/useClickOutside";
import Table from "../../components/Table/Table";
import NodataFound from "../../components/NoDataFound/NodataFound";
import { showToast } from "../../utils/toastUtils";
import EnquiryTableRow from "./EnquiryTableRow";
import EconfigurationDrawerContent from "./EconfigurationDrawerContent";
import {
  deleteMasterConfigg,
  postMasterConfigg,
  UpdateMasterConfigg,
} from "../../components/APICalls/masterConfig";

function EnquiryCommonComp({ item, index, onRefresh }) {
  // State Declarations
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showFilter, setshowFilter] = useState(false);
  const [onEditID, setonEditID] = useState("");
  const [loader, setloader] = useState(false);
  const [refreshDropdown, setRefreshDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    itemCategory: "",
  });
  const [validationObj, setvalidationObj] = useState({
    nameError: false,
    itemCategoryError: false,
  });

  const formValidation = useCallback(() => {
    let newValidationObj = {};
    let isValid = true;

    //  Validate common "name" field
    if (!formData.name?.trim() || formData.name.trim().length < 2) {
      newValidationObj.nameError = true;
      isValid = false;
    } else {
      newValidationObj.nameError = false;
    }

    // Validate dropdown for specific types only
    if (item.key === "ENQUIRY_SALES_COMMENT") {
      if (!formData.itemCategory) {
        newValidationObj.itemCategoryError = true; // error = true
        isValid = false;
      } else {
        newValidationObj.itemCategoryError = false;
      }
    }

    setvalidationObj(newValidationObj);

    return isValid;
  }, [formData, item.key]);

  const handleSave = async () => {
    if (formValidation() && !onEditID) {
      setloader(true);

      const response = await postMasterConfigg({
        key: item.key,
        name: formData?.name,
        itemCategory: formData?.itemCategory,
      });

      if (item.key === "PROPERTY_CONSTRUCTION_TYPE") {
        setRefreshDropdown((prev) => !prev);
      }

      if (response.success) {
        showToast("success", response?.data?.msg);
        handleCloseDrawer();
        if (typeof onRefresh === "function") {
          await onRefresh(item.key);
        }
      } else {
        showToast("error", response?.error?.msg);
      }

      setloader(false);
    } else if (formValidation() && onEditID) {
      setloader(true);

      const response = await UpdateMasterConfigg(onEditID, {
        name: formData?.name,
        itemCategory: formData?.itemCategory,
      });

      if (response.success) {
        showToast("success", response?.data?.msg);
        handleCloseDrawer();
        if (typeof onRefresh === "function") {
          await onRefresh(item.key);
        }
      } else {
        showToast("error", response?.error?.msg);
      }
      setloader(false);
    }
  };

  const handleEdit = useCallback(async (item) => {
    setFormData({
      name: item?.name,
      itemCategory: item?.itemCategory,
    });
    setIsDrawerOpen(true);
    setonEditID(item?._id);
  }, []);

  // delete base on id
  const handleDelete = useCallback(async (id) => {
    setloader(true);
    const response = await deleteMasterConfigg(id);

    if (response.success) {
      showToast("success", response?.data?.msg);
      if (typeof onRefresh === "function") {
        await onRefresh(item.key);
      }
    } else {
      showToast("error", response?.error?.msg);
    }
    setloader(false);
  }, []);

  // Update drawer  field values
  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // close drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setFormData({ name: "", itemCategory: "" });
    setvalidationObj({ nameError: false, itemCategoryError: false });
  };

  const ref = useRef();

  useClickOutside(ref, () => setshowFilter(false));

  // handle  parameter change for get api
  const handleApiParams = useCallback((field, value) => {
    setgetApiParams((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Table Configuration
  const tableHeaderData = useMemo(
    () => [
      { name: " Name", isSort: false },

      { name: "Action", isSort: false, center: true },
    ],
    []
  );

  const rows = useMemo(() => {
    // If no areas, show "No data"
    if (!item.data || item.data.length === 0) {
      return (
        <tr>
          <td colSpan="100%" className="text-center py-4 text-gray-500 ">
            <NodataFound />
          </td>
        </tr>
      );
    }

    // Otherwise render area rows
    return item?.data?.map(
      (val) => (
        console.log(val, "inloop"),
        (
          <EnquiryTableRow
            key={val._id || val.id} // use _id if API gives it
            val={val}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )
      )
    );
  }, [item.data, handleEdit, handleDelete]);

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
    <div className="mx-[1rem] lg:mx-[2rem] ">
      <div
        className={`flex-wrap lg:flex  ${
          index === 0 ? "sticky top-0 z-[9]" : ""
        }  bg-base-100  items-center justify-between w-full  `}
      >
        <div className="pb-4">
          <h3 className="text-[2rem] font-[600]  text-info ">{item.title}</h3>
          <h5 className="!text-sm opacity-50 font-normal text-primary">
            {item.title} details
          </h5>
        </div>

        <div className="flex gap-3 ">
          <button
            className="btn btn-info text-accent rounded-[15px]"
            onClick={() => setIsDrawerOpen(true)}
          >
            <span class="material-symbols-outlined">add</span> Add
          </button>

          <Drawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            header={`Add`}
            position="end"
            footer={drawerFooter}
            onEditID={onEditID}
          >
            {isDrawerOpen && (
              <EconfigurationDrawerContent
                formData={formData}
                validationObj={validationObj}
                handleChange={handleChange}
                field={item.key}
                refreshDropdown={refreshDropdown}
              />
            )}
          </Drawer>
        </div>
      </div>

      <div className="w-full">
        {loader ? (
          <div className="flex flex-col items-center justify-center py-10  w-full h-full ">
            <span className="loading loading-spinner loading-lg text-info"></span>
            <p className="text-sm text-gray-400 mt-2">
              Loading {item?.title}...
            </p>
          </div>
        ) : (
          <div className="text-secondary  pb-0  bg-accent rounded-[25px]  overflow-x-scroll ">
            <Table
              tableHeaderData={tableHeaderData}
              showPagination={false}
              scrollToTop={true}
            >
              {rows}
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default EnquiryCommonComp;
