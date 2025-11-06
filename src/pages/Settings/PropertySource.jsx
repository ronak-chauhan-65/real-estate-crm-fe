import React, { useCallback, useEffect, useMemo, useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import InputTag from "../../components/Input/InputTag";
import Table from "../../components/Table/Table";
import { showToast } from "../../utils/toastUtils";
import { PropertySourceApiList } from "../../components/APICalls/Configure";
import NodataFound from "../../components/NoDataFound/NodataFound";
import PropertySourceTableRow from "../../components/Table/PropertySourceTableRow";

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
      { name: "created At", isSort: false },
      // { name: "Type", isSort: false },

      { name: "Action", isSort: false, center: true },
    ],
    []
  );

  // get property type
  const handlePropertyType = async () => {
    const repsonse = await PropertySourceApiList.getPropertySource();
    console.log(repsonse, "repsonse");

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
    const response = await PropertySourceApiList.DeletePropertySource(id);

    if (response.success) {
      showToast("success", response?.data?.msg);
      setisRefresh((prev) => !prev);
    } else {
      showToast("error", response?.error?.msg);
    }
  }, []);

  // reset all feild
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);

    setFormData({ name: "", dropdownValue: "" });
    setonEditID("");
    setvalidationObj({
      nameError: false,
    });
  };

  const [validationObj, setvalidationObj] = useState({
    nameError: false,
    // dropdownError: false,
  });

  const formValidation = () => {
    const nameError = !formData?.name || formData?.name.length < 2;

    // update state (for showing UI errors)
    setvalidationObj({ nameError });

    // use local variables for logic
    return !nameError;
  };

  // save the PropertyType using drawer
  const handleSave = async () => {
    if (formValidation() && !onEditID) {
      const response = await PropertySourceApiList.PostPropertySource({
        name: formData?.name,
        // propertyConstructionType: formData?.dropdownValue,
      });

      if (response.success) {
        showToast("success", response?.data?.msg);
        handleCloseDrawer();
        setisRefresh((prev) => !prev);
      } else {
        showToast("error", response?.error?.msg);
      }
    } else if (formValidation() && onEditID) {
      const repsonse = await PropertySourceApiList.UpdatePropertySource(
        onEditID,
        {
          name: formData?.name,
          // propertyConstructionType: formData?.dropdownValue,
        }
      );

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
      <PropertySourceTableRow
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
    <div className="relative overflow-visible z-[1]">
      {/* Header Section */}
      <div className="flex-wrap  lg:flex  items-center justify-between  ">
        <div className="pb-4">
          <h3 className="text-2xl font-semibold text-info">
            Property source List
          </h3>
          <h5 className="text-sm opacity-50 font-normal text-primary">
            Define residential, commercial, and custom property types to
            organize your listings effectively.
          </h5>
        </div>

        <div>
          <button
            className="btn btn-info text-accent"
            onClick={() => setIsDrawerOpen(true)}
          >
            Add source
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
