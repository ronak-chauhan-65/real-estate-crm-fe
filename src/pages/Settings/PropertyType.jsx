import React, { useCallback, useEffect, useMemo, useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import InputTag from "../../components/Input/InputTag";
import Dropdown from "../../components/Dropdown/Dropdown";
import { PropertyTypes } from "../../components/CommonFunctions/PropertyType";
import Table from "../../components/Table/Table";
import TableRow from "../../components/Table/TableRow";
import { showToast } from "../../utils/toastUtils";
import { PropertyTypeApiList } from "../../components/APICalls/Configure";
import NodataFound from "../../components/NoDataFound/NodataFound";

function PropertyType() {
  // ────────────────────────────────
  // State Declarations
  // ────────────────────────────────
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isRefresh, setisRefresh] = useState(false);
  const [onEditID, setonEditID] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    dropdownValue: "",
  });

  // Update field values
  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Table Configuration
  const tableHeaderData = useMemo(
    () => [
      { name: "Name", isSort: false },
      { name: "Type", isSort: false },
      { name: "created At", isSort: false },
      { name: "Action", isSort: false, center: true },
    ],
    []
  );

  // get property type
  const handlePropertyType = async () => {
    const repsonse = await PropertyTypeApiList.getPropertyType();
    setData(repsonse?.data?.data ?? []);
  };

  // edit property type
  const handleEdit = useCallback((user) => {
    setFormData({
      name: user?.name,
      dropdownValue: user?.propertyConstructionType,
    });
    setIsDrawerOpen(true);
    setonEditID(user?._id);
  }, []);

  // delete base on id
  const handleDelete = useCallback(async (id) => {
    const response = await PropertyTypeApiList.DeletePropertyType(id);

    if (response.success) {
      showToast("success", response?.data?.msg);
      setisRefresh((prev) => !prev);
    } else {
      showToast("error", response?.error?.msg);
    }
  }, []);

  // dr

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);

    setFormData({ name: "", dropdownValue: "" });
    setonEditID("");
    setvalidationObj({
      nameError: false,
      dropdownError: false,
    });
  };

  const [validationObj, setvalidationObj] = useState({
    nameError: false,
    dropdownError: false,
  });

  const formValidation = () => {
    const nameError = !formData?.name || formData?.name.length < 2;
    const dropdownError = !formData?.dropdownValue;

    // update state (for showing UI errors)
    setvalidationObj({ nameError, dropdownError });

    // use local variables for logic
    return !nameError && !dropdownError;
  };

  // save the PropertyType using drawer
  const handleSave = async () => {
    if (formValidation() && !onEditID) {
      const repsonse = await PropertyTypeApiList.PostPropertyType({
        name: formData?.name,
        propertyConstructionType: formData?.dropdownValue,
      });

      if (repsonse.success) {
        showToast("success", repsonse?.data?.msg);
        handleCloseDrawer();
       setisRefresh((prev) => !prev);
      } else {
        showToast("error", repsonse?.error?.msg);
      }
    } else if (formValidation() && onEditID) {
      const repsonse = await PropertyTypeApiList.UpdatePropertyType(onEditID, {
        name: formData?.name,
        propertyConstructionType: formData?.dropdownValue,
      });

      if (repsonse.success) {
        showToast("success", repsonse?.data?.msg);
        handleCloseDrawer();
        setisRefresh((prev) => !prev);
      } else {
        showToast("error", repsonse?.error?.msg);
      }
    }
  };

  // table row
  const rows = useMemo(() => {
    if (!data || data.length === 0) {
      return (
        <tr>
          <td colSpan="100%" className="text-center py-4 text-gray-500">
            <NodataFound />
          </td>
        </tr>
      );
    }

    return data.map((item) => (
      <TableRow
        key={item.id}
        item={item}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ));
  }, [data, handleEdit, handleDelete]);

  //  Memoize Drawer children to prevent full re-renders
  const drawerContent = useMemo(
    () => (
      <div className="p-4 space-y-4">
        <div className=" relative">
          <InputTag
            label="Name"
            placeholder="Type your name"
            value={formData.name}
            onChange={(e) => {
              handleChange("name", e.target.value);
              setvalidationObj((prev) => ({ ...prev, nameError: false }));
            }}
            required
          />
          {validationObj.nameError && (
            <p className="text-red-500 text-[12px]   absolute bottom-[-17px]">
              {!formData.name ? "Name must be at least 2 characters long" : ""}
            </p>
          )}
        </div>
        <div className=" relative">
          <Dropdown
            buttonLabel={
              formData.dropdownValue || "Select Property Construction Type"
            }
            items={PropertyTypes()}
            value={formData.dropdownValue}
            onSelect={(item) => handleChange("dropdownValue", item)}
            btnClass="font-light text-start"
            widthClass="w-80"
            label="Property Construction Type"
            required
          />
          {validationObj.dropdownError && (
            <p className="text-red-500 text-[12px]   absolute bottom-[-17px]">
              {!formData.dropdownValue
                ? "Please select a property construction type"
                : ""}
            </p>
          )}
        </div>
      </div>
    ),
    [formData, handleChange, validationObj]
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

  // load property type on mount and on create and delete
  useEffect(() => {
    handlePropertyType();
  }, [isRefresh]);

  return (
    <div className=" overflow-visible">
      {/* Header Section */}
      <div className="flex-wrap  lg:flex  items-center justify-between  ">
        <div className="pb-4">
          <h3 className="text-2xl font-semibold text-info">Property Type</h3>
          <h5 className="text-sm  font-normal text-primary">
            Automate all your reminders from a single screen.
          </h5>
        </div>

        <div>
          <button
            className="btn btn-info text-accent"
            onClick={() => setIsDrawerOpen(true)}
          >
            Add Property
          </button>

          <Drawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            header="Add Property"
            position="end"
            footer={drawerFooter}
            onEditID={onEditID}
          >
            {drawerContent}
          </Drawer>
        </div>
      </div>

      {/* Table Section */}
      <div className="text-secondary pt-2 pb-0  bg-accent">
        <Table
          tableHeaderData={tableHeaderData}
          showPagination={false}
          scrollToTop={true}
        >
          {rows}
        </Table>
      </div>
    </div>
  );
}

export default PropertyType;
